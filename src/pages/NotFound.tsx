import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-white mb-4">404</h1>
                    <div className="flex items-center justify-center gap-2 text-blue-200 mb-8">
                        <Search className="w-6 h-6" />
                        <p className="text-2xl">Page Not Found</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
                    <p className="text-xl text-blue-100 mb-6">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-blue-200">
                        Don't worry, let's get you back on track.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 bg-blue-500/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-blue-500/40 transition font-semibold border border-white/20"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-blue-200 mb-4 text-sm">Quick Links:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/services" className="text-blue-100 hover:text-white transition">
                            Services
                        </Link>
                        <Link to="/clinics" className="text-blue-100 hover:text-white transition">
                            Clinics
                        </Link>
                        <Link to="/about" className="text-blue-100 hover:text-white transition">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-blue-100 hover:text-white transition">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}