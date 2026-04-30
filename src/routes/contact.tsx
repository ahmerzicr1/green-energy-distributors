import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Green Energy Distributors Ltd" },
      { name: "description", content: "Contact Green Energy Distributors Ltd in Lusaka. Phone +260 971 131 150, WhatsApp, or visit 5031 Great North Road, Emmasdale." },
      { property: "og:title", content: "Contact — Green Energy Distributors Ltd" },
      { property: "og:description", content: "Get in touch for solar, LED and electrical quotes anywhere in Zambia." },
    ],
  }),
  component: ContactPage,
});

// TODO: Replace this with your real Google Form embed URL.
// Create a Google Form, click Send → Embed (<>), copy the iframe src URL.
// In your Google Form: Settings → Responses → toggle "Get email notifications for new responses"
// so you're notified by email instantly when a client submits an enquiry.
const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc_PLACEHOLDER_REPLACE_ME/viewform?embedded=true";

function ContactPage() {
  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>Contact</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Let's power your next project</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">Reach out by phone, WhatsApp, email or the enquiry form below — we typically respond within one business day.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 grid lg:grid-cols-3 gap-8">
        {/* Contact info */}
        <div className="lg:col-span-1 space-y-4">
          <ContactCard icon={Phone} label="Phone" value="+260 971 131 150" href="tel:+260971131150" />
          <ContactCard icon={MessageCircle} label="WhatsApp" value="+260 971 131 150" href="https://wa.me/260971131150" external />
          <ContactCard icon={MapPin} label="Address" value="5031 Great North Road, Emmasdale, Lusaka, Zambia" />
          <div className="rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3 text-primary"><Clock className="h-5 w-5" /><div className="text-sm font-semibold uppercase tracking-wider">Opening Hours</div></div>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground">
              <li className="flex justify-between"><span>Mon – Fri</span><span className="font-medium">07:30 – 16:30</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="font-medium">07:30 – 12:00</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>
        </div>

        {/* Enquiry form (Google Form embed) */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Request a Quote / Booking Enquiry</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and our team will be in touch shortly. You'll also receive a confirmation by email.</p>
            </div>
            <div className="bg-white">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                title="Enquiry form"
                width="100%"
                height="900"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                className="w-full block"
              >
                Loading…
              </iframe>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Prefer a faster reply? <a href="https://wa.me/260971131150" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Message us on WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border">
        <iframe
          title="Our location"
          src="https://www.google.com/maps?q=5031+Great+North+Road,+Emmasdale,+Lusaka,+Zambia&output=embed"
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full block border-0"
        />
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, label, value, href, external }: { icon: any; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-3 text-primary"><Icon className="h-5 w-5" /><div className="text-sm font-semibold uppercase tracking-wider">{label}</div></div>
      <div className="mt-2 text-foreground font-medium">{value}</div>
    </div>
  );
  if (href) return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block">{inner}</a>;
  return inner;
}
