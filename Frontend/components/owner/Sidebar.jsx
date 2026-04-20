"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Plus,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
  { name: "My Hostels", href: "/owner/hostels", icon: Building },
  { name: "Add New Hostel", href: "/owner/hostels/new", icon: Plus },
  { name: "Profile", href: "/owner/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#F8FAFC] border-r border-slate-100 flex flex-col px-6 py-8">
      <div className="mb-14 px-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">
          Hostel<span className="text-blue-600">Vaniya</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-1.5">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-white text-blue-600 shadow-sm border border-slate-50"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <link.icon size={19} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[13px] font-bold tracking-tight">
                  {link.name}
                </span>
              </div>
              {isActive && <ChevronRight size={14} strokeWidth={3} />}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-4 px-4 py-6 text-slate-400 hover:text-red-600 transition-all font-black text-[11px] uppercase tracking-[0.2em] border-t border-slate-100 mt-auto">
        <LogOut size={18} strokeWidth={2.5} /> Logout
      </button>
    </aside>
  );
}
