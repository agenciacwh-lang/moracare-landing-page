import { Handshake, TrendingUp, Zap, Award, Users, CheckCircle } from "lucide-react";

const pillars = [
  {
    icon: Handshake,
    title: "Independência total",
    description:
      "Não somos vinculados a nenhuma operadora. Nossa recomendação é sempre baseada no que é melhor para você.",
  },
  {
    icon: TrendingUp,
    title: "Transparência e segurança",
    description:
      "Você recebe uma análise comparativa completa, com prós e contras de cada plano, sem letras miúdas.",
  },
  {
    icon: Zap,
    title: "Sem burocracia",
    description:
      "Cuidamos de todo o processo: cotação, contratação e ativação. Você só precisa escolher.",
  },
  {
    icon: Award,
    title: "Sistemas personalizados",
    description:
      "Cada cliente recebe uma solução sob medida, considerando perfil, orçamento e necessidades específicas.",
  },
  {
    icon: Users,
    title: "Pós-venda próximo",
    description:
      "Nosso relacionamento não termina na contratação. Estamos sempre disponíveis para suporte e renovações.",
  },
  {
    icon: CheckCircle,
    title: "Resultado comprovado",
    description:
      "Mais de 500 famílias e empresas atendidas com satisfação comprovada em Curitiba e Região Metropolitana.",
  },
];

const stats = [
  { value: "500+", label: "Clientes atendidos" },
  { value: "Todas", label: "Operadoras do mercado" },
  { value: "98%",  label: "Satisfação" },
  { value: "5 min",   label: "Tempo de resposta" },
];

export default function AuthoritySection() {
  return (
    <section
      id="autoridade"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1e4f7a 0%, #2d6a9f 50%, #4a87b9 100%)" }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #83d6d3 0%, transparent 70%)" }}
        />
        <div
          className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #83d6d3 0%, transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10">

        {/* ── Cabeçalho ── */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="badge-green inline-flex mb-5">
            Por que a Mora Care
          </div>
          <h2 className="font-serif text-3xl md:text-4xl xl:text-5xl font-bold mb-6 leading-tight" style={{ color: "#ffffff" }}>
            Muito além de corretores, somos seus{" "}
            <span style={{ color: "#83d6d3" }}>consultores de saúde</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#e2f0fb" }}>
            A Mora Care atua de forma independente para garantir que você faça a
            escolha certa, com transparência e segurança. Esqueça a burocracia:
            nosso compromisso é entregar a solução mais eficiente para o seu
            perfil, com sistemas personalizados e um pós-venda próximo que nunca
            te deixa na mão.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-2xl py-6 px-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(131,214,211,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                className="font-serif text-4xl font-bold mb-1"
                style={{ color: "#abba3b" }}
              >
                {s.value}
              </p>
              <p className="text-sm font-medium" style={{ color: "#c8e4f5" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Grid de pilares ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="rounded-2xl p-6 transition-all duration-240 animate-fade-in-up"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(131,214,211,0.20)",
                backdropFilter: "blur(8px)",
                animationDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(131,214,211,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(131,214,211,0.20)";
              }}
            >
              {/* Ícone teal */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(131,214,211,0.15)", border: "1px solid rgba(131,214,211,0.30)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#83d6d3" }} />
              </div>
              <h3 className="font-sans text-base font-bold mb-2" style={{ color: "#ffffff" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c8e4f5" }}>
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA final ── */}
        <div className="text-center mt-14">
          <a href="#formulario" className="btn-cta inline-flex">
            ✓ QUERO MINHA COTAÇÃO GRATUITA
          </a>
          <p className="text-xs mt-3" style={{ color: "#c8e4f5" }}>
            Sem compromisso · Resposta em até 5 minutos
          </p>
        </div>
      </div>
    </section>
  );
}
