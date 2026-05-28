import { useState, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";

type TipoPlano = "Individual" | "Familiar" | "PJ" | "MEI";

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  tipoPlano: TipoPlano | "";
}

interface FormErrors {
  nome?: string;
  telefone?: string;
  email?: string;
  tipoPlano?: string;
}

function generateSessionId(): string {
  return `mc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nome.trim() || data.nome.trim().length < 2) errors.nome = "Informe seu nome completo";
  if (!data.telefone || data.telefone.replace(/\D/g, "").length < 8) errors.telefone = "Informe um telefone válido";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Informe um e-mail válido";
  if (!data.tipoPlano) errors.tipoPlano = "Selecione o tipo de plano";
  return errors;
}

const trustItems = [
  { icon: ShieldCheck, label: "Consultoria 100% gratuita" },
  { icon: Star, label: "Maiores operadoras do Brasil" },
  { icon: Clock, label: "Resposta em até 2 horas" },
];

export default function HeroSection() {
  const sessionId = useRef(generateSessionId());
  const tiroDisparado = useRef(false);

  const [form, setForm] = useState<FormData>({ nome: "", telefone: "", email: "", tipoPlano: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const completeLead = trpc.leads.complete.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: unknown) => { console.error("[Complete] Erro:", err); setSubmitted(true); },
  });

  const submitInitial = trpc.leads.submitInitial.useMutation({
    onSuccess: (data) => {
      tiroDisparado.current = true;
      // Dispara complete somente após o Tiro Imediato ser registrado no cache
      completeLead.mutate({ sessionId: sessionId.current });
    },
    onError: (err: unknown) => {
      console.error("[Tiro Imediato] Erro:", err);
      // Mesmo com erro no tiro, tenta concluir para não bloquear o usuário
      completeLead.mutate({ sessionId: sessionId.current });
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === "telefone" ? formatPhone(value) : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    if (!form.tipoPlano) return;

    const payload = {
      sessionId: sessionId.current,
      nome: form.nome.trim(),
      telefone: form.telefone,
      email: form.email.trim().toLowerCase(),
      tipoPlano: form.tipoPlano as TipoPlano,
    };

    // TIRO IMEDIATO: submitInitial dispara para Sheets + BotConversa como "Lead Incompleto"
    // O complete é chamado em onSuccess, garantindo que o cache de sessão já existe
    if (!tiroDisparado.current) {
      submitInitial.mutate(payload);
    } else {
      // Tiro já disparado — apenas conclui com status "Lead Concluiu"
      completeLead.mutate({ sessionId: sessionId.current });
    }
  };

  const isPending = submitInitial.isPending || completeLead.isPending;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 100% 80% at 65% 35%, oklch(0.16 0.030 255) 0%, oklch(0.09 0.018 255) 55%, oklch(0.07 0.012 255) 100%)",
      }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Orb dourado */}
        <div
          className="absolute -top-20 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--mc-gold) 0%, transparent 65%)" }}
        />
        {/* Grade sutil */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Linha diagonal decorativa */}
        <div
          className="absolute top-0 right-[38%] w-px h-full opacity-10"
          style={{ background: "linear-gradient(180deg, transparent 0%, var(--mc-gold) 40%, var(--mc-gold) 60%, transparent 100%)" }}
        />
      </div>

      <div className="container relative z-10 py-28 md:py-32 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

          {/* ── Coluna de texto ── */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="badge-gold mb-6">
              <Star className="w-3 h-3 fill-current" />
              Curitiba e Região Metropolitana
            </div>

            {/* Título */}
            <h1 className="font-serif text-4xl md:text-5xl xl:text-[3.5rem] font-bold text-white mb-6 leading-[1.08]">
              Blinde a Saúde da Sua{" "}
              <span className="text-gradient-gold">Família ou Empresa</span>{" "}
              com os Melhores Planos de Curitiba.
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: "oklch(0.70 0.010 255)" }}>
              Consultoria gratuita e imparcial para você economizar tempo e
              dinheiro. Encontramos o plano perfeito para o seu orçamento nas
              maiores operadoras do mercado.
            </p>

            {/* Trust items */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mc-gold)" }} />
                  <span className="text-sm font-medium" style={{ color: "oklch(0.72 0.010 255)" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA mobile */}
            <a href="#formulario" className="btn-cta btn-cta-shimmer lg:hidden inline-flex">
              ✓ SOLICITAR COTAÇÃO AGORA
            </a>
          </div>

          {/* ── Coluna do formulário ── */}
          <div id="formulario" className="animate-fade-in-up delay-200">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.12 0.020 255 / 0.90)",
                border: "1px solid oklch(0.26 0.022 255)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 32px 80px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(0.72 0.148 67 / 0.06)",
              }}
            >
              {/* Faixa dourada no topo */}
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, var(--mc-gold-dark), var(--mc-gold), var(--mc-gold-light))" }}
              />

              <div className="p-7 md:p-9">
                {!submitted ? (
                  <>
                    <div className="mb-7">
                      <h2 className="font-serif text-2xl font-bold text-white mb-1.5">
                        Solicite sua cotação gratuita
                      </h2>
                      <p className="text-sm" style={{ color: "var(--mc-text-muted)" }}>
                        Preencha abaixo e receba as melhores opções em até 2h.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Nome */}
                      <div>
                        <label htmlFor="nome" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--mc-gold-light)" }}>
                          Nome completo
                        </label>
                        <input
                          id="nome" name="nome" type="text" autoComplete="name"
                          placeholder="Seu nome completo"
                          value={form.nome} onChange={handleChange}
                          className="input-dark" aria-invalid={!!errors.nome}
                        />
                        {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome}</p>}
                      </div>

                      {/* Telefone */}
                      <div>
                        <label htmlFor="telefone" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--mc-gold-light)" }}>
                          WhatsApp / Telefone
                        </label>
                        <input
                          id="telefone" name="telefone" type="tel" autoComplete="tel"
                          placeholder="(41) 99999-9999"
                          value={form.telefone} onChange={handleChange}
                          className="input-dark" aria-invalid={!!errors.telefone}
                        />
                        {errors.telefone && <p className="mt-1 text-xs text-red-400">{errors.telefone}</p>}
                      </div>

                      {/* E-mail */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--mc-gold-light)" }}>
                          E-mail
                        </label>
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          placeholder="seu@email.com"
                          value={form.email} onChange={handleChange}
                          className="input-dark" aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                      </div>

                      {/* Tipo de Plano */}
                      <div>
                        <label htmlFor="tipoPlano" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--mc-gold-light)" }}>
                          Tipo de plano
                        </label>
                        <select
                          id="tipoPlano" name="tipoPlano"
                          value={form.tipoPlano} onChange={handleChange}
                          className="select-dark" aria-invalid={!!errors.tipoPlano}
                        >
                          <option value="">Selecione o tipo de plano</option>
                          <option value="Individual">Individual</option>
                          <option value="Familiar">Familiar</option>
                          <option value="PJ">PJ (Pessoa Jurídica)</option>
                          <option value="MEI">MEI</option>
                        </select>
                        {errors.tipoPlano && <p className="mt-1 text-xs text-red-400">{errors.tipoPlano}</p>}
                      </div>

                      {/* Erro geral */}
                      {(submitInitial.isError || completeLead.isError) && (
                        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                          Ocorreu um erro. Por favor, tente novamente.
                        </p>
                      )}

                      {/* Botão CTA */}
                      <button
                        type="submit"
                        disabled={isPending}
                        className="btn-cta btn-cta-shimmer w-full mt-2 text-sm py-4"
                      >
                        {isPending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            ✓ SOLICITAR COTAÇÃO AGORA
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs mt-2" style={{ color: "var(--mc-text-faint)" }}>
                        🔒 Seus dados estão protegidos. Sem spam, sem compromisso.
                      </p>
                    </form>
                  </>
                ) : (
                  /* Estado de sucesso */
                  <div className="text-center py-10 animate-fade-in">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "var(--mc-gold-muted)", border: "1px solid oklch(0.72 0.148 67 / 0.3)" }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: "var(--mc-gold)" }} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-3">
                      Cotação solicitada!
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--mc-text-muted)" }}>
                      Nossa equipe entrará em contato em até 2 horas.
                      <br />
                      Obrigado por confiar na <strong className="text-white">Mora Care</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Micro-prova social abaixo do form */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex -space-x-1.5">
                {["F", "R", "M", "C"].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2"
                    style={{
                      background: `oklch(${0.35 + i * 0.05} 0.020 ${255 + i * 10})`,
                      borderColor: "oklch(0.09 0.018 255)",
                      color: "var(--mc-gold-light)",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--mc-text-muted)" }}>
                <strong className="text-white">+500 famílias</strong> já economizaram com a Mora Care
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divisor de seção */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-12">
          <path d="M0 48 L1440 0 L1440 48 Z" fill="oklch(0.12 0.018 255)" />
        </svg>
      </div>
    </section>
  );
}
