import { CheckCircle, Users, TrendingUp, Award, Handshake, Zap } from "lucide-react";

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
  { value: "5", label: "Operadoras parceiras" },
  { value: "98%", label: "Satisfação" },
  { value: "2h", label: "Tempo de resposta" },
];

export default function AuthoritySection() {
  return (
    <section
      id="autoridade"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.09 0.018 255)" }}
    >
      {/* Decoração */}
      <div
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--mc-gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* ── Cabeçalho ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">
          <div className="animate-fade-in-up">
            <div className="badge-gold mb-6">
              Sobre a Mora Care
            </div>
            <h2 className="font-serif text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6">
              Muito além de corretores, somos seus{" "}
              <span className="text-gradient-gold">consultores de saúde.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "var(--mc-text-muted)" }}>
              A Mora Care atua de forma independente para garantir que você faça
              a escolha certa, com transparência e segurança. Esqueça a
              burocracia: nosso compromisso é entregar a solução mais eficiente
              para o seu perfil, com sistemas personalizados e um pós-venda
              próximo que nunca te deixa na mão.
            </p>
            <a href="#formulario" className="btn-cta inline-flex">
              ✓ SOLICITAR COTAÇÃO AGORA
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: "var(--mc-text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider-gold mb-16 md:mb-20" />

        {/* ── Pilares ── */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Por que somos diferentes
          </h3>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--mc-text-muted)" }}>
            Nossa metodologia foi desenvolvida para colocar o cliente sempre em
            primeiro lugar, com total imparcialidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="benefit-card animate-fade-in-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "var(--mc-gold-muted)",
                    border: "1px solid oklch(0.72 0.148 67 / 0.22)",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--mc-gold)" }} />
                </div>
                <h4 className="font-semibold text-white text-base mb-2">{pillar.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--mc-text-muted)" }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
