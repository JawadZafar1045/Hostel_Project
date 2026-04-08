export default function HomePage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Find Your Perfect Hostel
        </h1>
        <p className="text-xl text-gray-600">
          Browse verified hostels near you
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mb-16 bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search by city or hostel name..." 
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* HostelCard components will go here */}
      </div>
    </section>
  );
}
