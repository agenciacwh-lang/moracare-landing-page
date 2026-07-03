import { Building2 } from "lucide-react";

const operators = [
  { name: "Hapvida",        logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663616331473/KqUdrfZLaHsjvMzY.png" },
  { name: "Unimed",         logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663616331473/ebVLnuxpWCdrmOtY.png" },
  { name: "Amil",           logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663616331473/yMZZBtAVmDpEZiDg.png" },
  { name: "SulAmérica",     logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663616331473/GPlCxorcMsntaAhr.webp" },
  { name: "Bradesco Saúde", logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663616331473/LvrpbxCoZwHNuEAf.png" },
];

const hospitals = [
  {
    name: "Hospital Cardiológico Costantini",
    specialty: "Cardiologia e alta complexidade",
    image: "/hospitals/hos1.webp",
  },
  {
    name: "Hospital Marcelino Champagnat",
    specialty: "Oncologia e cirurgias de alta complexidade",
    image: "/hospitals/hos2.webp",
  },
  {
    name: "Hospital Nossa Senhora das Graças",
    specialty: "Alta complexidade e UTI",
    image: "/hospitals/hos3.webp",
  },
  {
    name: "Hospital Pilar",
    specialty: "Pronto-socorro e cirurgias gerais",
    image: "/hospitals/hos4.webp",
  },
  {
    name: "Hospital Santa Cruz",
    specialty: "Atendimento 24h e emergências",
    image: "/hospitals/hos5.webp",
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

        {/* Grid de operadoras com logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-16">
          {operators.map((op) => (
            <div
              key={op.name}
              className="benefit-card flex items-center justify-center text-center py-8 px-4 hover:shadow-lg transition-shadow duration-300"
              style={{ borderColor: "#e2e8f0", background: "#ffffff" }}
            >
              {/* Faixa de logo padronizada: mesma altura para todas as marcas,
                  object-contain preserva a proporção e max-w evita logos largas gigantes */}
              <div className="w-full h-20 md:h-24 flex items-center justify-center">
                <img
                  src={op.logo}
                  alt={op.name}
                  loading="lazy"
                  className="max-h-full max-w-[85%] object-contain"
                  style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
                />
              </div>
            </div>
          ))}
          {/* Card adicional - Todas as operadoras */}
          <div
            className="benefit-card flex flex-col items-center justify-center text-center gap-3 py-8 px-4 hover:shadow-lg transition-shadow duration-300"
            style={{ borderColor: "#83d6d3", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}
          >
            <p className="font-semibold text-sm" style={{ color: "#1e4d6b" }}>
              Trabalhamos com todas as operadoras do mercado
            </p>
            <div className="w-12 h-0.5 rounded-full" style={{ background: "#83d6d3" }} />
            <p className="text-xs" style={{ color: "#64748b" }}>E muito mais...</p>
          </div>
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
            Sua cobertura inclui acesso às melhores unidades hospitalares da região metropolitana de Curitiba.
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
