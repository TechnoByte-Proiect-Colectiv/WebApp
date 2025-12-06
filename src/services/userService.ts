import { Address } from "../types/user/address";
import { Order } from "../types/user/order";
import {
  AuthResponse,
  LoginCredentials,
  SignUpCredentials,
  User,
} from "../types/user/user";

export const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    createdAt: "2025-01-15T10:24:00Z",
    totalProducts: 320,
    totalShipping: 25,
    total: 345,
    currency: "EUR",
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "processed",
    billingAddress: {
      id: "ADDR-2001",
      type: "shipping",
      firstName: "Andrei",
      lastName: "Popescu",
      street: "Str. Lalelelor 12",
      city: "Cluj-Napoca",
      county: "Cluj",
      postalCode: "400100",
      country: "RO",
      phoneNumber: "+40721234567",
      isPrimary: true,
    },
    shippingAddress: {
      id: "ADDR-2001",
      type: "shipping",
      firstName: "Andrei",
      lastName: "Popescu",
      street: "Str. Lalelelor 12",
      city: "Cluj-Napoca",
      county: "Cluj",
      postalCode: "400100",
      country: "RO",
      phoneNumber: "+40721234567",
      isPrimary: true,
    },
    shipments: [
      {
        sellerId: "SELL-1",
        sellerName: "TechStore",
        status: "shipped",
        shippingCost: 25,
        shippingCurrency: "EUR",
        items: [
          {
            productId: "PROD-101",
            productName: "Mouse Wireless Logitech",
            picture: "/img/products/mouse1.jpg",
            quantity: 1,
            unitPrice: 25,
            currency: "EUR",
          },
          {
            productId: "PROD-102",
            productName: "Tastatură mecanică HyperX",
            picture: "/img/products/keyboard1.jpg",
            quantity: 1,
            unitPrice: 70,
            currency: "EUR",
          },
        ],
      },
      {
        sellerId: "SELL-2",
        sellerName: "BobTest",
        status: "processing",
        shippingCost: 10,
        shippingCurrency: "EUR",
        items: [
          {
            productId: "PROD-101",
            productName: "Mouse Wireless Logitech saj as as as as sa as as s",
            picture: "/img/products/mouse1.jpg",
            quantity: 1,
            unitPrice: 25,
            currency: "EUR",
          },
          {
            productId: "PROD-102",
            productName: "Tastatură mecanică HyperX",
            picture: "/img/products/keyboard1.jpg",
            quantity: 1,
            unitPrice: 70,
            currency: "EUR",
          },
        ],
      },
    ],
  },
  {
    id: "ORD-1002",
    createdAt: "2025-02-03T14:58:00Z",
    totalProducts: 150,
    totalShipping: 15,
    total: 165,
    currency: "EUR",
    paymentMethod: "paypal",
    paymentStatus: "pending",
    orderStatus: "awaiting_payment",
    shippingAddress: {
      id: "ADDR-2002",
      type: "billing",
      firstName: "Maria",
      lastName: "Ionescu",
      street: "Bd. Unirii 45",
      city: "București",
      county: "București",
      postalCode: "030102",
      country: "RO",
      phoneNumber: "+40744555666",
      isPrimary: false,
    },
    billingAddress: {
      id: "ADDR-2002",
      type: "billing",
      firstName: "Maria",
      lastName: "Ionescu",
      street: "Bd. Unirii 45",
      city: "București",
      county: "București",
      postalCode: "030102",
      country: "RO",
      phoneNumber: "+40744555666",
      isPrimary: false,
    },
    shipments: [
      {
        sellerId: "SELL-2",
        sellerName: "FashionPoint",
        status: "processing",
        shippingCost: 15,
        shippingCurrency: "EUR",
        items: [
          {
            productId: "PROD-201",
            productName: "Geacă de iarnă",
            picture: "/img/products/jacket1.jpg",
            quantity: 1,
            unitPrice: 120,
            currency: "EUR",
          },
        ],
      },
    ],
  },
  {
    id: "ORD-1003",
    createdAt: "2025-02-20T08:11:00Z",
    totalProducts: 540,
    totalShipping: 30,
    total: 570,
    currency: "EUR",
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    shippingAddress: {
      id: "ADDR-2003",
      type: "shipping",
      firstName: "George",
      lastName: "Marin",
      street: "Str. Pajiștei 8",
      city: "Timișoara",
      county: "Timiș",
      postalCode: "300200",
      country: "RO",
      phoneNumber: "+40732111222",
      isPrimary: true,
    },
    billingAddress: {
      id: "ADDR-2003",
      type: "shipping",
      firstName: "George",
      lastName: "Marin",
      street: "Str. Pajiștei 8",
      city: "Timișoara",
      county: "Timiș",
      postalCode: "300200",
      country: "RO",
      phoneNumber: "+40732111222",
      isPrimary: true,
    },
    shipments: [
      {
        sellerId: "SELL-3",
        sellerName: "Home&Stuff",
        status: "delivered",
        shippingCost: 30,
        shippingCurrency: "EUR",
        items: [
          {
            productId: "PROD-301",
            productName: "Aspirator robot Xiaomi",
            picture: "/img/products/vacuum1.jpg",
            quantity: 1,
            unitPrice: 300,
            currency: "EUR",
          },
          {
            productId: "PROD-302",
            productName: "Purificator de aer Philips",
            picture: "/img/products/airpurifier1.jpg",
            quantity: 1,
            unitPrice: 240,
            currency: "EUR",
          },
        ],
      },
    ],
  },
];

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

const mockUser: User = {
  id: "user-101",
  name: "Ion PopescuUser",
  email: "user@example.com",
  role: "user",
  avatar: "https://picsum.photos/200",
  phone: "+40 722 123 456",
  createdAt: "2023-01-15T10:00:00Z",
  addresses: mockAddresses,
};

const mockSeller: User = {
  id: "seller-101",
  name: "Ion PopescuSeller",
  email: "user@example.com",
  role: "user",
  avatar: "https://picsum.photos/200",
  phone: "+40 722 123 456",
  createdAt: "2023-01-15T10:00:00Z",
  addresses: mockAddresses,
};

const mockAdmin: User = {
  id: "adm-101",
  name: "Ion PopescuAdm",
  email: "user@example.com",
  role: "user",
  avatar: "https://picsum.photos/200",
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


  /**
   * Send reset password email to user
   * @param email email string coresponding to the user
   */
  async resetPassword(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = mockUsers[email];

    if (!mockUser) {
      throw new Error("No user with specified email");
    }
    
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

    window.dispatchEvent(new Event("userUpdated"));

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
