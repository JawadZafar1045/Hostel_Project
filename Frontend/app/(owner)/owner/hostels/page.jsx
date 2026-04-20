"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Plus, Edit3, Trash2, Building2, MapPin } from "lucide-react";

export default function MyHostelsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const {
    data: hostels,
    mutate,
    isLoading,
  } = useSWR("/api/owner/hostels", (url) =>
    api.get(url).then((res) => res.data),
  );

  const filteredHostels = useMemo(() => {
    if (!hostels) return [];
    return activeTab === "all"
      ? hostels
      : hostels.filter((h) => h.status === activeTab);
  }, [hostels, activeTab]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      await api.delete(`/api/owner/hostels/${id}`);
      mutate();
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center font-black uppercase tracking-widest text-slate-300">
        Loading Properties...
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          My Hostels
        </h1>
        <Link
          href="/owner/hostels/new"
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest"
        >
          + Add New
        </Link>
      </div>

      <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-fit">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredHostels.length > 0 ? (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-10 py-4">Hostel</th>
                <th className="px-10 py-4">City</th>
                <th className="px-10 py-4">Price</th>
                <th className="px-10 py-4 text-center">Status</th>
                <th className="px-10 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHostels.map((h) => (
                <tr
                  key={h._id}
                  className="group hover:bg-slate-50/50 transition-all"
                >
                  <td className="px-10 py-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                      {h.images?.[0] && (
                        <img
                          src={h.images[0]}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <Link
                      href={`/listings/${h._id}`}
                      className="text-sm font-black text-slate-900 hover:text-blue-600"
                    >
                      {h.title}
                    </Link>
                  </td>
                  <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase">
                    {h.city}
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-slate-900">
                    PKR {h.price?.toLocaleString()}
                  </td>
                  <td className="px-10 py-6 text-center">
                    <Badge variant={h.status} />
                  </td>
                  <td className="px-10 py-6 text-right space-x-2">
                    <Link
                      href={`/owner/hostels/${h._id}/edit`}
                      className="inline-block p-2 text-slate-300 hover:text-blue-600"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(h._id, h.title)}
                      className="p-2 text-slate-300 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-20 text-center">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            You haven't added any hostels yet
          </h3>
          <Link
            href="/owner/hostels/new"
            className="mt-6 inline-block text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline"
          >
            + Add Your First Hostel
          </Link>
        </div>
      )}
    </div>
  );
}
