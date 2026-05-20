import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Green Energy Distributors Ltd",
  description: "Solar panel installation, LED lighting and electrical contracting company in Lusaka, Zambia. Serving homeowners, hotels, manufacturers, farms and commercial projects.",
  url: "https://green-energy-zm.com",
  telephone: ["+260971131150", "+260976570537"],
  email: "info@greenenergydistributors.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 6547, Mansana Road",
    addressLocality: "Lusaka",
    addressCountry: "ZM",
  },
  openingHours: ["Mo-Fr 07:30-16:30", "Sa 07:30-12:00"],
  areaServed: {
    "@type": "Country",
    name: "Zambia",
  },
  serviceType: ["Solar Installation", "LED Lighting", "Electrical Contracting"],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Green Energy Distributors Ltd | Solar, LED & Electrical Solutions Zambia" },
      { name: "description", content: "Solar companies in Zambia — Green Energy Distributors Ltd offers solar panel installation, LED lighting and electrical supply & installation across Zambia. Serving retailers, hotels, manufacturers, farmers and contractors in Lusaka and nationwide." },
      { name: "keywords", content: "solar companies in zambia, solar installation zambia, led lighting companies zambia, electrical contractors lusaka, solar panel suppliers zambia, energy solutions zambia" },
      { name: "author", content: "Green Energy Distributors Ltd" },
      { property: "og:title", content: "Green Energy Distributors Ltd | Solar, LED & Electrical Solutions Zambia" },
      { property: "og:description", content: "Solar companies in Zambia — full-service solar, LED lighting and electrical supply & installation across Zambia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://green-energy-zm.com" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Green Energy Distributors Ltd | Solar, LED & Electrical Solutions Zambia" },
      { name: "twitter:description", content: "Solar companies in Zambia — full-service solar, LED lighting and electrical supply & installation across Zambia." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3b73c85f-bc86-4368-9917-0d247f52e384/id-preview-7a27073a--2b0902c8-947d-49a9-a0d9-7034a772ae3a.lovable.app-1777558484125.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3b73c85f-bc86-4368-9917-0d247f52e384/id-preview-7a27073a--2b0902c8-947d-49a9-a0d9-7034a772ae3a.lovable.app-1777558484125.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZM">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
