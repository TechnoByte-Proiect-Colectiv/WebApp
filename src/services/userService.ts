import { Address } from "../types/user/address";
import { AuthResponse, LoginCredentials, SignUpCredentials, User } from "../types/user/user";

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    type: "billing",
    firstName: "Ion",
    lastName: "Popescu",
    street: "Bulevardul Unirii nr. 10, Bl. 5, Sc. A, Ap. 12",
    city: "București",
    county: "Sector 3",
    postalCode: "030000",
    country: "România",
    phoneNumber: "+40 722 123 456",
    isPrimary: true,
  },
  {
    id: "addr-2",
    type: "shipping",
    firstName: "Ion Popescu (Birou)",
    lastName: "",
    street: "Calea Floreasca 100",
    city: "București",
    county: "Sector 1",
    postalCode: "014444",
    country: "România",
    phoneNumber: "+40 722 123 456",
    isPrimary: false,
  },
  {
    id: "addr-3",
    type: "shipping",
    firstName: "Maria",
    lastName: "Ionescu",
    street: "Strada Memorandumului 21",
    city: "Cluj-Napoca",
    county: "Cluj",
    postalCode: "400114",
    country: "România",
    phoneNumber: "+40 733 987 654",
    isPrimary: false,
  },
];

export const mockUser: User = {
  id: "user-101",
  name: "Ion Popescu",
  email: "user@example.com",
  role: "user",
  avatar: "https://i.pravatar.cc/150?u=ionpopescu",
  phone: "+40 722 123 456",
  createdAt: "2023-01-15T10:00:00Z",
  addresses: mockAddresses,
};

// Mock database
const mockUsers: Record<string, { password: string; user: User }> = {
  "user@example.com": {
    password: "password123",
    user: mockUser,
  },
};

// Mock token storage
let currentToken: string | null = null;
let currentUser: User | null = null;

export const userService = {
  /**
   * Login with email and password
   * Mock credentials:
   * - Email: user@example.com, Password: password123
   * - Email: demo@example.com, Password: demo123
   */

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = mockUsers[credentials.email];

    if (!mockUser || mockUser.password !== credentials.password) {
      throw new Error("Invalid email or password");
    }

    const token = `token_${Date.now()}_${Math.random()}`;
    currentToken = token;
    currentUser = mockUser.user;

    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(mockUser.user));

    return {
      user: mockUser.user,
      token,
    };
  },

  /**
   * Sign up with new user credentials
   */
  async signup(credentials: SignUpCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!credentials.name || !credentials.email || !credentials.password) {
      throw new Error("All fields are required");
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (credentials.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      throw new Error("Invalid email format");
    }

    if (mockUsers[credentials.email]) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: credentials.name,
      email: credentials.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`,
      createdAt: new Date().toISOString(),
      role: "user",
      addresses: [],
    };

    mockUsers[credentials.email] = {
      password: credentials.password,
      user: newUser,
    };

    const token = `token_${Date.now()}_${Math.random()}`;
    currentToken = token;
    currentUser = newUser;

    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return {
      user: newUser,
      token,
    };
  },

  async updateUser(updatedData: Partial<User>): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!currentUser) {
      throw new Error("Niciun utilizator nu este autentificat.");
    }

    const updatedUser = { ...currentUser, ...updatedData };

    if (mockUsers[updatedUser.email]) {
      mockUsers[updatedUser.email].user = updatedUser;
    } 

    currentUser = updatedUser;
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    window.dispatchEvent(new Event('userUpdated'));

    return updatedUser;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    currentToken = null;
    currentUser = null;

    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser(): User | null {
    if (currentUser) return currentUser;

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        return currentUser;
      } catch {
        return null;
      }
    }

    return null;
  },

  /**
   * Get the current auth token
   */
  getToken(): string | null {
    if (currentToken) return currentToken;

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      currentToken = storedToken;
      return storedToken;
    }

    return null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Get mock credentials for demo
   */
  getMockCredentials() {
    return [
      { email: "user@example.com", password: "password123" },
      { email: "demo@example.com", password: "demo123" },
    ];
  },
};
