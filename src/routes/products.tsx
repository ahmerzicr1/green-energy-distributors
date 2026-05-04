import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, ChevronDown, Filter, ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";
import productsData from "@/data/products.json";

type Product = { code: string; name: string; category: string; brand: string };
const products = productsData as Product[];

const PRIORITY_CATS = ["INVERTERS", "BATTERIES", "SOLAR PANELS", "PUMP INVERTERS"];

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Catalog — Green Energy Distributors Ltd" },
      { name: "description", content: "Browse our full digital catalog of solar inverters, batteries, panels, Schneider electrical, HellermannTyton accessories and iFlux LED lighting." },
      { property: "og:title", content: "Product Catalog — Green Energy Distributors Ltd" },
      { property: "og:description", content: "Searchable B2B catalog of solar, electrical and lighting products supplied across Zambia." },
    ],
  }),
  component: ProductsPage,
});

function ProductImage({ small }: { small?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40 overflow-hidden">
      <div className="flex flex-col items-center gap-2 opacity-70">
        <img src={logo} alt="" width={small ? 48 : 96} height={small ? 48 : 96} className={small ? "h-12 w-12" : "h-20 w-20 md:h-24 md:w-24"} />
        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <ImageOff className="h-3 w-3" /> Image coming soon
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%)" }} />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
}: {
  title: string;
  options: { value: string; count: number }[];
  selected: Set<string>;
  onToggle: (v: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border py-3">
      <CollapsibleTrigger className="flex w-full items-center justify-between text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {options.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm hover:text-primary">
              <Checkbox
                checked={selected.has(opt.value)}
                onCheckedChange={() => onToggle(opt.value)}
              />
              <span className="flex-1 truncate">{opt.value}</span>
              <span className="text-xs text-muted-foreground">{opt.count}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Product | null>(null);

  const brandOptions = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
  }, []);

  const catOptions = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.category, (m.get(p.category) || 0) + 1));
    return [...m.entries()]
      .sort((a, b) => {
        const ai = PRIORITY_CATS.indexOf(a[0]);
        const bi = PRIORITY_CATS.indexOf(b[0]);
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        return a[0].localeCompare(b[0]);
      })
      .map(([value, count]) => ({ value, count }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (brands.size && !brands.has(p.brand)) return false;
      if (cats.size && !cats.has(p.category)) return false;
      if (q) {
        return (
          p.code.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      const ai = PRIORITY_CATS.indexOf(a.category);
      const bi = PRIORITY_CATS.indexOf(b.category);
      const ar = ai === -1 ? 999 : ai;
      const br = bi === -1 ? 999 : bi;
      if (ar !== br) return ar - br;
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, brands, cats]);

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const n = new Set(set);
    n.has(v) ? n.delete(v) : n.add(v);
    setter(n);
  };

  const clearAll = () => {
    setBrands(new Set());
    setCats(new Set());
    setQuery("");
  };

  const Sidebar = (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold uppercase tracking-widest">Filters</h2>
        {(brands.size > 0 || cats.size > 0 || query) && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">Clear all</button>
        )}
      </div>
      <FilterGroup title="Filter by Brand" options={brandOptions} selected={brands} onToggle={(v) => toggle(brands, setBrands, v)} />
      <FilterGroup title="Filter by Category" options={catOptions} selected={cats} onToggle={(v) => toggle(cats, setCats, v)} />
    </aside>
  );

  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>Product Catalog</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold">Solar, Electrical & Lighting</h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">Browse our full B2B range. Search by name or code (e.g. "63A" or "KB25_WE") and request a quote on any item.</p>
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name or code…"
              className="pl-11 pr-10 h-12 text-base bg-white text-foreground border-0"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            {Sidebar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {products.length} products
              </div>
              <div className="flex items-center gap-2">
                {[...brands].map((b) => (
                  <Badge key={b} variant="secondary" className="cursor-pointer" onClick={() => toggle(brands, setBrands, b)}>
                    {b} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {[...cats].map((c) => (
                  <Badge key={c} variant="secondary" className="cursor-pointer" onClick={() => toggle(cats, setCats, c)}>
                    {c} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-1" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] sm:w-80 p-0">
                    <SheetHeader className="px-4 pt-4">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-4rem)] px-4 pb-8">
                      {Sidebar}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <p className="text-muted-foreground">No products match your search.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>Reset filters</Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <button
                    key={p.code + p.name}
                    onClick={() => setActive(p)}
                    className="group text-left overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="aspect-square">
                      <ProductImage />
                    </div>
                    <div className="p-3 md:p-4">
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                        <span className="text-primary truncate">{p.brand}</span>
                        {PRIORITY_CATS.includes(p.category) && (
                          <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-primary">Featured</span>
                        )}
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">{p.name}</h3>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="truncate">{p.category}</span>
                      </div>
                      <div className="mt-2 font-mono text-[11px] text-foreground/70 truncate">{p.code}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {active && (
            <>
              <div className="aspect-[4/3] w-full">
                <ProductImage />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    <span>{active.brand}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{active.category}</span>
                  </div>
                  <DialogTitle className="mt-2 text-xl md:text-2xl">{active.name}</DialogTitle>
                  <DialogDescription className="font-mono text-sm text-foreground/70">SKU / Code: {active.code}</DialogDescription>
                </DialogHeader>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Available from Green Energy Distributors Ltd. Stocked in Lusaka and supplied to retailers, contractors,
                  hotels, manufacturers and farms across Zambia. Contact our sales team for technical specifications,
                  bulk pricing and lead times.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`https://wa.me/260971131150?text=${encodeURIComponent(`Hi, I'm interested in ${active.name} (${active.code}). Please send details.`)}`} target="_blank" rel="noopener">Enquire on WhatsApp</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`mailto:info@greenenergyzambia.com?subject=${encodeURIComponent(`Enquiry: ${active.code} ${active.name}`)}`}>Email Sales</a>
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
