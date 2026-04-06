import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Search", value = "", onChange }) {
  return (
    <div className="flex items-center rounded-[12px] border border-[#D1D5DB] bg-white px-3">
      <Search className="h-4 w-4 text-[#6B7280]" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full border-0 bg-transparent px-3 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
      />
    </div>
  );
}
