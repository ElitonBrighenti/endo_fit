# Skills e Padrões de Desenvolvimento — EndoFit

## Responsividade
- Mobile (até 768px): 
  - Layout coluna única
  - Container max-width 430px centralizado
  - Chat full width
- Desktop (acima de 768px):
  - Tela de entrada: max-width 480px centralizado
  - Tela de especialistas: max-width 1100px, 
    3 cards lado a lado em grid
  - Tela de chat: max-width 700px centralizado
  - Header e input do chat respeitam o container
- Breakpoint principal: 768px
- Testar sempre em 390px (mobile) e 1440px (desktop)
- Em desktop o app deve parecer elegante e expandido,
  não um app mobile esticado

## Identidade Visual
- Fundo: #0f0f0f (preto profundo)
- Cards: #1a1a1a
- Primária: #FF6B00 (laranja)
- Laranja escuro (hover): #cc5500
- Texto: #ffffff
- Texto secundário: #cccccc
- Borda: #2a2a2a

## Padrões de Componentes
- Sempre mobile-first (base 390px)
- Touch targets mínimos: 48x48px
- Font-size mínimo em inputs: 16px (evita zoom no iOS)
- Sem scroll horizontal em nenhuma tela
- Padding lateral padrão: 20px
- Layout responsivo com breakpoint em 768px
- Mobile-first mas com adaptação elegante para desktop

## Padrões de Código
- Componentes em português (nomes de arquivos e variáveis)
- Comentários em português
- Cada componente em seu próprio arquivo
- Props tipadas com comentários explicativos
- Contexto React para estado global (sem Redux)
- React Router para navegação entre telas

## Telas do App
1. TelaEntrada — validação do número de telefone
2. TelaEspecialistas — seleção do especialista
3. TelaChat — conversa com o especialista escolhido

## Regras de Negócio (Fase 1 — Mockado)
- Número de teste hardcoded: 5549999999999
- Qualquer outro número retorna erro de assinatura não encontrada
- Histórico de conversa mantido em memória (contexto React)
- Respostas dos agentes simuladas localmente

## Regras de Negócio (Fase 3 — Integração N8N)
- Validação real via Google Sheets
- Histórico persistido no Sheets
- Respostas reais via agentes de IA no N8N
- Substituir apenas as chamadas em src/dados/config.js
