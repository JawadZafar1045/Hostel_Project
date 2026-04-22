'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Home, CheckCircle2 } from 'lucide-react'
import { registerStudent, registerOwner } from '@/api/auth.api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const registerSchema = z.object({
  role: z.enum(['student', 'owner'], { required_error: 'Please select a role' }),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Must be at least 2 characters'),
  emailOrPhone: z
    .string()
    .min(1, 'Email or phone number is required')
    .refine(
      (value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = /^\d{10,}$/.test(value);
        return isEmail || isPhone;
      },
      { message: 'Must be a valid email or at least 10-digit phone number' }
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Minimum 8 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export default function RegisterPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { role: 'owner' },
  })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const isEmail = data.emailOrPhone.includes('@');
      const payload = {
        role: data.role,
        fullName: data.fullName,
        email: isEmail ? data.emailOrPhone : undefined,
        phone: !isEmail ? data.emailOrPhone : undefined,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      if (data.role === 'owner') {
        await registerOwner(payload)
      } else {
        await registerStudent(payload)
      }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 1500)
    } catch (err) {
      setServerError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-5 pt-10 pb-16">

      {/* Page heading */}
      <div className="w-full max-w-sm mb-6">
        <h1 className="text-xl font-bold text-gray-900"></h1>
       
      </div>

      {/* Brand */}
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-[#7C3AED]">Hostelvanya</p>
        <h2 className="text-xl font-bold text-gray-900 mt-2">List your property with us</h2>
        <p className="text-sm text-gray-500 mt-1">Join thousands of hostel owners in Pakistan</p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-sm px-6 py-7">

        {/* Success state */}
        {success ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <CheckCircle2 size={48} className="text-[#7C3AED]" />
            <p className="text-base font-semibold text-gray-800">Account created!</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <>
            {/* Server error */}
            {serverError && (
              <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

              {/* Registration Header */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-[#7C3AED] bg-purple-50 py-5 px-3 transition-all">
                  <Home
                    size={32}
                    className="text-[#7C3AED]"
                  />
                  <span className="text-base font-bold text-[#7C3AED]">
                    Hostel Owner Account
                  </span>
                  <span className="text-xs text-gray-500 font-medium text-center">Get verified and start receiving bookings today</span>
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  error={!!errors.fullName}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email or Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="emailOrPhone" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Email or Phone Number
                </label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="john@example.com or 03001234567"
                  autoComplete="username"
                  error={!!errors.emailOrPhone}
                  {...register('emailOrPhone')}
                />
                {errors.emailOrPhone && (
                  <p className="text-xs text-red-500">{errors.emailOrPhone.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Password
                </label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
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
                {errors.password
                  ? <p className="text-xs text-red-500">{errors.password.message}</p>
                  : <p className="text-xs text-gray-400">Minimum 8 characters</p>
                }
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  error={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold py-3.5 rounded-xl mt-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>

            </form>
          </>
        )}

      </Card>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Already registered?{' '}
        <Link href="/login" className="font-semibold text-[#7C3AED] hover:underline">
          Sign in
        </Link>
      </p>

    </main>
  )
}
