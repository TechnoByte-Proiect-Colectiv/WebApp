import { Address } from "../types/user/address";
import { Order } from "../types/user/order";
import {
  AuthResponse,
  LoginCredentials,
  SignUpCredentials,
  User,
} from "../types/user/user";
import apiClient from "./apiClient";

const TOKEN_KEY = "authToken";
const USER_KEY = "currentUser";

let currentToken: string | null = null;
let currentUser: User | null = null;

const safeGet = (obj: any, ...keys: string[]) => {
  return keys.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), obj);
};

export const userService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const res = await apiClient.post("/api/user/login", credentials);
      const token = res.data.authToken || res.data.token;

      if (!token) {
        throw new Error("Nu am primit token de la server.");
      }

      localStorage.setItem(TOKEN_KEY, token);
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;

      const profileRes = await apiClient.get(`/api/user/profile?email=${encodeURIComponent(credentials.email)}`);
      const user = profileRes.data; 

      if (!user) {
        throw new Error("Login successful, but cannot retrieve user profile.");
      }

      currentToken = token;
      currentUser = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      window.dispatchEvent(new Event("userUpdated"));

      return { token, user };
    } catch (err: any) {
      localStorage.removeItem(TOKEN_KEY);
      console.error('Login failed', err);
      throw err;
    }
  },

  async signup(credentials: SignUpCredentials): Promise<AuthResponse> {
    try {
      let res;
      try {
        res = await apiClient.post("/api/user/signUp", credentials);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          res = await apiClient.post("/api/user/signup", credentials);
        } else {
          throw err;
        }
      }

      const token = res.data.authToken || res.data.token || (res.data.data && (res.data.data.authToken || res.data.data.token));
      const user = res.data.user || res.data;

      if (!user) {
        throw new Error("Invalid response from server");
      }

      if (token) {
        currentToken = token;
        localStorage.setItem(TOKEN_KEY, token);
        apiClient.defaults.headers.Authorization = `Bearer ${token}`;
      }

      if (!user.name && (user.firstName || user.lastName)) {
        user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      }

      currentUser = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      window.dispatchEvent(new Event("userUpdated"));

      return { token: token || "", user };
    } catch (err: any) {
      const url = err?.config?.url || "unknown";
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message;
      console.error("Signup failed", { url, status, serverMsg });
      throw new Error(`Signup failed: ${serverMsg} (url: ${url}, status: ${status})`);
    }
  },

  async resetPassword(email: string): Promise<void> {
    // POST /api/user/forgot { email }
    await apiClient.post("/api/user/forgot", { email });
  },

  async changePassword(payload: { id: string; password: string; firstName?: string; lastName?: string; email?: string }): Promise<void> {
    try {
      const res = await apiClient.put("/api/user/changePassword", payload);
      // Optionally return server message
      return safeGet(res, "data", "data") || safeGet(res, "data");
    } catch (err: any) {
      if (err?.request && !err?.response) {
        const url = err?.config?.url || "/api/user/changePassword";
        console.error("Network/CORS error when calling changePassword", { url, err });
        throw new Error(`Network Error: no response from server for PUT ${url}. Check backend is running, REACT_APP_API_URL/proxy, and server CORS (preflight) settings. (${err.message})`);
      }

      const url = err?.config?.url || "/api/user/changePassword";
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message;
      console.error("Change password failed", { url, status, serverMsg });
      throw new Error(`Change password failed: ${serverMsg} (url: ${url}, status: ${status})`);
    }
  },

  getUserAddresses: async () => {
    const response = await apiClient.get("/api/user/address");
    return response.data;
  },

  addAddress: async (addressData: Partial<Address>) => {
    const response = await apiClient.post("/api/user/address", addressData);
    return response.data;
  },

  updateAddress: async (addressId: string, addressData: Partial<Address>) => {
    const response = await apiClient.put(`/api/user/address/${addressId}`, addressData);
    return response.data;
  },

  deleteAddress: async (addressId: string) => {
    const response = await apiClient.delete(`/api/user/address/${addressId}`);
    return true;
  },

  async getUsers(): Promise<User[]> {
    const res = await apiClient.get("/api/user/users");
    return safeGet(res, "data", "data") || safeGet(res, "data") || [];
  },

  async getProfile(email?: string): Promise<User> {
    const url = email ? `/api/user/profile?email=${encodeURIComponent(email)}` : `/api/user/profile`;
    const res = await apiClient.get(url);
    return safeGet(res, "data", "data") || safeGet(res, "data");
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/user/${encodeURIComponent(id)}`);
  },

  async updateUser(updatedData: Partial<User> & { id?: string }): Promise<User> {
    const id = updatedData.id || currentUser?.id;
    if (!id) throw new Error("No user id provided");

    try {
      const res = await apiClient.put(`/api/user/${encodeURIComponent(id)}`, updatedData);

      const updatedUser = safeGet(res, "data", "data") || safeGet(res, "data");

      if (updatedUser) {
        if (!updatedUser.name && ((updatedUser as any).firstName || (updatedUser as any).lastName)) {
          const f = (updatedUser as any).firstName || "";
          const l = (updatedUser as any).lastName || "";
          (updatedUser as any).name = `${f} ${l}`.trim();
        }

        currentUser = updatedUser;
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userUpdated"));
        return updatedUser;
      }

      throw new Error(`Failed to update user: server responded with status ${res?.status}`);
    } catch (err: any) {
      if (err?.request && !err?.response) {
        const url = err?.config?.url || `/api/user/${encodeURIComponent(id)}`;
        console.error("Network/CORS error when calling updateUser", { url, err });
        throw new Error(
          `Network Error: no response from server for PUT ${url}. Check backend is running, REACT_APP_API_URL/proxy, and server CORS (preflight) settings. (${err.message})`
        );
      }

      const url = err?.config?.url || `/api/user/${encodeURIComponent(id)}`;
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message;
      console.error("Update user failed", { url, status, serverMsg });
      throw new Error(`Update failed: ${serverMsg} (url: ${url}, status: ${status})`);
    }
  },

  placeOrder: async (orderData: any) => {
    const response = await apiClient.post("/api/order", orderData);
    return response.data;
  },

  getOrderById: async (orderId: string | number): Promise<Order> => {
    const response = await apiClient.get(`/api/order/${orderId}`);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await apiClient.get("/api/order/my-orders");
    return response.data;
  },

  async logout(): Promise<void> {
    // try server-side logout if available
    try {
      await apiClient.post("/api/user/logout");
    } catch (e) {
      // ignore if endpoint doesn't exist
    }

    currentToken = null;
    currentUser = null;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    delete apiClient.defaults.headers.Authorization;

    window.dispatchEvent(new Event("userLoggedOut"));
  },

  getCurrentUser(): User | null {
    if (currentUser) return currentUser;

    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        return currentUser;
      } catch (e) {
        return null;
      }
    }

    return null;
  },

  getToken(): string | null {
    if (currentToken) return currentToken;
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      currentToken = storedToken;
      return storedToken;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
