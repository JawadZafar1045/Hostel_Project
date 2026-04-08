export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-600 font-medium mb-1">Total Hostels</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-green-50 rounded-xl border border-green-100">
          <p className="text-green-600 font-medium mb-1">Active Bookings</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
          <p className="text-purple-600 font-medium mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">$0</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Hostels</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add New Hostel
          </button>
        </div>
        <div className="text-center py-12 text-gray-500">
          No hostels found. Start by adding one!
        </div>
      </div>
    </div>
  );
}
