// productGenerator.ts

import { Category } from "../types/product/category";
import { ProductType } from "../types/product/product";

// --- 1. CONFIGURARE DATE MOCK ---

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Fashion", slug: "fashion" },
  { id: 3, name: "Home & Garden", slug: "home-garden" },
  { id: 4, name: "Sports", slug: "sports" },
];

const ADJECTIVES = ["Premium", "Wireless", "Elegant", "Durable", "Compact", "Smart", "Luxury", "Vintage"];
const NOUNS = ["Headphones", "Watch", "Sneakers", "Lamp", "Backpack", "Monitor", "Coffee Maker", "Desk"];
const SELLERS = ["TechWorld", "UrbanStyle", "HomeDepotClone", "Sportify", "GadgetHub"];

// --- 2. FUNCȚII UTILITARE (HELPERS) ---

const getRandomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomItem = <T>(arr: T[]): T => 
  arr[Math.floor(Math.random() * arr.length)];

const generateSlug = (text: string) => 
  text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + getRandomInt(100, 999);

const generatePrice = () => {
  // Returnează un preț gen 99.99 sau 150.00
  const base = getRandomInt(10, 2000);
  return parseFloat(`${base}.${getRandomInt(0, 99) < 50 ? "00" : "99"}`);
};

// Generează specificații random în funcție de categorie (simplificat)
const generateSpecs = (categoryName: string): Record<string, string>[] => {
  // 1. Definim explicit tipul pentru commonSpecs
  const commonSpecs: Record<string, string>[] = [
    { "Warranty": "2 Years" }, 
    { "Origin": "EU" }
  ];
  
  if (categoryName === "Electronics") {
    // 2. Când returnăm, facem cast la întregul array sau definim obiectele noi explicit
    const electronicsSpecs: Record<string, string>[] = [
      ...commonSpecs,
      { "Battery Life": `${getRandomInt(4, 24)} hours` },
      { "Connectivity": "Bluetooth 5.0" }
    ];
    return electronicsSpecs;

  } else if (categoryName === "Fashion") {
    const fashionSpecs: Record<string, string>[] = [
      ...commonSpecs,
      { "Material": getRandomItem(["Cotton", "Polyester", "Leather"]) },
      { "Size": getRandomItem(["S", "M", "L", "XL"]) }
    ];
    return fashionSpecs;
  }
  
  // Default return
  const defaultSpecs: Record<string, string>[] = [
    ...commonSpecs, 
    { "Color": getRandomItem(["Black", "White", "Blue", "Red"]) }
  ];
  return defaultSpecs;
};

// --- 3. FUNCȚIA PRINCIPALĂ DE GENERARE ---

export const generateProducts = (count: number): ProductType[] => {
  return Array.from({ length: count }).map((_, index) => {
    // 1. Alegem o categorie random
    const category = getRandomItem(MOCK_CATEGORIES);
    
    // 2. Construim numele
    const name = `${getRandomItem(ADJECTIVES)} ${getRandomItem(NOUNS)}`;
    
    // 3. Alegem un seller random
    const sellerName = getRandomItem(SELLERS);

    return {
      id: `prod-${Date.now()}-${index}`, // ID unic
      name: name,
      slug: generateSlug(name),
      description: `This is a high-quality ${name} suitable for everyone. Featuring top-notch materials and design.`,
      price: generatePrice(),
      currency: "RON",
      stock: getRandomInt(0, 50), // 0 stoc = out of stock
      // Folosim picsum pentru imagini random, cu un seed bazat pe index pentru consistență
      image: `https://picsum.photos/seed/${index + 100}/400/400`, 
      category: category,
      seller: {
        name: sellerName,
        slug: generateSlug(sellerName),
      },
      specifications: generateSpecs(category.name),
      // Rating între 3.5 și 5.0
      rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)), 
    };
  });
};