import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, Clock, Heart } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/moracare" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/moracare" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/moracare" },
];

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Operadoras", href: "#operadoras" },
  { label: "Sobre nós", href: "#autoridade" },
  { label: "Solicitar Cotação", href: "#formulario" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "LGPD", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "oklch(0.07 0.014 255)",
        borderTop: "1px solid oklch(0.18 0.016 255)",
      }}
    >
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Coluna 1: Marca e descrição ── */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-white">
                Mora <span className="text-gradient-gold">Care</span>
              </span>
            </a>
            <p className="text-sm font-semibold text-white mb-1">
              Moracare Saúde e Benefícios
            </p>
            <p className="text-xs mb-5" style={{ color: "var(--mc-text-faint)" }}>
              CNPJ: 57.047.541/0001-92
            </p>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "var(--mc-text-muted)" }}>
              Consultoria gratuita e imparcial para planos de saúde em Curitiba
              e Região Metropolitana. Encontramos o plano perfeito para o seu
              perfil nas maiores operadoras do mercado.
            </p>

            {/* Redes sociais */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "oklch(0.13 0.016 255)",
                    border: "1px solid oklch(0.22 0.018 255)",
                    color: "var(--mc-text-faint)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--mc-gold)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.148 67 / 0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--mc-text-faint)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.22 0.018 255)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Coluna 2: Links rápidos ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--mc-gold)" }}>
              Navegação
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--mc-text-muted)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--mc-gold-light)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--mc-text-muted)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Coluna 3: Contato ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--mc-gold)" }}>
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+5541991916738"
                  className="flex items-start gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: "var(--mc-text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mc-gold-light)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mc-text-muted)")}
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mc-gold)" }} />
                  (41) 99191-6738
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@kplemcorretora.com.br"
                  className="flex items-start gap-3 text-sm transition-colors duration-200"
                  style={{ color: "var(--mc-text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mc-gold-light)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mc-text-muted)")}
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mc-gold)" }} />
                  contato@kplemcorretora.com.br
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "var(--mc-text-muted)" }}>
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mc-gold)" }} />
                  <span>
                    Rua Grécia, 128 – Loja 5<br />
                    Centro - Fazenda Rio Grande – PR<br />
                    CEP 83823-016
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "var(--mc-text-muted)" }}>
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mc-gold)" }} />
                  <span>Seg–Sex das 8h às 18h</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div style={{ borderTop: "1px solid oklch(0.15 0.014 255)" }}>
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center md:text-left" style={{ color: "var(--mc-text-faint)" }}>
              © {currentYear} Moracare Saúde e Benefícios — CNPJ 57.047.541/0001-92. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--mc-text-faint)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--mc-text-muted)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--mc-text-faint)")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-xs flex items-center gap-1" style={{ color: "oklch(0.30 0.010 255)" }}>
              Feito com <Heart className="w-3 h-3 fill-current" style={{ color: "var(--mc-gold-dark)" }} /> pela Mora Care
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
