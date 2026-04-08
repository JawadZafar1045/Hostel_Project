import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HostelVaniya
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/listings" className="text-gray-600 hover:text-blue-600 font-medium">Listings</Link>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Login
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
