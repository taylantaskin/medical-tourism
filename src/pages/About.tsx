import { Link } from 'react-router-dom';
import { Globe, Target, Heart, Shield, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Patient-First Approach',
            description: 'Your health and comfort are our top priorities. We provide personalized care every step of the way.',
            color: 'bg-rose-500'
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Quality & Safety',
            description: 'We partner only with JCI-accredited hospitals and board-certified surgeons.',
            color: 'bg-blue-500'
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: 'Excellence',
            description: 'We strive for the highest standards in everything we do, from treatment to aftercare.',
            color: 'bg-yellow-500'
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: 'Accessibility',
            description: 'Making world-class healthcare accessible to everyone, regardless of location.',
            color: 'bg-green-500'
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Happy Patients' },
        { number: '200+', label: 'Expert Doctors' },
        { number: '50+', label: 'Partner Clinics' },
        { number: '100+', label: 'Countries Served' }
    ];

    const team = [
        {
            name: 'Dr. Michael Smith',
            role: 'Chief Medical Officer',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
            specialty: 'Hair Transplant Specialist'
        },
        {
            name: 'Dr. Sarah Johnson',
            role: 'Head of Dental Surgery',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
            specialty: 'Prosthodontics Expert'
        },
        {
            name: 'Dr. David Miller',
            role: 'Plastic Surgery Director',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face',
            specialty: 'Rhinoplasty Specialist'
        },
        {
            name: 'Dr. Emily Anderson',
            role: 'Ophthalmology Head',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face',
            specialty: 'LASIK Expert'
        }
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
                        <Sparkles className="w-4 h-4" />
                        Trusted by 50,000+ Patients Worldwide
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        About{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Clinikverde
                        </span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
                        We're on a mission to make world-class healthcare accessible to everyone,
                        connecting patients with the best medical facilities in Turkey.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-12 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                                Our Story
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Bridging the Gap Between{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Quality & Affordability
                                </span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in Istanbul, Clinikverde was born from a simple observation:
                                    world-class medical care shouldn't be limited by geography or cost.
                                    We saw patients struggling with long waiting lists and prohibitive
                                    prices in their home countries, while Turkey offered the same quality
                                    at a fraction of the cost.
                                </p>
                                <p>
                                    Today, we've helped over 50,000 patients from 100+ countries receive
                                    life-changing treatments. From hair transplants to complex surgeries,
                                    our network of JCI-accredited hospitals and board-certified surgeons
                                    delivers outcomes that exceed expectations.
                                </p>
                                <p>
                                    But we're more than just a medical tourism company. We're your partners
                                    in health, handling everything from your first consultation to your
                                    final follow-up, so you can focus on what matters most—your recovery.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop"
                                    alt="Modern hospital"
                                    className="rounded-2xl shadow-lg"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop"
                                    alt="Medical team"
                                    className="rounded-2xl shadow-lg mt-8"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop"
                                    alt="Surgery room"
                                    className="rounded-2xl shadow-lg"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop"
                                    alt="Patient care"
                                    className="rounded-2xl shadow-lg mt-8"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
                                <div className="text-3xl font-bold">Since 2018</div>
                                <div className="text-blue-100">Transforming Lives</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                            <div className="absolute -right-5 -bottom-5 w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-blue-100 leading-relaxed">
                                    To make world-class medical care accessible to everyone by connecting
                                    patients with Turkey's finest healthcare providers, ensuring exceptional
                                    outcomes at affordable prices while providing comprehensive support
                                    throughout their medical journey.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                            <div className="absolute -right-5 -bottom-5 w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                    <Sparkles className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-purple-100 leading-relaxed">
                                    To become the world's most trusted medical tourism platform, setting
                                    the gold standard for patient care, transparency, and medical excellence.
                                    We envision a future where quality healthcare knows no borders.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                            Our Values
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            What Drives Us Every Day
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Our core values guide every decision we make and every patient we serve.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all text-center"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${value.color} text-white mb-6`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                            Expert Team
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Medical Experts
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our team of internationally trained specialists delivers exceptional results.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="group">
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.specialty}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        Ready to Experience World-Class Care?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Join thousands of satisfied patients who trusted us with their health journey.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                    >
                        Start Your Journey
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}