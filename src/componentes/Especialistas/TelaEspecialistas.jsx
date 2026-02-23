
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../../contexto/ContextoUsuario'
import { especialistas } from '../../dados/especialistas'
import CardEspecialista from './CardEspecialista'

/**
 * Tela de Seleção de Especialistas
 * Lista os especialistas disponíveis para iniciar uma conversa.
 * 
 * Funcionalidades:
 * - Proteção de rota: redireciona para login se não houver telefone.
 * - Header com info do usuário e opção de logout.
 * - Grid responsivo de cards.
 */
export default function TelaEspecialistas() {
    const { telefone, setTelefone, setEspecialistaAtivo } = useUsuario()
    const navigate = useNavigate()

    // Proteção de Rota: Verifica se existe usuário logado
    useEffect(() => {
        if (!telefone) {
            navigate('/')
        }
    }, [telefone, navigate])

    // Formata telefone para exibição: (XX) XXXXX-XXXX
    const telefoneFormatado = telefone ? String(telefone).replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : ''

    const handleLogout = () => {
        setTelefone('')
        setEspecialistaAtivo(null)
        navigate('/')
    }

    const handleSelecionarEspecialista = (id) => {
        setEspecialistaAtivo(id)
        navigate(`/chat/${id}`)
    }

    // Evita flash de conteúdo se não estiver logado
    if (!telefone) return null

    return (
        <div className="min-h-screen bg-endo-preto flex flex-col">
            {/* Header */}
            <header className="w-full bg-[#0f0f0f] px-5 py-4 border-b border-[#2a2a2a]">
                <div className="max-w-[1100px] mx-auto flex justify-center md:justify-end items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-[#cccccc] text-xs md:text-sm flex items-center gap-1">
                            📞 {telefoneFormatado}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-endo-laranja text-xs font-bold hover:text-endo-laranja-escuro flex items-center gap-1 transition-colors"
                        >
                            🔄 Trocar
                        </button>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 px-5 py-8 md:pt-10 w-full flex flex-col items-center">
                <div className="w-full max-w-[430px] md:max-w-[1100px]">

                    {/* Título e Logo */}
                    <div className="text-center mb-10">
                        <h1 className="text-[1.5rem] font-bold mb-2">
                            Endo<span className="text-endo-laranja">Fit</span>
                        </h1>
                        <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                            Olá! Com quem você quer falar hoje?
                        </h2>
                        <p className="text-[#cccccc] text-sm">
                            Escolha um especialista para começar sua conversa
                        </p>
                    </div>

                    {/* Grid de Cards - Responsivo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
                        {especialistas.map((especialista, index) => (
                            <div
                                key={especialista.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardEspecialista
                                    especialista={especialista}
                                    aoClicar={() => handleSelecionarEspecialista(especialista.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Rodapé */}
            <footer className="p-6 text-center">
                <p className="text-[#cccccc] text-sm">
                    Sua equipe está pronta para te ajudar a alcançar seus objetivos
                </p>
            </footer>
        </div>
    )
}
