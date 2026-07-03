import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";

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
    title: "1. Aceitação dos Termos",
    blocks: [
      {
        type: "p",
        text: "O uso deste site implica a aceitação plena e sem reservas destes Termos de Uso e da nossa Política de Privacidade. Caso você não concorde com qualquer disposição aqui prevista, pedimos que não utilize o site nem forneça seus dados.",
      },
    ],
  },
  {
    title: "2. Objeto e natureza do serviço",
    blocks: [
      {
        type: "p",
        text: "A Mora Care disponibiliza um site de captação de leads e consultoria para planos de saúde, cuja finalidade é conectar interessados a corretores de seguros autorizados, que apresentarão cotações e opções de planos das operadoras parceiras.",
      },
      {
        type: "p",
        text: (
          <>
            <strong>
              Isenção de responsabilidade — a Mora Care NÃO é uma operadora de planos de saúde.
            </strong>{" "}
            Não somos seguradora, administradora de benefícios nem prestadora de serviços de
            assistência à saúde. Atuamos exclusivamente como um canal independente e autorizado de
            intermediação e captação.
          </>
        ),
      },
      { type: "p", text: "Dessa forma:" },
      {
        type: "ul",
        items: [
          "Não comercializamos diretamente planos de saúde;",
          "Não garantimos aprovação, cobertura, valores, carências ou condições de qualquer plano;",
          "A contratação, a vigência e a execução do contrato de plano de saúde são de responsabilidade exclusiva da operadora escolhida e formalizada diretamente com ela;",
          "As marcas de operadoras eventualmente exibidas pertencem a seus respectivos titulares e são citadas apenas para identificação das opções disponíveis para cotação.",
        ],
      },
    ],
  },
  {
    title: "3. Registro e identificação",
    blocks: [
      { type: "p", text: "A atividade de intermediação é exercida por corretora devidamente habilitada:" },
      {
        type: "ul",
        items: [
          <>
            <strong>Moracare Saúde e Benefícios (KPLEM Corretora)</strong>
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
        ],
      },
    ],
  },
  {
    title: "4. Cadastro e veracidade das informações",
    blocks: [
      {
        type: "p",
        text: "Ao preencher os formulários e o quiz, você se compromete a fornecer informações verdadeiras, completas e atualizadas. Você é o único responsável pelos dados informados.",
      },
      {
        type: "p",
        text: "O fornecimento de dados falsos, incorretos ou de terceiros sem autorização é de responsabilidade exclusiva do usuário e poderá inviabilizar o atendimento e a apresentação de cotações.",
      },
    ],
  },
  {
    title: "5. Autorização de contato",
    blocks: [
      {
        type: "p",
        text: (
          <>
            Ao enviar seus dados por meio deste site, você <strong>autoriza expressamente</strong> que
            a Mora Care e os corretores autorizados entrem em contato pelos canais informados
            (telefone, WhatsApp e e-mail) para apresentar cotações e prestar atendimento relacionado
            ao seu interesse em planos de saúde.
          </>
        ),
      },
      {
        type: "p",
        text: "Você poderá solicitar o cancelamento desse contato a qualquer momento, conforme descrito na Política de Privacidade.",
      },
    ],
  },
  {
    title: "6. Propriedade intelectual",
    blocks: [
      {
        type: "p",
        text: "Todo o conteúdo deste site — incluindo textos, layout, marca, logotipos, imagens e demais elementos visuais de titularidade da Mora Care — é protegido por lei e não pode ser copiado, reproduzido, distribuído ou utilizado sem autorização prévia e por escrito, ressalvadas as marcas de terceiros, que pertencem a seus respectivos titulares.",
      },
    ],
  },
  {
    title: "7. Links e serviços de terceiros",
    blocks: [
      {
        type: "p",
        text: "Este site pode conter links ou integrações com serviços de terceiros (como WhatsApp, redes sociais e plataformas das operadoras). A Mora Care não se responsabiliza pelo conteúdo, pelas políticas ou pelas práticas desses terceiros, sendo recomendável a leitura dos respectivos termos e políticas.",
      },
    ],
  },
  {
    title: "8. Limitação de responsabilidade",
    blocks: [
      {
        type: "p",
        text: "A Mora Care empenha-se para manter as informações do site corretas e atualizadas, mas não garante que estejam livres de erros ou interrupções.",
      },
      {
        type: "p",
        text: "Na máxima extensão permitida pela legislação, a Mora Care não se responsabiliza por:",
      },
      {
        type: "ul",
        items: [
          "Decisões de contratação tomadas pelo usuário;",
          "Condições, coberturas, reajustes ou negativas praticados pelas operadoras de saúde;",
          "Indisponibilidades técnicas, falhas de conexão ou eventos fora de seu controle razoável.",
        ],
      },
    ],
  },
  {
    title: "9. Proteção de dados pessoais",
    blocks: [
      {
        type: "p",
        text: (
          <>
            O tratamento dos dados pessoais coletados neste site é regido pela nossa{" "}
            <Link href="/politica-de-privacidade" style={{ color: "#4a87b9", fontWeight: 600 }}>
              Política de Privacidade
            </Link>
            , elaborada em conformidade com a Lei Geral de Proteção de Dados (LGPD), que integra estes
            Termos de Uso para todos os fins.
          </>
        ),
      },
    ],
  },
  {
    title: "10. Modificações dos Termos",
    blocks: [
      {
        type: "p",
        text: "A Mora Care poderá alterar estes Termos de Uso a qualquer momento, visando adequá-los a mudanças legais ou operacionais. A versão atualizada será sempre publicada nesta página, com a respectiva data de atualização. O uso continuado do site após as alterações representa a aceitação dos novos termos.",
      },
    ],
  },
  {
    title: "11. Legislação aplicável e foro",
    blocks: [
      {
        type: "p",
        text: "Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro da comarca de Fazenda Rio Grande – PR (ou do domicílio do consumidor, quando aplicável, nos termos do Código de Defesa do Consumidor) para dirimir eventuais controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.",
      },
    ],
  },
  {
    title: "12. Contato",
    blocks: [
      { type: "p", text: "Em caso de dúvidas sobre estes Termos de Uso, entre em contato:" },
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
            WhatsApp:{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#4a87b9" }}>
              (41) 99191-6738
            </a>
            <br />
            Endereço: Rua Grécia, 128 – Loja 5, Centro – Fazenda Rio Grande – PR, CEP 83823-016
          </>
        ),
      },
    ],
  },
];

export default function TermosUso() {
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
              <FileText size={22} color="#fff" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold" style={{ color: "#1e293b" }}>
              Termos de Uso
            </h1>
          </div>
          <p className="text-sm mb-8" style={{ color: "#64748b" }}>
            Última atualização: julho de 2026
          </p>

          <p className="text-base leading-relaxed mb-8" style={{ color: "#334155" }}>
            Bem-vindo(a) ao site da <strong>Mora Care</strong>. Estes Termos de Uso regem o acesso e a
            utilização deste site e dos serviços de captação e consultoria aqui oferecidos. Ao navegar,
            preencher formulários ou responder ao nosso quiz, você declara ter lido, compreendido e
            aceito integralmente as condições abaixo.
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
              href="/politica-de-privacidade"
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: "#4a87b9" }}
            >
              Leia também nossa Política de Privacidade →
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
