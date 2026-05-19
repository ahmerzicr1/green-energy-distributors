import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Lightbulb, Zap, Battery, ShieldCheck, Clock, Users } from "lucide-react";
import heroImg from "@/assets/hero-solar.jpg";
import ledImg from "@/assets/led-lighting.jpg";
import { BigOrderBanner } from "@/components/site/BigOrderBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solar Companies in Zambia | Green Energy Distributors Ltd — Solar, LED & Electrical" },
      { name: "description", content: "Leading solar company in Zambia. Solar panel installation, LED lighting and electrical contracting for homes, hotels, manufacturers, farms and contractors across Lusaka and nationwide. Request a free quote." },
      { name: "keywords", content: "solar companies in zambia, solar installation zambia, led lighting companies zambia, electrical contractors lusaka, solar panel suppliers zambia, clean energy zambia" },
      { property: "og:title", content: "Solar Companies in Zambia | Green Energy Distributors Ltd" },
      { property: "og:description", content: "Leading solar company in Zambia. Solar panel installation, LED lighting and electrical contracting across Lusaka and nationwide." },
      { property: "og:url", content: "https://green-energy-zm.com" },
    ],
    links: [
      { rel: "canonical", href: "https://green-energy-zm.com" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Sun, title: "Solar Installation", desc: "End-to-end design and installation of grid-tied and off-grid solar systems." },
  { icon: Lightbulb, title: "LED Lighting", desc: "High-efficiency flood and street lighting for industries, roads and estates." },
  { icon: Zap, title: "Electrical Contracting", desc: "Licensed electrical supply, wiring and contracting for projects of any scale." },
  { icon: Battery, title: "Energy Storage", desc: "Reliable inverters and battery systems to keep your operations running 24/7." },
];

const stats = [
  { value: "10+", label: "Years of expertise" },
  { value: "500+", label: "Projects delivered" },
  { value: "24/7", label: "Support available" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Solar panel array on a commercial rooftop"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl text-white">
            <span className="inline-block rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-white/20">
              Trusted Across Zambia
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Powering Zambia's Future with Clean Energy
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              Full-service solar, LED lighting and electrical contracting for retailers, hotels, manufacturers, farmers and contractors — engineered for reliability and on-time delivery.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <a href="https://wa.me/260971131150?text=Hello%20Green%20Energy%20Distributors%2C%20I%27d%20like%20to%20request%20a%20quote." target="_blank" rel="noopener noreferrer">Request a Quote <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-10 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Do</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">Energy solutions, end to end</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">From concept to commissioning, we design, supply and install systems that perform in Zambia's toughest conditions.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline">
            <Link to="/services">View all services <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* LED feature */}
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={ledImg}
            alt="LED street lighting at dusk"
            width={1280}
            height={832}
            loading="lazy"
            className="rounded-xl w-full h-auto object-cover"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>LED Lighting</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Brighter roads. Safer sites. Lower bills.</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Our LED flood and street lighting systems cut energy use by up to 70% while delivering superior illumination — ideal for warehouses, farms, lodges, parking yards and municipal roads.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["IP66 weather-rated fixtures", "Up to 50,000 hour lifespan", "Solar-hybrid options available", "Nationwide installation crew"].map((p) => (
                <li key={p} className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" style={{ color: "var(--primary-glow)" }} /> {p}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild variant="hero">
                <Link to="/products">Browse Lighting Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Big order banner */}
      <BigOrderBanner />

      {/* Why us */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Why Choose Us</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Built for Zambian businesses</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Homes to multinationals", desc: "We serve individual homeowners through to international hotel groups — with the same care and quality." },
            { icon: Clock, title: "On-time delivery", desc: "Project plans we hold ourselves to. Honest timelines, transparent updates, dependable execution." },
            { icon: ShieldCheck, title: "Quality you can trust", desc: "Tier-1 components, certified installers and warranty-backed workmanship on every job." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-7" style={{ boxShadow: "var(--shadow-card)" }}>
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to power your project?</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">Tell us about your site and we'll prepare a tailored quote within one business day.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="lg"><a href="https://wa.me/260971131150?text=Hello%20Green%20Energy%20Distributors%2C%20I%27d%20like%20to%20request%20a%20quote." target="_blank" rel="noopener noreferrer">Request a Quote</a></Button>
            <Button asChild variant="heroOutline" size="lg"><a href="tel:+260971131150">Call +260 971 131 150</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
