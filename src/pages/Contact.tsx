import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        treatment: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const treatments = [
        'Hair Transplant',
        'Dental Implants',
        'Cosmetic Surgery',
        'Eye Surgery (LASIK)',
        'Other'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        console.log('📤 SUBMITTING FORM...');
        console.log('📋 Form Data:', formData);

        try {
            // Send request to backend via API service layer
            console.log('🌐 Calling Backend API...');
            await api.submitApplication(formData);

            console.log('✅ Backend responded successfully!');
            console.log('🎉 Form submitted successfully!');

            // Clear form and show success screen if successful
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                treatment: '',
                message: ''
            });
        } catch (err) {
            console.error('❌ Error occurred:', err);
            // Show user-friendly error message
            const errorMessage = err instanceof Error
                ? err.message
                : 'Failed to send application. Please try again.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
            console.log('🏁 Form submission process completed');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">Thank You!</h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Your consultation request has been received. Our medical team will contact you within 24 hours.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Back to Home
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        );
    }

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
                        Free Consultation
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Get in{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
                        Ready to start your health journey? Fill out the form below and our medical
                        experts will get back to you within 24 hours with a personalized treatment plan.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-8">
                                    Have questions? Our team is here to help you 24/7. Reach out through any channel.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <Phone className="w-5 h-5" />,
                                        title: 'Phone',
                                        value: '+90 555 123 4567',
                                        href: 'tel:+905551234567',
                                        color: 'bg-green-500'
                                    },
                                    {
                                        icon: <Mail className="w-5 h-5" />,
                                        title: 'Email',
                                        value: 'info@Clinikverde.com',
                                        href: 'mailto:info@Clinikverde.com',
                                        color: 'bg-blue-500'
                                    },
                                    {
                                        icon: <MapPin className="w-5 h-5" />,
                                        title: 'Location',
                                        value: 'Istanbul, Turkey',
                                        href: '#',
                                        color: 'bg-purple-500'
                                    },
                                    {
                                        icon: <Clock className="w-5 h-5" />,
                                        title: 'Working Hours',
                                        value: '24/7 Support',
                                        href: '#',
                                        color: 'bg-orange-500'
                                    }
                                ].map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
                                    >
                                        <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{item.title}</div>
                                            <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href="https://wa.me/905551234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Free Consultation</h2>
                                <p className="text-gray-600 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="treatment" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Interested Treatment *
                                            </label>
                                            <select
                                                id="treatment"
                                                name="treatment"
                                                value={formData.treatment}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                                            >
                                                <option value="">Select a treatment</option>
                                                {treatments.map((treatment) => (
                                                    <option key={treatment} value={treatment}>
                                                        {treatment}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                            placeholder="Tell us about your situation and any questions you have..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-semibold text-red-800">Error</p>
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-sm text-gray-500">
                                        By submitting this form, you agree to our{' '}
                                        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Quick answers to common questions about our services.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: 'How quickly will I receive a response?',
                                answer: 'Our medical team responds to all inquiries within 24 hours. For urgent matters, you can reach us directly via WhatsApp for immediate assistance.'
                            },
                            {
                                question: 'Is the consultation really free?',
                                answer: 'Yes! Your initial consultation is completely free with no obligations. We\'ll provide a detailed treatment plan and cost estimate tailored to your needs.'
                            },
                            {
                                question: 'What information should I prepare?',
                                answer: 'Please have your medical history, any relevant test results or imaging, and photos if applicable. This helps us provide the most accurate assessment.'
                            },
                            {
                                question: 'Do you help with travel arrangements?',
                                answer: 'Absolutely! We offer all-inclusive packages that include airport transfers, hotel accommodation, and 24/7 support throughout your stay in Turkey.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}