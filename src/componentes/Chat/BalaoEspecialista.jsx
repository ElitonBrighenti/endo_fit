
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
        <div className="flex flex-col mb-2 animate-message-enter">
            <div className="flex items-start gap-2">
                {/* Avatar */}
                <div
                    className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-xs border border-[#2a2a2a] flex-shrink-0 mt-1"
                    style={{ backgroundColor: corAvatar }}
                >
                    {emoji}
                </div>

                {/* Balão */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-tl-[4px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-[18px] py-3 px-4 max-w-[75%] md:max-w-[55%]">
                    <p className="text-white text-[0.9rem] leading-[1.6]">
                        {mensagem}
                    </p>
                </div>
            </div>

            {/* Timestamp */}
            <span className="text-[#666666] text-[0.75rem] mt-1 ml-[44px]">
                {horaFormatada}
            </span>
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
