
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUsuario } from '../../contexto/ContextoUsuario'
import { especialistas } from '../../dados/especialistas'
import BalaoEspecialista from './BalaoEspecialista'
import BalaoUsuario from './BalaoUsuario'
import InputMensagem from './InputMensagem'

/**
 * Respostas Mockadas para Fase 1
 * Simula a inteligência dos especialistas antes da integração com N8N.
 */
const RESPOSTAS_MOCK = {
    rafael: [
        "Boa! Treino constante é o segredo. Vamos ajustar a carga hoje?",
        "Entendi. Para esse objetivo, focar na intensidade é essencial.",
        "Bora! Sem desculpas hoje, hein? 💪",
        "Isso aí! Descanso também faz parte do treino, não esquece.",
        "Qual exercício você sentiu mais dificuldade na última sessão?"
    ],
    ana: [
        "Hidratação é fundamental nesse processo. Bebeu água hoje?",
        "Podemos substituir isso por uma fruta ou castanhas.",
        "Equilíbrio é tudo. Não precisa cortar tudo o que gosta.",
        "Que tal preparar as marmitas da semana no domingo?",
        "Me conta, como foi sua alimentação ontem?"
    ],
    bruno: [
        "Tenho uma receita de panqueca de banana que é show!",
        "Temperos naturais salvam qualquer dieta. Já usou páprica defumada?",
        "Frango não precisa ser seco e sem graça. O segredo é a marinada.",
        "Omelete é a refeição mais prática que existe. Bora fazer?",
        "Vou te passar uma lista de compras pra facilitar sua semana."
    ]
}

export default function TelaChat() {
    const { idEspecialista } = useParams()
    const navigate = useNavigate()
    const { telefone, setEspecialistaAtivo, historico, adicionarMensagem } = useUsuario()
    const [especialista, setEspecialista] = useState(null)
    const [digitando, setDigitando] = useState(false)

    // Ref para scroll automático
    const fimChatRef = useRef(null)

    // Scroll para o fim ao carregar ou receber nova mensagem
    const scrollParaFim = () => {
        fimChatRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollParaFim()
    }, [historico, digitando, especialista])

    // Validação e Carregamento do Especialista
    useEffect(() => {
        // 1. Proteção: Se não tiver telefone, volta pro login
        if (!telefone) {
            navigate('/')
            return
        }

        // 2. Busca especialista
        const especialistaEncontrado = especialistas.find(e => e.id === idEspecialista)

        // 3. Se não existir, volta pra lista
        if (!especialistaEncontrado) {
            navigate('/especialistas')
            return
        }

        // 4. Carrega especialista e salva no contexto
        setEspecialista(especialistaEncontrado)
        setEspecialistaAtivo(especialistaEncontrado.id)
    }, [idEspecialista, telefone, navigate, setEspecialistaAtivo])

    // Envio da Mensagem Inicial (Executa apenas ao trocar de especialista)
    useEffect(() => {
        if (!especialista) return

        const historicoAtual = historico[idEspecialista] || []

        // Só adiciona se o histórico estiver vazio
        if (historicoAtual.length === 0) {
            adicionarMensagem(idEspecialista, 'agente', especialista.mensagemInicial)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idEspecialista, especialista]) // Dependências reduzidas para evitar loop com 'historico'

    const handleEnviarMensagem = (texto) => {
        // 1. Adiciona mensagem do usuário
        adicionarMensagem(idEspecialista, 'usuario', texto)

        // 2. Mostra indicador de digitação
        setDigitando(true)

        // 3. Simula tempo de resposta (1.5s)
        setTimeout(() => {
            // Fase 3: Aqui chamaremos o webhook do N8N enviando a mensagem
            // const resposta = await enviarParaN8N(texto)

            // Fase 1: Escolhe resposta aleatória mockada
            const respostasPossiveis = RESPOSTAS_MOCK[idEspecialista] || ["Olá! Como posso ajudar?"]
            const respostaAleatoria = respostasPossiveis[Math.floor(Math.random() * respostasPossiveis.length)]

            adicionarMensagem(idEspecialista, 'agente', respostaAleatoria)
            setDigitando(false)
        }, 1500)
    }

    if (!especialista) return null

    const mensagens = historico[idEspecialista] || []

    return (
        <div className="flex flex-col min-h-screen bg-[#0f0f0f]">

            {/* Header Fixo - Adaptável Mobile/Desktop */}
            <header className="fixed top-0 w-full md:max-w-[700px] left-1/2 -translate-x-1/2 h-[64px] bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center justify-between px-6 z-30 shadow-md md:border-x">
                {/* Esquerda: Botão Voltar */}
                <button
                    onClick={() => navigate('/especialistas')}
                    className="text-[#cccccc] text-sm hover:text-endo-laranja transition-colors flex items-center gap-1"
                >
                    ← Minha Equipe
                </button>

                {/* Centro: Avatar + Nome + Cargo */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-0.5">
                        <div
                            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm border border-[#2a2a2a]"
                            style={{ backgroundColor: especialista.corAvatar }}
                        >
                            {especialista.emoji}
                        </div>
                        <span className="text-white font-bold text-[0.9rem]">{especialista.nome}</span>
                    </div>
                    <span className="text-[#cccccc] text-[0.75rem] leading-none">{especialista.cargo}</span>
                </div>

                {/* Direita: Espaço vazio para balancear */}
                <div className="w-[100px] hidden md:block"></div>
                <div className="w-8 md:hidden"></div>
            </header>

            {/* Área de Mensagens */}
            <main className="flex-1 pt-[80px] pb-[90px] px-4 md:px-[60px] overflow-y-auto w-full md:max-w-[700px] md:mx-auto md:border-x md:border-[#2a2a2a] scroll-smooth">

                {mensagens.map((msg, index) => (
                    msg.role === 'agente' ? (
                        <BalaoEspecialista
                            key={index}
                            mensagem={msg.mensagem}
                            timestamp={msg.timestamp}
                            emoji={especialista.emoji}
                            corAvatar={especialista.corAvatar}
                        />
                    ) : (
                        <BalaoUsuario
                            key={index}
                            mensagem={msg.mensagem}
                            timestamp={msg.timestamp}
                        />
                    )
                ))}

                {/* Indicador de Digitação */}
                {digitando && (
                    <BalaoEspecialista
                        emoji={especialista.emoji}
                        corAvatar={especialista.corAvatar}
                        digitando={true}
                    />
                )}

                <div ref={fimChatRef} />
            </main>

            {/* Input Fixo */}
            <InputMensagem aoEnviar={handleEnviarMensagem} desabilitado={digitando} />
        </div>
    )
}
