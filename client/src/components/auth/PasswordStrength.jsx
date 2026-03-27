const rules = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One number", test: (value) => /\d/.test(value) },
  { label: "Avoid common words", test: (value) => !/(password|qwerty|farmer|buyer)/i.test(value) },
];

export function PasswordStrength({ password = "" }) {
  const score = rules.filter((rule) => rule.test(password)).length;

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
      <div className="grid grid-cols-4 gap-2">
        {rules.map((rule, index) => (
          <span key={rule.label} className={`h-2 rounded-full ${index < score ? "bg-[#1A6B3C]" : "bg-[#D1D5DB]"}`} />
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {rules.map((rule) => (
          <p key={rule.label} className={`text-[12px] ${rule.test(password) ? "text-[#1A6B3C]" : "text-[#6B7280]"}`}>
            {rule.label}
          </p>
        ))}
      </div>
    </div>
  );
}
