
import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Componente InputMensagem
 * Campo de texto fixo no rodapé para envio de mensagens.
 * 
 * Props:
 * - aoEnviar: Função chamada com o texto da mensagem
 * - desabilitado: Se true, bloqueia o input (ex: enquanto espera resposta)
 */
export default function InputMensagem({ aoEnviar, desabilitado }) {
    const [texto, setTexto] = useState('')

    const handleEnviar = () => {
        if (texto.trim() && !desabilitado) {
            aoEnviar(texto)
            setTexto('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleEnviar()
        }
    }

    return (
        <div className="fixed bottom-0 w-full md:max-w-[700px] left-1/2 -translate-x-1/2 bg-[#1a1a1a] border-t border-[#2a2a2a] px-6 py-3 z-20 md:border-x">
            <div className="w-full flex items-center gap-2">
                <input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua mensagem..."
                    disabled={desabilitado}
                    className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] text-white rounded-[24px] px-5 py-3 text-[16px] focus:outline-none focus:border-endo-laranja focus:ring-0 transition-all placeholder:text-[#666666]"
                />

                <button
                    onClick={handleEnviar}
                    disabled={!texto.trim() || desabilitado}
                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all flex-shrink-0 active:scale-95
            ${!texto.trim() || desabilitado
                            ? 'bg-[#2a2a2a] text-[#666666] cursor-not-allowed opacity-40'
                            : 'bg-endo-laranja text-white hover:bg-[#cc5500]'
                        }
          `}
                >
                    {/* Ícone de Seta/Enviar */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    )
}

InputMensagem.propTypes = {
    aoEnviar: PropTypes.func.isRequired,
    desabilitado: PropTypes.bool
}
