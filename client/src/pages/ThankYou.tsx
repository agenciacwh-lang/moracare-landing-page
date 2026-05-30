import { useEffect } from "react";
import { CheckCircle, MessageCircle, Phone, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const WA_LINK =
  "https://wa.me/5541991916738?text=Ol%C3%A1%2C+vim+pelo+o+site+quero+mais+informa%C3%A7%C3%B5es%21";

export default function ThankYou() {
  // Dispara evento Lead do Facebook Pixel ao carregar a página
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #1e4f7a 0%, #4a87b9 60%, #2d6a9f 100%)" }}
    >
      {/* Navbar mínima */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-extrabold text-white tracking-tight">
            Mora <span style={{ color: "#83d6d3" }}>Care</span>
          </span>
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
        >
          <Phone size={16} />
          (41) 99191-6738
        </a>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Card de sucesso */}
          <div
            className="rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            style={{ background: "rgba(255,255,255,0.97)" }}
          >
            {/* Ícone de sucesso animado */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #abba3b 0%, #8fa030 100%)" }}
              >
                <CheckCircle size={44} color="#fff" strokeWidth={2.5} />
              </div>
            </div>

            {/* Título */}
            <h1
              className="font-serif text-3xl md:text-4xl font-extrabold mb-3 leading-tight"
              style={{ color: "#1e293b" }}
            >
              Solicitação Recebida!
            </h1>

            {/* Subtítulo */}
            <p className="text-lg mb-2 font-semibold" style={{ color: "#4a87b9" }}>
              Sua cotação gratuita está sendo preparada.
            </p>
            <p className="text-base mb-8" style={{ color: "#475569" }}>
              Um consultor da Mora Care vai entrar em contato com você em até{" "}
              <strong style={{ color: "#1e293b" }}>5 minutos</strong> com as melhores
              opções para o seu perfil.
            </p>

            {/* Info de tempo */}
            <div
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 mb-8"
              style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}
            >
              <Clock size={18} style={{ color: "#4a87b9" }} />
              <span className="text-sm font-medium" style={{ color: "#1e4f7a" }}>
                Horário de atendimento: Seg–Sex das 8h às 18h
              </span>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full rounded-xl py-4 px-6 text-base font-extrabold uppercase tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-4"
              style={{
                background: "#25D366",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
              }}
            >
              <MessageCircle size={22} />
              Falar Agora pelo WhatsApp
            </a>

            {/* Link voltar */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
              style={{ color: "#64748b" }}
            >
              <ArrowLeft size={15} />
              Voltar para o início
            </Link>
          </div>

          {/* Rodapé discreto */}
          <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.65)" }}>
            Moracare Saúde e Benefícios · CNPJ 57.047.541/0001-92
          </p>
        </div>
      </main>
    </div>
  );
}
