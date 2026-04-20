"use client";
import useSWR from "swr";
import api from "@/lib/axios";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import {
  Building,
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  Trash2,
} from "lucide-react";

export default function OwnerDashboard() {
  const { data: stats } = useSWR("/api/owner/dashboard", (url) =>
    api.get(url).then((res) => res.data),
  );
  const { data: hostels } = useSWR("/api/owner/hostels", (url) =>
    api.get(url).then((res) => res.data.slice(0, 5)),
  );

  return (
    <div className="space-y-12">
      <header>
        <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">
          Overview
        </p>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          Property Console
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Listings"
          value={stats?.total || 0}
          icon={Building}
          theme="blue"
        />
        <StatCard
          label="Approved"
          value={stats?.approved || 0}
          icon={CheckCircle2}
          theme="green"
        />
        <StatCard
          label="Pending"
          value={stats?.pending || 0}
          icon={Clock}
          theme="amber"
        />
        <StatCard
          label="Rejected"
          value={stats?.rejected || 0}
          icon={XCircle}
          theme="red"
        />
      </div>

      <section className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="px-10 py-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Recent Listings
          </h2>
          <Link
            href="/owner/hostels"
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
          >
            View All
          </Link>
        </div>
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-50">
            {hostels?.map((h) => (
              <tr
                key={h._id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-10 py-6">
                  <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {h.title}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Created {new Date(h.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase">
                  {h.city}
                </td>
                <td className="px-10 py-6">
                  <Badge variant={h.status} />
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/owner/hostels/${h._id}/edit`}
                      className="p-2 text-slate-300 hover:text-blue-600 transition-all"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <button className="p-2 text-slate-300 hover:text-red-600 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, theme }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between h-44 shadow-sm">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${styles[theme]}`}
      >
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
          {value}
        </h4>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
          {label}
        </p>
      </div>
    </div>
  );
}
