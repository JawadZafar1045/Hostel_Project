"use client";

import Sidebar from "@/components/owner/Sidebar";
import Badge from "@/components/ui/Badge";
import { Bell, Search } from "lucide-react";

export default function OwnerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-full max-w-md hidden md:block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-11 text-[13px] font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell size={20} strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  User Account
                </p>
                <div className="mt-0.5">
                  <Badge variant="approved" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-200">
                UA
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
