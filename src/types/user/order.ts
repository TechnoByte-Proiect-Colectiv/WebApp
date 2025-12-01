import { Address } from "./address";

export interface OrderShipmentItems {
    // id: string;
    productId: string;
    productName: string; //
    picture: string; //
    quantity: number; //
    unitPrice: number; //
    currency: string; //
}

export interface OrderShipment {
    // id: string;
    sellerId: string; //
    sellerName: string; //
    status: string; 
    shippingCost: number; //
    shippingCurrency: string; //
    items: OrderShipmentItems[];
}

export interface Order {
    id: string; //
    createdAt: string; //
    totalProducts: number;
    totalShipping: number;
    total: number;
    currency: string;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    address: Address;
    shipments: OrderShipment[];  
}