import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, X, CheckCircle, Star, MapPin } from 'lucide-react';
import { api, type ClinicFromAPI } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminClinics() {
    const [clinics, setClinics] = useState<ClinicFromAPI[]>([]);
    const [filteredClinics, setFilteredClinics] = useState<ClinicFromAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingClinic, setEditingClinic] = useState<ClinicFromAPI | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        city: '',
        country: 'Turkey',
        address: '',
        specialties: [] as string[],
        phone: '',
        email: '',
        website: '',
        description: '',
        featured: false,
        verified: false
    });

    const specialtyOptions = [
        { value: 'hair', label: 'Hair Transplant' },
        { value: 'dental', label: 'Dental Care' },
        { value: 'cosmetic', label: 'Cosmetic Surgery' },
        { value: 'eye', label: 'Eye Surgery' }
    ];

    useEffect(() => {
        fetchClinics();
    }, []);

    useEffect(() => {
        filterClinics();
    }, [clinics, searchTerm]);

    const fetchClinics = async () => {
        try {
            const response = await api.getClinics();
            setClinics(response.data);
        } catch (error) {
            console.error('Failed to fetch clinics:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterClinics = () => {
        if (!searchTerm) {
            setFilteredClinics(clinics);
            return;
        }

        const term = searchTerm.toLowerCase();
        setFilteredClinics(
            clinics.filter(clinic =>
                clinic.name.toLowerCase().includes(term) ||
                clinic.city.toLowerCase().includes(term)
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingClinic) {
                await api.updateClinic(editingClinic.id, formData);
            } else {
                await api.createClinic(formData);
            }

            await fetchClinics();
            resetForm();
        } catch (error) {
            console.error('Failed to save clinic:', error);
            alert('Failed to save clinic');
        }
    };

    const handleEdit = (clinic: ClinicFromAPI) => {
        setEditingClinic(clinic);
        setFormData({
            name: clinic.name,
            slug: clinic.slug,
            city: clinic.city,
            country: clinic.country,
            address: clinic.address || '',
            specialties: clinic.specialties,
            phone: clinic.phone,
            email: clinic.email,
            website: clinic.website || '',
            description: clinic.description,
            featured: clinic.featured,
            verified: clinic.verified
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteClinic(id);
            await fetchClinics();
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Failed to delete clinic:', error);
            alert('Failed to delete clinic');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            city: '',
            country: 'Turkey',
            address: '',
            specialties: [],
            phone: '',
            email: '',
            website: '',
            description: '',
            featured: false,
            verified: false
        });
        setEditingClinic(null);
        setShowForm(false);
    };

    const handleSpecialtyToggle = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Clinics</h1>
                        <p className="text-gray-600 mt-1">Manage partner clinics</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Add Clinic
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Clinics Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading clinics...</p>
                    </div>
                ) : filteredClinics.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <p className="text-gray-500">No clinics found</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClinics.map((clinic) => (
                            <div
                                key={clinic.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {clinic.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="w-4 h-4" />
                                            {clinic.city}, {clinic.country}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {clinic.featured && (
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        )}
                                        {clinic.verified && (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {clinic.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {clinic.specialties.map((specialty) => (
                                        <span
                                            key={specialty}
                                            className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs capitalize"
                                        >
                      {specialty}
                    </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <button
                                        onClick={() => handleEdit(clinic)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(clinic.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>

                                {!clinic.active && (
                                    <div className="mt-2 text-xs text-red-600 text-center">
                                        Inactive
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl max-w-2xl w-full my-8">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingClinic ? 'Edit Clinic' : 'Add New Clinic'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Clinic Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (!editingClinic) {
                                                setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Slug *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Specialties *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {specialtyOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleSpecialtyToggle(option.value)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                                formData.specialties.includes(option.value)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Featured</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.verified}
                                        onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Verified</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    {editingClinic ? 'Update' : 'Create'} Clinic
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Clinic?</h3>
                        <p className="text-gray-600 mb-6">
                            This will deactivate the clinic. Are you sure?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}