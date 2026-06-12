import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/gtag-tracking";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "#2d6a9f" : "#4a87b9",
        boxShadow: scrolled ? "0 2px 20px rgba(30, 79, 122, 0.25)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5">
            <img
              src="/moracare-logo.jpeg"
              alt="MoraCare Saúde e Benefícios"
              className="h-14 md:h-16 w-auto object-contain rounded"
              style={{ filter: "brightness(1.05) drop-shadow(0 1px 3px rgba(0,0,0,0.20))" }}
            />
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Operadoras", href: "#operadoras" },
              { label: "Por que nós", href: "#autoridade" },
              { label: "Contato", href: "#footer" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.85)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#83d6d3")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Telefone + CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5541991916738?text=Ol%C3%A1%2C+vim+pelo+o+site+quero+mais+informa%C3%A7%C3%B5es%21"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#83d6d3")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
            >
              <Phone className="w-3.5 h-3.5" />
              (41) 99191-6738
            </a>
            <a href="#formulario" className="btn-cta text-xs px-4 py-2.5 md:px-5 md:py-3">
              Cotação Grátis
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
