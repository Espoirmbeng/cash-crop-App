import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function NotFound() {
  return (
    <div className="content-shell py-16">
      <Card className="rounded-[20px] p-8 text-center">
        <p className="section-eyebrow">Not Found</p>
        <h1 className="mt-3 font-display text-[28px] text-[#111827]">This AgriculNet page could not be found</h1>
        <p className="mt-3 body-copy">The route exists in the app shell, but the specific record or page you requested is missing.</p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
