
import { createContext, useContext, useState } from 'react'

const ContextoUsuario = createContext(null)

export function ProvedorUsuario({ children }) {
    const [telefone, setTelefone] = useState('')
    const [especialistaAtivo, setEspecialistaAtivo] = useState(null)
    const [historico, setHistorico] = useState({})

    // Adiciona mensagem ao histórico em memória
    // Na Fase 3 será persistido no Google Sheets via N8N
    function adicionarMensagem(idEspecialista, role, mensagem) {
        setHistorico(anterior => ({
            ...anterior,
            [idEspecialista]: [
                ...(anterior[idEspecialista] || []),
                {
                    role,
                    mensagem,
                    timestamp: new Date().toISOString()
                }
            ]
        }))
    }

    return (
        <ContextoUsuario.Provider value={{
            telefone,
            setTelefone,
            especialistaAtivo,
            setEspecialistaAtivo,
            historico,
            adicionarMensagem
        }}>
            {children}
        </ContextoUsuario.Provider>
    )
}

export function useUsuario() {
    return useContext(ContextoUsuario)
}
