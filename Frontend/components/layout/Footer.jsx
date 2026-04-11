import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const studentLinks = [
  { href: "/hostels", label: "Browse Hostels" },
  { href: "/favorites", label: "My Favorites" },
  { href: "/register", label: "Create Account" },
];

const ownerLinks = [
  { href: "/register?role=owner", label: "List Your Hostel" },
  { href: "/owner/dashboard", label: "Owner Dashboard" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pb-16 border-b border-white/10">
          <div className="max-w-sm">
            <span className="text-2xl font-bold text-blue-500 tracking-tight block mb-4">
              Hostelvanya
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pakistan's leading student accommodation marketplace. Find
              verified, safe, and affordable hostels with real reviews.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <h4 className="text-xs font-bold text-slate-200 mb-4 uppercase tracking-[0.2em]">
              Join our newsletter
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="!bg-slate-900 !border-slate-800 !text-white !ring-offset-slate-950 placeholder:text-slate-500"
              />
              <Button className="shrink-0 px-6 bg-blue-600 hover:bg-blue-700 border-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">
              Students
            </h4>
            <ul className="space-y-4">
              {studentLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-slate-300 hover:text-blue-400 transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">
              Partners
            </h4>
            <ul className="space-y-4">
              {ownerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-slate-300 hover:text-blue-400 transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-slate-300 hover:text-blue-400 transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Hostelvanya. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <Link
              href="/terms"
              className="text-[11px] font-medium text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-[11px] font-medium text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/support"
              className="text-[11px] font-medium text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
