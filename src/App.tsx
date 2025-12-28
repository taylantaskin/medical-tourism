import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Clinics from './pages/Clinics';
import ClinicDetail from './pages/ClinicDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminApplications from './pages/admin/Applications';
import AdminClinics from './pages/admin/Clinics';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/services" element={<Layout><Services /></Layout>} />
                    <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
                    <Route path="/clinics" element={<Layout><Clinics /></Layout>} />
                    <Route path="/clinics/:id" element={<Layout><ClinicDetail /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />

                    {/* Admin routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/applications"
                        element={
                            <ProtectedRoute>
                                <AdminApplications />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/clinics"
                        element={
                            <ProtectedRoute>
                                <AdminClinics />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;