import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold">Green Energy Distributors Ltd</div>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Powering Zambia's future with clean, reliable energy and lighting solutions.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href="tel:+260971131150" className="hover:text-white">+260 971 131 150</a></li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href="tel:+260976570537" className="hover:text-white">+260 976 570 537</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><a href="https://maps.app.goo.gl/jBXikxJdFUBVA1nb8" target="_blank" rel="noopener noreferrer" className="hover:text-white">Plot 6547, Mansana Road, Lusaka, Zambia</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider">Hours</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /><span>Mon – Fri: 07:30 – 16:30</span></li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /><span>Saturday: 07:30 – 12:00</span></li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /><span>Sunday: Closed</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Green Energy Distributors Ltd. All rights reserved.</span>
          <span>Lusaka, Zambia</span>
        </div>
      </div>
    </footer>
  );
}