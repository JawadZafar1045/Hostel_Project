/**
 * T5-D: Mock API with Live Filtering Logic
 */
const ALL_HOSTELS = Array.from({ length: 40 }, (_, i) => ({
  _id: `h-${i + 1}`,
  title: `${i % 2 === 0 ? "Al-Rehman" : "Executive"} Stay ${i + 1}`,
  city: i % 3 === 0 ? "Islamabad" : i % 3 === 1 ? "Lahore" : "Bahawalpur",
  type: i % 2 === 0 ? "boys" : "girls",
  price: 12000 + i * 1000,
  images: [],
}));

export const fetchHostels = async (url) => {
  // 1. Try real fetch first
  try {
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    /* Fallback to mock */
  }

  // 2. Mock Filtering Logic (Matches the URL params)
  const urlObj = new URL(url, window.location.origin);
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

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 600));

  return { data, totalResults: filtered.length, totalPages };
};
