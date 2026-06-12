import { useState, useEffect } from 'react';
import { X, CheckCircle2, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '5541991916738';

export function CNPJMEIPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mostrar popup após 3 segundos de carregamento
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleBusinessClick = () => {
    const message = encodeURIComponent('Quero contratar meu plano empresarial com até 30% de desconto!');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handlePersonalClick = () => {
    const message = encodeURIComponent('Olá, vim pelo o site quero mais informações!');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Premium */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-2xl max-w-lg w-full animate-in fade-in zoom-in duration-500 overflow-hidden border border-blue-100">
          
          {/* Header com gradiente */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 px-8 py-10 overflow-hidden">
            {/* Decoração de fundo */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            
            {/* Conteúdo do header */}
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  Economize<br />até 30%
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-white/90 text-sm font-medium relative z-10">
              Possui CNPJ ou MEI?
            </p>
          </div>

          {/* Conteúdo principal */}
          <div className="px-8 py-8 space-y-6">
            
            {/* Mensagem principal */}
            <div className="space-y-2">
              <p className="text-gray-800 font-semibold text-lg">
                Contrate seu plano de saúde com desconto especial
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Acesso às melhores operadoras do mercado com preços exclusivos para CNPJ e MEI
              </p>
            </div>

            {/* Benefícios em grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Mensalidades</p>
                    <p className="text-xs text-gray-600">Mais acessíveis</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Cobertura</p>
                    <p className="text-xs text-gray-600">Completa</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Opções</p>
                    <p className="text-xs text-gray-600">Empresa e MEI</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Cotação</p>
                    <p className="text-xs text-gray-600">Rápida e grátis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selo de confiança */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">+500 famílias já economizaram</p>
                <p className="text-xs text-gray-600">com a Mora Care</p>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBusinessClick}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Zap className="w-5 h-5 group-hover:animate-pulse" />
                QUERO ECONOMIZAR ATÉ 30%
              </button>
              <button
                onClick={handlePersonalClick}
                className="w-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                CONTRATAR COMO PESSOA FÍSICA
              </button>
            </div>

            {/* Rodapé */}
            <p className="text-xs text-gray-500 text-center pt-2">
              Cotação sem compromisso • Resposta em até 5 minutos
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
