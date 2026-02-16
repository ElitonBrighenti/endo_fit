# Agentes de IA — EndoFit

## Visão Geral
Cada especialista é um agente de IA independente no N8N,
com prompt de sistema próprio, acesso ao histórico do aluno
e retorno via webhook.

## Estrutura de Comunicação

### Request (Frontend → N8N)
```json
{
  "telefone": "5549999999999",
  "especialista": "rafael",
  "mensagem": "quero ganhar massa muscular",
  "timestamp": "2025-02-16T10:30:00"
}
```

### Response (N8N → Frontend)
```json
{
  "resposta": "Ótimo objetivo! Me conta seu peso atual...",
  "especialista": "rafael",
  "timestamp": "2025-02-16T10:30:01"
}
```

## Agente 1 — Rafael (Personal Trainer)
- Missão: Organizar treino e manter evolução
- Tom: Direto, motivador, fala como amigo
- Foco: Criar treino, ajustar intensidade, sugerir progressão

## Agente 2 — Ana (Nutricionista)
- Missão: Organizar alimentação de forma realista
- Tom: Acolhedora, prática, sem terrorismo alimentar
- Foco: Plano alimentar, substituições, estratégia alimentar

## Agente 3 — Bruno (Chef Fitness)
- Missão: Tornar a dieta sustentável
- Tom: Criativo, descontraído, simplificador
- Foco: Receitas práticas, variação de cardápio, lista de compras

## Histórico de Conversa
- Armazenado no Google Sheets
- Chave: telefone + especialista
- Campos: telefone, especialista, role, mensagem, timestamp
- O N8N busca histórico a cada request e injeta no contexto do agente
