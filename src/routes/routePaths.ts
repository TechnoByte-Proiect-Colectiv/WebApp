export const ROUTES = {
  HOME: "/",

  // Products
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:slug",

  // Cart & Checkout
  CART: "/cart",
  CHECKOUT: "/checkout",

  // User Account (protected)
  ACCOUNT: "/account",
  SETTINGS: "/account/edit", 
  ORDER: "/order/:id",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",

  SELLER: "/seller/:slug",

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
  productDetail: (slug: string) => `/products/${slug}`,
  category: (categoryName: string) => `/category/${categoryName}`,
  resetPassword: (token: string) => `/reset-password/${token}`,
  seller: (slug: string) => `/seller/${slug}`,
  order: (id: string) => `/order/${id}`,
};
