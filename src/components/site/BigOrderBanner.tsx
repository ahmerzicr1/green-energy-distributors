import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/260971131150?text=Hello%20Green%20Energy%20Distributors%2C%20I%27d%20like%20to%20discuss%20a%20big%20order%20%2F%20pre-order.";

export function BigOrderBanner() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-8 md:py-10">
      <div
        className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle className="h-6 w-6" />
        </div>
        <p className="flex-1 text-base md:text-lg font-medium text-foreground">
          Feel free to contact our team for any big order placements or pre-orders.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Contact our team
        </a>
      </div>
    </section>
  );
}