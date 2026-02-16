
import PropTypes from 'prop-types'

/**
 * Componente CardEspecialista
 * Exibe as informações resumidas de um especialista.
 * 
 * Props:
 * - especialista: Objeto com dados do especialista (id, nome, cargo, badge, descricao, emoji, corAvatar)
 * - aoClicar: Função de callback para navegar para o chat
 */
export default function CardEspecialista({ especialista, aoClicar }) {
    const { nome, cargo, badge, descricao, emoji, corAvatar } = especialista

    return (
        <button
            onClick={aoClicar}
            className="w-full bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] hover:border-endo-laranja transition-all duration-300 group text-left flex flex-col items-center"
        >
            {/* Avatar Circular */}
            <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[2rem] shadow-lg mb-3"
                style={{ backgroundColor: corAvatar }}
            >
                {emoji}
            </div>

            {/* Nome e Cargo */}
            <h3 className="text-white font-bold text-lg mt-3">{nome}</h3>
            <span className="text-[#cccccc] text-sm">{cargo}</span>

            {/* Badge */}
            <span className="mt-2 inline-block px-3 py-1 bg-endo-laranja/20 text-endo-laranja text-xs font-bold rounded-full">
                {badge}
            </span>

            {/* Descrição */}
            <p className="text-[#cccccc] text-sm text-center mt-3 leading-relaxed">
                {descricao}
            </p>

            {/* Botão de Ação */}
            <div className="w-full mt-4 bg-endo-laranja text-white font-bold text-sm rounded-lg h-[52px] flex items-center justify-center transition-colors group-hover:bg-endo-laranja-escuro">
                <span className="mr-2">💬</span> Falar com {nome}
            </div>
        </button>
    )
}

CardEspecialista.propTypes = {
    especialista: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        cargo: PropTypes.string.isRequired,
        badge: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        corAvatar: PropTypes.string.isRequired
    }).isRequired,
    aoClicar: PropTypes.func.isRequired
}
