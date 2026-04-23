'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Building2, Users, LogOut, Menu, X } from 'lucide-react'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

const navLinks = [
    { href: '/admin-portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin-portal/hostels', label: 'All Hostels', icon: Building2 },
    { href: '/admin-portal/owners', label: 'All Owners', icon: Users },
]

function SidebarLink({ href, label, IconComponent, active }) {
    const baseClass = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all '
    const activeClass = 'bg-purple-50 text-[#7C3AED]'
    const inactiveClass = 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
    
    return (
        <Link href={href} className={baseClass + (active ? activeClass : inactiveClass)}>
            <IconComponent size={17} />
            {label}
        </Link>
    )
}

export default function AdminDashboardLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, isAuthenticated, logout } = useAuthStore()
    const [authChecked, setAuthChecked] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            // 1. Check if token exists in store
            const token = useAuthStore.getState().token;
            if (!token) {
                router.replace('/admin-portal/login');
                return;
            }

            // 2. Handle mock admin session
            if (user?.id === 'admin_mock_id' && isAuthenticated) {
                setAuthChecked(true);
                return;
            }

            // 3. Verify with server
            try {
                const res = await api.get('/auth/me');
                const fetchedUser = res.data?.data?.user || res.data?.user;
                
                if (fetchedUser?.role !== 'admin') {
                    logout(); // Clear invalid session
                    router.replace('/admin-portal/login');
                    return;
                }
                
                setAuthChecked(true);
            } catch (err) {
                console.error('Admin Auth Check Failed:', err);
                logout();
                router.replace('/admin-portal/login');
            }
        };

        checkAuth();
    }, [router, user, isAuthenticated, logout])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    function handleLogout() {
        logout()
        api.post('/auth/logout').catch(() => { }).finally(() => {
            router.push('/admin-portal/login')
        })
    }

    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-900 relative">
            
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-40">
                <p className="text-lg font-bold text-[#7C3AED] tracking-tight">HostelVaniya</p>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 -mr-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col h-screen
                transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="px-6 py-6 border-b border-gray-50 hidden lg:block">
                    <p className="text-xl font-bold text-[#7C3AED] tracking-tight">HostelVaniya</p>
                    <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Admin Dashboard</p>
                </div>
                
                <div className="px-6 py-5 border-b border-gray-50 lg:hidden flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold text-[#7C3AED] tracking-tight">HostelVaniya</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Admin Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <SidebarLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            IconComponent={link.icon}
                            active={pathname === link.href}
                        />
                    ))}
                </nav>

                <div className="px-4 py-4 border-t border-gray-50 bg-white">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all group"
                    >
                        <LogOut size={17} className="group-hover:translate-x-0.5 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto w-full max-w-full">
                <div className="max-w-[1600px] mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
