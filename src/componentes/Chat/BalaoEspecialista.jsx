
import PropTypes from 'prop-types'

/**
 * Componente BalaoEspecialista
 * Renderiza uma mensagem enviada pelo especialista.
 * 
 * Visuais:
 * - Avatar à esquerda
 * - Balão com fundo escuro (#1a1a1a)
 * - Timestamp abaixo
 */
export default function BalaoEspecialista({ mensagem, timestamp, emoji, corAvatar, digitando = false }) {
    // Formata hora HH:MM
    const horaFormatada = timestamp
        ? new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        : ''

    return (
        <div className="flex w-full mb-4 animate-fade-in-up">
            {/* Avatar */}
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0"
                style={{ backgroundColor: corAvatar }}
            >
                {emoji}
            </div>

            <div className="flex flex-col max-w-[80%]">
                {/* Balão */}
                <div className="bg-[#1a1a1a] text-white px-4 py-3 rounded-r-2xl rounded-bl-2xl">
                    {digitando ? (
                        <div className="flex gap-1 h-5 items-center">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{mensagem}</p>
                    )}
                </div>

                {/* Timestamp */}
                {!digitando && (
                    <span className="text-[#cccccc] text-xs mt-1 ml-1">
                        {horaFormatada}
                    </span>
                )}
            </div>
        </div>
    )
}

BalaoEspecialista.propTypes = {
    mensagem: PropTypes.string,
    timestamp: PropTypes.string,
    emoji: PropTypes.string.isRequired,
    corAvatar: PropTypes.string.isRequired,
    digitando: PropTypes.bool
}
