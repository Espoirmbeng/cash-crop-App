"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { PageHeader } from "../../../components/common/PageHeader";

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Request A Quote"
        title="Capture sourcing intent from the public site"
        description="This finished demo form keeps the request-quote route usable in preview mode while non-auth marketplace operations stay frontend-driven."
      />

      <Card className="rounded-[18px] p-6">
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <Label>Crop</Label>
            <Input placeholder="Cocoa Beans" required />
          </div>
          <div>
            <Label>Target Volume</Label>
            <Input placeholder="e.g. 2 tonnes" required />
          </div>
          <div>
            <Label>Destination Market</Label>
            <Input placeholder="Douala, Lagos, Rotterdam" required />
          </div>
          <div>
            <Label>Buyer Email</Label>
            <Input placeholder="buyer@example.com" required />
          </div>
          <div className="md:col-span-2">
            <Label>Trade Notes</Label>
            <textarea className="mt-2 min-h-[120px] w-full rounded-[12px] border border-[#D1D5DB] px-3 py-3 text-[14px] outline-none" placeholder="Share quality, packaging, and delivery expectations." />
          </div>
          {submitted ? <p className="md:col-span-2 rounded-[12px] bg-[#D4EDDA] px-4 py-3 text-[12px] text-[#1A5C2E]">Quote request captured in demo mode. The browser preview flow is working.</p> : null}
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Submit Quote Request</Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
