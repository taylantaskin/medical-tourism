import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp, CheckCircle2, Phone, Mail } from 'lucide-react';
import { services } from '../data/services';

export default function ServiceDetail() {
    const { slug } = useParams<{ slug: string }>();
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    // Price formatting - extract first price from range
    const getStartingPrice = () => {
        if (service.price) {
            return `€${service.price.min.toLocaleString()}`;
        }
        return '€1,500';
    };



    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-blue-200 mb-4 text-sm">
                        <Link to="/services" className="hover:text-white transition-colors">
                            Services
                        </Link>
                        <span>/</span>
                        <span>{service.title}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-blue-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                <span className="text-sm font-semibold">Premium Treatment</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {service.title}
                            </h1>

                            <p className="text-xl text-blue-100 mb-8">
                                {service.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                                >
                                    Get Free Quote
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="tel:+905551234567"
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
                                        <Clock className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                                        <p className="text-sm text-blue-200 mb-1">Duration</p>
                                        <p className="text-lg font-bold">{service.duration}</p>
                                    </div>

                                    <div className="text-center">
                                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                                        <p className="text-sm text-blue-200 mb-1">Recovery</p>
                                        <p className="text-lg font-bold">{service.recovery}</p>
                                    </div>

                                    <div className="col-span-2 pt-6 border-t border-white/20">
                                        <p className="text-sm text-blue-200 mb-2 text-center">Starting Price</p>
                                        <p className="text-4xl font-bold text-center">{getStartingPrice()}</p>
                                        <p className="text-sm text-blue-200 text-center mt-2">All-inclusive package</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Treatment Overview
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-600">
                                <p className="mb-4">
                                    {service.fullDescription}
                                </p>
                            </div>
                        </div>

                        {/* Key Benefits */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Key Benefits
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 bg-blue-50 rounded-lg p-4"
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What's Included */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                What's Included in the Package
                            </h2>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-8">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        'Free consultation',
                                        'Airport transfers',
                                        'Hotel accommodation',
                                        'All medical procedures',
                                        'Post-op medications',
                                        'Follow-up care',
                                        'Translator service',
                                        'Medical certificates'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Process Timeline */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Treatment Process
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { step: '1', title: 'Free Consultation', desc: 'Discuss your needs with our medical team' },
                                    { step: '2', title: 'Treatment Plan', desc: 'Receive a personalized treatment plan and quote' },
                                    { step: '3', title: 'Travel Arrangements', desc: 'We handle all logistics and accommodations' },
                                    { step: '4', title: 'Procedure', desc: 'Expert surgeons perform your treatment' },
                                    { step: '5', title: 'Recovery & Follow-up', desc: 'Comprehensive aftercare and support' }
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
                            <h3 className="text-xl font-bold mb-4">Get Started Today</h3>
                            <p className="text-blue-100 mb-6">
                                Contact us for a free consultation and personalized treatment plan
                            </p>

                            <Link
                                to="/contact"
                                className="block w-full bg-white text-blue-600 text-center px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold mb-3"
                            >
                                Request Free Quote
                            </Link>

                            <div className="space-y-3 pt-4 border-t border-blue-500">
                                <a
                                    href="tel:+905551234567"
                                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>+90 555 123 4567</span>
                                </a>
                                <a
                                    href="mailto:info@turkhealth.com"
                                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>info@turkhealth.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Why Choose TurkHealth?
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { icon: '🏥', text: 'JCI-accredited facilities' },
                                    { icon: '👨‍⚕️', text: 'Board-certified surgeons' },
                                    { icon: '💰', text: 'All-inclusive packages' },
                                    { icon: '🌍', text: '24/7 multilingual support' },
                                    { icon: '✈️', text: 'Complete travel assistance' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Related Treatments
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {services
                            .filter(s => s.slug !== service.slug)
                            .slice(0, 3)
                            .map((relatedService) => (
                                <Link
                                    key={relatedService.slug}
                                    to={`/services/${relatedService.slug}`}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                                        {relatedService.slug === 'hair-transplant' && '💇'}
                                        {relatedService.slug === 'dental-implants' && '🦷'}
                                        {relatedService.slug === 'cosmetic-surgery' && '✨'}
                                        {relatedService.slug === 'eye-surgery' && '👁️'}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {relatedService.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {relatedService.shortDescription}
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                        <span>Learn More</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}