import { createServerFn } from "@tanstack/react-start";

export type RemoteProduct = {
  product_code: string;
  name: string;
  category: string;
  brand: string;
  image_url: string | null;
  in_stock: boolean | null;
};

export const getProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: RemoteProduct[]; error: string | null }> => {
    const a = process.env.SUPABASE_URL;
    const b = process.env.SUPABASE_ANON_KEY;
    // Some projects have URL/key swapped — detect which is which.
    const isUrl = (v?: string) => !!v && /^https?:\/\//i.test(v);
    const url = isUrl(a) ? a : isUrl(b) ? b : undefined;
    const key = !isUrl(a) ? a : !isUrl(b) ? b : undefined;
    if (!url || !key) {
      return { products: [], error: "Supabase credentials are not configured." };
    }
    // Strip trailing slash and any accidental /rest/v1 suffix on the URL secret.
    const base = url.replace(/\/+$/, "").replace(/\/rest\/v1$/i, "");
    try {
      const table = encodeURIComponent("Green Energy Distributors");
      const res = await fetch(
        `${base}/rest/v1/products?select=product_code,name,category,brand,image_url,in_stock`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        },
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Supabase fetch failed:", res.status, text);
        return { products: [], error: `Failed to load products (${res.status})` };
      }
      const data = (await res.json()) as RemoteProduct[];
      return { products: data, error: null };
    } catch (e) {
      console.error("Supabase fetch error:", e);
      return { products: [], error: "Could not reach the products service." };
    }
  },
);