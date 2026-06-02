import { SwissButton } from "@/components/ui/button";
import { SwissInput } from "@/components/ui/input";
import { SwissTextarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/layout/sidebar";

export default function ContactPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[rgb(var(--swiss-paper))]">
        <header className="border-b border-[rgb(var(--swiss-rule))] p-8 flex justify-between items-end">
          <div>
            <p className="swiss-eyebrow mb-2">Support / 10</p>
            <h1 className="swiss-display text-4xl">Contact Us</h1>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-8 py-12">
          <div className="mb-12">
            <h2 className="swiss-headline text-2xl uppercase tracking-tight mb-4">Reach Out</h2>
            <p className="text-[rgb(var(--swiss-muted))] text-lg">
              Need help with your orders or want to partner with us? Fill out the form below.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="swiss-eyebrow">Full Name</label>
                <SwissInput placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="swiss-eyebrow">Email Address</label>
                <SwissInput type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="swiss-eyebrow">Message</label>
              <SwissTextarea rows={5} placeholder="How can we help you?" />
            </div>

            <SwissButton variant="primary" className="w-full md:w-auto px-12">
              Send Message
            </SwissButton>
          </form>

          <div className="mt-12 border-t border-[rgb(var(--swiss-rule))] pt-8">
            <h3 className="swiss-headline text-xl uppercase tracking-tight mb-4">Direct Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="swiss-eyebrow">Phone</p>
                <p className="swiss-display text-sm font-medium">+62 812 3456 789</p>
              </div>
              <div>
                <p className="swiss-eyebrow">Email</p>
                <p className="swiss-display text-sm font-medium">hello@laundrypro.app</p>
              </div>
              <div>
                <p className="swiss-eyebrow">Office</p>
                <p className="swiss-display text-sm font-medium">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
