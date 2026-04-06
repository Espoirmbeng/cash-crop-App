import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function FarmerNewListingPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Create listing"
        title="Draft a new crop offer"
        description="This builder is demo-backed, but it lets you preview how new listings will be structured inside the farmer workspace."
      />

      <Card className="rounded-[18px] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Crop name</span>
            <Input defaultValue="Cocoa Beans" />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Available quantity</span>
            <Input defaultValue="2,000 kg" />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Price</span>
            <Input defaultValue="XAF 1,650 / kg" />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Delivery window</span>
            <Input defaultValue="Ready within 5 days" />
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-[13px] font-medium text-[#374151]">Listing summary</span>
          <textarea
            className="min-h-[140px] w-full rounded-[12px] border border-[#D1D5DB] px-4 py-3 text-[14px] outline-none"
            defaultValue="Sun-dried cocoa prepared for warehouse pickup with moisture checks already completed."
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button>Save draft</Button>
          <Button variant="secondary">Preview listing</Button>
        </div>
      </Card>
    </section>
  );
}
