'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { loginUser } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Must be a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const setToken = useAuthStore((s) => s.setToken)

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const res = await loginUser(data)
      setToken(res.token)
      router.push('/')
    } catch (err) {
      setServerError(err?.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-5 pt-10">

      {/* Page heading */}
      <div className="w-full max-w-sm mb-6">
        <h1 className="text-xl font-bold text-gray-900">Login</h1>
        <div className="mt-4 border-b border-gray-200" />
      </div>

      {/* Brand */}
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-[#7C3AED]">Hostelvanya</p>
        <h2 className="text-xl font-bold text-gray-900 mt-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* Card wraps the entire form */}
      <Card className="w-full max-w-sm px-6 py-7">

        {/* Server error */}
        {serverError && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              error={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              error={!!errors.password}
              {...register('password')}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>


          <div className="flex justify-end -mt-2">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#7C3AED] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold py-3.5 rounded-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Logging in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>

        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          New to Hostelvanya?{' '}
          <Link href="/register" className="font-semibold text-[#7C3AED] hover:underline">
            Create account
          </Link>
        </p>

      </Card>
    </main>
  )
}

