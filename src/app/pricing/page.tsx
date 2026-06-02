import { Sidebar } from "@/components/layout/sidebar";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Standard Laundry (up to 10kg)", "Pickup & Delivery", "Order Tracking"],
    accent: true,
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["Premium Wash & Fold", "Express 24h service", "Free Detergent"],
    accent: false,
  },
  {
    name: "Enterprise",
    price: "$34.99",
    features: ["Bulk Orders", "Dedicated Account Manager", "Custom Scheduling"],
    accent: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <header className="border-b border-[rgb(var(--swiss-rule))] p-8">
          <p className="swiss-eyebrow mb-2">Plans / 25</p>
          <h1 className="swiss-display text-4xl uppercase">Pricing</h1>
        </header>

        <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`border border-[rgb(var(--swiss-rule))] rounded-xl p-8 flex flex-col ${plan.accent ? "bg-[rgb(var(--swiss-surface))]" : ""}`}
            >
              <h2 className="swiss-headline text-2xl mb-4">{plan.name}</h2>
              <p className="swiss-display text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="flex-1 space-y-2 mb-8">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-[rgb(var(--swiss-ink))]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.285 2.709l-11.79 11.79-4.79-4.79-2.707 2.707 7.497 7.497 14.497-14.497z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-auto swiss-button-primary px-6 py-3">Choose Plan</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
