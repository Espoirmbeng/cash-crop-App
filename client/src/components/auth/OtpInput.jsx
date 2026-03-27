"use client";

import { useMemo, useRef } from "react";
import { Input } from "../ui/input";

export function OtpInput({ length = 6, value = "", onChange, error }) {
  const refs = useRef([]);
  const digits = useMemo(() => value.padEnd(length, " ").slice(0, length).split(""), [length, value]);

  const updateDigit = (index, nextValue) => {
    const char = nextValue.replace(/\D/g, "").slice(-1);
    const chars = value.padEnd(length, " ").slice(0, length).split("");
    chars[index] = char || "";
    onChange(chars.join("").replace(/\s/g, ""));
    if (char && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index].trim() && refs.current[index - 1]) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            value={digit.trim()}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            maxLength={1}
            className="h-10 w-10 px-0 text-center text-[15px] font-semibold sm:w-12"
          />
        ))}
      </div>
      {error ? <p className="mt-2 text-[12px] text-[#922B21]">{error}</p> : null}
    </div>
  );
}
