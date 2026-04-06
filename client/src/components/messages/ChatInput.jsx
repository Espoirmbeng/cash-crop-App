"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-4">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={3}
        placeholder="Demo-only message composer"
        className="w-full resize-none border-0 text-[13px] text-[#111827] outline-none"
      />
      <div className="mt-3 flex justify-end">
        <Button type="button" onClick={() => setValue("")}>Clear</Button>
      </div>
    </div>
  );
}
