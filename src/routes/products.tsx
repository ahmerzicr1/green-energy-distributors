import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X, ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: number;
  code: string;
  name: string;
  category: string;
  brand: string;
  imageUrl: string | null;
};

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Catalog — Green Energy Distributors Ltd" },
      { name: "description", content: "Browse our full B2B catalog of solar inverters, batteries, panels, electrical and lighting products." },
    ],
  }),
  component: ProductsPage,
});

function ProductImage({ src }: { src: string | null }) {
  const [errored, setErrored] = useState(false);
  if (src && !errored) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setErrored(true)}
        className="h-full w-full object-contain bg-white"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/40">
      <div className="flex flex-col items-center gap-2 opacity-70 px-2 text-center">
        <img src={logo} alt="" className="h-12 w-12" />
        <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
          <ImageOff className="h-3 w-3" /> No image
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select('id, "Code", "Name", "Category", "Brand", full_image_url')
        .order("id", { ascending: true })
        .limit(2000);
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const mapped: Product[] = (data ?? []).map((r: any) => {
        const url = (r.full_image_url ?? "").trim();
        return {
          id: r.id,
          code: r.Code ?? "",
          name: r.Name ?? "",
          category: r.Category ?? "",
          brand: r.Brand ?? "",
          imageUrl: url || null,
        };
      });
      setProducts(mapped);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const s = new Set<string>();
    for (const p of products) if (p.category) s.add(p.category);
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    });
  }, [query, category, products]);

  // Group filtered products: Category -> Brand -> Product[]
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, Product[]>>();
    for (const p of filtered) {
      const cat = p.category || "Uncategorized";
      const br = p.brand || "Unbranded";
      if (!map.has(cat)) map.set(cat, new Map());
      const brands = map.get(cat)!;
      if (!brands.has(br)) brands.set(br, []);
      brands.get(br)!.push(p);
    }
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([cat, brands]) => ({
        category: cat,
        brands: [...brands.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([brand, items]) => ({ brand, items })),
      }));
  }, [filtered]);

  return (
    <>
      <section className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary-glow)" }}>
            Product Catalog
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold">Solar, Electrical & Lighting</h1>
          <p className="mt-4 text-sm md:text-lg text-white/80 max-w-2xl">
            Browse our full B2B range. Search by product name, code or brand.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
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
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 sm:w-64 bg-white text-foreground border-0">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="mt-3 text-xs text-white/70">
            Showing <span className="font-semibold text-white">{filtered.length}</span> of {products.length} products
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {error ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
            Failed to load products: {error}
          </div>
        ) : loading ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Loading products…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No products match your search.
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map(({ category: cat, brands }) => (
              <section key={cat}>
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{cat}</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-8">
                  {brands.map(({ brand, items }) => (
                    <div key={brand}>
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                        {brand}
                      </h3>
                      <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {items.map((p) => (
                          <article
                            key={p.id}
                            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
                            style={{ boxShadow: "var(--shadow-card)" }}
                          >
                            <div className="aspect-square">
                              <ProductImage src={p.imageUrl} />
                            </div>
                            <div className="flex flex-1 flex-col p-3">
                              <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">
                                {p.name}
                              </h4>
                              {p.code && (
                                <div className="mt-1 text-[11px] font-medium text-muted-foreground">
                                  Code: <span className="text-foreground">{p.code}</span>
                                </div>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
