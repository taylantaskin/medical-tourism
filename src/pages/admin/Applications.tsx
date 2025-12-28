import { useEffect, useState } from 'react';
import { Search, Filter, X, Mail, Phone, Clock, Eye } from 'lucide-react';
import { api, type ApplicationResponse } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';

export default function Applications() {
    const [applications, setApplications] = useState<ApplicationResponse[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<ApplicationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedApp, setSelectedApp] = useState<ApplicationResponse | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        filterApplications();
    }, [applications, searchTerm, statusFilter]);

    const fetchApplications = async () => {
        try {
            const response = await api.getApplications();
            setApplications(response.data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterApplications = () => {
        let filtered = applications;

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        // Search by name or email
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(app =>
                app.name.toLowerCase().includes(term) ||
                app.email.toLowerCase().includes(term)
            );
        }

        setFilteredApplications(filtered);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            // TODO: Create update endpoint
            // await api.updateApplicationStatus(id, newStatus);

            // For now, update locally
            setApplications(prev =>
                prev.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                )
            );
        } catch (error) {
            console.error('Failed to update status:', error);
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statuses = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-600 mt-1">Manage patient consultation requests</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                {statuses.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active filters */}
                    {(searchTerm || statusFilter !== 'all') && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                            <span className="text-sm text-gray-500">Active filters:</span>
                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                  Search: {searchTerm}
                                    <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
                            )}
                            {statusFilter !== 'all' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm capitalize">
                  Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {statuses.slice(1).map(status => {
                        const count = applications.filter(app => app.status === status.value).length;
                        return (
                            <div key={status.value} className="bg-white rounded-lg p-4 border border-gray-100">
                                <p className="text-sm text-gray-600 mb-1">{status.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading applications...</p>
                        </div>
                    ) : filteredApplications.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No applications found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Patient
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{app.name}</p>
                                                <div className="flex flex-col gap-1 mt-1">
                                                    <a href={`mailto:${app.email}`} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {app.email}
                                                    </a>
                                                    <a href={`tel:${app.phone}`} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {app.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 capitalize">
                          {app.treatment.replace('_', ' ')}
                        </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={app.status}
                                                onChange={(e) => updateStatus(app.id, e.target.value)}
                                                className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(app.status)}`}
                                            >
                                                {statuses.slice(1).map(status => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(app.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p className="text-gray-900 mt-1">{selectedApp.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900 mt-1">{selectedApp.email}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="text-gray-900 mt-1">{selectedApp.phone}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Country</label>
                                    <p className="text-gray-900 mt-1">{selectedApp.country}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Treatment</label>
                                    <p className="text-gray-900 mt-1 capitalize">{selectedApp.treatment.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Message</label>
                                <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedApp.message}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Submitted</label>
                                <p className="text-gray-900 mt-1">{formatDate(selectedApp.createdAt)}</p>
                            </div>
                        </div>

                        <div className="p-6 border-t flex gap-3">
                            <a
                                href={`mailto:${selectedApp.email}`}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Send Email
                            </a>
                            <a
                                href={`tel:${selectedApp.phone}`}
                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
                            >
                                Call Patient
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}