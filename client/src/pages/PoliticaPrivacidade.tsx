import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const WA_LINK = "https://wa.me/5541991916738";
const EMAIL = "contato@kplemcorretora.com.br";

type Block =
  | { type: "p"; text: ReactNode }
  | { type: "ul"; items: ReactNode[] };

interface Section {
  title: string;
  blocks: Block[];
}

const sections: Section[] = [
  {
    title: "1. Quem somos (Controlador dos Dados)",
    blocks: [
      { type: "p", text: "Os dados pessoais coletados neste site são tratados por:" },
      {
        type: "ul",
        items: [
          <>
            <strong>Razão / Nome empresarial:</strong> Moracare Saúde e Benefícios (KPLEM Corretora)
          </>,
          <>
            <strong>CNPJ:</strong> 57.047.541/0001-92
          </>,
          <>
            <strong>Registro SUSEP:</strong> nº 251170551
          </>,
          <>
            <strong>Endereço:</strong> Rua Grécia, 128 – Loja 5, Centro – Fazenda Rio Grande – PR, CEP 83823-016
          </>,
          <>
            <strong>E-mail de contato:</strong>{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "#4a87b9" }}>
              {EMAIL}
            </a>
          </>,
          <>
            <strong>WhatsApp:</strong>{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#4a87b9" }}>
              (41) 99191-6738
            </a>
          </>,
        ],
      },
    ],
  },
  {
    title: "2. Natureza do serviço (Isenção de responsabilidade)",
    blocks: [
      {
        type: "p",
        text: (
          <>
            A Mora Care <strong>NÃO é uma operadora de planos de saúde</strong>, seguradora ou
            administradora de benefícios.
          </>
        ),
      },
      {
        type: "p",
        text: "Atuamos exclusivamente como um canal independente e autorizado de captação e consultoria, cuja função é conectar você a corretores devidamente habilitados que apresentarão cotações e opções de planos de saúde das operadoras parceiras.",
      },
      {
        type: "p",
        text: "A contratação, a cobertura, os valores e as condições dos planos são de responsabilidade exclusiva das operadoras de saúde escolhidas por você. As marcas de operadoras eventualmente exibidas neste site pertencem a seus respectivos titulares e são citadas apenas para fins de identificação dos planos disponíveis para cotação.",
      },
    ],
  },
  {
    title: "3. Quais dados coletamos",
    blocks: [
      {
        type: "p",
        text: (
          <>
            <strong>3.1. Dados que você nos fornece.</strong> Quando você preenche nossos formulários
            ou responde ao nosso quiz de cotação, coletamos:
          </>
        ),
      },
      {
        type: "ul",
        items: [
          "Nome completo",
          "Telefone / WhatsApp",
          "E-mail",
          "Cidade",
          "Idade",
          "Respostas do quiz (tipo de plano de interesse — Individual, Familiar, PJ ou MEI — e demais informações fornecidas voluntariamente)",
        ],
      },
      {
        type: "p",
        text: (
          <>
            <strong>3.2. Dados coletados automaticamente.</strong> Durante a navegação, podemos coletar
            automaticamente informações técnicas por meio de cookies e tecnologias similares, tais
            como: endereço IP, tipo de dispositivo e navegador, páginas acessadas, origem do acesso
            (campanhas) e identificadores de rastreamento de marketing.
          </>
        ),
      },
    ],
  },
  {
    title: "4. Finalidade do tratamento dos dados",
    blocks: [
      { type: "p", text: "Os dados coletados são utilizados exclusivamente para as seguintes finalidades:" },
      {
        type: "ul",
        items: [
          <>
            Permitir que <strong>corretores autorizados entrem em contato</strong> para apresentar
            cotações e opções de planos de saúde;
          </>,
          "Personalizar o atendimento de acordo com o perfil informado (tipo de plano, cidade, idade);",
          "Enviar comunicações relacionadas à cotação solicitada, incluindo por WhatsApp, telefone e e-mail;",
          "Mensurar e otimizar nossas campanhas de marketing e a experiência de navegação no site;",
          "Cumprir obrigações legais e regulatórias.",
        ],
      },
      {
        type: "p",
        text: "Seus dados não serão utilizados para finalidades diversas das aqui descritas sem o seu consentimento prévio.",
      },
    ],
  },
  {
    title: "5. Base legal para o tratamento",
    blocks: [
      {
        type: "p",
        text: "O tratamento dos seus dados pessoais fundamenta-se principalmente no seu consentimento (art. 7º, I, da LGPD), manifestado no momento do preenchimento e envio do formulário.",
      },
      {
        type: "p",
        text: "Também podemos tratar dados com base no legítimo interesse (art. 7º, IX) para fins de mensuração de campanhas e melhoria do serviço, e para o cumprimento de obrigações legais e regulatórias (art. 7º, II), sempre respeitando seus direitos e liberdades fundamentais.",
      },
    ],
  },
  {
    title: "6. Compartilhamento de dados",
    blocks: [
      { type: "p", text: "Para viabilizar a prestação do serviço, seus dados poderão ser compartilhados com:" },
      {
        type: "ul",
        items: [
          "Corretores de seguros autorizados e parceiros habilitados, responsáveis por realizar o contato e apresentar as cotações;",
          "Ferramentas e plataformas operacionais utilizadas para armazenar e organizar os contatos e automatizar o atendimento (por exemplo, planilhas em nuvem e plataformas de automação de mensagens);",
          "Plataformas de publicidade e análise (como Google e Meta/Facebook), para mensuração e otimização de campanhas.",
        ],
      },
      {
        type: "p",
        text: "Alguns desses parceiros podem estar localizados fora do Brasil, o que pode implicar transferência internacional de dados. Nesses casos, adotamos medidas para assegurar que o tratamento ocorra em conformidade com a LGPD.",
      },
      {
        type: "p",
        text: (
          <>
            <strong>Não vendemos</strong> seus dados pessoais a terceiros.
          </>
        ),
      },
    ],
  },
  {
    title: "7. Cookies e tecnologias de rastreamento",
    blocks: [
      {
        type: "p",
        text: "Utilizamos cookies e pixels de rastreamento (como o Facebook Pixel e ferramentas do Google) para entender o comportamento de navegação, mensurar a eficácia de campanhas e melhorar sua experiência.",
      },
      {
        type: "p",
        text: "Você pode gerenciar ou desabilitar cookies nas configurações do seu navegador, ciente de que isso pode afetar algumas funcionalidades do site.",
      },
    ],
  },
  {
    title: "8. Armazenamento e retenção",
    blocks: [
      {
        type: "p",
        text: "Seus dados pessoais serão armazenados apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política, ou pelo período exigido por obrigações legais e regulatórias.",
      },
      {
        type: "p",
        text: "Após esse período, os dados serão eliminados ou anonimizados de forma segura, salvo hipóteses de guarda autorizadas ou determinadas por lei.",
      },
    ],
  },
  {
    title: "9. Segurança da informação",
    blocks: [
      {
        type: "p",
        text: "Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados pessoais contra acessos não autorizados, perda, alteração, destruição ou qualquer forma de tratamento inadequado ou ilícito.",
      },
      {
        type: "p",
        text: "Ressaltamos, contudo, que nenhum sistema é completamente imune a riscos, e nos comprometemos a comunicar você e a autoridade competente na hipótese de incidentes de segurança relevantes, nos termos da lei.",
      },
    ],
  },
  {
    title: "10. Seus direitos como titular dos dados",
    blocks: [
      {
        type: "p",
        text: "Nos termos do art. 18 da LGPD, você tem o direito de, a qualquer momento e mediante requisição, obter:",
      },
      {
        type: "ul",
        items: [
          "Confirmação da existência de tratamento dos seus dados;",
          "Acesso aos seus dados;",
          "Correção de dados incompletos, inexatos ou desatualizados;",
          "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;",
          "Portabilidade dos dados a outro fornecedor;",
          "Eliminação dos dados tratados com base no consentimento;",
          "Informação sobre com quem seus dados foram compartilhados;",
          "Informação sobre a possibilidade de não fornecer consentimento e as consequências dessa negativa;",
          "Revogação do consentimento.",
        ],
      },
    ],
  },
  {
    title: "11. Como exercer seus direitos",
    blocks: [
      {
        type: "p",
        text: "Para exercer qualquer um dos direitos acima, ou para esclarecer dúvidas sobre o tratamento dos seus dados, entre em contato com nosso canal de privacidade:",
      },
      {
        type: "ul",
        items: [
          <>
            <strong>E-mail:</strong>{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "#4a87b9" }}>
              {EMAIL}
            </a>
          </>,
          <>
            <strong>WhatsApp:</strong>{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#4a87b9" }}>
              (41) 99191-6738
            </a>
          </>,
        ],
      },
      {
        type: "p",
        text: "Responderemos à sua solicitação no menor prazo possível, observados os requisitos legais.",
      },
    ],
  },
  {
    title: "12. Dados de menores",
    blocks: [
      {
        type: "p",
        text: "Este site e nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores de idade sem o consentimento específico e em destaque de um dos pais ou responsável legal.",
      },
    ],
  },
  {
    title: "13. Alterações desta Política",
    blocks: [
      {
        type: "p",
        text: "Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças legais, regulatórias ou em nossos processos. A versão vigente estará sempre disponível neste site, com a data da última atualização indicada no topo.",
      },
    ],
  },
  {
    title: "14. Contato",
    blocks: [
      {
        type: "p",
        text: "Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, fale conosco:",
      },
      {
        type: "p",
        text: (
          <>
            <strong>Moracare Saúde e Benefícios</strong>
            <br />
            E-mail:{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "#4a87b9" }}>
              {EMAIL}
            </a>
            <br />
            WhatsApp: (41) 99191-6738
            <br />
            Endereço: Rua Grécia, 128 – Loja 5, Centro – Fazenda Rio Grande – PR, CEP 83823-016
          </>
        ),
      },
    ],
  },
];

export default function PoliticaPrivacidade() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f5f8fb" }}>
      {/* Cabeçalho */}
      <header
        className="w-full px-6 py-5"
        style={{ background: "linear-gradient(135deg, #1e4f7a 0%, #4a87b9 60%, #2d6a9f 100%)" }}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/moracare-logo.jpeg"
              alt="MoraCare Saúde e Benefícios"
              className="h-10 w-auto object-contain rounded"
              style={{ filter: "brightness(1.05) drop-shadow(0 1px 3px rgba(0,0,0,0.20))" }}
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Voltar ao site
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 py-10 md:py-14 px-4">
        <article
          className="container max-w-3xl rounded-3xl bg-white p-6 md:p-12 shadow-xl"
          style={{ border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #4a87b9 0%, #2d6a9f 100%)" }}
            >
              <ShieldCheck size={22} color="#fff" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold" style={{ color: "#1e293b" }}>
              Política de Privacidade
            </h1>
          </div>
          <p className="text-sm mb-8" style={{ color: "#64748b" }}>
            Última atualização: julho de 2026
          </p>

          <p className="text-base leading-relaxed mb-4" style={{ color: "#334155" }}>
            A sua privacidade é prioridade para a <strong>Moracare Saúde e Benefícios</strong>. Esta
            Política descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os
            dados pessoais fornecidos por você ao utilizar este site, em total conformidade com a Lei
            nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD).
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#334155" }}>
            Ao preencher nossos formulários ou navegar neste site, você declara estar ciente e de
            acordo com as práticas descritas neste documento.
          </p>

          {sections.map((section) => (
            <section key={section.title} className="mb-8">
              <h2
                className="font-serif text-xl md:text-2xl font-bold mb-3"
                style={{ color: "#1e4f7a" }}
              >
                {section.title}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className="text-base leading-relaxed mb-3" style={{ color: "#334155" }}>
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="list-disc pl-5 mb-3 space-y-1.5">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-base leading-relaxed" style={{ color: "#334155" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}

          <div className="pt-6 mt-8" style={{ borderTop: "1px solid #e2e8f0" }}>
            <Link
              href="/termos-de-uso"
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: "#4a87b9" }}
            >
              Leia também nossos Termos de Uso →
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
