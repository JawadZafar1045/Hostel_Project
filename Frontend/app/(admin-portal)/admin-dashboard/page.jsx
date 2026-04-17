'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Building2, Users, LogOut, Clock, CheckCircle2 } from 'lucide-react'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

const navLinks = [
    { href: '/admin-portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin-portal/hostels', label: 'All Hostels', icon: Building2 },
    { href: '/admin-portal/owners', label: 'All Owners', icon: Users },
]

function SidebarLink({ href, label, IconComponent, active }) {
    var baseClass = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all '
    var activeClass = 'bg-purple-50 text-[#7C3AED]'
    var inactiveClass = 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
    return (
        <a href={href} className={baseClass + (active ? activeClass : inactiveClass)}>
            <IconComponent size={17} />
            {label}
        </a>
    )
}

function AdminLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()
    const logout = useAuthStore(state => state.logout)

    function handleLogout() {
        logout()
        api.post('/auth/logout').catch(function () { }).finally(function () {
            router.push('/admin-login')
        })
    }

    return (
        <div className="min-h-screen flex bg-gray-50">

            <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col">

                <div className="px-6 py-5 border-b border-gray-100">
                    <p className="text-lg font-bold text-[#7C3AED]">HostelVaniya</p>
                    <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
                </div>

                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                    <SidebarLink href="/admin-portal/dashboard" label="Dashboard" IconComponent={LayoutDashboard} active={pathname === '/admin-portal/dashboard'} />
                    <SidebarLink href="/admin-portal/hostels" label="All Hostels" IconComponent={Building2} active={pathname === '/admin-portal/hostels'} />
                    <SidebarLink href="/admin-portal/owners" label="All Owners" IconComponent={Users} active={pathname === '/admin-portal/owners'} />
                </nav>

                <div className="px-3 py-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all"
                    >
                        <LogOut size={17} />
                        Logout
                    </button>
                </div>

            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>

        </div>
    )
}

function StatCard({ label, value, IconComponent, color, bg, loading }) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-100 animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-6 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={bg + ' ' + color + ' p-3 rounded-xl shrink-0'}>
                <IconComponent size={22} />
            </div>
            <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{value !== undefined && value !== null ? value : '—'}</p>
            </div>
        </div>
    )
}

function PendingRow({ hostel, actionRows, onApprove, onReject }) {
    var isActing = actionRows[hostel._id] ? true : false
    var approveLabel = actionRows[hostel._id] === 'approving' ? 'Approving...' : 'Approve'
    var rejectLabel = actionRows[hostel._id] === 'rejecting' ? 'Rejecting...' : 'Reject'
    var ownerName = hostel.owner && hostel.owner.name ? hostel.owner.name : '—'
    var price = hostel.price ? hostel.price.toLocaleString() : '—'
    var date = new Date(hostel.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{hostel.title}</td>
            <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{ownerName}</td>
            <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{hostel.city}</td>
            <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap capitalize">{hostel.type}</td>
            <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">Rs. {price}</td>
            <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{date}</td>
            <td className="px-5 py-3.5 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <button
                        onClick={function () { onApprove(hostel._id) }}
                        disabled={isActing}
                        className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {approveLabel}
                    </button>
                    <button
                        onClick={function () { onReject(hostel._id) }}
                        disabled={isActing}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {rejectLabel}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function AdminDashboardPage() {
    const router = useRouter()
    const user = useAuthStore(state => state.user)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    const [authChecked, setAuthChecked] = useState(false)
    const [stats, setStats] = useState(null)
    const [pending, setPending] = useState([])
    const [statsLoading, setStatsLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(true)
    const [pageError, setPageError] = useState('')
    const [actionRows, setActionRows] = useState({})

    useEffect(function () {
        async function checkAuth() {
            if (user?.id === 'admin_mock_id' && isAuthenticated) {
                setAuthChecked(true)
                return
            }

            try {
                var res = await api.get('/auth/me')
                var fetchedUser = res.data.data.user
                if (fetchedUser.role !== 'admin') {
                    router.replace('/admin-login')
                    return
                }
                setAuthChecked(true)
            } catch (_) {
                router.replace('/admin-login')
            }
        }
        checkAuth()
    }, [router, user, isAuthenticated])

    useEffect(function () {
        if (!authChecked) return
        async function fetchStats() {
            if (user?.id === 'admin_mock_id') {
                setStats({ totalOwners: 24, totalHostels: 56, pendingApprovals: 2, approvedHostels: 51 })
                setStatsLoading(false)
                return
            }

            try {
                var res = await api.get('/admin/stats')
                setStats(res.data.data)
            } catch (_) {
                setPageError('Could not load dashboard data. Refresh to try again.')
            } finally {
                setStatsLoading(false)
            }
        }
        fetchStats()
    }, [authChecked, user])

    useEffect(function () {
        if (!authChecked) return
        async function fetchPending() {
            if (user?.id === 'admin_mock_id') {
                setPending([
                    {
                        _id: 'mock_hostel_1',
                        title: 'Boys Hostel A block',
                        owner: { name: 'John Doe' },
                        city: 'Lahore',
                        type: 'boys',
                        price: 15000,
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: 'mock_hostel_2',
                        title: 'Girls Comfort',
                        owner: { name: 'Jane Smith' },
                        city: 'Islamabad',
                        type: 'girls',
                        price: 22000,
                        createdAt: new Date().toISOString()
                    }
                ])
                setTableLoading(false)
                return
            }

            try {
                var res = await api.get('/admin/hostels/pending?limit=10')
                setPending(res.data.data)
            } catch (_) {
                setPageError('Could not load dashboard data. Refresh to try again.')
            } finally {
                setTableLoading(false)
            }
        }
        fetchPending()
    }, [authChecked, user])

    function handleApprove(hostelId) {
        setActionRows(function (prev) { return Object.assign({}, prev, { [hostelId]: 'approving' }) })
        api.patch('/admin/hostels/' + hostelId + '/approve')
            .then(function () {
                setPending(function (prev) { return prev.filter(function (h) { return h._id !== hostelId }) })
                setStats(function (prev) {
                    if (!prev) return prev
                    return Object.assign({}, prev, {
                        pendingApprovals: prev.pendingApprovals - 1,
                        approvedHostels: prev.approvedHostels + 1,
                    })
                })
            })
            .catch(function () { alert('Failed to approve. Please try again.') })
            .finally(function () {
                setActionRows(function (prev) {
                    var next = Object.assign({}, prev)
                    delete next[hostelId]
                    return next
                })
            })
    }

    function handleReject(hostelId) {
        setActionRows(function (prev) { return Object.assign({}, prev, { [hostelId]: 'rejecting' }) })
        api.patch('/admin/hostels/' + hostelId + '/reject')
            .then(function () {
                setPending(function (prev) { return prev.filter(function (h) { return h._id !== hostelId }) })
                setStats(function (prev) {
                    if (!prev) return prev
                    return Object.assign({}, prev, { pendingApprovals: prev.pendingApprovals - 1 })
                })
            })
            .catch(function () { alert('Failed to reject. Please try again.') })
            .finally(function () {
                setActionRows(function (prev) {
                    var next = Object.assign({}, prev)
                    delete next[hostelId]
                    return next
                })
            })
    }

    if (!authChecked) return null

    var cols = ['Hostel Title', 'Owner Name', 'City', 'Type', 'Price', 'Date', 'Actions']

    return (
        <AdminLayout>
            <div className="flex flex-col gap-8">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-400 mt-1">Welcome back, Admin</p>
                </div>

                {pageError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
                        {pageError}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <StatCard label="Total Owners" value={stats ? stats.totalOwners : null} IconComponent={Users} color="text-blue-600" bg="bg-blue-50" loading={statsLoading} />
                    <StatCard label="Total Hostels" value={stats ? stats.totalHostels : null} IconComponent={Building2} color="text-indigo-600" bg="bg-indigo-50" loading={statsLoading} />
                    <StatCard label="Pending Approvals" value={stats ? stats.pendingApprovals : null} IconComponent={Clock} color="text-yellow-600" bg="bg-yellow-50" loading={statsLoading} />
                    <StatCard label="Approved Hostels" value={stats ? stats.approvedHostels : null} IconComponent={CheckCircle2} color="text-green-600" bg="bg-green-50" loading={statsLoading} />
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">Pending Approvals</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Hostels waiting for your review</p>
                    </div>

                    {tableLoading && (
                        <div className="flex flex-col gap-3 p-6">
                            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                        </div>
                    )}

                    {!tableLoading && pending.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <CheckCircle2 size={36} className="text-green-400 mb-3" />
                            <p className="text-sm font-medium text-gray-500">No pending hostels — all caught up!</p>
                        </div>
                    )}

                    {!tableLoading && pending.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left">
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[0]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[1]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[2]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[3]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[4]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[5]}</th>
                                        <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{cols[6]}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {pending.map(function (hostel) {
                                        return (
                                            <PendingRow
                                                key={hostel._id}
                                                hostel={hostel}
                                                actionRows={actionRows}
                                                onApprove={handleApprove}
                                                onReject={handleReject}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </AdminLayout>
    )
}