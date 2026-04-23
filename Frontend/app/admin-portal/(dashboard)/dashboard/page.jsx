'use client'

import { useEffect, useState } from 'react'
import { Building2, Users, Clock, CheckCircle2 } from 'lucide-react'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

function StatCard({ label, value, IconComponent, color, bg, loading }) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 bg-gray-50 rounded animate-pulse w-3/4" />
                    <div className="h-6 bg-gray-50 rounded animate-pulse w-1/2" />
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`${bg} ${color} p-3.5 rounded-xl shrink-0`}>
                <IconComponent size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value !== undefined && value !== null ? value : '—'}</p>
            </div>
        </div>
    )
}

function PendingRow({ hostel, actionRows, onApprove, onReject }) {
    const isActing = !!actionRows[hostel._id]
    const actingStatus = actionRows[hostel._id]
    const ownerName = hostel.owner?.name || '—'
    const price = hostel.price?.toLocaleString() || '—'
    const date = new Date(hostel.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{hostel.title}</td>
            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{ownerName}</td>
            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{hostel.city}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hostel.type === 'boys' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                    {hostel.type}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">Rs. {price}</td>
            <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{date}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onApprove(hostel._id)}
                        disabled={isActing}
                        className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50 transition-all shadow-sm shadow-green-100"
                    >
                        {actingStatus === 'approving' ? '...' : 'Approve'}
                    </button>
                    <button
                        onClick={() => onReject(hostel._id)}
                        disabled={isActing}
                        className="px-4 py-1.5 rounded-lg border border-red-100 bg-white text-red-600 text-xs font-semibold hover:bg-red-50 disabled:opacity-50 transition-all"
                    >
                        {actingStatus === 'rejecting' ? '...' : 'Reject'}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function DashboardPage() {
    const user = useAuthStore(state => state.user)
    const [stats, setStats] = useState(null)
    const [pending, setPending] = useState([])
    const [statsLoading, setStatsLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(true)
    const [error, setError] = useState('')
    const [actionRows, setActionRows] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                // Mock data for initial dev
                if (user?.id === 'admin_mock_id') {
                    setStats({ totalOwners: 24, totalHostels: 56, pendingApprovals: 2, approvedHostels: 51 })
                    setPending([
                        { _id: '1', title: 'Boys Hostel A block', owner: { name: 'John Doe' }, city: 'Lahore', type: 'boys', price: 15000, createdAt: new Date().toISOString() },
                        { _id: '2', title: 'Girls Comfort', owner: { name: 'Jane Smith' }, city: 'Islamabad', type: 'girls', price: 22000, createdAt: new Date().toISOString() }
                    ])
                    setStatsLoading(false)
                    setTableLoading(false)
                    return
                }

                const [statsRes, pendingRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/hostels/pending?limit=10')
                ])
                setStats(statsRes.data.data)
                setPending(pendingRes.data.data)
            } catch (err) {
                setError('Failed to load dashboard data. Please refresh.')
                console.error(err)
            } finally {
                setStatsLoading(false)
                setTableLoading(false)
            }
        }
        fetchData()
    }, [user])

    const handleApprove = async (id) => {
        setActionRows(prev => ({ ...prev, [id]: 'approving' }))
        try {
            await api.patch(`/admin/hostels/${id}/approve`)
            setPending(prev => prev.filter(h => h._id !== id))
            setStats(prev => prev ? ({ ...prev, pendingApprovals: prev.pendingApprovals - 1, approvedHostels: prev.approvedHostels + 1 }) : prev)
        } catch (err) {
            alert('Failed to approve')
        } finally {
            setActionRows(prev => { const n = { ...prev }; delete n[id]; return n })
        }
    }

    const handleReject = async (id) => {
        setActionRows(prev => ({ ...prev, [id]: 'rejecting' }))
        try {
            await api.patch(`/admin/hostels/${id}/reject`)
            setPending(prev => prev.filter(h => h._id !== id))
            setStats(prev => prev ? ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }) : prev)
        } catch (err) {
            alert('Failed to reject')
        } finally {
            setActionRows(prev => { const n = { ...prev }; delete n[id]; return n })
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 mt-1">Quick summary of the platform performance.</p>
            </header>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Owners" value={stats?.totalOwners} IconComponent={Users} color="text-blue-600" bg="bg-blue-50" loading={statsLoading} />
                <StatCard label="Total Hostels" value={stats?.totalHostels} IconComponent={Building2} color="text-indigo-600" bg="bg-indigo-50" loading={statsLoading} />
                <StatCard label="Pending Review" value={stats?.pendingApprovals} IconComponent={Clock} color="text-amber-600" bg="bg-amber-50" loading={statsLoading} />
                <StatCard label="Active Listings" value={stats?.approvedHostels} IconComponent={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" loading={statsLoading} />
            </div>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
                        <p className="text-sm text-gray-500 mt-0.5">New hostel submissions requiring verification.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Hostel</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">City</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Price</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Submitted</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tableLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        {Array(7).fill(0).map((_, j) => (
                                            <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-50 rounded animate-pulse w-full" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : pending.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No pending approvals at the moment.
                                    </td>
                                </tr>
                            ) : (
                                pending.map(hostel => (
                                    <PendingRow
                                        key={hostel._id}
                                        hostel={hostel}
                                        actionRows={actionRows}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
