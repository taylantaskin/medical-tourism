import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Building2, Award, Globe } from 'lucide-react';

// Data
const treatments = [
    {
        name: 'Hair Transplant',
        slug: 'hair-transplant',
        description: 'Natural-looking results with FUE technique',
        price: '$1,500',
        icon: Users,
    },
    {
        name: 'Dental Implants',
        slug: 'dental-implants',
        description: 'Premium implants with lifetime warranty',
        price: '$450',
        icon: Award,
    },
    {
        name: 'Cosmetic Surgery',
        slug: 'cosmetic-surgery',
        description: 'Rhinoplasty, liposuction, and more',
        price: '$2,500',
        icon: Building2,
    },
    {
        name: 'Eye Surgery',
        slug: 'eye-surgery',
        description: 'LASIK and cataract surgery',
        price: '$1,200',
        icon: Globe,
    },
];

const benefits = [
    {
        title: 'Cost Savings',
        description: 'Save up to 70% compared to US and European prices without compromising quality.',
        icon: CheckCircle2,
    },
    {
        title: 'Expert Doctors',
        description: 'Board-certified surgeons with international training and years of experience.',
        icon: Award,
    },
    {
        title: 'Modern Facilities',
        description: 'JCI-accredited hospitals with state-of-the-art technology and equipment.',
        icon: Building2,
    },
    {
        title: 'All-Inclusive Packages',
        description: 'Treatment, accommodation, transfers, and translator services included.',
        icon: Globe,
    },
    {
        title: 'No Waiting Time',
        description: 'Get your treatment scheduled within days, not months.',
        icon: CheckCircle2,
    },
    {
        title: 'Easy Travel',
        description: 'Visa-free entry for many countries and excellent flight connections.',
        icon: Globe,
    },
];

const testimonials = [
    {
        name: 'John Smith',
        location: 'United States',
        treatment: 'Hair Transplant',
        text: 'Amazing experience! The doctors were professional, the clinic was spotless, and the results exceeded my expectations. I highly recommend Turkey for hair transplants.',
    },
    {
        name: 'Maria Garcia',
        location: 'Spain',
        treatment: 'Dental Implants',
        text: 'I got 6 dental implants at a fraction of the price back home. The quality is outstanding and the staff made me feel comfortable throughout the process.',
    },
    {
        name: 'Ahmed Al-Rashid',
        location: 'Saudi Arabia',
        treatment: 'Eye Surgery',
        text: 'My LASIK surgery was perfect. Within 24 hours I had 20/20 vision. The doctors explained everything clearly and the follow-up care was excellent.',
    },
];

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            World-Class Medical Care in Turkey
                        </h1>
                        <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                            Affordable, safe, and high-quality medical treatments with expert doctors and modern facilities
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Explore Treatments
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors border-2 border-white/20"
                            >
                                Get Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-10 border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">50K+</div>
                            <div className="text-gray-600 font-medium">Happy Patients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">200+</div>
                            <div className="text-gray-600 font-medium">Expert Doctors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">50+</div>
                            <div className="text-gray-600 font-medium">Partner Clinics</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">100+</div>
                            <div className="text-gray-600 font-medium">Countries Served</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Treatment Cards */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            Popular Medical Treatments
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Discover our most sought-after procedures with world-class quality at competitive prices
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {treatments.map((treatment) => (
                            <Link
                                key={treatment.slug}
                                to={`/services/${treatment.slug}`}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                            >
                                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <treatment.icon className="h-20 w-20 text-white" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {treatment.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        {treatment.description}
                                    </p>
                                    <div className="text-blue-600 font-semibold text-lg mb-2">
                                        From {treatment.price}
                                    </div>
                                    <div className="flex items-center text-blue-600 font-medium">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            Why Choose Turkey for Medical Tourism?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Combining exceptional medical expertise with affordable prices and hospitality
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <benefit.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            What Our Patients Say
                        </h2>
                        <p className="text-xl text-gray-600">
                            Real stories from real patients who transformed their lives
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-8">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t pt-4">
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                                    <div className="text-sm text-blue-600 mt-1">{testimonial.treatment}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Ready to Start Your Medical Journey?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                        Get a free consultation and personalized treatment plan from our expert team
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
