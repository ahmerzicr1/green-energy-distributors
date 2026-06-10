import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PencilRuler, Lightbulb, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solar & Electrical Services — Green Energy Distributors Ltd, Zambia" },
      { name: "description", content: "Solar installation, system design, LED lighting, electrical contracting and solar equipment sales across Zambia. Licensed electrical contractors in Lusaka serving homes, hotels, farms and industry." },
      { name: "keywords", content: "solar installation zambia, electrical contractors lusaka, led lighting services zambia, solar system design, solar equipment sales zambia" },
      { property: "og:title", content: "Solar & Electrical Services — Green Energy Distributors Ltd, Zambia" },
      { property: "og:description", content: "Solar installation, LED lighting, electrical contracting and equipment sales across Zambia." },
      { property: "og:url", content: "https://green-energy-zm.com/services" },
    ],
    links: [
      { rel: "canonical", href: "https://green-energy-zm.com/services" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: PencilRuler, title: "Solar System Design", desc: "Custom system sizing, load analysis and engineering plans tailored to your usage patterns and budget.", message: "Hello Green Energy Distributors, I'm interested in solar system design." },
  { icon: Lightbulb, title: "Lighting", desc: "Heavy-duty IP66 lighting for warehouses, sports grounds, security perimeters and industrial yards.", message: "Hello Green Energy Distributors, I'm interested in lighting solutions." },
  { icon: Zap, title: "Electrical Supply & Contracting", desc: "Licensed electrical wiring, supply and contracting — from single buildings to multi-site commercial projects.", message: "Hello Green Energy Distributors, I'm interested in electrical supply and contracting." },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>Our Services</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Complete energy solutions, one trusted partner</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">Design, supply, installation and aftercare — all delivered in-house by certified Zambian engineers.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.title}
              href={`https://wa.me/260971131150?text=${encodeURIComponent(s.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:-translate-y-1 cursor-pointer"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-foreground">{s.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 rounded-2xl p-10 md:p-14 text-white text-center" style={{ background: "var(--gradient-primary)" }}>
          <h2 className="text-2xl md:text-3xl font-bold">Need a custom scope of work?</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">Send us your site details and we'll prepare a quotation tailored to your project.</p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <a href="https://wa.me/260971131150?text=Hello%20Green%20Energy%20Distributors%2C%20I%27d%20like%20to%20request%20a%20quote." target="_blank" rel="noopener noreferrer">Request a Quote <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </div>
      </section>
    </>
  );
}
