import { Sidebar } from "@/components/layout/sidebar";

const faqs = [
  {
    q: "How long does standard laundry take?",
    a: "Standard laundry usually takes 2-3 business days depending on the volume."
  },
  {
    q: "Do you offer pickup and delivery?",
    a: "Yes, we offer free pickup and delivery for orders above $30 within our service area."
  },
  {
    q: "How do I track my order status?",
    a: "You can track your order in real-time through the Orders section in your dashboard."
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be cancelled within 2 hours of placement if they haven't been picked up."
  }
];

export default function FAQPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <header className="border-b border-[rgb(var(--swiss-rule))] p-8 flex justify-between items-end">
          <div>
            <p className="swiss-eyebrow mb-2">Help / 20</p>
            <h1 className="swiss-display text-4xl uppercase">FAQ</h1>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="space-y-12">
            {faqs.map((faq, i) => (
              <div key={i} className="group">
                <p className="swiss-eyebrow mb-4 opacity-50">Question {i + 1}</p>
                <h3 className="swiss-display text-2xl mb-4 group-hover:text-[rgb(var(--swiss-accent))] transition-colors underline decoration-[rgb(var(--swiss-rule))] underline-offset-8">
                  {faq.q}
                </h3>
                <p className="text-lg text-[rgb(var(--swiss-muted))] leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
