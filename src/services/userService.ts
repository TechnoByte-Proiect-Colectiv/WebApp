import { AuthResponse, LoginCredentials, SignUpCredentials, User } from "../types/user/user";

// Mock database
const mockUsers: Record<string, { password: string; user: User }> = {
  "user@example.com": {
    password: "password123",
    user: {
      id: "1",
      name: "John Doe",
      email: "user@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  "demo@example.com": {
    password: "demo123",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "demo@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
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
    // Simulate network delay
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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validation
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

    // Check if user already exists
    if (mockUsers[credentials.email]) {
      throw new Error("Email already registered");
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: credentials.name,
      email: credentials.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`,
    };

    // Add to mock database
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
    // Simulează întârziere rețea
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!currentUser) {
      throw new Error("Niciun utilizator nu este autentificat.");
    }

    // Îmbină datele vechi cu cele noi
    const updatedUser = { ...currentUser, ...updatedData };

    // Actualizează "baza de date" mock
    if (mockUsers[updatedUser.email]) {
      mockUsers[updatedUser.email].user = updatedUser;
    } 

    // Actualizează starea locală și localStorage
    currentUser = updatedUser;
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    window.dispatchEvent(new Event('userUpdated'));

    return updatedUser;
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    // Simulate network delay
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

    // Try to restore from localStorage
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

    // Try to restore from localStorage
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
