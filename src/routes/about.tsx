import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import about from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Green Energy Distributors Ltd" },
      { name: "description", content: "Zambian-owned solar, LED and electrical company serving homeowners through to multinational hotel groups with flexibility and on-time delivery." },
      { property: "og:title", content: "About — Green Energy Distributors Ltd" },
      { property: "og:description", content: "From homeowners to multinationals — quality solar, lighting and electrical work delivered on time, every time." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>About Us</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">A Zambian energy partner you can rely on</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">Headquartered in Lusaka and operating across Zambia, Green Energy Distributors Ltd brings together engineers, electricians and project managers under one roof.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <img src={about} alt="Green Energy Distributors engineer inspecting solar panels" width={1280} height={832} loading="lazy" className="rounded-xl w-full h-auto object-cover" style={{ boxShadow: "var(--shadow-elegant)" }} />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built on flexibility and on-time delivery</h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>We serve a diverse client base — from individual homeowners installing their first solar system, to multinational hotel groups upgrading entire properties to LED. Whatever the scale, we apply the same disciplined approach: thoughtful design, premium components and dependable execution.</p>
            <p>Our reputation is built on doing what we said we would do, when we said we would do it. That commitment to on-time delivery is why retailers, hotels, manufacturers, farmers and contractors continue to trust us with their most important energy projects.</p>
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "Certified electricians and solar engineers",
              "Tier-1 components, manufacturer-backed warranties",
              "Project management for jobs of any scale",
              "Nationwide installation and aftercare support",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /> <span>{p}</span></li>
            ))}
          </ul>
          <Button asChild className="mt-8"><Link to="/contact">Talk to our team</Link></Button>
        </div>
      </section>

      <section className="bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Our Mission", body: "To accelerate Zambia's transition to clean, reliable energy through quality engineering and honest service." },
            { title: "Our Vision", body: "A future where every Zambian business and home runs on dependable, sustainable power." },
            { title: "Our Values", body: "Integrity. Quality. Punctuality. Customer-first thinking on every project, large or small." },
          ].map((v) => (
            <div key={v.title} className="rounded-xl bg-card border border-border p-7" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
