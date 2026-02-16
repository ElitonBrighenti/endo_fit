# EndoFit 🏋️
Equipe fitness digital disponível 24h.

## Sobre o Projeto
App web mobile-first onde o aluno conversa com especialistas 
virtuais de fitness personalizados para seu objetivo.
Sem login. O número de telefone é a identidade do aluno.

## Especialistas
- Rafael — Personal Trainer
- Ana — Nutricionista  
- Bruno — Chef Fitness

## Stack
- React + Tailwind CSS
- Contexto React para gerenciamento de estado
- React Router para navegação
- Integração futura com N8N via MCP

## Fluxo do App
1. Aluno digita número de telefone
2. Sistema valida se é assinante ativo
3. Aluno escolhe especialista
4. Conversa com o especialista
5. Histórico salvo por número + especialista

## Estrutura de Pastas
src/
  componentes/    → Componentes visuais por tela
  contexto/       → Gerenciamento de estado global
  dados/          → Configurações e dados estáticos
  estilos/        → CSS global

## Fases do Projeto
- Fase 1 (atual): Frontend com dados mockados
- Fase 2: N8N + Google Sheets (agentes de IA + base de dados)
- Fase 3: Integração completa via MCP
