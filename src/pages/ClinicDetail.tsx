import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Globe, CheckCircle, ArrowRight, Award, Users } from 'lucide-react';
import { api, type ClinicFromAPI } from '../services/api';

export default function ClinicDetail() {
    const { id } = useParams<{ id: string }>();
    const [clinic, setClinic] = useState<ClinicFromAPI | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchClinic(id);
        }
    }, [id]);

    const fetchClinic = async (clinicId: string) => {
        try {
            setLoading(true);
            const response = await api.getClinic(clinicId);
            setClinic(response.data);
        } catch (err) {
            setError('Failed to load clinic details.');
            console.error('Error fetching clinic:', err);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading clinic details...</p>
                </div>
            </div>
        );
    }

    if (error || !clinic) {
        return <Navigate to="/clinics" replace />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-blue-200 mb-4 text-sm">
                        <Link to="/clinics" className="hover:text-white transition-colors">
                            Clinics
                        </Link>
                        <span>/</span>
                        <span>{clinic.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            {clinic.featured && (
                                <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full mb-4 font-bold text-sm">
                                    ⭐ Featured Clinic
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {clinic.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-200" />
                                    <span className="text-xl text-blue-100">
                    {clinic.city}, {clinic.country}
                  </span>
                                </div>
                            </div>

                            <p className="text-xl text-blue-100 mb-8">
                                {clinic.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                                >
                                    Book Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href={`tel:${clinic.phone}`}
                                    className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-blue-500/40 transition-colors font-semibold"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Now
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400 fill-current" />
                                        <p className="text-sm text-blue-200 mb-1">Rating</p>
                                        <p className="text-3xl font-bold">{clinic.rating}</p>
                                    </div>

                                    <div className="text-center">
                                        <Users className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                                        <p className="text-sm text-blue-200 mb-1">Patients</p>
                                        <p className="text-3xl font-bold">{clinic.totalPatients.toLocaleString()}</p>
                                    </div>

                                    {clinic.verified && (
                                        <div className="col-span-2 pt-6 border-t border-white/20 text-center">
                                            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                                            <p className="text-sm text-blue-200 mb-1">Status</p>
                                            <p className="text-lg font-bold">Verified & Accredited</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Clinic</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {clinic.description}
                            </p>
                        </div>

                        {/* Specialties */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Specialties</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {clinic.specialties.map((specialty) => (
                                    <div
                                        key={specialty}
                                        className="flex items-center gap-3 bg-blue-50 rounded-lg p-4"
                                    >
                                        <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">
                      {specialtyMap[specialty] || specialty}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why Choose */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose {clinic.name}?</h2>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-8">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        'JCI-accredited facility',
                                        'International standards',
                                        'Experienced medical team',
                                        'Modern equipment',
                                        'Multilingual staff',
                                        'Comprehensive aftercare',
                                        'Competitive pricing',
                                        'High success rates'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Patient Journey */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Journey With Us</h2>
                            <div className="space-y-4">
                                {[
                                    { step: '1', title: 'Initial Contact', desc: 'Reach out to us with your inquiry' },
                                    { step: '2', title: 'Consultation', desc: 'Get expert medical advice and treatment plan' },
                                    { step: '3', title: 'Planning', desc: 'We arrange everything - flights, accommodation, transfers' },
                                    { step: '4', title: 'Treatment', desc: 'Receive world-class medical care' },
                                    { step: '5', title: 'Follow-up', desc: 'Comprehensive aftercare and support' }
                                ].map((item) => (
                                    <div
                                        key={item.step}
                                        className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 sticky top-6">
                            <h3 className="text-xl font-bold mb-4">Contact Information</h3>

                            <div className="space-y-4 mb-6">
                                <a
                                    href={`tel:${clinic.phone}`}
                                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>{clinic.phone}</span>
                                </a>
                                <a
                                    href={`mailto:${clinic.email}`}
                                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{clinic.email}</span>
                                </a>
                                {clinic.website && (
                                    <a
                                        href={clinic.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                                    >
                                        <Globe className="w-5 h-5" />
                                        <span>Visit Website</span>
                                    </a>
                                )}
                                <div className="flex items-start gap-3 text-blue-100">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                                    <span>
                    {clinic.address || `${clinic.city}, ${clinic.country}`}
                  </span>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="block w-full bg-white text-blue-600 text-center px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                            >
                                Book Free Consultation
                            </Link>
                        </div>

                        {/* Quick Facts */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-semibold text-gray-900">{clinic.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Rating</span>
                                    <span className="font-semibold text-gray-900">{clinic.rating}/5.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Patients Treated</span>
                                    <span className="font-semibold text-gray-900">{clinic.totalPatients.toLocaleString()}+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-semibold text-green-600">
                    {clinic.verified ? 'Verified ✓' : 'Active'}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}