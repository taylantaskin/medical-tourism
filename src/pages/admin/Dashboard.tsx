import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Building2, Users, TrendingUp, Clock, Eye } from 'lucide-react';
import { api, type ApplicationResponse } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';

interface Stats {
    clinics: number;
    applications: number;
    totalPatients: number;
    countries: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentApplications, setRecentApplications] = useState<ApplicationResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, applicationsRes] = await Promise.all([
                api.getStats(),
                api.getApplications()
            ]);

            setStats(statsRes.data);
            setRecentApplications(applicationsRes.data.slice(0, 10));
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'contacted':
                return 'bg-blue-100 text-blue-800';
            case 'in_progress':
                return 'bg-purple-100 text-purple-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <Link
                                to="/admin/applications"
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                <Eye className="w-4 h-4" />
                                View
                            </Link>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.applications || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            <span className="text-green-600">↑ 12%</span> from last month
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                            <Link
                                to="/admin/clinics"
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                                <Eye className="w-4 h-4" />
                                View
                            </Link>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Partner Clinics</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.clinics || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Active partnerships</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {stats?.totalPatients.toLocaleString() || 0}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Across all clinics</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Countries Served</p>
                        <p className="text-3xl font-bold text-gray-900">{stats?.countries || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Global reach</p>
                    </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                        <Link
                            to="/admin/applications"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>

                    {recentApplications.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No applications yet
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Treatment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {recentApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{app.name}</p>
                                                <p className="text-sm text-gray-500">{app.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 capitalize">
                          {app.treatment.replace('_', ' ')}
                        </span>
                                        </td>
                                        <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(app.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}