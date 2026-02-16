
import PropTypes from 'prop-types'

/**
 * Componente BalaoUsuario
 * Renderiza uma mensagem enviada pelo usuário.
 * 
 * Visuais:
 * - Alinhado à direita
 * - Fundo laranja (#FF6B00)
 * - Timestamp abaixo
 */
export default function BalaoUsuario({ mensagem, timestamp }) {
    // Formata hora HH:MM
    const horaFormatada = new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    return (
        <div className="flex w-full mb-4 justify-end animate-fade-in-up">
            <div className="flex flex-col max-w-[80%] items-end">
                {/* Balão */}
                <div className="bg-endo-laranja/90 text-white px-4 py-3 rounded-l-2xl rounded-br-2xl text-left">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{mensagem}</p>
                </div>

                {/* Timestamp */}
                <span className="text-[#cccccc] text-xs mt-1 mr-1">
                    {horaFormatada}
                </span>
            </div>
        </div>
    )
}

BalaoUsuario.propTypes = {
    mensagem: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
}
