const methods = ["MTN MoMo", "Orange Money", "Visa", "Mastercard", "Flutterwave", "Wire Transfer"];

export function PaymentsBanner() {
  return (
    <section className="rounded-[20px] bg-[#0D3D22] px-5 py-8 text-white lg:px-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="space-y-3 lg:col-span-5">
          <p className="section-eyebrow text-[#F7EDD5]">Protected Payments</p>
          <h2 className="font-display text-[22px] leading-[1.15] text-white">Payment flexibility built into the trade flow.</h2>
          <p className="text-[14px] leading-6 text-white/82">
            Support mobile money, cards, and transfer-ready settlement paths depending on buyer profile, order structure, and delivery route.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-3">
          {methods.map((method) => (
            <div key={method} className="rounded-[12px] border border-white/15 bg-white/10 px-4 py-3 text-center text-[13px] font-semibold text-white">
              {method}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
