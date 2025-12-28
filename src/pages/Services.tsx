import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, CheckCircle, Sparkles, Heart, Eye, Smile, Star, Shield, Award } from 'lucide-react';
import { services } from '../data/services';
import type { ReactNode } from 'react';

export default function Services() {
    const iconMap: Record<string, ReactNode> = {
        'User': <Sparkles className="w-8 h-8" />,
        'Heart': <Heart className="w-8 h-8" />,
        'Eye': <Eye className="w-8 h-8" />,
        'Sparkles': <Smile className="w-8 h-8" />,
    };

    const colorMap: Record<string, string> = {
        'hair-transplant': 'from-violet-500 to-purple-600',
        'dental-implants': 'from-cyan-500 to-blue-600',
        'cosmetic-surgery': 'from-rose-500 to-pink-600',
        'eye-surgery': 'from-emerald-500 to-teal-600',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-cyan-300 mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        World-Class Medical Treatments
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Our Medical{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Services
                        </span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-3xl mx-auto mb-8">
                        Explore our comprehensive range of medical treatments performed by internationally
                        trained surgeons using cutting-edge technology.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2 text-white/80">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span>JCI Accredited</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span>Expert Surgeons</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-5 h-5 text-cyan-400" />
                            <span>Save up to 70%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Gradient Side */}
                                    <div className={`md:w-1/3 h-48 md:h-auto bg-gradient-to-br ${colorMap[service.slug] || 'from-blue-500 to-indigo-600'} p-8 flex flex-col justify-between relative overflow-hidden`}>
                                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                        <div className="relative z-10 text-white">
                                            {iconMap[service.icon] || <Sparkles className="w-8 h-8" />}
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-white/80 text-sm mb-1">Starting from</div>
                                            <div className="text-3xl font-bold text-white">
                                                €{service.price.min.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="md:w-2/3 p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 line-clamp-2">
                                            {service.shortDescription}
                                        </p>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm">{service.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{service.recovery} recovery</span>
                                            </div>
                                        </div>

                                        {/* Benefits Preview */}
                                        <div className="space-y-2 mb-6">
                                            {service.benefits.slice(0, 3).map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="line-clamp-1">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                            Learn More
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Turkey Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                            Why Turkey?
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            The World's Leading Destination for{' '}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                Medical Tourism
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Turkey ranks 4th globally in medical tourism, attracting over 1.5 million
                            international patients annually with world-class healthcare at affordable prices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                number: '70%',
                                title: 'Cost Savings',
                                description: 'Save significantly compared to US, UK, and EU prices without compromising quality.',
                                color: 'from-blue-500 to-indigo-600'
                            },
                            {
                                number: '48+',
                                title: 'JCI Accredited Hospitals',
                                description: 'More JCI-accredited hospitals than any European country.',
                                color: 'from-green-500 to-emerald-600'
                            },
                            {
                                number: '98%',
                                title: 'Success Rate',
                                description: 'Industry-leading success rates across all major procedures.',
                                color: 'from-purple-500 to-pink-600'
                            }
                        ].map((stat, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all text-center">
                                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}>
                                    {stat.number}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                                <p className="text-gray-600">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        Ready to Start Your Treatment Journey?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Get a free consultation and personalized treatment plan from our medical experts.
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