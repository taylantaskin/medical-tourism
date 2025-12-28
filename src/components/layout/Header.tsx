import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Services', href: '/services' },
        { name: 'Clinics', href: '/clinics' },
        { name: 'About Us', href: '/about' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            {/* Top bar */}
            <div className="bg-blue-600 text-white py-2">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-6">
                            <a href="tel:+905551234567" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Phone size={16} />
                                <span className="hidden sm:inline">+90 555 123 4567</span>
                            </a>
                            <a href="mailto:info@turkhealth.com" className="flex items-center gap-2 hover:opacity-80 transition">
                                <Mail size={16} />
                                <span className="hidden md:inline">info@turkhealth.com</span>
                            </a>
                        </div>
                        <div className="text-xs hidden md:block">
                            Save up to 70% on medical treatments
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="text-3xl group-hover:scale-110 transition-transform">
                            🏥
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">
                                TurkHealth
                            </div>
                            <div className="text-xs text-gray-500 -mt-1">
                                Medical Tourism
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`transition font-medium ${
                                    isActive(item.href)
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/contact"
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                        >
                            <Phone size={18} />
                            Free Consultation
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t pt-4">
                        <nav className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`transition font-medium py-2 ${
                                        isActive(item.href)
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Phone size={18} />
                                Free Consultation
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}