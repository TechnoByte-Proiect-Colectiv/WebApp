export const ROUTES = {
  HOME: "/",

  // Products
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",

  // Cart & Checkout
  CART: "/cart",
  CHECKOUT: "/checkout",

  // User Account (protected)
  ACCOUNT: "/account",
  SETTINGS: "/account/edit", 

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Static pages
  ABOUT: "/about",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",

  // Admin (protected)
  ADMIN: "/admin",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_USERS: "/admin/users",

  // Error
  NOT_FOUND: "*",
  FORBIDDEN: "/forbidden",
} as const;

export const generatePath = {
  productDetail: (id: string) => `/products/${id}`,
  category: (categoryName: string) => `/category/${categoryName}`,
  orderDetail: (orderId: string) => `/account/orders/${orderId}`,
  resetPassword: (token: string) => `/reset-password/${token}`,
};
