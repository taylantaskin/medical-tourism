const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Types
interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    message?: string;
    error?: string;
}

export interface ClinicFromAPI {
    id: string;
    name: string;
    slug: string;
    city: string;
    country: string;
    address: string | null;
    specialties: string[];
    phone: string;
    email: string;
    website: string | null;
    rating: number;
    commission: number;
    description: string;
    imageUrl: string | null;
    logoUrl: string | null;
    featured: boolean;
    active: boolean;
    verified: boolean;
    totalPatients: number;
    createdAt: string;
    updatedAt: string;
}

export interface ApplicationData {
    name: string;
    email: string;
    phone: string;
    country?: string;
    age?: number;
    treatment: string;
    message: string;
    budget?: string;
    urgency?: string;
}

export interface ApplicationResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    age?: number;
    treatment: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

// API Service
class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Generic fetch wrapper
    private async fetch<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...options?.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Health check
    async healthCheck() {
        return this.fetch<{ status: string; message: string }>('/health');
    }

    // Clinics
    async getClinics(params?: {
        specialty?: string;
        city?: string;
        featured?: boolean;
    }) {
        const queryParams = new URLSearchParams();
        if (params?.specialty) queryParams.append('specialty', params.specialty);
        if (params?.city) queryParams.append('city', params.city);
        if (params?.featured) queryParams.append('featured', 'true');

        const query = queryParams.toString();
        return this.fetch<ClinicFromAPI[]>(`/api/clinics${query ? `?${query}` : ''}`);
    }

    async getClinic(id: string) {
        return this.fetch<ClinicFromAPI>(`/api/clinics/${id}`);
    }

    async createClinic(data: Partial<ClinicFromAPI>) {
        return this.fetch<ClinicFromAPI>('/api/clinics', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateClinic(id: string, data: Partial<ClinicFromAPI>) {
        return this.fetch<ClinicFromAPI>(`/api/clinics/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteClinic(id: string) {
        return this.fetch<ClinicFromAPI>(`/api/clinics/${id}`, {
            method: 'DELETE',
        });
    }

    // Applications
    async submitApplication(data: ApplicationData) {
        return this.fetch<ApplicationResponse>('/api/applications', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getApplications(params?: { status?: string; treatment?: string }) {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append('status', params.status);
        if (params?.treatment) queryParams.append('treatment', params.treatment);

        const query = queryParams.toString();
        return this.fetch<ApplicationResponse[]>(`/api/applications${query ? `?${query}` : ''}`);
    }

    // Stats
    async getStats() {
        return this.fetch<{
            clinics: number;
            applications: number;
            totalPatients: number;
            countries: number;
        }>('/api/stats');
    }

    // Auth
    async login(email: string, password: string) {
        return this.fetch<{
            token: string;
            user: {
                id: string;
                email: string;
                name: string | null;
                role: string;
            };
        }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async getCurrentUser() {
        return this.fetch<{
            id: string;
            email: string;
            name: string | null;
            role: string;
            active: boolean;
            createdAt: string;
            lastLogin: string | null;
        }>('/api/auth/me');
    }
}

// Export singleton instance
export const api = new ApiService(API_BASE_URL);

// Export default
export default api;