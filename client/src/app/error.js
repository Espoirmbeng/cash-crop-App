"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="content-shell py-16">
      <Card className="rounded-[20px] p-8 text-center">
        <p className="section-eyebrow">Something Went Wrong</p>
        <h1 className="mt-3 font-display text-[28px] text-[#111827]">AgriculNet hit an unexpected issue</h1>
        <p className="mt-3 body-copy">Try the action again. If the problem persists, restart the local preview after the current fixes finish installing.</p>
        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={reset}>Try Again</Button>
        </div>
      </Card>
    </div>
  );
}
