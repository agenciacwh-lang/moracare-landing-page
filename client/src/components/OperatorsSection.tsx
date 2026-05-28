import { Building2 } from "lucide-react";

const operators = [
  { name: "Hapvida",        abbr: "HAP", desc: "Maior rede própria do Brasil" },
  { name: "Unimed",         abbr: "UNI", desc: "Cooperativa médica líder" },
  { name: "Amil",           abbr: "AMI", desc: "Cobertura nacional ampla" },
  { name: "SulAmérica",     abbr: "SUL", desc: "Tradição e solidez" },
  { name: "Bradesco Saúde", abbr: "BRA", desc: "Referência em qualidade" },
];

const hospitals = [
  { name: "Hospital Marcelino Champagnat",    specialty: "Oncologia e cardiologia" },
  { name: "Hospital Nossa Senhora das Graças", specialty: "Alta complexidade e UTI" },
  { name: "Hospital Cajuru",                  specialty: "Pronto-socorro e cirurgias" },
  { name: "Hospital Universitário Cajuru",    specialty: "Trauma e emergência" },
  { name: "Hospital do Rocio",                specialty: "Ortopedia e reabilitação" },
  { name: "Hospital Vita Batel",              specialty: "Medicina preventiva e check-up" },
];

export default function OperatorsSection() {
  return (
    <section id="operadoras" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="container">

        {/* ── Cabeçalho operadoras ── */}
        <div className="text-center mb-12">
          <div className="badge-blue inline-flex mb-4">Parceiros Credenciados</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1e4f7a" }}>
            As maiores operadoras do Brasil,{" "}
            <span style={{ color: "#4a87b9" }}>na sua mão</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>
            Trabalhamos com as principais operadoras do mercado para garantir
            que você tenha acesso às melhores coberturas e redes de atendimento.
          </p>
        </div>

        {/* Grid de operadoras */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {operators.map((op, i) => (
            <div key={op.name} className="benefit-card flex flex-col items-center text-center gap-3 py-7">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm tracking-wider"
                style={{ background: i % 2 === 0 ? "#4a87b9" : "#2d6a9f", color: "#ffffff" }}
              >
                {op.abbr}
              </div>
              <p className="font-semibold text-sm" style={{ color: "#1e4f7a" }}>{op.name}</p>
              <p className="text-xs" style={{ color: "#64748b" }}>{op.desc}</p>
              <div className="w-8 h-0.5 rounded-full" style={{ background: "#83d6d3" }} />
            </div>
          ))}
        </div>

        <hr className="divider-teal mb-16" />

        {/* ── Hospitais de Referência ── */}
        <div className="text-center mb-10">
          <div className="badge-blue inline-flex mb-4">
            <Building2 className="w-3 h-3" />
            Rede Hospitalar
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3" style={{ color: "#1e4f7a" }}>
            Hospitais de referência{" "}
            <span style={{ color: "#4a87b9" }}>em Curitiba e Região</span>
          </h3>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "#64748b" }}>
            Sua cobertura inclui acesso às melhores unidades hospitalares da região.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitals.map((h, i) => (
            <div
              key={h.name}
              className="flex items-start gap-4 p-5 rounded-xl transition-all duration-200 animate-fade-in-up"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(74,135,185,0.06)",
                animationDelay: `${i * 70}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#83d6d3";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(74,135,185,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(74,135,185,0.06)";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                style={{ background: "#edfafa", color: "#5bbfbb", border: "1px solid rgba(131,214,211,0.4)" }}
              >
                ✚
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1e4f7a" }}>{h.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#83d6d3" }}>{h.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de ancoragem */}
        <div className="text-center mt-12">
          <a href="#formulario" className="btn-cta inline-flex">
            ✓ SOLICITAR COTAÇÃO AGORA
          </a>
          <p className="text-xs mt-3" style={{ color: "#94a3b8" }}>
            Consultoria gratuita — sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
}
