import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import panel from "@/assets/product-solar-panel.jpg";
import inverter from "@/assets/product-inverter.jpg";
import battery from "@/assets/product-battery.jpg";
import flood from "@/assets/product-flood-light.jpg";
import lawn from "@/assets/product-lawn-light.jpg";
import tools from "@/assets/product-tools.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Green Energy Distributors Ltd" },
      { name: "description", content: "Solar panels, inverters, batteries, LED flood lights, solar lawn lights and electrical tools — supplied across Zambia." },
      { property: "og:title", content: "Products — Green Energy Distributors Ltd" },
      { property: "og:description", content: "Tier-1 solar, lighting and electrical products for Zambian homes and businesses." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  { img: panel, name: "Solar Panels", category: "Solar", desc: "Monocrystalline panels from 100W to 550W — high efficiency, 25-year output warranty." },
  { img: inverter, name: "Inverters", category: "Power", desc: "Hybrid, off-grid and grid-tie inverters from leading brands. Sized for homes through to industrial loads." },
  { img: battery, name: "Batteries", category: "Storage", desc: "Lithium and deep-cycle gel batteries for reliable backup power day and night." },
  { img: flood, name: "LED Flood Lights", category: "Lighting", desc: "30W – 400W IP66 flood fixtures for warehouses, security perimeters and sports grounds." },
  { img: lawn, name: "Solar Lawn Lights", category: "Lighting", desc: "Auto-on garden and pathway lights — fully solar, no wiring required." },
  { img: tools, name: "Electrical Tools & Accessories", category: "Electrical", desc: "Multimeters, cables, breakers, conduit, connectors and a full range of installer essentials." },
];

function ProductsPage() {
  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>Products</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Quality components, trade-grade pricing</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">We stock and supply a curated range of solar, lighting and electrical products — chosen for reliability in Zambian conditions.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                <h2 className="mt-1 text-lg font-semibold text-foreground">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link to="/contact">Enquire</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
