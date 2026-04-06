import { Label } from "../ui/label";

export function PhoneInput({ label = "Phone Number", value, onChange, error, helper, placeholder = "6XX XXX XXX" }) {
  const formattedValue = String(value || "")
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, first, second, third) =>
      [first, second, third].filter(Boolean).join(" ")
    )
    .trim();

  const handleChange = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 9);
    const formatted = digits.replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, first, second, third) => [first, second, third].filter(Boolean).join(" "));
    onChange(formatted.trim());
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex overflow-hidden rounded-[8px] border border-[#D1D5DB] bg-white transition-colors duration-200 focus-within:[border-width:1.5px] focus-within:border-[#1A6B3C]">
        <span className="inline-flex items-center border-r border-[#E5E7EB] bg-[#F9FAFB] px-3 text-[13px] font-semibold text-[#374151]">+237</span>
        <input
          value={formattedValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-10 w-full border-0 bg-white px-3 text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>
      {helper ? <p className="mt-2 text-[12px] text-[#6B7280]">{helper}</p> : null}
      {error ? <p className="mt-2 text-[12px] text-[#922B21]">{error}</p> : null}
    </div>
  );
}
