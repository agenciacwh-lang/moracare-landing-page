import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
          {/* Header com botão de fechar */}
          <div className="flex justify-between items-start p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-slate-900">
              Possui CNPJ ou MEI?
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-4">
            <p className="text-gray-700 font-medium">
              Economize até 30% na contratação do seu plano de saúde utilizando seu CNPJ ou MEI.
            </p>

            {/* Benefícios */}
            <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Mensalidades mais acessíveis</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Cobertura completa</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Opções para empresas e microempreendedores</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Cotação rápida e sem compromisso</span>
              </div>
            </div>

            {/* Botões */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleBusinessClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                QUERO ECONOMIZAR ATÉ 30%
              </Button>
              <Button
                onClick={handlePersonalClick}
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-colors"
              >
                QUERO CONTRATAR COMO PESSOA FÍSICA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
