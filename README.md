# PA-Quest: Quiz Interativo de Progressao Aritmetica

## Descricao do Projeto

PA-Quest é uma aplicação web interativa desenvolvida em JavaScript puro que testa conhecimentos sobre Progressão Aritmética através de um quiz gamificado. O projeto combina elementos educacionais com entretenimento, incluindo um minigame desafiador inspirado em "The Hardest Game" quando o jogador erra perguntas.

## Objetivos Educacionais

- **Testar conhecimentos** de Progressão Aritmética de forma interativa
- **Aplicar conceitos matemáticos** em contexto prático
- **Desenvolver raciocínio lógico** através do minigame adaptativo
- **Fornecer feedback imediato** para reforço de aprendizagem

## Arquitetura do Sistema

### Estrutura de Arquivos
```
PA-Quest/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos CSS modernos e responsivos
├── script.js           # Lógica JavaScript do jogo
└── README.md           # Documentação do projeto
```

### Componentes Principais

#### 1. QuizGame Class
Gerencia o fluxo principal do quiz:
- Carregamento e validação de perguntas
- Sistema de pontuação
- Transição entre telas
- Sistema de notificações customizadas

#### 2. Minigame Class
Implementa o jogo de desafio:
- Canvas-based rendering
- Sistema de fases com dificuldade adaptativa
- Múltiplos padrões de movimento de inimigos
- Física e colisão

#### 3. Sistema de Notificacoes
Interface customizada substituindo pop-ups:
- Animações suaves
- Tipos variados (success, error, warning, info)
- Auto-remoção e controle manual

## Funcionalidades

### Quiz Principal
- **10 perguntas** sobre Progressão Aritmética
- **Classificação de dificuldade** (easy, medium, hard)
- **Feedback visual** imediato
- **Barra de progresso** e contador de questões

### Minigame Adaptativo
- **5 fases** com padrões diferentes:
  - Fase 1: Movimento horizontal
  - Fase 2: Movimento vertical  
  - Fase 3: Movimento diagonal
  - Fase 4: Movimento circular
  - Fase 5: Movimento em zigzag
- **Dificuldade inversa**: perguntas fáceis → fases difíceis
- **Múltiplos inimigos** por fase para aumento de desafio

### Interface Moderna
- **Design responsivo** para todos dispositivos
- **Animações suaves** e micro-interações
- **Paleta de cores contemporânea**
- **Tipografia limpa** e hierarquia visual clara

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis CSS, Flexbox, Grid, Animações
- **JavaScript ES6+**: Classes, Arrow Functions, Promises
- **Canvas API**: Renderização do minigame
- **Google Fonts**: Tipografia Inter

## Conceitos Matematicos Abordados

### Progressao Aritmetica
- **Fórmula do termo geral**: an = a1 + (n-1)·r
- **Cálculo de razão**: r = an - an-1
- **Soma dos termos**: Sn = n·(a1 + an)/2
- **Termo médio**: Am = (a1 + an)/2

### Niveis de Dificuldade
- **Easy**: Cálculos diretos e substituição
- **Medium**: Aplicação de fórmulas
- **Hard**: Sistemas de equações e interpretação

## Design e UX

### Sistema de Design
- **Cores primárias**: Indigo (#6366f1), Rosa (#ec4899), Verde (#10b981)
- **Cores neutras**: Fundo cinza claro (#f8fafc), textos em tons de cinza
- **Gradientes suaves** para botões e elementos
- **Sombras elegantes** para profundidade

### Responsividade
- **Mobile-first**: Otimizado para dispositivos móveis
- **Breakpoints**: 768px e 480px
- **Layout adaptável** com espaçamento consistente

## Como Executar

1. **Clone o repositório**:
   ```bash
   git clone <repositorio>
   cd PA-Quest
   ```

2. **Abra o arquivo**:
   - Dê duplo clique em `index.html`
   - Ou use um servidor local:
   ```bash
   python -m http.server 8000
   # ou
   npx serve .
   ```

3. **Acesse no navegador**:
   ```
   http://localhost:8000
   ```

## Sistema de Avaliacao

### Pontuacao
- **Resposta correta**: +10 pontos
- **Pular minigame**: -5 pontos
- **Perder minigame**: -5 pontos

### Feedback
- **Visual**: Cores e animações
- **Textual**: Notificações customizadas
- **Progresso**: Barra de progresso e contador

## Extensoes Futuras

- **Modo multiplayer** competitivo
- **Editor de perguntas** para professores
- **Sistema de ranking** online
- **Mais minigames** temáticos
- **Exportação de resultados**

## Contribuicoes

### Estrutura para Trabalho em Equipe (3-5 pessoas)

**Sugestão de Divisão:**

1. **Frontend/Design** (1-2 pessoas):
   - Interface e UX
   - Responsividade
   - Animações

2. **Lógica do Quiz** (1 pessoa):
   - Sistema de perguntas
   - Validação
   - Pontuação

3. **Minigame** (1-2 pessoas):
   - Física do jogo
   - Padrões de inimigos
   - Colisão

4. **Integração** (1 pessoa):
   - Conexão entre módulos
   - Testes
   - Documentação

## Critérios de Avaliacao AV1

### Atende aos Requisitos

**Tecnico (70%):**
- ✅ Código em JavaScript
- ✅ Aplicação de conceitos matemáticos
- ✅ Interface funcional
- ✅ Sistema de avaliação

**Apresentacao (30%):**
- ✅ Organização e clareza
- ✅ Divisão de tarefas
- ✅ Demonstração funcional
- ✅ Documentação completa

## Beneficios Educacionais

- **Aprendizado ativo** através de gamificação
- **Reforço imediato** com feedback visual
- **Adaptação de dificuldade** para diferentes níveis
- **Engajamento** mantido pelo elemento lúdico

---

**Desenvolvido para AV1 - Resolucao de Problemas em Natureza Discreta**  
**Universidade de Fortaleza - EAD Unifor**
