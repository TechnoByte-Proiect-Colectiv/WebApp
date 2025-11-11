import { Category } from "../types/product/category";
import { ProductType } from "../types/product/product";

export const categories: Category[] = [
  { id: 1, name: 'Electronics', slug: 'elect' },
  { id: 2, name: 'Fashion', slug: 'fashion' },
  { id: 3, name: 'Home & Kitchen', slug: 'home_and_kitchen' },
  { id: 4, name: 'Books & Media', slug: 'books_and_media' },
];

interface ProductTemplate {
  name: string;
  categoryIds: number[]; 
}

const productTemplates: ProductTemplate[] = [
  // Laptopuri
  { name: 'Laptop ASUS ROG Strix G15', categoryIds: [1, 5] },
  { name: 'Laptop Dell XPS 13', categoryIds: [1] },
  { name: 'MacBook Pro 14" M3', categoryIds: [1] },
  { name: 'Laptop Lenovo ThinkPad X1', categoryIds: [1] },
  { name: 'Laptop HP Pavilion Gaming', categoryIds: [1, 5] },
  
  // Telefoane
  { name: 'iPhone 15 Pro Max', categoryIds: [2] },
  { name: 'Samsung Galaxy S24 Ultra', categoryIds: [2] },
  { name: 'Google Pixel 8 Pro', categoryIds: [2] },
  { name: 'OnePlus 12', categoryIds: [2] },
  { name: 'Xiaomi 14 Pro', categoryIds: [2] },
  
  // Tablete
  { name: 'iPad Pro 12.9"', categoryIds: [3] },
  { name: 'Samsung Galaxy Tab S9', categoryIds: [3] },
  { name: 'Microsoft Surface Pro 9', categoryIds: [3, 1] },
  { name: 'Lenovo Tab P12', categoryIds: [3] },
  
  // Periferice
  { name: 'Mouse Logitech MX Master 3S', categoryIds: [4, 10] },
  { name: 'Tastatură Keychron K2', categoryIds: [4, 10] },
  { name: 'Căști Sony WH-1000XM5', categoryIds: [6, 10] },
  { name: 'Webcam Logitech Brio 4K', categoryIds: [4, 10] },
  { name: 'Monitor LG UltraGear 27"', categoryIds: [12, 5] },
  { name: 'Monitor Samsung Odyssey G7', categoryIds: [12, 5] },
  
  // Stocare & Accesorii
  { name: 'SSD Samsung 990 Pro 2TB', categoryIds: [11, 9] },
  { name: 'Hard Disk WD Black 4TB', categoryIds: [11, 9] },
  { name: 'Hub USB-C Anker 7-in-1', categoryIds: [10, 4] },
  { name: 'Încărcător Anker GaN 100W', categoryIds: [10] },
  { name: 'Powerbank Xiaomi 20000mAh', categoryIds: [10] },
  
  // Gaming
  { name: 'PlayStation 5', categoryIds: [5] },
  { name: 'Xbox Series X', categoryIds: [5] },
  { name: 'Nintendo Switch OLED', categoryIds: [5] },
  { name: 'Controller Xbox Elite', categoryIds: [5, 4] },
  { name: 'Headset HyperX Cloud III', categoryIds: [5, 6, 4] },
  
  // Smart Home
  { name: 'Amazon Echo Dot 5', categoryIds: [7, 6] },
  { name: 'Google Nest Hub Max', categoryIds: [7] },
  { name: 'Philips Hue Starter Kit', categoryIds: [7] },
  { name: 'Ring Video Doorbell', categoryIds: [7] },
  { name: 'TP-Link Smart Plug', categoryIds: [7, 10] },
  
  // Audio
  { name: 'Boxe Edifier R1280T', categoryIds: [6] },
  { name: 'Soundbar JBL Bar 5.1', categoryIds: [6] },
  { name: 'Microfon Blue Yeti', categoryIds: [6, 4] },
  { name: 'Interfață Audio Focusrite Scarlett', categoryIds: [6, 4] },
  
  // Networking
  { name: 'Router ASUS RT-AX86U', categoryIds: [8] },
  { name: 'Mesh WiFi TP-Link Deco', categoryIds: [8] },
  { name: 'Switch Gigabit Netgear', categoryIds: [8, 10] },
  
  // Componente PC
  { name: 'Placă Video RTX 4070', categoryIds: [9, 5] },
  { name: 'Procesor AMD Ryzen 7 7800X3D', categoryIds: [9] },
  { name: 'Placă de Bază MSI B650', categoryIds: [9] },
  { name: 'RAM Corsair Vengeance 32GB', categoryIds: [9] },
  { name: 'Cooler CPU Noctua NH-D15', categoryIds: [9, 10] },
];

// Funcție pentru a genera prețuri realiste
function generatePrice(productName: string): number {
  const name = productName.toLowerCase();
  
  if (name.includes('macbook') || name.includes('iphone 15 pro')) {
    return Math.floor(Math.random() * 3000) + 5000;
  } else if (name.includes('laptop') || name.includes('playstation') || name.includes('xbox')) {
    return Math.floor(Math.random() * 4000) + 2500;
  } else if (name.includes('monitor') || name.includes('tablet') || name.includes('ipad')) {
    return Math.floor(Math.random() * 2000) + 1500;
  } else if (name.includes('telefon') || name.includes('samsung galaxy') || name.includes('pixel')) {
    return Math.floor(Math.random() * 3000) + 2000;
  } else if (name.includes('rtx') || name.includes('procesor') || name.includes('ryzen')) {
    return Math.floor(Math.random() * 2500) + 1500;
  } else if (name.includes('ssd') || name.includes('ram') || name.includes('hard disk')) {
    return Math.floor(Math.random() * 800) + 300;
  } else if (name.includes('mouse') || name.includes('tastatură') || name.includes('hub')) {
    return Math.floor(Math.random() * 400) + 150;
  } else if (name.includes('căști') || name.includes('headset') || name.includes('microfon')) {
    return Math.floor(Math.random() * 800) + 300;
  } else {
    return Math.floor(Math.random() * 500) + 100;
  }
}

// Funcție pentru a genera URL de imagine placeholder
function generateImageUrl(productName: string): string {
  return `https://picsum.photos/seed/${productName.replace(/\s+/g, '-')}/400/400`;
}

// Funcție pentru a obține categoriile bazate pe ID-uri
function getCategoriesByIds(categoryIds: number[]): Category[] {
  return categories.filter(cat => categoryIds.includes(cat.id));
}

// Funcție pentru a adăuga categorii random suplimentare (0-2 categorii extra)
function addRandomCategories(existingCategories: Category[]): Category[] {
  const extraCategoriesCount = Math.floor(Math.random() * 3); // 0, 1 sau 2 categorii extra
  
  if (extraCategoriesCount === 0) {
    return existingCategories;
  }
  
  const existingIds = existingCategories.map(cat => cat.id);
  const availableCategories = categories.filter(cat => !existingIds.includes(cat.id));
  
  const shuffled = [...availableCategories].sort(() => Math.random() - 0.5);
  const randomCategories = shuffled.slice(0, extraCategoriesCount);
  
  return [...existingCategories, ...randomCategories];
}

// Generator principal de produse mock
export function generateMockProducts(count?: number): ProductType[] {
  console.log("called generate mock")
  const productsToGenerate = count || productTemplates.length;
  const products: ProductType[] = [];
  
  for (let i = 0; i < productsToGenerate && i < productTemplates.length; i++) {
    const template = productTemplates[i];
    const baseCategories = getCategoriesByIds(template.categoryIds);
    const finalCategories = addRandomCategories(baseCategories);
    
    products.push({
      id: (i + 1).toString(),
      name: template.name,
      price: generatePrice(template.name),
      currency: 'RON',
      image: generateImageUrl(template.name),
      categories: finalCategories,
    });
  }
  
  return products;
}

// Export array pre-generat
export const mockProducts: ProductType[] = generateMockProducts();

// Funcții helper

export function getRandomProduct(): ProductType {
  return mockProducts[Math.floor(Math.random() * mockProducts.length)];
}

export function getRandomProducts(count: number): ProductType[] {
  const shuffled = [...mockProducts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getProductById(id: string): ProductType | undefined {
  return mockProducts.find(product => product.id === id);
}

export function searchProducts(query: string): ProductType[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery)
  );
}

// Funcții helper pentru categorii

export function getProductsByCategory(categoryId: number): ProductType[] {
  return mockProducts.filter(product => 
    product.categories.some(cat => cat.id === categoryId)
  );
}

export function getProductsByCategorySlug(slug: string): ProductType[] {
  return mockProducts.filter(product => 
    product.categories.some(cat => cat.slug === slug)
  );
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}