import React from "react";
import { ShieldCheck, Star, MessageSquare } from "lucide-react";

const TrustItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white shadow-sm">
    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
  </div>
);

const TrustStrip = () => {
  const items = [
    { icon: ShieldCheck, label: "Verified Owners" },
    { icon: Star, label: "Real Reviews" },
    { icon: MessageSquare, label: "Direct Contact" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {items.map((item, index) => (
        <TrustItem key={index} {...item} />
      ))}
    </div>
  );
};

export default TrustStrip;
