import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-3xl">🏥</span>
                            TurkHealth
                        </div>
                        <p className="text-sm mb-4">
                            Your trusted partner for medical tourism in Turkey. Quality healthcare at affordable prices.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-white transition" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-white transition" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/services" className="hover:text-white transition">Our Services</Link></li>
                            <li><Link to="/clinics" className="hover:text-white transition">Partner Clinics</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                            <li><Link to="/admin/login" className="hover:text-white transition text-gray-500">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Popular Treatments</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/services/hair-transplant" className="hover:text-white transition">Hair Transplant</Link></li>
                            <li><Link to="/services/dental-implants" className="hover:text-white transition">Dental Implants</Link></li>
                            <li><Link to="/services/cosmetic-surgery" className="hover:text-white transition">Cosmetic Surgery</Link></li>
                            <li><Link to="/services/eye-surgery" className="hover:text-white transition">Eye Surgery</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span>Istanbul, Turkey</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={18} />
                                <a href="tel:+905551234567" className="hover:text-white transition">
                                    +90 555 123 4567
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} />
                                <a href="mailto:info@turkhealth.com" className="hover:text-white transition">
                                    info@turkhealth.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>&copy; {currentYear} TurkHealth. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );

}
