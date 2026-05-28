import {
  Heart,
  ShieldCheck,
  Clock,
  UserCheck,
  Stethoscope,
  MessageCircle,
  Home,
  Award,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Cuidado Humanizado",
    description:
      "Cada atendimento é personalizado, respeitando a individualidade e a dignidade de cada pessoa. Somos parceiros de vida, não apenas prestadores de serviço.",
  },
  {
    icon: ShieldCheck,
    title: "Equipe Certificada",
    description:
      "Profissionais com formação especializada, treinamento contínuo e certificações reconhecidas pelo mercado de saúde e cuidados.",
  },
  {
    icon: Clock,
    title: "Disponibilidade 24h",
    description:
      "Suporte e atendimento disponíveis a qualquer hora do dia ou da noite, garantindo tranquilidade para toda a família.",
  },
  {
    icon: UserCheck,
    title: "Acompanhamento Personalizado",
    description:
      "Planos de cuidado individualizados, desenvolvidos em conjunto com a família e os profissionais de saúde do paciente.",
  },
  {
    icon: Stethoscope,
    title: "Gestão de Saúde Integrada",
    description:
      "Monitoramento de saúde, controle de medicamentos e articulação com médicos e especialistas em um único ponto de contato.",
  },
  {
    icon: MessageCircle,
    title: "Comunicação Transparente",
    description:
      "Relatórios regulares e canal direto com a família, mantendo todos informados sobre a evolução e bem-estar do assistido.",
  },
  {
    icon: Home,
    title: "Conforto no Lar",
    description:
      "Atendimento domiciliar de excelência, permitindo que o assistido permaneça em seu ambiente familiar com segurança e qualidade.",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    description:
      "Mais de 500 famílias atendidas com satisfação, construindo uma reputação sólida baseada em resultados e confiança.",
  },
  {
    icon: Zap,
    title: "Resposta Ágil",
    description:
      "Processos otimizados para atendimento rápido em situações de urgência, com protocolos claros e equipe sempre preparada.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.10 0.015 260)" }}
    >
      <div className="container">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 bg-[oklch(0.62_0.13_55/0.12)] border border-[oklch(0.62_0.13_55/0.25)] rounded-full px-4 py-1.5 mb-5">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-gold)" }}
            >
              Por que escolher a Mora Care
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-5">
            Diferenciais que fazem{" "}
            <span className="text-gradient-gold">toda a diferença</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Combinamos expertise técnica com genuíno cuidado humano para
            entregar uma experiência que transforma a vida de quem atendemos e
            de suas famílias.
          </p>
        </div>

        <hr className="divider-gold mb-14 md:mb-18" />

        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="benefit-card animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Ícone */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "oklch(0.62 0.13 55 / 0.12)",
                    border: "1px solid oklch(0.62 0.13 55 / 0.2)",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--color-gold)" }}
                  />
                </div>

                {/* Conteúdo */}
                <h3 className="text-white font-semibold text-lg mb-3 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
