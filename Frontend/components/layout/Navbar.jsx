"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const handlePostHostelClick = () => {
    setMobileOpen(false);
    if (isAuthenticated && user?.role === 'owner') {
      router.push('/list-property');
    } else {
      router.push('/login');
    }
  };

  const navLinks = [

    { href: "/listings", label: "Browse Hostels" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/list-property", label: "List Property" },


  ];

  const closeMenu = () => setMobileOpen(false);

  if (pathname.startsWith("/admin-")) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600 shrink-0"
        >
          Hostelvanya
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${pathname === href
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions - Unified Component Usage */}
        <div className="hidden md:flex items-center gap-2">


          <Button size="md" className="rounded-full px-8" onClick={handlePostHostelClick}>
            Post Your Hostel
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="text-base text-gray-800 hover:text-blue-600 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <Button fullWidth size="md" onClick={handlePostHostelClick}>
              Post Your Hostel
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
