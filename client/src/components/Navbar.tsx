import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

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
        background: scrolled
          ? "oklch(0.09 0.018 255 / 0.96)"
          : "oklch(0.09 0.018 255 / 0.70)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid oklch(0.24 0.018 255)" : "1px solid transparent",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5">
            <span className="font-serif text-xl md:text-2xl font-bold text-white tracking-tight">
              Mora <span className="text-gradient-gold">Care</span>
            </span>
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
                style={{ color: "oklch(0.72 0.010 255)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--mc-gold)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "oklch(0.72 0.010 255)")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA + Telefone */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+5541991916738"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: "oklch(0.72 0.010 255)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mc-gold)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.72 0.010 255)")}
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
