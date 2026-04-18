//mock data and API functions for hostels. In production, these would call real endpoints.
const ALL_HOSTELS = Array.from({ length: 40 }, (_, i) => ({
  _id: `h-${i + 1}`,
  title: `${i % 2 === 0 ? "Al-Rehman" : "Executive"} Stay ${i + 1}`,
  city: i % 3 === 0 ? "Islamabad" : i % 3 === 1 ? "Lahore" : "Bahawalpur",
  type: i % 2 === 0 ? "boys" : "girls",
  price: 12000 + i * 1000,
  description:
    "Experience premium student living with all-inclusive utilities, 3x daily meals, and high-speed fiber internet. Located in a secure gated community with 24/7 CCTV surveillance.",
  amenities: ["WiFi", "AC", "Laundry", "Mess", "Generator"],
  images: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071",
  ],
}));

export const fetchHostels = async (url) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("API Error, falling back to mock data");
  }

  // Mock Logic
  const urlObj = new URL(url, "http://localhost");
  const city = urlObj.searchParams.get("city")?.toLowerCase();
  const type = urlObj.searchParams.get("type");
  const maxPrice = urlObj.searchParams.get("maxPrice");
  const page = parseInt(urlObj.searchParams.get("page") || "1");
  const limit = 9;

  let filtered = ALL_HOSTELS.filter((h) => {
    const matchCity = !city || h.city.toLowerCase().includes(city);
    const matchType = !type || h.type === type;
    const matchPrice = !maxPrice || h.price <= parseInt(maxPrice);
    return matchCity && matchType && matchPrice;
  });

  const totalPages = Math.ceil(filtered.length / limit);
  const data = filtered.slice((page - 1) * limit, page * limit);

  await new Promise((r) => setTimeout(r, 600));
  return { data, totalResults: filtered.length, totalPages };
};

export const fetchHostelById = async (url) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    if (res.ok) {
      const result = await res.json();
      return result.data || result;
    }
  } catch (e) {
    console.warn("API Error, falling back to mock hostel");
  }

  const id = url.split("/").pop();
  const found = ALL_HOSTELS.find((h) => h._id === id) || ALL_HOSTELS[0];

  await new Promise((r) => setTimeout(r, 800));
  return found;
};
