class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.minigameAttempts = 0;
        this.currentScreen = 'start';
        this.quizQuestions = [];
        this.minigame = null;
        
        this.initializeQuestions();
        this.initializeEventListeners();
    }

    initializeQuestions() {
        this.quizQuestions = [
            {
                question: "Qual é a fórmula do termo geral de uma progressão aritmética?",
                answers: ["an = a1 + (n-1)·r", "an = a1·r^(n-1)", "an = a1 + n·r", "an = a1·n + r"],
                correct: 0,
                difficulty: "hard" // Fórmula é conceito fundamental
            },
            {
                question: "Na PA (2, 5, 8, 11, ...), qual é a razão?",
                answers: ["2", "3", "5", "11"],
                correct: 1,
                difficulty: "easy" // Cálculo simples de razão
            },
            {
                question: "Qual é o 10º termo da PA (3, 7, 11, ...)?",
                answers: ["39", "40", "43", "36"],
                correct: 0,
                difficulty: "medium" // Requer aplicação da fórmula
            },
            {
                question: "Se a1 = 4 e r = 3, qual é o 5º termo?",
                answers: ["16", "19", "12", "15"],
                correct: 0,
                difficulty: "easy" // Substituição direta na fórmula
            },
            {
                question: "Qual é a soma dos 5 primeiros termos da PA (2, 5, 8, ...)?",
                answers: ["40", "35", "45", "50"],
                correct: 0,
                difficulty: "hard" // Requer fórmula da soma
            },
            {
                question: "Em uma PA, se a3 = 15 e a7 = 27, qual é a razão?",
                answers: ["2", "3", "4", "5"],
                correct: 1,
                difficulty: "hard" // Requer sistema de equações
            },
            {
                question: "Qual é o termo médio da PA com 9 termos: (3, 6, 9, ..., 27)?",
                answers: ["12", "15", "18", "21"],
                correct: 1,
                difficulty: "easy" // Termo médio é o do meio
            },
            {
                question: "Se a soma dos n termos de uma PA é Sn = n² + 2n, qual é a1?",
                answers: ["3", "2", "4", "5"],
                correct: 0,
                difficulty: "hard" // Requer interpretação da fórmula da soma
            },
            {
                question: "Na PA (x, x+4, x+8, ...), qual é a razão?",
                answers: ["x", "4", "8", "x+4"],
                correct: 1,
                difficulty: "easy" // Diferença entre termos consecutivos
            },
            {
                question: "Se a15 = 60 e a1 = 12, qual é a razão da PA?",
                answers: ["4", "3", "48", "5"],
                correct: 0,
                difficulty: "medium" // Requer manipulação da fórmula
            }
        ];
    }

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notificationContainer');
        
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Definir ícone baseado no tipo
        const icons = {
            success: '✓',
            error: '✕',
            warning: '!',
            info: 'i'
        };
        
        // Definir título baseado no tipo
        const titles = {
            success: 'Sucesso',
            error: 'Erro',
            warning: 'Atenção',
            info: 'Informação'
        };
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">${icons[type]}</div>
                <div class="notification-title">${titles[type]}</div>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">×</button>
        `;
        
        // Adicionar ao container
        container.appendChild(notification);
        
        // Adicionar evento de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Mostrar com animação
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-remover após duração
        if (duration > 0) {
            setTimeout(() => {
                this.hideNotification(notification);
            }, duration);
        }
    }
    
    hideNotification(notification) {
        notification.classList.remove('show');
        notification.classList.add('slide-out');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    initializeEventListeners() {
        // Esperar o DOM estar completamente carregado
        setTimeout(() => {
            const startBtn = document.getElementById('startBtn');
            console.log('Start button found:', startBtn);
            
            if (startBtn) {
                startBtn.onclick = () => {
                    console.log('Start button clicked with onclick!');
                    this.startGame();
                    return false;
                };
                console.log('Event listener attached to start button');
            } else {
                console.error('Start button not found!');
            }
            
            const playAgainBtn = document.getElementById('playAgainBtn');
            if (playAgainBtn) {
                playAgainBtn.onclick = () => this.resetGame();
            }
            
            const restartMinigameBtn = document.getElementById('restartMinigameBtn');
            if (restartMinigameBtn) {
                restartMinigameBtn.onclick = () => this.restartMinigame();
            }
            
            const skipMinigameBtn = document.getElementById('skipMinigameBtn');
            if (skipMinigameBtn) {
                skipMinigameBtn.onclick = () => this.skipMinigame();
            }
        }, 100);
    }

    startGame() {
        this.showScreen('quiz');
        this.loadQuestion();
    }

    showScreen(screenName) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        const targetScreen = document.getElementById(screenName + 'Screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;
    }

    loadQuestion() {
        if (this.currentQuestion >= this.quizQuestions.length) {
            this.endGame();
            return;
        }

        const question = this.quizQuestions[this.currentQuestion];
        
        // Atualizar contador e progresso
        document.getElementById('questionCounter').textContent = 
            `Pergunta ${this.currentQuestion + 1} de ${this.quizQuestions.length}`;
        document.getElementById('score').textContent = `Pontos: ${this.score}`;
        
        // Atualizar barra de progresso
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${((this.currentQuestion) / this.quizQuestions.length) * 100}%`;
        
        // Carregar pergunta
        document.getElementById('questionText').textContent = question.question;
        
        // Carregar alternativas
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.checkAnswer(index));
            answersContainer.appendChild(button);
        });
    }

    startGame() {
        this.showScreen('quiz');
        this.loadQuestion();
    }

    showScreen(screenName) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        const targetScreen = document.getElementById(screenName + 'Screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;
    }

    loadQuestion() {
        if (this.currentQuestion >= this.quizQuestions.length) {
            this.endGame();
            return;
        }

        const question = this.quizQuestions[this.currentQuestion];
        
        // Atualizar contador e progresso
        document.getElementById('questionCounter').textContent = 
            `Pergunta ${this.currentQuestion + 1} de ${this.quizQuestions.length}`;
        document.getElementById('score').textContent = `Pontos: ${this.score}`;
        
        // Atualizar barra de progresso
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${((this.currentQuestion) / this.quizQuestions.length) * 100}%`;
        
        // Carregar pergunta
        document.getElementById('questionText').textContent = question.question;
        
        // Carregar alternativas
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.checkAnswer(index));
            answersContainer.appendChild(button);
        });
    }

    checkAnswer(selectedAnswer) {
        const correctAnswer = this.quizQuestions[this.currentQuestion].correct;
        const answerBtns = document.querySelectorAll('.answer-btn');
        
        // Desabilitar todos os botões
        answerBtns.forEach(btn => btn.disabled = true);
        
        if (selectedAnswer === correctAnswer) {
            // Resposta correta
            answerBtns[selectedAnswer].classList.add('correct');
            this.score += 10;
            this.updateScore();
            
            this.showNotification('Resposta correta! +10 pontos', 'success', 2000);
            
            // Avançar para próxima pergunta após delay
            setTimeout(() => {
                this.currentQuestion++;
                if (this.currentQuestion < this.quizQuestions.length) {
                    this.loadQuestion();
                } else {
                    this.endGame();
                }
            }, 1500);
        } else {
            // Resposta errada
            answerBtns[selectedAnswer].classList.add('wrong');
            answerBtns[correctAnswer].classList.add('correct');
            
            this.showNotification('Resposta errada! Prepare-se para o minigame...', 'error', 2000);
            
            // Iniciar minigame após mostrar feedback
            setTimeout(() => {
                this.startMinigame();
            }, 2000);
        }
    }

    startMinigame() {
        this.showScreen('minigame');
        this.minigameAttempts++;
        document.getElementById('attempts').textContent = `Tentativas: ${this.minigameAttempts}`;
        
        // Criar minigame se não existir
        if (!this.minigame) {
            this.minigame = new Minigame(() => this.minigameCompleted(true), 
                                         () => this.minigameCompleted(false));
            // Passar referência do jogo para o minigame
            window.quizGame = this;
            this.minigame.game = this;
        }
        
        // Obter dificuldade da pergunta atual
        const currentQuestion = this.quizQuestions[this.currentQuestion];
        const difficulty = currentQuestion ? currentQuestion.difficulty : 'medium';
        
        console.log('Iniciando minigame com dificuldade:', difficulty);
        this.minigame.startWithDifficulty(difficulty);
    }

    restartMinigame() {
        if (this.minigame) {
            this.minigame.restart();
        }
    }

    skipMinigame() {
        this.showNotification('Minigame pulado! -5 pontos', 'warning', 2000);
        this.score = Math.max(0, this.score - 5);
        this.updateScore();
        this.currentQuestion++;
        this.showScreen('quiz');
        this.loadQuestion();
    }

    minigameCompleted(success) {
        if (success) {
            // Jogador completou o minigame, volta para o quiz
            this.showNotification('Minigame concluído com sucesso! Continue o quiz...', 'success', 2000);
            this.currentQuestion++;
            this.showScreen('quiz');
            this.loadQuestion();
        } else {
            // Jogador perdeu todas as vidas, perde um ponto e volta
            this.score = Math.max(0, this.score - 5);
            this.updateScore();
            this.showNotification('Minigame não concluído! -5 pontos. Continue o quiz...', 'warning', 2000);
            this.currentQuestion++;
            this.showScreen('quiz');
            this.loadQuestion();
        }
    }

    endGame() {
        this.showScreen('end');
        
        // Atualizar estatísticas finais
        document.getElementById('finalScore').textContent = `Pontuação Final: ${this.score}`;
        document.getElementById('correctAnswers').textContent = 
            `Respostas Corretas: ${this.correctAnswers}/${this.quizQuestions.length}`;
        document.getElementById('minigameAttempts').textContent = 
            `Tentativas no Minigame: ${this.minigameAttempts}`;
        
        // Mensagem baseada no desempenho
        let title = "Jogo Concluído!";
        if (this.score >= 90) title = "Excelente! 🏆";
        else if (this.score >= 70) title = "Muito Bom! ⭐";
        else if (this.score >= 50) title = "Bom Trabalho! 👍";
        else title = "Continue Practicando! 💪";
        
        document.getElementById('endTitle').textContent = title;
    }

    resetGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.minigameAttempts = 0;
        
        if (this.minigame) {
            this.minigame.destroy();
            this.minigame = null;
        }
        
        this.showScreen('start');
    }

    updateScore() {
        document.getElementById('score').textContent = `Pontos: ${this.score}`;
    }
}

/**
 * ======================================================================
 * CLASSE MINIGAME - SISTEMA DE JOGO ADAPTATIVO
 * ======================================================================
 * 
 * Implementação do minigame inspirado em "The Hardest Game"
 * com física realista e padrões de movimento variados.
 * 
 * Características:
 * - Canvas-based rendering para performance otimizada
 * - Sistema de 5 fases com dificuldade crescente
 * - Física 2D com colisão precisa
 * - Múltiplos padrões de movimento de inimigos
 * - Adaptação de dificuldade baseada na pergunta do quiz
 * 
 * Padrões de Movimento:
 * - Fase 1: Movimento horizontal (básico)
 * - Fase 2: Movimento vertical (simples)
 * - Fase 3: Movimento diagonal (médio)
 * - Fase 4: Movimento circular (difícil)
 * - Fase 5: Movimento em zigzag (expert)
 * 
 * Física:
 * - Velocidade constante do jogador
 * - Detecção de colisão por bounding box
 * - Sistema de vidas e tentativas
 * ======================================================================
 */
class Minigame {
    constructor(onComplete, onFail) {
        this.canvas = document.getElementById('gameCanvas');
        
        // Verificar se o canvas existe
        if (!this.canvas) {
            console.error('Canvas do minigame não encontrado!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Verificar se o contexto foi criado
        if (!this.ctx) {
            console.error('Contexto 2D do canvas não pôde ser criado!');
            return;
        }
        
        this.onComplete = onComplete;
        this.onFail = onFail;
        
        // Referência ao jogo principal para notificações
        this.game = window.quizGame;
        
        this.currentPhase = 1;
        this.totalPhases = 5;
        
        this.player = {
            x: 50,
            y: 200,
            size: 20,
            speed: 3,
            color: '#ff4444'
        };
        
        this.goal = {
            x: 530,
            y: 200,
            size: 30,
            color: '#44ff44'
        };
        
        this.enemies = [];
        
        this.lives = 3;
        this.keys = {};
        this.gameRunning = false;
        this.animationId = null;
        
        // Só configurar se o canvas existir
        if (this.canvas && this.ctx) {
            this.setupControls();
            this.loadPhase(this.currentPhase);
        } else {
            console.error('Minigame não pode ser inicializado - canvas não encontrado');
        }
    }

    loadPhase(phaseNumber) {
        this.enemies = [];
        
        // Atualizar descrição da fase
        const phaseDescriptions = {
            1: "Fase 1: Movimentos Horizontais",
            2: "Fase 2: Ataques Diagonais", 
            3: "Fase 3: Defesa Circular",
            4: "Fase 4: Trajetória em Zigue-Zague",
            5: "Fase 5: Combo Mortal"
        };
        
        const phaseHeader = document.querySelector('.minigame-header p');
        if (phaseHeader) {
            phaseHeader.textContent = phaseDescriptions[phaseNumber] || "Fase Desconhecida";
        }
        
        switch(phaseNumber) {
            case 1:
                // Fase 1: Inimigos horizontais simples
                this.enemies = [
                    { x: 150, y: 100, size: 15, speedX: 2, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 300, y: 300, size: 15, speedX: -2, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 450, y: 200, size: 15, speedX: 0, speedY: 3, color: '#4444ff', pattern: 'vertical' },
                    { x: 200, y: 150, size: 12, speedX: 1.5, speedY: 0, color: '#ff6666', pattern: 'horizontal' },
                    { x: 400, y: 250, size: 12, speedX: -1.5, speedY: 0, color: '#ff6666', pattern: 'horizontal' },
                    { x: 250, y: 50, size: 10, speedX: 1, speedY: 0, color: '#4444ff', pattern: 'horizontal' }
                ];
                break;
                
            case 2:
                // Fase 2: Inimigos diagonais
                this.enemies = [
                    { x: 200, y: 100, size: 15, speedX: 1.5, speedY: 1.5, color: '#4444ff', pattern: 'diagonal' },
                    { x: 400, y: 300, size: 15, speedX: -1.5, speedY: -1.5, color: '#4444ff', pattern: 'diagonal' },
                    { x: 300, y: 200, size: 15, speedX: 2, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 150, y: 250, size: 12, speedX: 1, speedY: 1, color: '#ff6666', pattern: 'diagonal' },
                    { x: 450, y: 150, size: 12, speedX: -1, speedY: -1, color: '#ff6666', pattern: 'diagonal' },
                    { x: 350, y: 100, size: 10, speedX: 0.8, speedY: 0.8, color: '#4444ff', pattern: 'diagonal' }
                ];
                break;
                
            case 3:
                // Fase 3: Inimigos em círculo
                this.enemies = [
                    { x: 300, y: 200, size: 15, speedX: 0, speedY: 0, color: '#4444ff', pattern: 'circular', angle: 0, radius: 80, centerX: 300, centerY: 200 },
                    { x: 150, y: 150, size: 12, speedX: 1.8, speedY: 0, color: '#ff6666', pattern: 'horizontal' },
                    { x: 450, y: 250, size: 12, speedX: -1.8, speedY: 0, color: '#ff6666', pattern: 'horizontal' },
                    { x: 300, y: 200, size: 12, speedX: 0, speedY: 0, color: '#ff6666', pattern: 'circular', angle: Math.PI, radius: 60, centerX: 300, centerY: 200 },
                    { x: 200, y: 100, size: 10, speedX: 1.5, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 400, y: 300, size: 10, speedX: -1.5, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 250, y: 350, size: 8, speedX: 1.2, speedY: 0, color: '#ff6666', pattern: 'horizontal' }
                ];
                break;
                
            case 4:
                // Fase 4: Inimigos em zigue-zague
                this.enemies = [
                    { x: 100, y: 100, size: 15, speedX: 2, speedY: 0, color: '#4444ff', pattern: 'zigzag', zigzagAmplitude: 50, zigzagSpeed: 0.05, baseY: 100 },
                    { x: 250, y: 300, size: 15, speedX: -2, speedY: 0, color: '#4444ff', pattern: 'zigzag', zigzagAmplitude: 40, zigzagSpeed: 0.04, baseY: 300 },
                    { x: 400, y: 200, size: 18, speedX: 0, speedY: 2.5, color: '#ff6666', pattern: 'vertical' },
                    { x: 150, y: 200, size: 12, speedX: 1.5, speedY: 0, color: '#ff6666', pattern: 'zigzag', zigzagAmplitude: 30, zigzagSpeed: 0.06, baseY: 200 },
                    { x: 350, y: 150, size: 12, speedX: -1.5, speedY: 0, color: '#4444ff', pattern: 'zigzag', zigzagAmplitude: 35, zigzagSpeed: 0.05, baseY: 150 },
                    { x: 500, y: 250, size: 10, speedX: 1.8, speedY: 0, color: '#ff6666', pattern: 'zigzag', zigzagAmplitude: 25, zigzagSpeed: 0.07, baseY: 250 },
                    { x: 200, y: 350, size: 10, speedX: -1.8, speedY: 0, color: '#4444ff', pattern: 'zigzag', zigzagAmplitude: 20, zigzagSpeed: 0.08, baseY: 350 },
                    { x: 450, y: 50, size: 8, speedX: 1.3, speedY: 0, color: '#ff6666', pattern: 'horizontal' }
                ];
                break;
                
            case 5:
                // Fase 5: Combinação de todos os padrões
                this.enemies = [
                    { x: 150, y: 100, size: 15, speedX: 2.5, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 300, y: 200, size: 15, speedX: 0, speedY: 0, color: '#ff6666', pattern: 'circular', angle: Math.PI, radius: 60, centerX: 300, centerY: 200 },
                    { x: 450, y: 300, size: 12, speedX: -2, speedY: 2, color: '#4444ff', pattern: 'diagonal' },
                    { x: 200, y: 250, size: 15, speedX: 1.8, speedY: 0, color: '#ff6666', pattern: 'zigzag', zigzagAmplitude: 60, zigzagSpeed: 0.06, baseY: 250 },
                    { x: 350, y: 150, size: 12, speedX: 0, speedY: 2, color: '#4444ff', pattern: 'vertical' },
                    { x: 250, y: 100, size: 12, speedX: -1.5, speedY: 1.5, color: '#ff6666', pattern: 'diagonal' },
                    { x: 400, y: 350, size: 10, speedX: 2, speedY: 0, color: '#4444ff', pattern: 'horizontal' },
                    { x: 180, y: 180, size: 10, speedX: 1.2, speedY: 1.2, color: '#ff6666', pattern: 'diagonal' },
                    { x: 320, y: 320, size: 8, speedX: -1.2, speedY: -1.2, color: '#4444ff', pattern: 'diagonal' },
                    { x: 500, y: 200, size: 8, speedX: 0, speedY: 1.5, color: '#ff6666', pattern: 'vertical' }
                ];
                break;
        }
        
        // Ajustar posição do jogador e objetivo baseado na fase
        if (phaseNumber === 3 || phaseNumber === 5) {
            this.goal.x = 550;
            this.goal.y = 100;
        } else {
            this.goal.x = 530;
            this.goal.y = 200;
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.keys[e.key] = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.keys[e.key] = false;
            }
        });
    }

    startWithDifficulty(difficulty) {
        // Verificar se o canvas está disponível
        if (!this.canvas || !this.ctx) {
            console.error('Canvas não disponível para iniciar o minigame');
            return;
        }
        
        console.log('Starting minigame with difficulty:', difficulty);
        this.gameRunning = true;
        this.lives = 3;
        this.player.x = 50;
        this.player.y = 200;
        
        // Selecionar fase baseada na dificuldade da pergunta
        let selectedPhase;
        switch(difficulty) {
            case 'easy':
                // Pergunta fácil = fase difícil (4 ou 5)
                selectedPhase = Math.random() < 0.5 ? 4 : 5;
                break;
            case 'hard':
                // Pergunta difícil = fase fácil (1 ou 2)
                selectedPhase = Math.random() < 0.5 ? 1 : 2;
                break;
            case 'medium':
            default:
                // Pergunta média = fase média (2 ou 3)
                selectedPhase = Math.random() < 0.5 ? 2 : 3;
                break;
        }
        
        this.currentPhase = selectedPhase;
        this.loadPhase(this.currentPhase);
        
        // Mostrar mensagem sobre a dificuldade adaptativa
        const difficultyMessage = {
            'easy': 'Você errou uma pergunta fácil! Fase Difícil ativada!',
            'hard': 'Você errou uma pergunta difícil! Fase Fácil ativada!',
            'medium': 'Você errou uma pergunta média! Fase Média ativada!'
        };
        
        setTimeout(() => {
            const phaseHeader = document.querySelector('.minigame-header p');
            if (phaseHeader) {
                const originalText = phaseHeader.textContent;
                phaseHeader.textContent = difficultyMessage[difficulty];
                setTimeout(() => {
                    phaseHeader.textContent = originalText;
                }, 2000);
            }
        }, 500);
        
        this.updateLivesDisplay();
        this.gameLoop();
    }

    start() {
        // Método legado para compatibilidade
        this.startWithDifficulty('medium');
    }

    restart() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Mudar para outra fase da mesma dificuldade
        const currentDifficulty = this.getCurrentDifficulty();
        this.startWithDifficulty(currentDifficulty);
    }

    getCurrentDifficulty() {
        // Determinar dificuldade baseada na fase atual
        if (this.currentPhase === 1 || this.currentPhase === 2) {
            return 'hard';
        } else if (this.currentPhase === 4 || this.currentPhase === 5) {
            return 'easy';
        } else {
            return 'medium';
        }
    }

    updateLivesDisplay() {
        document.getElementById('lives').textContent = `Vidas: ${this.lives}`;
        document.getElementById('phase').textContent = `Fase: ${this.currentPhase}`;
    }

    gameLoop(timestamp = 0) {
        if (!this.gameRunning) return;
        
        this.update(timestamp);
        this.draw();
        
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    update() {
        // Movimentação do jogador
        if (this.keys['ArrowUp'] && this.player.y > this.player.size) {
            this.player.y -= this.player.speed;
        }
        if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.size) {
            this.player.y += this.player.speed;
        }
        if (this.keys['ArrowLeft'] && this.player.x > this.player.size) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.size) {
            this.player.x += this.player.speed;
        }
        
        // Atualizar inimigos baseado no padrão
        this.enemies.forEach(enemy => {
            switch(enemy.pattern) {
                case 'horizontal':
                    enemy.x += enemy.speedX;
                    if (enemy.x <= enemy.size || enemy.x >= this.canvas.width - enemy.size) {
                        enemy.speedX = -enemy.speedX;
                    }
                    break;
                    
                case 'vertical':
                    enemy.y += enemy.speedY;
                    if (enemy.y <= enemy.size || enemy.y >= this.canvas.height - enemy.size) {
                        enemy.speedY = -enemy.speedY;
                    }
                    break;
                    
                case 'diagonal':
                    enemy.x += enemy.speedX;
                    enemy.y += enemy.speedY;
                    if (enemy.x <= enemy.size || enemy.x >= this.canvas.width - enemy.size) {
                        enemy.speedX = -enemy.speedX;
                    }
                    if (enemy.y <= enemy.size || enemy.y >= this.canvas.height - enemy.size) {
                        enemy.speedY = -enemy.speedY;
                    }
                    break;
                    
                case 'circular':
                    enemy.angle += 0.02;
                    enemy.x = enemy.centerX + Math.cos(enemy.angle) * enemy.radius;
                    enemy.y = enemy.centerY + Math.sin(enemy.angle) * enemy.radius;
                    break;
                    
                case 'zigzag':
                    enemy.x += enemy.speedX;
                    enemy.y = enemy.baseY + Math.sin(enemy.x * enemy.zigzagSpeed) * enemy.zigzagAmplitude;
                    if (enemy.x <= enemy.size || enemy.x >= this.canvas.width - enemy.size) {
                        enemy.speedX = -enemy.speedX;
                    }
                    break;
                    
                default:
                    // Padrão antigo para compatibilidade
                    enemy.x += enemy.speedX;
                    enemy.y += enemy.speedY;
                    if (enemy.x <= enemy.size || enemy.x >= this.canvas.width - enemy.size) {
                        enemy.speedX = -enemy.speedX;
                    }
                    if (enemy.y <= enemy.size || enemy.y >= this.canvas.height - enemy.size) {
                        enemy.speedY = -enemy.speedY;
                    }
                    break;
            }
            
            // Verificar colisão com o jogador
            if (this.checkCollision(this.player, enemy)) {
                this.playerHit();
            }
        });
        
        // Verificar se alcançou o objetivo
        if (this.checkCollision(this.player, this.goal)) {
            this.win();
        }
    }

    checkCollision(obj1, obj2) {
        const distance = Math.sqrt(
            Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
        );
        return distance < (obj1.size + obj2.size);
    }

    playerHit() {
        this.lives--;
        this.updateLivesDisplay();
        
        if (this.lives <= 0) {
            this.lose();
        } else {
            // Resetar posição do jogador
            this.player.x = 50;
            this.player.y = 200;
        }
    }

    draw() {
        // Limpar canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenhar grade
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.canvas.width; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i < this.canvas.height; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }
        
        // Desenhar objetivo
        this.ctx.fillStyle = this.goal.color;
        this.ctx.beginPath();
        this.ctx.arc(this.goal.x, this.goal.y, this.goal.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Desenhar inimigos
        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = enemy.color;
            this.ctx.beginPath();
            this.ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Desenhar jogador
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(
            this.player.x - this.player.size,
            this.player.y - this.player.size,
            this.player.size * 2,
            this.player.size * 2
        );
    }

    win() {
        this.gameRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Mostrar mensagem de vitória
        setTimeout(() => {
            this.onComplete();
        }, 100);
    }

    lose() {
        this.gameRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Mostrar mensagem de derrota
        setTimeout(() => {
            this.onFail();
        }, 100);
    }

    destroy() {
        this.gameRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
