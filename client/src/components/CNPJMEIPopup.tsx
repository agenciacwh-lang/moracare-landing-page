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
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
        <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-2xl w-full max-w-sm my-auto animate-in fade-in zoom-in duration-500 overflow-hidden border border-blue-100">
          
          {/* Header com gradiente */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 px-6 py-8 overflow-hidden">
            {/* Decoração de fundo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            {/* Conteúdo do header */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex-1">
                <p className="text-white/90 text-xs font-medium mb-2">
                  Oferta Especial
                </p>
                <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                  Possui CNPJ ou MEI?
                </h2>
                <p className="text-white/80 text-xs">
                  Economize até 30%
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="px-6 py-6 space-y-4">
            
            {/* Mensagem principal */}
            <div className="space-y-1">
              <p className="text-gray-800 font-semibold text-base">
                Plano de saúde com desconto especial
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Acesso às melhores operadoras com preços exclusivos
              </p>
            </div>

            {/* Benefícios em grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Mensalidades</p>
                    <p className="text-xs text-gray-600">Acessíveis</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Cobertura</p>
                    <p className="text-xs text-gray-600">Completa</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Opções</p>
                    <p className="text-xs text-gray-600">Empresa/MEI</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">Cotação</p>
                    <p className="text-xs text-gray-600">Rápida/Grátis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selo de confiança */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-xs">+500 famílias economizaram</p>
                <p className="text-xs text-gray-600">com a Mora Care</p>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleBusinessClick}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-sm"
              >
                <Zap className="w-4 h-4 group-hover:animate-pulse" />
                ECONOMIZAR ATÉ 30%
              </button>
              <button
                onClick={handlePersonalClick}
                className="w-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
              >
                PESSOA FÍSICA
              </button>
            </div>

            {/* Rodapé */}
            <p className="text-xs text-gray-500 text-center pt-1">
              Sem compromisso • Resposta em 5 min
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
