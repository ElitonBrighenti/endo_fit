
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
        <div className="flex justify-end mb-4">
            <div className="bg-[#FF6B00] text-white p-3 rounded-lg max-w-[70%] relative">
                <p className="text-sm">{mensagem}</p>
                {/* Timestamp */}
                <span className="text-[#666666] text-[0.75rem] mt-1 mr-1">
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
