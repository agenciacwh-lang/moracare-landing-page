import { Building2 } from "lucide-react";

const operators = [
  {
    name: "Hapvida",
    abbr: "HAP",
    color: "oklch(0.55 0.18 145)",
    desc: "Maior rede própria do Brasil",
  },
  {
    name: "Unimed",
    abbr: "UNI",
    color: "oklch(0.55 0.18 145)",
    desc: "Cooperativa médica líder",
  },
  {
    name: "Amil",
    abbr: "AMI",
    color: "oklch(0.50 0.20 250)",
    desc: "Cobertura nacional ampla",
  },
  {
    name: "SulAmérica",
    abbr: "SUL",
    color: "oklch(0.50 0.20 250)",
    desc: "Tradição e solidez",
  },
  {
    name: "Bradesco Saúde",
    abbr: "BRA",
    color: "oklch(0.55 0.22 28)",
    desc: "Referência em qualidade",
  },
];

const hospitals = [
  { name: "Hospital Marcelino Champagnat", specialty: "Referência em oncologia e cardiologia" },
  { name: "Hospital Nossa Senhora das Graças", specialty: "Alta complexidade e UTI" },
  { name: "Hospital Cajuru", specialty: "Pronto-socorro e cirurgias" },
  { name: "Hospital Universitário Cajuru", specialty: "Trauma e emergência" },
  { name: "Hospital do Rocio", specialty: "Ortopedia e reabilitação" },
  { name: "Hospital Vita Batel", specialty: "Medicina preventiva e check-up" },
];

export default function OperatorsSection() {
  return (
    <section
      id="operadoras"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.12 0.018 255)" }}
    >
      <div className="container">
        {/* ── Operadoras ── */}
        <div className="text-center mb-12">
          <div className="badge-gold mb-5">
            Parceiros Credenciados
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            As maiores operadoras do Brasil,{" "}
            <span className="text-gradient-gold">na sua mão</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--mc-text-muted)" }}>
            Trabalhamos com as principais operadoras do mercado para garantir
            que você tenha acesso às melhores coberturas e redes de atendimento.
          </p>
        </div>

        {/* Grid de operadoras */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {operators.map((op) => (
            <div
              key={op.name}
              className="rounded-xl p-5 flex flex-col items-center text-center transition-all duration-200 cursor-default"
              style={{
                background: "oklch(0.15 0.020 255)",
                border: "1px solid oklch(0.24 0.020 255)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.148 67 / 0.45)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px oklch(0 0 0 / 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.24 0.020 255)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Logo simulada com iniciais */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 flex-shrink-0"
                style={{ background: op.color, letterSpacing: "-0.03em" }}
              >
                {op.abbr}
              </div>
              <p className="font-semibold text-sm text-white leading-tight mb-1">{op.name}</p>
              <p className="text-xs" style={{ color: "var(--mc-text-faint)" }}>{op.desc}</p>
            </div>
          ))}
        </div>

        <hr className="divider-gold mb-20" />

        {/* ── Hospitais de Referência ── */}
        <div className="text-center mb-12">
          <div className="badge-gold mb-5">
            <Building2 className="w-3 h-3" />
            Rede Hospitalar
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Hospitais de referência{" "}
            <span className="text-gradient-gold">em Curitiba e Região</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--mc-text-muted)" }}>
            Sua cobertura inclui acesso às melhores unidades hospitalares da
            região, com estrutura completa para qualquer necessidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((hospital, index) => (
            <div
              key={hospital.name}
              className="flex items-start gap-4 rounded-xl p-5 animate-fade-in-up"
              style={{
                background: "oklch(0.15 0.020 255)",
                border: "1px solid oklch(0.24 0.020 255)",
                animationDelay: `${index * 70}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--mc-gold-muted)", border: "1px solid oklch(0.72 0.148 67 / 0.25)" }}
              >
                <Building2 className="w-4.5 h-4.5" style={{ color: "var(--mc-gold)" }} />
              </div>
              <div>
                <p className="font-semibold text-sm text-white leading-tight mb-1">{hospital.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--mc-text-faint)" }}>{hospital.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de ancoragem */}
        <div className="text-center mt-12">
          <a href="#formulario" className="btn-cta btn-cta-shimmer inline-flex">
            ✓ SOLICITAR COTAÇÃO AGORA
          </a>
          <p className="text-xs mt-3" style={{ color: "var(--mc-text-faint)" }}>
            Consultoria gratuita — sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
}
