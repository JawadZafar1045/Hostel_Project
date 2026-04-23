'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import api from '@/lib/axios'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const adminLoginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
})

export default function AdminLoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            router.replace('/admin-portal/dashboard')
        }
    }, [isAuthenticated, user, router])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminLoginSchema),
    })

    const setToken = useAuthStore(state => state.setToken)
    const setUser = useAuthStore(state => state.setUser)

    const onSubmit = async (data) => {
        setError('')
        try {
            // MOCK ADMIN LOGIN FOR FRONTEND TESTING
            if (data.email === 'admin@hostelvanya.com' && data.password === 'admin123') {
                const mockUser = {
                    id: 'admin_mock_id',
                    name: 'Super Admin',
                    email: data.email,
                    role: 'admin'
                };
                setToken('mock_admin_token_12345');
                setUser(mockUser);
                router.push('/admin-portal/dashboard');
                return;
            }

            const res = await api.post('/auth/login', data)
            const { user, token } = res.data.data || res.data

            if (user.role !== 'admin') {
                setError('Access denied. This portal is for admins only.')
                return
            }

            setToken(token || res.data.token);
            setUser(user);

            router.push('/admin-portal/dashboard')
        } catch (err) {
            if (err?.response?.status === 401) {
                setError('Invalid email or password.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-8">
                    <p className="text-2xl font-bold text-[#7C3AED]">HostelVaniya</p>
                    <h1 className="text-xl font-bold text-gray-900 mt-3">Admin Portal</h1>
                    <p className="text-sm text-gray-400 mt-1">Restricted Access Only</p>
                </div>

                {/* Error banner */}
                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                    {/* Email */}
                    <Input
                        id="email"
                        type="email"
                        placeholder="admin@hostelvanya.com"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    {/* Password */}
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password')}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        }
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-1"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                </form>
            </div>
        </main>
    )
}
