'use client'

import { useEffect, useState } from 'react'
import { Search, Mail, Phone, Calendar, ShieldCheck, MoreVertical } from 'lucide-react'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

function OwnerRow({ owner }) {
    const joinedDate = new Date(owner.createdAt || Date.now()).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })
    
    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                        {owner.name?.charAt(0).toUpperCase() || 'O'}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                            {owner.name}
                            {owner.isVerified && <ShieldCheck size={14} className="text-blue-500" />}
                        </p>
                        <p className="text-xs text-gray-500">Owner ID: {owner._id?.slice(-6)}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {owner.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        {owner.phone || 'N/A'}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{owner.totalHostels || 0} Hostels</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Active Listings</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {joinedDate}
                </div>
            </td>
            <td className="px-6 py-4 text-right whitespace-nowrap">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                    <MoreVertical size={18} />
                </button>
            </td>
        </tr>
    )
}

export default function AllOwnersPage() {
    const user = useAuthStore(state => state.user)
    const [owners, setOwners] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchOwners() {
            try {
                if (user?.id === 'admin_mock_id') {
                    setOwners([
                        { _id: '1', name: 'Ali Ahmed', email: 'ali@example.com', phone: '0300-1234567', totalHostels: 5, isVerified: true, createdAt: '2023-10-01' },
                        { _id: '2', name: 'Sarah Khan', email: 'sarah@example.com', phone: '0321-7654321', totalHostels: 2, isVerified: true, createdAt: '2023-11-15' },
                        { _id: '3', name: 'Zainab Bibi', email: 'zainab@example.com', phone: '0345-1122334', totalHostels: 1, isVerified: false, createdAt: '2024-01-20' },
                        { _id: '4', name: 'Usman Ghani', email: 'usman@example.com', phone: '0312-9876543', totalHostels: 3, isVerified: true, createdAt: '2023-08-05' },
                    ])
                    setLoading(false)
                    return
                }

                const res = await api.get('/admin/owners')
                setOwners(res.data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchOwners()
    }, [user])

    const filteredOwners = owners.filter(o => 
        o.name?.toLowerCase().includes(search.toLowerCase()) || 
        o.email?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Owners Directory</h1>
                <p className="text-gray-500 mt-1">Manage and communicate with all registered hostel owners.</p>
            </header>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Contact Details</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Portfolio</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Joined Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        {Array(5).fill(0).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-50 rounded animate-pulse w-full" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : filteredOwners.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No owners found in the directory.
                                    </td>
                                </tr>
                            ) : (
                                filteredOwners.map(owner => (
                                    <OwnerRow key={owner._id} owner={owner} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
