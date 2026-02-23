import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../../contexto/ContextoUsuario'

/**
 * Tela de Entrada do EndoFit
 * Responsável por validar o número de telefone do usuário.
 * 
 * Nesta fase (Fase 1 - Mockado), validamos contra uma constante local.
 * Na Fase 3, a validação será feita via chamada de API para o N8N/Google Sheets.
 */
export default function TelaEntrada() {
    const [telefone, setTelefoneInput] = useState('')
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(false)

    const { setTelefone } = useUsuario()
    const navigate = useNavigate()

    // Aplica máscara de telefone brasileiro: (XX) XXXXX-XXXX
    const aplicarMascara = (valor) => {
        // Remove tudo que não é dígito
        let apenasNumeros = valor.replace(/\D/g, '')

        // Limita a 11 dígitos
        if (apenasNumeros.length > 11) {
            apenasNumeros = apenasNumeros.slice(0, 11)
        }

        // Aplica a formatação
        if (apenasNumeros.length <= 2) {
            return apenasNumeros.replace(/^(\d{0,2})/, '($1')
        }
        if (apenasNumeros.length <= 7) {
            return apenasNumeros.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
        }
        return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }

    const handleChange = (e) => {
        const valorMascarado = aplicarMascara(e.target.value)
        setTelefoneInput(valorMascarado)
        // Limpa erro ao digitar
        if (erro) setErro(null)
    }

    const handleVerificar = async () => {
        // Limpar erro anterior
        setErro('')

        // Validação de preenchimento e tamanho mínimo
        const apenasNumeros = telefone.replace(/\D/g, '')
        if (!apenasNumeros || apenasNumeros.length < 10) {
            setErro('Digite seu número de telefone.')
            return
        }

        // Ativar loading
        setCarregando(true)

        try {
            // Chamar webhook N8N
            const resposta = await fetch('https://n8n.forgedigital.cloud/webhook/endofit/validar-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    telefone: apenasNumeros
                })
            })

            const dados = await resposta.json()

            // Processar resposta
            if (resposta.ok && dados.valido) {
                // Login válido - salvar dados no contexto
                setTelefone(dados.telefone)
                navigate('/especialistas')
            } else {
                // Login inválido
                if (dados.status === 'nao_encontrado') {
                    setErro('assinatura_nao_encontrada')
                } else if (dados.status === 'inativo') {
                    setErro('Sua assinatura está inativa. Reative para continuar.')
                } else {
                    setErro(dados.mensagem || 'Erro ao validar assinatura.')
                }
            }
        } catch (erro) {
            console.error('Erro ao validar:', erro)
            setErro('Erro ao conectar com o servidor. Tente novamente.')
        } finally {
            setCarregando(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleVerificar()
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-5 relative overflow-hidden bg-endo-preto">

            {/* Elementos decorativos de fundo */}
            <div className="absolute top-[-100px] right-[-100px] md:top-[-150px] md:right-[-150px] w-[600px] h-[600px] rounded-full border border-endo-laranja opacity-5 pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-100px] md:bottom-[-150px] md:left-[-150px] w-[500px] h-[500px] rounded-full border border-endo-laranja opacity-5 pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-endo-laranja opacity-20 pointer-events-none" />
            <div className="absolute bottom-[30%] right-[15%] w-3 h-3 rounded-full bg-endo-laranja opacity-20 pointer-events-none" />

            {/* Conteúdo Central */}
            <div className="z-10 w-full max-w-[430px] md:max-w-[480px] flex flex-col items-center">

                {/* Header / Logo */}
                <div className="mb-10 text-center">
                    <h1 className="text-[2rem] md:text-[2.5rem] font-bold leading-tight">
                        Endo<span className="text-endo-laranja">Fit</span>
                    </h1>
                    <p className="text-endo-texto-secundario text-base mt-2">
                        Sua equipe fitness disponível 24h
                    </p>
                </div>

                {/* Card de Entrada */}
                <div className="w-full bg-endo-card rounded-2xl p-8 shadow-lg border border-endo-borda/30">
                    <label className="block text-[#cccccc] text-sm mb-2">
                        Seu número de telefone
                    </label>

                    <input
                        type="tel"
                        value={telefone}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="(49) 99999-9999"
                        className="w-full bg-endo-preto border border-endo-borda text-white rounded-lg px-4 py-[14px] text-base focus:outline-none focus:border-endo-laranja focus:ring-1 focus:ring-endo-laranja transition-all placeholder:text-endo-borda/50"
                        disabled={carregando}
                    />

                    <button
                        onClick={handleVerificar}
                        disabled={carregando}
                        className={`w-full mt-4 bg-endo-laranja text-white font-bold rounded-lg h-[52px] transition-colors flex items-center justify-center
              ${carregando ? 'opacity-70 cursor-not-allowed' : 'hover:bg-endo-laranja-escuro'}
            `}
                    >
                        {carregando ? 'Verificando...' : 'Acessar minha equipe →'}
                    </button>

                    {/* Mensagens de Erro */}
                    {erro && (
                        <div className="mt-4 text-center text-sm text-red-400 animate-fade-in">
                            {erro === 'assinatura_nao_encontrada' ? (
                                <>
                                    Assinatura não encontrada.{' '}
                                    <a href="#" className="underline text-endo-laranja hover:text-endo-laranja-escuro">
                                        Clique aqui
                                    </a>
                                    {' '}para assinar e ter acesso.
                                </>
                            ) : (
                                erro
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="mt-8 text-endo-texto-secundario text-xs text-center max-w-[280px]">
                    Transforme seu corpo com acompanhamento personalizado
                </p>
            </div>
        </div>
    )
}
