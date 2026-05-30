import { Building2 } from "lucide-react";

const operators = [
  { name: "Hapvida",        abbr: "HAP", desc: "Maior rede própria do Brasil" },
  { name: "Unimed",         abbr: "UNI", desc: "Cooperativa médica líder" },
  { name: "Amil",           abbr: "AMI", desc: "Cobertura nacional ampla" },
  { name: "SulAmérica",     abbr: "SUL", desc: "Tradição e solidez" },
  { name: "Bradesco Saúde", abbr: "BRA", desc: "Referência em qualidade" },
];

const hospitals = [
  {
    name: "Hospital Cardiológico Costantini",
    specialty: "Cardiologia e alta complexidade",
    image: "/manus-storage/hos1_8ca4733f.webp",
  },
  {
    name: "Hospital Marcelino Champagnat",
    specialty: "Oncologia e cirurgias de alta complexidade",
    image: "/manus-storage/hos2_0785c3d4.webp",
  },
  {
    name: "Hospital Nossa Senhora das Graças",
    specialty: "Alta complexidade e UTI",
    image: "/manus-storage/hos3_a6001b4c.webp",
  },
  {
    name: "Hospital Pilar",
    specialty: "Pronto-socorro e cirurgias gerais",
    image: "/manus-storage/hos4_25bbd0df.webp",
  },
  {
    name: "Hospital Santa Cruz",
    specialty: "Atendimento 24h e emergências",
    image: "/manus-storage/hos5_c5de3f38.webp",
  },
];

export default function OperatorsSection() {
  return (
    <section id="operadoras" className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
      <div className="container">

        {/* ── Cabeçalho operadoras ── */}
        <div className="text-center mb-12">
          <div className="badge-blue inline-flex mb-4">Parceiros Credenciados</div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#1e293b" }}>
            As maiores operadoras do Brasil,{" "}
            <span style={{ color: "#4a87b9" }}>na sua mão</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#475569" }}>
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
              <p className="font-semibold text-sm" style={{ color: "#1e293b" }}>{op.name}</p>
              <p className="text-xs" style={{ color: "#475569" }}>{op.desc}</p>
              <div className="w-8 h-0.5 rounded-full" style={{ background: "#83d6d3" }} />
            </div>
          ))}
        </div>

        <hr className="divider-teal mb-16" />

        {/* ── Hospitais de Referência ── */}
        <div className="text-center mb-10">
          <div className="badge-blue inline-flex mb-4 gap-1.5">
            <Building2 className="w-3 h-3" />
            Rede Hospitalar
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#1e293b" }}>
            Hospitais de referência{" "}
            <span style={{ color: "#4a87b9" }}>em Curitiba e Região</span>
          </h3>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "#475569" }}>
            Sua cobertura inclui acesso às melhores unidades hospitalares da região.
          </p>
        </div>

        {/* Grid fotográfico de hospitais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hospitals.map((h, i) => (
            <div
              key={h.name}
              className="group relative overflow-hidden rounded-2xl animate-fade-in-up"
              style={{
                boxShadow: "0 4px 20px rgba(30, 41, 59, 0.10)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Imagem com efeito de zoom no hover */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ display: "block" }}
                />
                {/* Gradiente escuro sobreposto na parte inferior */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.20) 45%, transparent 100%)",
                  }}
                />
                {/* Legenda sobreposta */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-sans font-bold text-sm leading-tight" style={{ color: "#ffffff" }}>
                    {h.name}
                  </p>
                  <p
                    className="text-xs mt-0.5 font-medium"
                    style={{ color: "#83d6d3" }}
                  >
                    {h.specialty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de ancoragem */}
        <div className="text-center mt-12">
          <a href="#formulario" className="btn-cta inline-flex">
            ✓ SOLICITAR COTAÇÃO AGORA
          </a>
          <p className="text-xs mt-3" style={{ color: "#64748b" }}>
            Consultoria gratuita — sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
}
