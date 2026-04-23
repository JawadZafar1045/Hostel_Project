'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Building2, Eye, Trash2, MoreHorizontal } from 'lucide-react'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

function HostelRow({ hostel }) {
    const price = hostel.price?.toLocaleString() || '—'
    const statusColors = {
        approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        rejected: 'bg-red-50 text-red-700 border-red-100'
    }

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{hostel.title}</p>
                        <p className="text-xs text-gray-500">{hostel.city}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-gray-600 text-sm font-medium whitespace-nowrap">{hostel.owner?.name || '—'}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[hostel.status] || 'bg-gray-50 text-gray-600'}`}>
                    {hostel.status}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap">Rs. {price}</td>
            <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{hostel.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-indigo-600 transition-all border border-transparent hover:border-gray-100">
                        <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-red-600 transition-all border border-transparent hover:border-gray-100">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function AllHostelsPage() {
    const user = useAuthStore(state => state.user)
    const [hostels, setHostels] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        async function fetchHostels() {
            try {
                if (user?.id === 'admin_mock_id') {
                    setHostels([
                        { _id: '1', title: 'Iqbal Hostel', owner: { name: 'Ali Ahmed' }, city: 'Lahore', type: 'boys', price: 15000, status: 'approved' },
                        { _id: '2', title: 'Fatima Jinnah Hall', owner: { name: 'Sarah Khan' }, city: 'Karachi', type: 'girls', price: 18000, status: 'pending' },
                        { _id: '3', title: 'Green View Residency', owner: { name: 'Zainab Bibi' }, city: 'Islamabad', type: 'girls', price: 25000, status: 'rejected' },
                        { _id: '4', title: 'Al-Huda Boys', owner: { name: 'Usman Ghani' }, city: 'Lahore', type: 'boys', price: 12000, status: 'approved' },
                    ])
                    setLoading(false)
                    return
                }

                const res = await api.get('/admin/hostels')
                setHostels(res.data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchHostels()
    }, [user])

    const filteredHostels = hostels.filter(h => {
        const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || h.status === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Hostels</h1>
                    <p className="text-gray-500 mt-1">Manage and monitor all hostel listings across the platform.</p>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search hostels or cities..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="text-gray-400" size={18} />
                    <select 
                        className="flex-1 md:flex-none bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-purple-100 text-gray-600 cursor-pointer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Hostel</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Monthly Rent</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        {Array(6).fill(0).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-50 rounded animate-pulse w-full" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : filteredHostels.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No hostels found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredHostels.map(hostel => (
                                    <HostelRow key={hostel._id} hostel={hostel} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
