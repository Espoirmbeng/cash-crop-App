export function formatCurrency(value, currency = "XAF", locale = "en-CM") {
  const amount = typeof value === "number" ? value : Number.parseFloat(value);

  if (Number.isNaN(amount)) {
    return `${currency} ${value}`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value, locale = "en-GB") {
  if (!value) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function normalizeCameroonPhone(value = "") {
  const digits = String(value).replace(/\D/g, "");
  const localDigits = digits.startsWith("237") ? digits.slice(3) : digits;
  return localDigits ? `+237${localDigits.slice(0, 9)}` : "";
}

export function maskIdentifier(value = "") {
  if (value.includes("@")) {
    const [local, domain] = value.split("@");
    if (!local || !domain) {
      return value;
    }

    return `${local.slice(0, 1)}***${local.slice(-1)}@${domain}`;
  }

  const normalized = normalizeCameroonPhone(value);
  if (!normalized) {
    return value;
  }

  return `${normalized.slice(0, 7)}***${normalized.slice(-3)}`;
}
