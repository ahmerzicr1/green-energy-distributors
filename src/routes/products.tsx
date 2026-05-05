import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import logo from "@/assets/logo.png";
import productsData from "@/data/products.json";

type Product = { code: string; name: string; category: string; brand: string };
const products = productsData as Product[];

// Auto-import any image in src/assets/products keyed by filename (no extension)
const imageModules = import.meta.glob("@/assets/products/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const imageMap: Record<string, string> = {};
for (const [path, url] of Object.entries(imageModules)) {
  const file = path.split("/").pop() ?? "";
  const stem = file.replace(/\.[^.]+$/, "");
  imageMap[stem.toLowerCase()] = url;
  imageMap[stem.toLowerCase().replace(/[\s_-]+/g, "")] = url;
}

function lookupImage(code: string): string | undefined {
  const k = code.toLowerCase();
  return imageMap[k] ?? imageMap[k.replace(/[\s_-]+/g, "")];
}

const GENERAL_BRANDS = new Set([
  "TBB",
  "DYNESS",
  "GREEN ENERGY",
  "TRINASOLAR",
  "SUNTREE",
  "SUNPAL",
  "DEYE",
  "SUNSYNK",
]);

const GENERAL = "General";

function groupKey(p: Product) {
  if (GENERAL_BRANDS.has(p.brand.toUpperCase())) return GENERAL;
  return `${p.brand} — ${p.category}`;
}

// Order: General first, then Schneider, HellermannTyton, iFlux
const BRAND_ORDER = ["Schneider Electric", "HellermannTyton", "iFlux"];

function groupRank(group: string) {
  if (group === GENERAL) return -1;
  for (let i = 0; i < BRAND_ORDER.length; i++) {
    if (group.startsWith(BRAND_ORDER[i])) return i;
  }
  return 999;
}

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Catalog — Green Energy Distributors Ltd" },
      {
        name: "description",
        content:
          "Browse our full B2B catalog of solar inverters, batteries, panels, Schneider electrical, HellermannTyton tools and iFlux LED lighting.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductImage({ code, small }: { code: string; small?: boolean }) {
  const src = lookupImage(code);
  if (src) {
    return (
      <img
        src={src}
        alt={code}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40 overflow-hidden">
      <div className="flex flex-col items-center gap-2 opacity-70 px-2 text-center">
        <img
          src={logo}
          alt=""
          className={small ? "h-10 w-10" : "h-16 w-16 md:h-20 md:w-20"}
        />
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <ImageOff className="h-3 w-3" /> Coming soon
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    // Normalized query for code matching: strip spaces, underscores, dashes, dots
    const qNorm = q.replace(/[\s_.\-]+/g, "");
    return products.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.code.toLowerCase().replace(/[\s_.\-]+/g, "").includes(qNorm) ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => {
    const m = new Map<string, Product[]>();
    for (const p of filtered) {
      const k = groupKey(p);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(p);
    }
    const arr = [...m.entries()];
    arr.sort((a, b) => {
      const ra = groupRank(a[0]);
      const rb = groupRank(b[0]);
      if (ra !== rb) return ra - rb;
      return a[0].localeCompare(b[0]);
    });
    for (const [, list] of arr) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return arr;
  }, [filtered]);

  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary-glow)" }}
          >
            Product Catalog
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold">
            Solar, Electrical & Lighting
          </h1>
          <p className="mt-4 text-sm md:text-lg text-white/80 max-w-2xl">
            Browse our full B2B range. Search by name, code, brand or category
            (e.g. "63A", "KB25_WE", "iFlux", "BATTERIES").
          </p>
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="pl-11 pr-10 h-12 text-base bg-white text-foreground border-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-white/70">
            Showing <span className="font-semibold text-white">{filtered.length}</span> of {products.length} products
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No products match your search.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setQuery("")}>
              Reset
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map(([group, items]) => (
              <section key={group} aria-label={group}>
                <header className="sticky top-16 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-base md:text-2xl font-bold tracking-tight">
                      {group === GENERAL ? (
                        <>
                          <span className="inline-block rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs md:text-sm font-bold uppercase tracking-widest mr-2 align-middle">
                            Featured
                          </span>
                          General — Solar, Inverters & Batteries
                        </>
                      ) : (
                        group
                      )}
                    </h2>
                    <span className="text-xs md:text-sm text-muted-foreground shrink-0">
                      {items.length} item{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </header>

                <div className="grid gap-3 sm:gap-4 mt-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map((p) => (
                    <button
                      key={p.code + p.name}
                      onClick={() => setActive(p)}
                      className="group text-left overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <div className="aspect-square">
                        <ProductImage code={p.code} small />
                      </div>
                      <div className="p-3">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary truncate">
                          {p.brand}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-muted-foreground truncate">
                          {p.code}
                        </div>
                        <h3 className="mt-1 text-sm font-bold text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">
                          {p.name}
                        </h3>
                        <div className="mt-2">
                          <span className="inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground truncate max-w-full">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <div className="aspect-[4/3] w-full bg-muted">
                <ProductImage code={active.code} />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    <span>{active.brand}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{active.category}</span>
                  </div>
                  <DialogTitle className="mt-2 text-xl md:text-2xl">{active.name}</DialogTitle>
                  <DialogDescription className="font-mono text-sm text-foreground/70">
                    SKU / Code: {active.code}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Available from Green Energy Distributors Ltd. Stocked in Lusaka and supplied to
                  retailers, contractors, hotels, manufacturers and farms across Zambia. Contact our
                  sales team for technical specifications, bulk pricing and lead times.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href={`https://wa.me/260971131150?text=${encodeURIComponent(
                        `Hi, I'm interested in ${active.name} (${active.code}). Please send details.`,
                      )}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={`mailto:info@greenenergyzambia.com?subject=${encodeURIComponent(
                        `Enquiry: ${active.code} ${active.name}`,
                      )}`}
                    >
                      Email Sales
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
