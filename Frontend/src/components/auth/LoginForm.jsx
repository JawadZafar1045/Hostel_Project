"use client";

import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#0064D9]">
          Hostelvanya
        </h1>

        <h2 className="text-xl font-semibold text-center mt-2">
          Welcome back
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email address
          </label>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="mr-2 text-gray-400">📧</span>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="mr-2 text-gray-400">🔒</span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full outline-none text-sm"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400"
            >
              👁
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <a href="#" className="text-sm text-[#0064D9] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button className="w-full bg-[#0064D9] hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
          Sign In
        </button>

      </div>
    </div>
  );
}