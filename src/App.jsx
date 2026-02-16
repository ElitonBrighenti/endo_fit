
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProvedorUsuario } from './contexto/ContextoUsuario'
import TelaEntrada from './componentes/Entrada/TelaEntrada'
import TelaEspecialistas from './componentes/Especialistas/TelaEspecialistas'
import TelaChat from './componentes/Chat/TelaChat'

export default function App() {
    return (
        <ProvedorUsuario>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaEntrada />} />
                        <Route path="/especialistas" element={<TelaEspecialistas />} />
                        <Route path="/chat/:idEspecialista" element={<TelaChat />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ProvedorUsuario>
    )
}
