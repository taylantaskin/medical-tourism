import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, CheckCircle, ArrowRight, Building2, Award, Shield } from 'lucide-react';
import { api, type ClinicFromAPI } from '../services/api';

export default function Clinics() {
    const [clinics, setClinics] = useState<ClinicFromAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchClinics();
    }, [filter]);

    const fetchClinics = async () => {
        try {
            setLoading(true);
            const params = filter !== 'all' ? { specialty: filter } : undefined;
            const response = await api.getClinics(params);
            setClinics(response.data);
        } catch (err) {
            setError('Failed to load clinics. Please try again.');
            console.error('Error fetching clinics:', err);
        } finally {
            setLoading(false);
        }
    };

    const specialtyMap: Record<string, string> = {
        hair: 'Hair Transplant',
        dental: 'Dental Care',
        cosmetic: 'Cosmetic Surgery',
        eye: 'Eye Surgery',
    };

    const filters = [
        { value: 'all', label: 'All Clinics' },
        { value: 'hair', label: 'Hair Transplant' },
        { value: 'dental', label: 'Dental' },
        { value: 'cosmetic', label: 'Cosmetic' },
        { value: 'eye', label: 'Eye Surgery' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-cyan-300 mb-6">
            <Building2 className="w-4 h-4" />
            JCI-Accredited Partner Clinics
          </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Our Partner{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Clinics
            </span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-3xl mx-auto mb-8">
                        Carefully selected, internationally accredited medical facilities with proven track records of excellence
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2 text-white/80">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span>JCI Accredited</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span>Expert Specialists</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-5 h-5 text-cyan-400" />
                            <span>Verified Reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                                    filter === f.value
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clinics Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading clinics...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchClinics}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : clinics.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-600 text-lg">No clinics found for this specialty.</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {clinics.length} Premium {filter !== 'all' ? specialtyMap[filter] : ''} Clinics
                                </h2>
                                <p className="text-gray-600">All clinics are verified and internationally accredited</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {clinics.map((clinic) => (
                                    <Link
                                        key={clinic.id}
                                        to={`/clinics/${clinic.id}`}
                                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                                    >
                                        {/* Clinic Image/Placeholder */}
                                        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            {clinic.imageUrl ? (
                                                <img
                                                    src={clinic.imageUrl}
                                                    alt={clinic.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Building2 className="w-16 h-16 text-white/80" />
                                            )}
                                            {clinic.featured && (
                                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    Featured
                                                </div>
                                            )}
                                            {clinic.verified && (
                                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verified
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {clinic.name}
                                            </h3>

                                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">
                          {clinic.city}, {clinic.country}
                        </span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {clinic.description}
                                            </p>

                                            {/* Specialties */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {clinic.specialties.map((specialty) => (
                                                    <span
                                                        key={specialty}
                                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                                                    >
                            {specialtyMap[specialty] || specialty}
                          </span>
                                                ))}
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                    <span className="font-bold text-gray-900">{clinic.rating}</span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {clinic.totalPatients.toLocaleString()}+ patients
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="mt-4 pt-4 border-t">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-3">
                                                        <a
                                                            href={`tel:${clinic.phone}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-blue-600 hover:text-blue-700"
                                                        >
                                                            <Phone className="w-5 h-5" />
                                                        </a>
                                                        <a
                                                            href={`mailto:${clinic.email}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-blue-600 hover:text-blue-700"
                                                        >
                                                            <Mail className="w-5 h-5" />
                                                        </a>
                                                    </div>
                                                    <span className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Contact us and we'll help you find the perfect clinic for your needs
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                    >
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}