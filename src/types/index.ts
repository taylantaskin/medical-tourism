export interface Service {
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    price: {
        min: number;
        max: number;
        currency: string;
    };
    duration: string;
    recovery: string;
    icon: string;
    image: string;
}

export interface Clinic {
    id: string;
    name: string;
    location: string;
    description: string;
    services: string[];
    accreditations: string[];
    contactEmail: string;
    contactPhone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Application {
    id: string;
    name: string;
    email: string;
    phone: string;
    treatment: string;
    message: string;
    status: 'pending' | 'contacted' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt?: Date;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    createdAt?: Date;
}