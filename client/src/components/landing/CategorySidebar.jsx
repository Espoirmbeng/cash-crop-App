const categories = ["All crops", "Cocoa", "Coffee", "Maize", "Cassava", "Plantain", "Palm Oil", "Penja Pepper", "Banana"];

export function CategorySidebar() {
  return (
    <aside className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
      <p className="section-eyebrow">Browse by Crop</p>
      <h3 className="mt-2 font-display text-[18px] text-[#111827]">Recent Listings</h3>
      <div className="mt-5 space-y-2">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-left text-[13px] font-medium ${
              index === 0 ? "bg-[#EAF4EE] text-[#1A6B3C]" : "bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]"
            }`}
          >
            <span>{category}</span>
            <span className="text-[11px] text-[#6B7280]">{index === 0 ? "08" : `0${Math.max(1, 9 - index)}`}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-[12px] bg-[#F9FAFB] p-4">
        <p className="text-[13px] font-semibold text-[#111827]">Export-ready supply this week</p>
        <p className="mt-2 text-[13px] leading-6 text-[#374151]">South West cocoa, West coffee, and Penja pepper are moving fastest with inspection-ready documentation.</p>
      </div>
    </aside>
  );
}
