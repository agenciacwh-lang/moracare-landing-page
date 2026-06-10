import { Instagram, Facebook, Mail, Phone, MapPin, Clock, Heart } from "lucide-react";

import { trackWhatsAppClick } from "@/lib/gtag-tracking";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/moracare.saude/" },
  { icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/KPLEMCorretora" },
];

const quickLinks = [
  { label: "Início",            href: "#inicio" },
  { label: "Operadoras",        href: "#operadoras" },
  { label: "Sobre nós",         href: "#autoridade" },
  { label: "Solicitar Cotação", href: "#formulario" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso",           href: "#" },
  { label: "LGPD",                    href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "#1e4f7a",
        borderTop: "1px solid rgba(131,214,211,0.15)",
      }}
    >
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Coluna 1: Marca ── */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold" style={{ color: "#ffffff" }}>
                Mora <span style={{ color: "#83d6d3" }}>Care</span>
              </span>
            </a>
            <p className="text-sm font-semibold mb-1" style={{ color: "#ffffff" }}>
              Moracare Saúde e Benefícios
            </p>
            <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              CNPJ: 57.047.541/0001-92
            </p>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.70)" }}>
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
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(131,214,211,0.20)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#83d6d3";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(131,214,211,0.50)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(131,214,211,0.20)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Coluna 2: Navegação ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#83d6d3" }}>
              Navegação
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#83d6d3")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Coluna 3: Contato ── */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#83d6d3" }}>
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5541991916738?text=Ol%C3%A1%2C+vim+pelo+o+site+quero+mais+informa%C3%A7%C3%B5es%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="flex items-start gap-3 text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#83d6d3")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#83d6d3" }} />
                  (41) 99191-6738
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@kplemcorretora.com.br"
                  className="flex items-start gap-3 text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#83d6d3")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#83d6d3" }} />
                  contato@kplemcorretora.com.br
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#83d6d3" }} />
                  <span>
                    Rua Grécia, 128 – Loja 5<br />
                    Centro - Fazenda Rio Grande – PR<br />
                    CEP 83823-016
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#83d6d3" }} />
                  <span>Seg–Sex das 8h às 18h</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div style={{ borderTop: "1px solid rgba(131,214,211,0.12)" }}>
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center md:text-left" style={{ color: "rgba(255,255,255,0.40)" }}>
              © {currentYear} Moracare Saúde e Benefícios — CNPJ 57.047.541/0001-92. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.70)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.40)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.30)" }}>
              Feito com <Heart className="w-3 h-3 fill-current" style={{ color: "#abba3b" }} /> pela Mora Care
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
