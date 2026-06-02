import { Sidebar } from "@/components/layout/sidebar";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Regular Customer",
    quote: "LaundryPro completely changed how I manage my chores. The pickup service is always on time, and my clothes come back pristine.",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    quote: "As a hotel manager, we rely heavily on LaundryPro for our overflow linens. Their dashboard makes tracking bulk orders incredibly transparent.",
  },
  {
    name: "Emma Watson",
    role: "Local Resident",
    quote: "I love the new app interface. The design is clean and getting my laundry done is just three taps away now.",
  }
];

export default function TestimonialsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <header className="border-b border-[rgb(var(--swiss-rule))] p-8">
          <p className="swiss-eyebrow mb-2">Community / 30</p>
          <h1 className="swiss-display text-4xl uppercase">Testimonials</h1>
        </header>

        <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-[rgb(var(--swiss-rule))] p-8 hover:bg-[rgb(var(--swiss-surface))] transition-colors">
              <div className="mb-8">
                <svg className="h-8 w-8 text-[rgb(var(--swiss-muted))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-lg leading-relaxed mb-8 min-h-[120px]">
                {t.quote}
              </p>
              <div className="pt-8 border-t border-[rgb(var(--swiss-rule))]">
                <p className="font-bold">{t.name}</p>
                <p className="swiss-eyebrow mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
