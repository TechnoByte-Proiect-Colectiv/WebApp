export interface Address {
    id: string;
    type: 'billing' | 'shipping';
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    county: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    isPrimary: boolean;
}