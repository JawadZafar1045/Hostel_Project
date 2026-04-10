'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, GraduationCap, Home, CheckCircle2 } from 'lucide-react'
import { registerUser } from '@/api/auth.api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

const registerSchema = z.object({
  role: z.enum(['student', 'owner'], { required_error: 'Please select a role' }),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Must be a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Numbers only')
    .min(10, 'Must be at least 10 digits'),
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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { role: 'student' },
  })

  const selectedRole = watch('role')

  const handleRoleSelect = (role) => {
    setValue('role', role, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await registerUser(data)
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
        <h1 className="text-xl font-bold text-gray-900">Register</h1>
        <div className="mt-4 border-b border-gray-200" />
      </div>

      {/* Brand */}
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-[#7C3AED]">Hostelvanya</p>
        <h2 className="text-xl font-bold text-gray-900 mt-2">Create your account</h2>
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

              {/* Role selector */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">I am a...</p>
                <div className="grid grid-cols-2 gap-3">

                  {/* Student card */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('student')}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-4 px-3 transition-all
                      ${selectedRole === 'student'
                        ? 'border-[#7C3AED] bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <GraduationCap
                      size={28}
                      className={selectedRole === 'student' ? 'text-[#7C3AED]' : 'text-gray-400'}
                    />
                    <span className={`text-sm font-semibold ${selectedRole === 'student' ? 'text-[#7C3AED]' : 'text-gray-700'}`}>
                      Student
                    </span>
                    <span className="text-xs text-gray-400">Looking for a hostel</span>
                  </button>

                  {/* Owner card */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('owner')}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-4 px-3 transition-all
                      ${selectedRole === 'owner'
                        ? 'border-[#7C3AED] bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <Home
                      size={28}
                      className={selectedRole === 'owner' ? 'text-[#7C3AED]' : 'text-gray-400'}
                    />
                    <span className={`text-sm font-semibold ${selectedRole === 'owner' ? 'text-[#7C3AED]' : 'text-gray-700'}`}>
                      Owner
                    </span>
                    <span className="text-xs text-gray-400">Listing a property</span>
                  </button>

                </div>
                {errors.role && (
                  <p className="text-xs text-red-500">{errors.role.message}</p>
                )}
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

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  error={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03001234567"
                  autoComplete="tel"
                  error={!!errors.phone}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={!!errors.password}
                    className="pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
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
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    error={!!errors.confirmPassword}
                    className="pr-10"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
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