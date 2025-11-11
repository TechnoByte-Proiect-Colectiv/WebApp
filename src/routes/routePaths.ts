export const ROUTES = {
    HOME: '/',
    TESTING: '/testing_cart_list',
    
    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CATEGORY: '/category/:categoryName',
    SEARCH: '/search',
    
    // Cart & Checkout
    CART: '/cart',
    CHECKOUT: '/checkout',
    
    // User Account (protected)
    ACCOUNT: '/account',
    PROFILE: '/account/profile',
    ORDERS: '/account/orders',
    ORDER_DETAIL: '/account/orders/:orderId',
    WISHLIST: '/account/wishlist',
    ADDRESSES: '/account/addresses',
    
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
    
    // Static pages
    ABOUT: '/about',
    CONTACT: '/contact',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    
    // Admin (protected)
    ADMIN: '/admin',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_USERS: '/admin/users',
    
    // Error
    NOT_FOUND: '*',
    FORBIDDEN: '/forbidden',
  } as const;

  export const generatePath = {
    productDetail: (id: string) => `/products/${id}`,
    category: (categoryName: string) => `/category/${categoryName}`,
    orderDetail: (orderId: string) => `/account/orders/${orderId}`,
    resetPassword: (token: string) => `/reset-password/${token}`,
  };
  