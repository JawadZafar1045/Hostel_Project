import React from "react";
import { Search, Scale, MessageSquare, ArrowRight } from "lucide-react";

const StepCard = ({ number, icon: Icon, title, description, isLast }) => (
  <div className="relative flex-1">
    <div className="bg-white border border-slate-100 rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm z-10 font-bold text-slate-900">
        {number}
      </div>

      <div className="mb-6 w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
        <Icon className="w-7 h-7 text-blue-600" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>

    {!isLast && (
      <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20">
        <div className="flex items-center gap-1 opacity-20">
          <span className="w-1 h-1 bg-slate-900 rounded-full"></span>
          <span className="w-1 h-1 bg-slate-900 rounded-full"></span>
          <span className="w-1 h-1 bg-slate-900 rounded-full"></span>
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </div>
      </div>
    )}
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Search & Discover",
      description:
        "Browse through hundreds of verified hostels near IUB and other major universities in Bahawalpur.",
    },
    {
      number: 2,
      icon: Scale,
      title: "Compare Options",
      description:
        "Filter by price, gender, and amenities like WiFi, AC, and Laundry to find your perfect match.",
    },
    {
      number: 3,
      icon: MessageSquare,
      title: "Contact & Book",
      description:
        "Connect directly with owners to book your place. No middlemen, no extra fees, just a direct deal.",
    },
  ];

  return (
    <section>
      <div className="container mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Book Your Place In 3 Easy Steps
          </h2>
          <p className="text-slate-600 text-lg">
            Finding student accommodation has never been this simple.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
