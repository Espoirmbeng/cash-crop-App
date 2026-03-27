"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function PasswordInput({ label = "Password", error, helper, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <Input {...props} type={visible ? "text" : "password"} className="pr-10" />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-3 inline-flex items-center text-[#6B7280] hover:text-[#1A6B3C]"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {helper ? <p className="mt-2 text-[12px] text-[#6B7280]">{helper}</p> : null}
      {error ? <p className="mt-2 text-[12px] text-[#922B21]">{error}</p> : null}
    </div>
  );
}
