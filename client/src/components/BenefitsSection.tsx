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
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-14">
          <div className="badge-blue inline-flex mb-4">
            Por que escolher a Mora Care
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl xl:text-5xl font-extrabold mb-5"
            style={{ color: "#1e293b" }}
          >
            Diferenciais que fazem{" "}
            <span style={{ color: "#4a87b9" }}>toda a diferença</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#334155" }}>
            Combinamos expertise técnica com genuíno cuidado humano para
            entregar uma experiência que transforma a vida de quem atendemos e
            de suas famílias.
          </p>
        </div>

        <hr className="divider-teal mb-14" />

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
                {/* Ícone teal */}
                <div className="icon-teal w-12 h-12 rounded-xl mb-5">
                  <Icon className="w-5 h-5" style={{ color: "#5bbfbb" }} />
                </div>

                {/* Conteúdo */}
                <h3
                  className="font-sans font-bold text-lg mb-3 leading-tight"
                  style={{ color: "#1e293b" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
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
