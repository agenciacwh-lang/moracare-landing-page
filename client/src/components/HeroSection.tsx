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

  // Armazena o payload do Passo 1 para reutilizar no Passo 2 (stateless — sem cache no servidor)
  const step1Payload = useRef<{
    sessionId: string; nome: string; email: string; telefone: string; tipoPlano: TipoPlano;
  } | null>(null);

  const completeLead = trpc.leads.complete.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err: unknown) => { console.error("[Complete] Erro:", err); setSubmitted(true); },
  });

  const submitInitial = trpc.leads.submitInitial.useMutation({
    onSuccess: () => {
      tiroDisparado.current = true;
      if (step1Payload.current) completeLead.mutate(step1Payload.current);
    },
    onError: (err: unknown) => {
      console.error("[Tiro Imediato] Erro:", err);
      if (step1Payload.current) completeLead.mutate(step1Payload.current);
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

    // Salva o payload para reutilizar no Passo 2 (arquitetura stateless)
    step1Payload.current = payload;

    if (!tiroDisparado.current) {
      submitInitial.mutate(payload);
    } else {
      completeLead.mutate(payload);
    }
  };

  const isPending = submitInitial.isPending || completeLead.isPending;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1e4f7a 0%, #2d6a9f 35%, #4a87b9 70%, #6fa3cc 100%)",
      }}
    >
      {/* Decoração de fundo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Orb teal */}
        <div
          className="absolute -top-16 right-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #83d6d3 0%, transparent 65%)" }}
        />
        {/* Orb teal inferior */}
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #83d6d3 0%, transparent 70%)" }}
        />
        {/* Grade sutil */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 py-28 md:py-32 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

          {/* ── Coluna de texto ── */}
          <div className="animate-fade-in-up">
            {/* Badge verde */}
            <div className="badge-green mb-6">
              <Star className="w-3 h-3 fill-current" />
              Curitiba e Região Metropolitana
            </div>

            {/* Título */}
            <h1 className="font-serif text-4xl md:text-5xl xl:text-[3.5rem] font-bold mb-6 leading-[1.08]" style={{ color: "#ffffff" }}>
              Blinde a Saúde da Sua{" "}
              <span style={{ color: "#83d6d3" }}>Família ou Empresa</span>{" "}
              com os Melhores Planos de Curitiba.
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: "#e2f0fb" }}>
              Consultoria gratuita e imparcial para você economizar tempo e
              dinheiro. Encontramos o plano perfeito para o seu orçamento nas
              maiores operadoras do mercado.
            </p>

            {/* Trust items */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "#abba3b" }} />
                  <span className="text-sm font-semibold" style={{ color: "#e2f0fb" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA mobile */}
            <a href="#formulario" className="btn-cta lg:hidden inline-flex">
              ✓ SOLICITAR COTAÇÃO AGORA
            </a>
          </div>

          {/* ── Coluna do formulário ── */}
          <div id="formulario" className="animate-fade-in-up delay-200">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 24px 64px rgba(30, 79, 122, 0.30)",
              }}
            >
              {/* Faixa azul no topo */}
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, #1e4f7a, #4a87b9, #83d6d3)" }}
              />

              <div className="p-7 md:p-9">
                {!submitted ? (
                  <>
                    <div className="mb-7">
                      <p className="font-serif text-2xl font-bold mb-1.5" style={{ color: "#1e293b" }}>
                        Solicite sua cotação gratuita
                      </p>
                      <p className="text-sm" style={{ color: "#475569" }}>
                        Preencha abaixo e receba as melhores opções em até 2h.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Nome */}
                      <div>
                        <label htmlFor="nome" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#2d6a9f" }}>
                          Nome completo
                        </label>
                        <input
                          id="nome" name="nome" type="text" autoComplete="name"
                          placeholder="Seu nome completo"
                          value={form.nome} onChange={handleChange}
                          className="input-clean" aria-invalid={!!errors.nome}
                        />
                        {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
                      </div>

                      {/* Telefone */}
                      <div>
                        <label htmlFor="telefone" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#2d6a9f" }}>
                          WhatsApp / Telefone
                        </label>
                        <input
                          id="telefone" name="telefone" type="tel" autoComplete="tel"
                          placeholder="(41) 99999-9999"
                          value={form.telefone} onChange={handleChange}
                          className="input-clean" aria-invalid={!!errors.telefone}
                        />
                        {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>}
                      </div>

                      {/* E-mail */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#2d6a9f" }}>
                          E-mail
                        </label>
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          placeholder="seu@email.com"
                          value={form.email} onChange={handleChange}
                          className="input-clean" aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>

                      {/* Tipo de Plano */}
                      <div>
                        <label htmlFor="tipoPlano" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#2d6a9f" }}>
                          Tipo de plano
                        </label>
                        <select
                          id="tipoPlano" name="tipoPlano"
                          value={form.tipoPlano} onChange={handleChange}
                          className="select-clean" aria-invalid={!!errors.tipoPlano}
                        >
                          <option value="">Selecione o tipo de plano</option>
                          <option value="Individual">Individual</option>
                          <option value="Familiar">Familiar</option>
                          <option value="PJ">PJ (Pessoa Jurídica)</option>
                          <option value="MEI">MEI</option>
                        </select>
                        {errors.tipoPlano && <p className="mt-1 text-xs text-red-500">{errors.tipoPlano}</p>}
                      </div>

                      {/* Erro geral */}
                      {(submitInitial.isError || completeLead.isError) && (
                        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                          Ocorreu um erro. Por favor, tente novamente.
                        </p>
                      )}

                      {/* Botão CTA verde */}
                      <button
                        type="submit"
                        disabled={isPending}
                        className="btn-cta w-full mt-2 text-sm py-4"
                      >
                        {isPending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            ✓ SOLICITAR COTAÇÃO AGORA
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs mt-2" style={{ color: "#64748b" }}>
                        🔒 Seus dados estão protegidos. Sem spam, sem compromisso.
                      </p>
                    </form>
                  </>
                ) : (
                  /* Estado de sucesso */
                  <div className="text-center py-10 animate-fade-in">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "#f4f7d6", border: "2px solid rgba(171,186,59,0.35)" }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: "#abba3b" }} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "#1e4f7a" }}>
                      Cotação solicitada!
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                      Nossa equipe entrará em contato em até 2 horas.
                      <br />
                      Obrigado por confiar na <strong style={{ color: "#4a87b9" }}>Mora Care</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Micro-prova social */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex -space-x-1.5">
                {["F", "R", "M", "C"].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2"
                    style={{
                      background: i % 2 === 0 ? "#2d6a9f" : "#1e4f7a",
                      borderColor: "#ffffff",
                      color: "#ffffff",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "#c8e4f5" }}>
                <strong style={{ color: "#ffffff" }}>+500 famílias</strong> já economizaram com a Mora Care
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divisor de seção */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-12">
          <path d="M0 48 L1440 0 L1440 48 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
