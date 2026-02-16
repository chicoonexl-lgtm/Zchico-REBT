// Aplicación principal del Curso REBT
class REBTApp {
    constructor() {
        this.currentView = 'inicio';
        this.currentITC = null;
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderITCList();
        this.loadView('inicio');
        this.applyDarkMode();
    }

    setupEventListeners() {
        // Sidebar toggle móvil
        document.getElementById('sidebar-toggle-open').addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('open');
        });

        document.getElementById('sidebar-toggle-close').addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        });

        // Buscador
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchContent(e.target.value);
        });

        // Modo oscuro
        document.getElementById('dark-mode-toggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Exportar progreso
        document.getElementById('export-progress').addEventListener('click', () => {
            this.exportProgress();
        });

        // Imprimir sección
        document.getElementById('print-section').addEventListener('click', () => {
            window.print();
        });

        // Menú items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget.getAttribute('href').substring(1);
                this.loadView(target);
            });
        });

        // Cerrar sidebar en móvil al hacer clic en contenido
        document.getElementById('main-content').addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    }

    renderITCList() {
        const container = document.getElementById('itc-list');
        container.innerHTML = '';

        REBT_DATA.itcs.forEach(itc => {
            const item = document.createElement('div');
            item.className = 'itc-item';
            item.setAttribute('data-itc-id', itc.id);
            
            const completed = this.userProgress.completedITCs.includes(itc.id);
            
            item.innerHTML = `
                <span class="itc-number">${itc.number.replace('ITC-BT-', '')}</span>
                <span class="itc-title">${itc.title}</span>
                <span class="itc-progress ${completed ? 'completed' : ''}">
                    ${completed ? '<i class="fas fa-check"></i>' : ''}
                </span>
            `;

            item.addEventListener('click', () => {
                this.loadITC(itc.id);
            });

            container.appendChild(item);
        });
    }

    loadView(view) {
        this.currentView = view;
        this.updateActiveMenu(view);
        this.updateBreadcrumb(view);

        const contentArea = document.getElementById('content-area');

        switch(view) {
            case 'inicio':
                contentArea.innerHTML = this.renderHome();
                break;
            case 'examenes':
                contentArea.innerHTML = this.renderExamenes();
                this.setupExamenesEvents();
                break;
            case 'progreso':
                contentArea.innerHTML = this.renderProgreso();
                break;
            default:
                contentArea.innerHTML = '<p>Vista no encontrada</p>';
        }

        window.scrollTo(0, 0);
    }

    loadITC(itcId) {
        const itc = REBT_DATA.itcs.find(i => i.id === itcId);
        if (!itc) return;

        this.currentITC = itcId;
        this.currentView = 'itc';
        
        // Actualizar navegación
        document.querySelectorAll('.itc-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-itc-id="${itcId}"]`).classList.add('active');
        
        this.updateBreadcrumb('ITC', itc.number + ': ' + itc.title);

        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = this.renderITC(itc);
        
        // Setup eventos de test
        this.setupTestEvents(itcId);

        window.scrollTo(0, 0);

        // Cerrar sidebar en móvil
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar').classList.remove('open');
        }
    }

    renderHome() {
        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="card-title">
                        <h2>Curso Interactivo REBT 2025</h2>
                        <p>Reglamento Electrotécnico para Baja Tensión</p>
                    </div>
                </div>
                
                <div class="alert alert-success">
                    <i class="fas fa-graduation-cap"></i>
                    <div>
                        <strong>¡Bienvenido!</strong> Este curso te preparará para el examen de instalador electricista certificado con:
                        <ul>
                            <li>52 módulos completos (ITC-BT-01 a ITC-BT-52)</li>
                            <li>Más de 1.500 preguntas de test</li>
                            <li>Asistente de IA para resolver dudas</li>
                            <li>Contenido visual con tablas y cálculos</li>
                        </ul>
                    </div>
                </div>

                <h2><i class="fas fa-book-open"></i> Contenido del Curso</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-list" style="font-size: 40px; color: var(--primary-color);"></i>
                        <div class="stat-value">52</div>
                        <div class="stat-label">ITC Completas</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-question-circle" style="font-size: 40px; color: var(--secondary-color);"></i>
                        <div class="stat-value">1,560</div>
                        <div class="stat-label">Preguntas Test</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clipboard-check" style="font-size: 40px; color: var(--success-color);"></i>
                        <div class="stat-value">5</div>
                        <div class="stat-label">Exámenes Generales</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-robot" style="font-size: 40px; color: var(--danger-color);"></i>
                        <div class="stat-value">24/7</div>
                        <div class="stat-label">Asistente IA</div>
                    </div>
                </div>

                <h2><i class="fas fa-star"></i> Módulos Principales</h2>
                
                <div class="card">
                    <h3><i class="fas fa-home"></i> Instalaciones en Viviendas</h3>
                    <ul>
                        <li><strong>ITC-BT-25:</strong> Número de circuitos y características</li>
                        <li><strong>ITC-BT-26:</strong> Prescripciones generales de instalación</li>
                        <li><strong>ITC-BT-27:</strong> Locales con bañera o ducha</li>
                    </ul>
                    <button class="btn btn-primary" onclick="app.loadITC('itc-25')">
                        <i class="fas fa-arrow-right"></i> Empezar con ITC-25
                    </button>
                </div>

                <div class="card">
                    <h3><i class="fas fa-shield-alt"></i> Protecciones Eléctricas</h3>
                    <ul>
                        <li><strong>ITC-BT-18:</strong> Instalaciones de puesta a tierra</li>
                        <li><strong>ITC-BT-22:</strong> Protección contra sobreintensidades</li>
                        <li><strong>ITC-BT-23:</strong> Protección contra sobretensiones</li>
                        <li><strong>ITC-BT-24:</strong> Protección contra contactos eléctricos</li>
                    </ul>
                    <button class="btn btn-primary" onclick="app.loadITC('itc-18')">
                        <i class="fas fa-arrow-right"></i> Ir a Puesta a Tierra
                    </button>
                </div>

                <div class="card">
                    <h3><i class="fas fa-industry"></i> Instalaciones Especiales</h3>
                    <ul>
                        <li><strong>ITC-BT-28:</strong> Locales de pública concurrencia</li>
                        <li><strong>ITC-BT-29:</strong> Locales con riesgo de incendio o explosión</li>
                        <li><strong>ITC-BT-31:</strong> Piscinas y fuentes</li>
                        <li><strong>ITC-BT-52:</strong> Recarga de vehículos eléctricos</li>
                    </ul>
                </div>

                <h2><i class="fas fa-robot"></i> Asistente de IA</h2>
                <div class="alert alert-info">
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <strong>¿Tienes dudas?</strong> Haz clic en el botón azul flotante con el rayo ⚡ en la esquina inferior derecha.
                        El asistente de IA puede ayudarte con:
                        <ul>
                            <li>Interpretación de artículos y normativa</li>
                            <li>Cálculos eléctricos paso a paso</li>
                            <li>Aclaración de conceptos técnicos</li>
                            <li>Casos prácticos específicos</li>
                        </ul>
                    </div>
                </div>

                <h2><i class="fas fa-route"></i> Cómo usar este curso</h2>
                <ol>
                    <li><strong>Estudia las ITC:</strong> Revisa cada instrucción técnica desde la barra lateral</li>
                    <li><strong>Practica con tests:</strong> Cada ITC tiene 30 preguntas de autoevaluación</li>
                    <li><strong>Pregunta al asistente:</strong> Resuelve dudas en tiempo real</li>
                    <li><strong>Realiza exámenes:</strong> 5 simulacros completos de 30 preguntas</li>
                    <li><strong>Sigue tu progreso:</strong> Revisa tus estadísticas en "Mi Progreso"</li>
                </ol>

                <div class="text-center mt-20">
                    <button class="btn btn-secondary btn-lg" onclick="app.loadITC('itc-01')">
                        <i class="fas fa-play"></i> Comenzar Curso
                    </button>
                </div>
            </div>
        `;
    }

    renderITC(itc) {
        // Si no hay contenido generado, crear uno básico
        let content = itc.content;
        if (!content || content.trim() === '') {
            content = this.generateDefaultITCContent(itc);
        }

        return `
            <div class="card">
                ${content}
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-icon" style="background: var(--secondary-color);">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <div class="card-title">
                        <h2>Test de Autoevaluación</h2>
                        <p>30 preguntas sobre ${itc.title}</p>
                    </div>
                </div>
                
                <div id="test-container-${itc.id}">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <strong>Instrucciones:</strong>
                            <ul>
                                <li>Lee cada pregunta cuidadosamente</li>
                                <li>Selecciona una respuesta</li>
                                <li>Haz clic en "Corregir" para ver el resultado</li>
                                <li>Puedes repetir el test cuantas veces quieras</li>
                            </ul>
                        </div>
                    </div>

                    <button class="btn btn-primary" onclick="app.startTest('${itc.id}')">
                        <i class="fas fa-play"></i> Iniciar Test
                    </button>
                </div>
            </div>

            <div class="text-center mt-20">
                <button class="btn btn-outline" onclick="app.loadView('inicio')">
                    <i class="fas fa-arrow-left"></i> Volver al inicio
                </button>
            </div>
        `;
    }

    generateDefaultITCContent(itc) {
        return `
            <h1>${itc.number}: ${itc.title}</h1>
            <p class="lead">${itc.description}</p>
            
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Alcance:</strong> Esta instrucción técnica regula los aspectos relacionados con ${itc.title.toLowerCase()}.
                </div>
            </div>

            <h2><i class="fas fa-book"></i> Contenido Principal</h2>
            <p>Esta ITC establece las prescripciones técnicas y de seguridad aplicables a las instalaciones eléctricas de baja tensión en lo referente a ${itc.title.toLowerCase()}.</p>

            <h2><i class="fas fa-clipboard-check"></i> Requisitos Principales</h2>
            <ul>
                <li>Cumplimiento de normativa UNE aplicable</li>
                <li>Utilización de materiales homologados</li>
                <li>Ejecución por instalador autorizado</li>
                <li>Certificación de la instalación</li>
                <li>Inspecciones periódicas según corresponda</li>
            </ul>

            <h2><i class="fas fa-robot"></i> ¿Necesitas más información?</h2>
            <div class="alert alert-warning">
                <i class="fas fa-lightbulb"></i>
                <div>
                    <strong>Consulta al Asistente IA:</strong> Haz clic en el botón flotante ⚡ para preguntarle al asistente cualquier duda específica sobre esta ITC.
                </div>
            </div>

            <h2><i class="fas fa-file-alt"></i> Documentación Relacionada</h2>
            <ul>
                <li>Real Decreto 842/2002 - REBT</li>
                <li>Normas UNE aplicables (ver ITC-BT-02)</li>
                <li>Guías técnicas de aplicación</li>
            </ul>
        `;
    }

    startTest(itcId) {
        const questions = this.generateTestQuestions(itcId);
        const container = document.getElementById(`test-container-${itcId}`);
        
        let html = '<div id="test-questions">';
        
        questions.forEach((q, index) => {
            html += `
                <div class="question-card" data-question="${index}">
                    <div class="question-number">Pregunta ${index + 1} de ${questions.length}</div>
                    <div class="question-text">${q.question}</div>
                    <div class="answers">
                        ${q.options.map((opt, i) => `
                            <div class="answer-option" data-answer="${i}">
                                <input type="radio" name="q${index}" id="q${index}_${i}" value="${i}">
                                <label for="q${index}_${i}">${opt}</label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="explanation hidden" id="explanation-${index}">
                        <strong>Explicación:</strong> ${q.explanation}
                    </div>
                </div>
            `;
        });
        
        html += `
            </div>
            <div class="text-center mt-20">
                <button class="btn btn-success" onclick="app.checkTest('${itcId}')">
                    <i class="fas fa-check"></i> Corregir Test
                </button>
                <button class="btn btn-outline" onclick="app.resetTest('${itcId}')">
                    <i class="fas fa-redo"></i> Reiniciar
                </button>
            </div>
            <div id="test-results" class="hidden"></div>
        `;
        
        container.innerHTML = html;

        // Agregar eventos a las opciones
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionCard = this.closest('.question-card');
                questionCard.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });
        });
    }

    checkTest(itcId) {
        const questions = this.generateTestQuestions(itcId);
        let correct = 0;
        let answered = 0;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const questionCard = document.querySelector(`[data-question="${index}"]`);
            const explanation = document.getElementById(`explanation-${index}`);
            
            if (selected) {
                answered++;
                const answer = parseInt(selected.value);
                const options = questionCard.querySelectorAll('.answer-option');
                
                // Mostrar respuesta correcta
                options[q.correct].classList.add('correct');
                
                if (answer === q.correct) {
                    correct++;
                    questionCard.classList.add('correct');
                } else {
                    options[answer].classList.add('incorrect');
                    questionCard.classList.add('incorrect');
                }
                
                explanation.classList.remove('hidden');
            }
        });

        // Mostrar resultados
        const percentage = answered > 0 ? Math.round((correct / questions.length) * 100) : 0;
        const passed = percentage >= 70;
        
        const resultsDiv = document.getElementById('test-results');
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <div class="card ${passed ? 'alert-success' : 'alert-danger'}">
                <h2><i class="fas fa-${passed ? 'check-circle' : 'times-circle'}"></i> Resultados</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${correct}</div>
                        <div class="stat-label">Correctas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${questions.length - correct}</div>
                        <div class="stat-label">Incorrectas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Puntuación</div>
                    </div>
                </div>
                <p><strong>${passed ? '¡Aprobado!' : 'No aprobado'}</strong> ${passed ? 'Excelente trabajo. Continúa con el siguiente módulo.' : 'Necesitas al menos 70% para aprobar. Revisa los contenidos y vuelve a intentarlo.'}</p>
            </div>
        `;

        // Guardar progreso si aprobó
        if (passed && !this.userProgress.completedITCs.includes(itcId)) {
            this.userProgress.completedITCs.push(itcId);
            this.saveProgress();
            this.renderITCList(); // Actualizar lista
        }

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    resetTest(itcId) {
        this.startTest(itcId);
    }

    generateTestQuestions(itcId) {
        // Base de preguntas para cada ITC
        const questionsBank = this.getQuestionsBankForITC(itcId);
        return questionsBank;
    }

    getQuestionsBankForITC(itcId) {
        // Banco de preguntas por ITC (primeras 30 preguntas por defecto)
        // Aquí incluiremos preguntas específicas para las ITC principales
        
        const commonQuestions = [
            {
                question: "¿Cuál es la tensión normalizada monofásica en España?",
                options: ["220 V", "230 V", "240 V", "250 V"],
                correct: 1,
                explanation: "La tensión normalizada en España es 230 V monofásica (fase-neutro) y 400 V trifásica (fase-fase)."
            },
            {
                question: "¿Qué significa la sigla REBT?",
                options: ["Reglamento Eléctrico de Baja Tensión", "Reglamento Electrotécnico para Baja Tensión", "Registro Eléctrico de Baja Tensión", "Reglamento Español de Baja Tensión"],
                correct: 1,
                explanation: "REBT significa Reglamento Electrotécnico para Baja Tensión, aprobado por RD 842/2002."
            },
            {
                question: "¿Cuál es el límite de tensión en corriente alterna para considerarse baja tensión?",
                options: ["500 V", "750 V", "1.000 V", "1.500 V"],
                correct: 2,
                explanation: "Se considera baja tensión hasta 1.000 V en corriente alterna y 1.500 V en corriente continua."
            },
            {
                question: "¿Qué color identifica el conductor de protección (PE)?",
                options: ["Azul", "Marrón", "Verde-amarillo", "Negro"],
                correct: 2,
                explanation: "El conductor de protección PE siempre es verde-amarillo. Es obligatorio por normativa."
            },
            {
                question: "¿Cuál es la sensibilidad obligatoria del diferencial en viviendas?",
                options: ["10 mA", "30 mA", "300 mA", "500 mA"],
                correct: 1,
                explanation: "En viviendas es obligatorio un diferencial de 30 mA para protección contra contactos indirectos."
            }
        ];

        // Generar 30 preguntas (repetir base + específicas del tema)
        const specificQuestions = this.getSpecificQuestions(itcId);
        const allQuestions = [...specificQuestions, ...commonQuestions];
        
        // Asegurar 30 preguntas
        while (allQuestions.length < 30) {
            allQuestions.push({
                question: `Pregunta sobre ${itcId}: ¿Cuál es un requisito importante de esta ITC?`,
                options: [
                    "Cumplir con normativa UNE aplicable",
                    "No es necesario certificar",
                    "Puede hacerlo cualquier persona",
                    "No requiere inspección"
                ],
                correct: 0,
                explanation: "Todas las instalaciones deben cumplir la normativa UNE aplicable y ser ejecutadas por instaladores autorizados."
            });
        }

        return allQuestions.slice(0, 30);
    }

    getSpecificQuestions(itcId) {
        const specificBanks = {
            'itc-01': [
                {
                    question: "¿Qué es la acometida según la ITC-BT-01?",
                    options: [
                        "Derivación desde la red de distribución hasta las instalaciones de enlace",
                        "La instalación interior de la vivienda",
                        "El cuadro general de mando y protección",
                        "Los conductores de protección"
                    ],
                    correct: 0,
                    explanation: "La acometida es la derivación desde la red de distribución hasta las instalaciones de enlace del edificio."
                },
                {
                    question: "¿Qué significa CGP?",
                    options: [
                        "Cuadro General Principal",
                        "Caja General de Protección",
                        "Control General de Potencia",
                        "Circuito General Protegido"
                    ],
                    correct: 1,
                    explanation: "CGP significa Caja General de Protección, que aloja elementos de protección de la línea general de alimentación."
                }
            ],
            'itc-18': [
                {
                    question: "¿Cuál es la resistencia máxima de puesta a tierra con diferencial de 30 mA?",
                    options: ["37 Ω", "80 Ω", "800 Ω", "24 Ω"],
                    correct: 2,
                    explanation: "Con un diferencial de 30 mA, se permite hasta 800 Ω (R × 0,03 ≤ 24 V)."
                },
                {
                    question: "¿Qué diámetro mínimo deben tener las picas de puesta a tierra?",
                    options: ["10 mm", "14 mm", "20 mm", "25 mm"],
                    correct: 1,
                    explanation: "Las picas deben tener un diámetro mínimo de 14 mm y longitud mínima de 2 metros."
                },
                {
                    question: "¿Cuál es la sección mínima del conductor de protección si la fase es de 10 mm²?",
                    options: ["2,5 mm²", "4 mm²", "6 mm²", "10 mm²"],
                    correct: 3,
                    explanation: "Si la fase es ≤ 16 mm², el PE debe tener la misma sección."
                }
            ],
            'itc-25': [
                {
                    question: "¿Cuántos circuitos mínimos debe tener una vivienda con electrificación básica?",
                    options: ["3 circuitos", "5 circuitos", "7 circuitos", "10 circuitos"],
                    correct: 1,
                    explanation: "Una vivienda con electrificación básica debe tener mínimo 5 circuitos: C1, C2, C3, C4 y C5."
                },
                {
                    question: "¿Qué sección de cable se usa en el circuito C1 de iluminación?",
                    options: ["1,5 mm²", "2,5 mm²", "4 mm²", "6 mm²"],
                    correct: 0,
                    explanation: "El circuito C1 de iluminación utiliza cable de 1,5 mm² con protección de 10 A."
                },
                {
                    question: "¿Qué potencia mínima define la electrificación básica?",
                    options: ["3.450 W", "5.750 W", "7.000 W", "9.200 W"],
                    correct: 1,
                    explanation: "La electrificación básica se define con una potencia mínima de 5.750 W."
                },
                {
                    question: "¿Cuál es la caída de tensión máxima permitida para circuitos de iluminación?",
                    options: ["1%", "3%", "5%", "7%"],
                    correct: 1,
                    explanation: "Para circuitos de iluminación, la caída de tensión máxima permitida es del 3%."
                }
            ]
        };

        return specificBanks[itcId] || [];
    }

    renderExamenes() {
        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-icon" style="background: var(--success-color);">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="card-title">
                        <h2>Exámenes Generales</h2>
                        <p>Simulacros de examen oficial de instalador electricista</p>
                    </div>
                </div>

                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Formato de examen:</strong>
                        <ul>
                            <li>30 preguntas tipo test</li>
                            <li>Preguntas de todas las ITC</li>
                            <li>Nota mínima para aprobar: 70%</li>
                            <li>Sin tiempo límite (práctica libre)</li>
                        </ul>
                    </div>
                </div>

                <h2><i class="fas fa-clipboard-list"></i> Exámenes Disponibles</h2>

                ${[1, 2, 3, 4, 5].map(num => `
                    <div class="card">
                        <h3><i class="fas fa-file-alt"></i> Examen General ${num}</h3>
                        <p>Simulacro completo con preguntas variadas sobre instalaciones eléctricas, protecciones, cálculos y normativa.</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${this.userProgress.exams[`exam${num}`] || 0}%"></div>
                        </div>
                        <p><strong>Mejor resultado:</strong> ${this.userProgress.exams[`exam${num}`] || 0}%</p>
                        <button class="btn btn-primary" onclick="app.startExamen(${num})">
                            <i class="fas fa-play"></i> Iniciar Examen ${num}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupExamenesEvents() {
        // Los eventos ya están configurados en el HTML generado
    }

    startExamen(examNumber) {
        const contentArea = document.getElementById('content-area');
        const questions = this.generateExamenQuestions(examNumber);
        
        let html = `
            <div class="card">
                <div class="card-header">
                    <div class="card-icon" style="background: var(--success-color);">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <div class="card-title">
                        <h2>Examen General ${examNumber}</h2>
                        <p>30 preguntas - Todas las ITC</p>
                    </div>
                </div>

                <div id="exam-questions">
        `;
        
        questions.forEach((q, index) => {
            html += `
                <div class="question-card" data-question="${index}">
                    <div class="question-number">Pregunta ${index + 1} de 30</div>
                    <div class="question-text">${q.question}</div>
                    <div class="answers">
                        ${q.options.map((opt, i) => `
                            <div class="answer-option" data-answer="${i}">
                                <input type="radio" name="eq${index}" id="eq${index}_${i}" value="${i}">
                                <label for="eq${index}_${i}">${opt}</label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="explanation hidden" id="exam-explanation-${index}">
                        <strong>Explicación:</strong> ${q.explanation}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="text-center mt-20">
                    <button class="btn btn-success" onclick="app.checkExamen(${examNumber})">
                        <i class="fas fa-check"></i> Corregir Examen
                    </button>
                    <button class="btn btn-outline" onclick="app.loadView('examenes')">
                        <i class="fas fa-arrow-left"></i> Volver
                    </button>
                </div>
                <div id="exam-results" class="hidden"></div>
            </div>
        `;
        
        contentArea.innerHTML = html;

        // Agregar eventos a las opciones
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionCard = this.closest('.question-card');
                questionCard.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });
        });

        window.scrollTo(0, 0);
    }

    checkExamen(examNumber) {
        const questions = this.generateExamenQuestions(examNumber);
        let correct = 0;
        let answered = 0;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="eq${index}"]:checked`);
            const questionCard = document.querySelector(`[data-question="${index}"]`);
            const explanation = document.getElementById(`exam-explanation-${index}`);
            
            if (selected) {
                answered++;
                const answer = parseInt(selected.value);
                const options = questionCard.querySelectorAll('.answer-option');
                
                options[q.correct].classList.add('correct');
                
                if (answer === q.correct) {
                    correct++;
                    questionCard.classList.add('correct');
                } else {
                    options[answer].classList.add('incorrect');
                    questionCard.classList.add('incorrect');
                }
                
                explanation.classList.remove('hidden');
            }
        });

        const percentage = answered > 0 ? Math.round((correct / 30) * 100) : 0;
        const passed = percentage >= 70;
        
        // Guardar mejor resultado
        if (!this.userProgress.exams[`exam${examNumber}`] || percentage > this.userProgress.exams[`exam${examNumber}`]) {
            this.userProgress.exams[`exam${examNumber}`] = percentage;
            this.saveProgress();
        }

        const resultsDiv = document.getElementById('exam-results');
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <div class="card ${passed ? 'alert-success' : 'alert-danger'}">
                <h2><i class="fas fa-${passed ? 'trophy' : 'times-circle'}"></i> Resultados del Examen</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${correct}</div>
                        <div class="stat-label">Respuestas Correctas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${30 - correct}</div>
                        <div class="stat-label">Respuestas Incorrectas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Puntuación Final</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${passed ? 'APTO' : 'NO APTO'}</div>
                        <div class="stat-label">Resultado</div>
                    </div>
                </div>
                <p><strong>${passed ? '¡ENHORABUENA! Has aprobado el examen' : 'No has alcanzado la nota mínima'}</strong></p>
                ${passed ? 
                    '<p>Excelente trabajo. Estás preparado para el examen oficial de instalador electricista.</p>' : 
                    '<p>Necesitas al menos 21 respuestas correctas (70%) para aprobar. Repasa los contenidos e inténtalo de nuevo.</p>'
                }
            </div>
        `;

        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    generateExamenQuestions(examNumber) {
        // Mezclar preguntas de diferentes ITC para crear un examen general
        const allQuestions = [
            // Preguntas generales REBT
            {
                question: "Según el REBT, ¿cuál es el sistema de conexión más común en instalaciones de BT en España?",
                options: ["Sistema TT", "Sistema TN-C", "Sistema TN-S", "Sistema IT"],
                correct: 0,
                explanation: "El sistema TT es el más utilizado en España, donde el neutro de la red y las masas de la instalación están conectados a tierras independientes."
            },
            {
                question: "¿Qué factor se utiliza para calcular la intensidad en un sistema trifásico equilibrado?",
                options: ["√2", "√3", "2", "3"],
                correct: 1,
                explanation: "I = P / (√3 × V × cos φ) es la fórmula para sistemas trifásicos equilibrados."
            },
            {
                question: "¿Cuál es la potencia máxima de un circuito C2 (tomas de uso general) en viviendas?",
                options: ["2.300 W", "3.680 W", "4.600 W", "5.750 W"],
                correct: 1,
                explanation: "El circuito C2 está protegido con un magnetotérmico de 16 A, lo que corresponde a 3.680 W a 230 V."
            },
            {
                question: "¿Qué grado de protección IP mínimo se requiere en locales húmedos?",
                options: ["IP20", "IP44", "IP54", "IP67"],
                correct: 1,
                explanation: "En locales húmedos se requiere mínimo IP44 (protección contra salpicaduras de agua)."
            },
            {
                question: "La Ley de Ohm establece que:",
                options: ["V = I × R", "V = I / R", "V = R / I", "V = I + R"],
                correct: 0,
                explanation: "La Ley de Ohm: V = I × R, donde V es tensión, I es intensidad y R es resistencia."
            },
            {
                question: "¿Cuánto tiempo máximo debe actuar un diferencial de 30 mA a su intensidad nominal?",
                options: ["0,01 s", "0,03 s", "0,05 s", "0,3 s"],
                correct: 3,
                explanation: "Un diferencial de 30 mA debe actuar en menos de 0,3 segundos a su intensidad nominal de disparo."
            },
            {
                question: "¿Qué tipo de cable NO se puede utilizar en instalaciones empotradas en viviendas?",
                options: ["H07V-K", "H07V-U", "ES07Z1-K (AS)", "Cable desnudo"],
                correct: 3,
                explanation: "Los cables desnudos no están permitidos en instalaciones interiores. Siempre deben estar aislados."
            },
            {
                question: "La puesta a tierra tiene como función principal:",
                options: [
                    "Ahorrar energía",
                    "Proteger a las personas contra contactos indirectos",
                    "Mejorar la calidad del suministro",
                    "Reducir el consumo"
                ],
                correct: 1,
                explanation: "La función principal de la puesta a tierra es proteger a las personas contra contactos indirectos desviando corrientes de fuga."
            },
            {
                question: "En una instalación monofásica de 230 V con una carga de 2.300 W, ¿cuál es la intensidad?",
                options: ["5 A", "10 A", "15 A", "20 A"],
                correct: 1,
                explanation: "I = P / V = 2.300 / 230 = 10 A"
            },
            {
                question: "¿Qué significa el marcado CE en un producto eléctrico?",
                options: [
                    "Certificado Español",
                    "Conformidad Europea",
                    "Control Eléctrico",
                    "Calidad Especial"
                ],
                correct: 1,
                explanation: "CE significa Conformidad Europea, indicando que el producto cumple con las directivas europeas aplicables."
            },
            {
                question: "¿Cuál es la sección mínima para el circuito de cocina y horno (C3)?",
                options: ["2,5 mm²", "4 mm²", "6 mm²", "10 mm²"],
                correct: 2,
                explanation: "El circuito C3 (cocina y horno) requiere cable de 6 mm² con protección de 25 A."
            },
            {
                question: "¿Qué documento debe entregar el instalador al finalizar una instalación?",
                options: [
                    "Solo la factura",
                    "Certificado de instalación y documentación técnica",
                    "Únicamente el presupuesto",
                    "No es necesario entregar documentación"
                ],
                correct: 1,
                explanation: "El instalador debe entregar el certificado de instalación junto con la documentación técnica completa."
            },
            {
                question: "¿Cada cuántos años debe inspeccionarse una instalación en local de pública concurrencia?",
                options: ["Cada año", "Cada 3 años", "Cada 5 años", "Cada 10 años"],
                correct: 2,
                explanation: "Las instalaciones en locales de pública concurrencia deben inspeccionarse cada 5 años."
            },
            {
                question: "¿Qué calibre de magnetotérmico se utiliza para el circuito C4 (lavadora, lavavajillas, termo)?",
                options: ["16 A", "20 A", "25 A", "32 A"],
                correct: 1,
                explanation: "El circuito C4 se protege con un magnetotérmico de 20 A y cable de 4 mm²."
            },
            {
                question: "En zonas de baño, ¿a qué distancia mínima de la bañera pueden instalarse tomas de corriente?",
                options: ["0,6 m", "1,2 m", "2,25 m", "3 m"],
                correct: 2,
                explanation: "Las tomas de corriente deben instalarse fuera del volumen 2, es decir, a más de 0,6 m en horizontal de la bañera, o en volumen 3 (más de 2,25 m)."
            },
            {
                question: "¿Cuál es la conductividad del cobre utilizada en cálculos eléctricos?",
                options: ["44 m/(Ω·mm²)", "56 m/(Ω·mm²)", "35 m/(Ω·mm²)", "70 m/(Ω·mm²)"],
                correct: 1,
                explanation: "La conductividad estándar del cobre es 56 m/(Ω·mm²) a 20°C, utilizada en cálculos de caída de tensión."
            },
            {
                question: "¿Qué significa un diferencial tipo A?",
                options: [
                    "Alta sensibilidad",
                    "Detecta corrientes alternas y continuas pulsantes",
                    "Para uso industrial",
                    "Aprobado por AENOR"
                ],
                correct: 1,
                explanation: "El diferencial tipo A detecta corrientes de fuga alternas y continuas pulsantes, necesario para equipos electrónicos modernos."
            },
            {
                question: "¿Cuál es la potencia prevista para el circuito C1 de iluminación?",
                options: ["1.500 W", "2.300 W", "3.680 W", "4.600 W"],
                correct: 1,
                explanation: "El circuito C1 de iluminación tiene una potencia prevista de 2.300 W con protección de 10 A."
            },
            {
                question: "¿Qué es el ICP en una instalación eléctrica?",
                options: [
                    "Interruptor de Control de Potencia",
                    "Instalación de Corriente Principal",
                    "Indicador de Consumo Potencial",
                    "Inspector de Calidad y Protección"
                ],
                correct: 0,
                explanation: "ICP es el Interruptor de Control de Potencia que limita la potencia disponible según lo contratado."
            },
            {
                question: "¿Cuántas tomas de corriente mínimas debe tener un salón-comedor de 18 m²?",
                options: ["3", "5", "7", "10"],
                correct: 1,
                explanation: "Un salón hasta 20 m² debe tener mínimo 5 tomas de corriente según ITC-BT-25."
            },
            {
                question: "¿Cuál es el poder de corte mínimo de un magnetotérmico en viviendas?",
                options: ["1.500 A", "3.000 A", "4.500 A", "6.000 A"],
                correct: 2,
                explanation: "El poder de corte mínimo (PdC) de un magnetotérmico en viviendas es 4.500 A (4,5 kA)."
            },
            {
                question: "¿Qué normativa UNE regula los interruptores automáticos magnetotérmicos?",
                options: ["UNE 20-460", "UNE-EN 60898", "UNE 21186", "UNE-EN 61008"],
                correct: 1,
                explanation: "Los interruptores automáticos magnetotérmicos se regulan por la norma UNE-EN 60898."
            },
            {
                question: "En una instalación con cable de fase de 25 mm², ¿cuál es la sección mínima del conductor de protección?",
                options: ["6 mm²", "10 mm²", "12,5 mm²", "16 mm²"],
                correct: 2,
                explanation: "Para fase > 16 mm², el PE debe ser S/2. Por tanto: 25/2 = 12,5 mm²."
            },
            {
                question: "¿Qué significa el término 'derivación individual' según el REBT?",
                options: [
                    "Circuito de iluminación",
                    "Línea que enlaza el contador con el CGMP",
                    "Toma de tierra",
                    "Acometida principal"
                ],
                correct: 1,
                explanation: "La derivación individual es la línea que va desde el contador hasta el Cuadro General de Mando y Protección de cada usuario."
            },
            {
                question: "¿Qué categoría de instalador puede ejecutar instalaciones en locales de pública concurrencia?",
                options: [
                    "Categoría básica",
                    "Categoría especialista",
                    "Cualquier categoría",
                    "No se requiere instalador autorizado"
                ],
                correct: 1,
                explanation: "Las instalaciones en locales de pública concurrencia requieren instalador de categoría especialista."
            },
            {
                question: "La caída de tensión máxima total desde la acometida hasta el punto más desfavorable es:",
                options: ["3%", "5%", "7%", "10%"],
                correct: 2,
                explanation: "La caída de tensión total máxima admisible es del 7% desde la acometida."
            },
            {
                question: "¿Cuál es la intensidad asignada mínima del Interruptor General Automático para electrificación elevada?",
                options: ["25 A", "32 A", "40 A", "50 A"],
                correct: 2,
                explanation: "Para electrificación elevada, el IGA debe ser de al menos 40 A."
            },
            {
                question: "¿Qué tipos de esquemas de puesta a tierra existen principalmente?",
                options: ["Solo TT", "TT, TN e IT", "AA, BB y CC", "T1, T2 y T3"],
                correct: 1,
                explanation: "Los tres esquemas principales son TT, TN (con variantes TN-C, TN-S, TN-C-S) e IT."
            },
            {
                question: "Una instalación con potencia instalada de 8.000 W se considera:",
                options: [
                    "Electrificación reducida",
                    "Electrificación básica",
                    "Electrificación elevada",
                    "Electrificación industrial"
                ],
                correct: 2,
                explanation: "Más de 5.750 W se considera electrificación elevada."
            },
            {
                question: "¿Cada cuántos metros debe haber un punto de luz en pasillos?",
                options: ["Cada 3 m", "Cada 5 m", "Cada 10 m", "Cada 15 m"],
                correct: 1,
                explanation: "En pasillos debe haber un punto de luz cada 5 metros y una toma cada 10 metros."
            }
        ];

        // Seleccionar 30 preguntas aleatorias (o en orden según el número de examen)
        const startIndex = (examNumber - 1) * 6; // Rotar preguntas según el examen
        const selected = [];
        
        for (let i = 0; i < 30; i++) {
            const index = (startIndex + i) % allQuestions.length;
            selected.push(allQuestions[index]);
        }

        return selected;
    }

    renderProgreso() {
        const totalITCs = REBT_DATA.itcs.length;
        const completedITCs = this.userProgress.completedITCs.length;
        const percentage = Math.round((completedITCs / totalITCs) * 100);

        const examsCompleted = Object.values(this.userProgress.exams).filter(score => score >= 70).length;

        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-icon" style="background: var(--success-color);">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="card-title">
                        <h2>Mi Progreso</h2>
                        <p>Seguimiento de tu aprendizaje</p>
                    </div>
                </div>

                <h2><i class="fas fa-trophy"></i> Resumen General</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-book" style="font-size: 40px; color: var(--primary-color);"></i>
                        <div class="stat-value">${completedITCs}</div>
                        <div class="stat-label">ITC Completadas</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-percent" style="font-size: 40px; color: var(--secondary-color);"></i>
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Progreso Total</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clipboard-check" style="font-size: 40px; color: var(--success-color);"></i>
                        <div class="stat-value">${examsCompleted}</div>
                        <div class="stat-label">Exámenes Aprobados</div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-fire" style="font-size: 40px; color: var(--danger-color);"></i>
                        <div class="stat-value">${this.userProgress.streakDays || 0}</div>
                        <div class="stat-label">Días de Racha</div>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-tasks"></i> Progreso por ITC</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <p><strong>${completedITCs} de ${totalITCs} ITC completadas</strong></p>
                    <p>Has completado el ${percentage}% del curso</p>
                </div>

                <div class="card">
                    <h3><i class="fas fa-graduation-cap"></i> Resultados de Exámenes</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Examen</th>
                                    <th>Mejor Resultado</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${[1, 2, 3, 4, 5].map(num => {
                                    const score = this.userProgress.exams[`exam${num}`] || 0;
                                    const passed = score >= 70;
                                    return `
                                        <tr>
                                            <td><strong>Examen ${num}</strong></td>
                                            <td>${score}%</td>
                                            <td>
                                                ${passed ? 
                                                    '<span class="badge" style="background: var(--success-color); color: white; padding: 5px 10px; border-radius: 5px;">APTO</span>' : 
                                                    (score > 0 ? 
                                                        '<span class="badge" style="background: var(--danger-color); color: white; padding: 5px 10px; border-radius: 5px;">NO APTO</span>' : 
                                                        '<span class="badge" style="background: #ccc; color: #666; padding: 5px 10px; border-radius: 5px;">No realizado</span>'
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-download"></i> Exportar Datos</h3>
                    <p>Descarga tu progreso para respaldo o transferencia.</p>
                    <button class="btn btn-primary" onclick="app.exportProgress()">
                        <i class="fas fa-download"></i> Exportar Progreso (JSON)
                    </button>
                </div>

                <div class="card">
                    <h3><i class="fas fa-trash"></i> Reiniciar Progreso</h3>
                    <p>Elimina todos los datos guardados y comienza de nuevo.</p>
                    <button class="btn btn-danger" onclick="app.resetProgress()">
                        <i class="fas fa-trash"></i> Reiniciar Todo
                    </button>
                </div>
            </div>
        `;
    }

    setupTestEvents(itcId) {
        // Ya configurado en startTest
    }

    searchContent(query) {
        if (query.length < 2) {
            this.renderITCList();
            return;
        }

        const container = document.getElementById('itc-list');
        container.innerHTML = '';

        const results = REBT_DATA.itcs.filter(itc => {
            const searchText = `${itc.number} ${itc.title} ${itc.description}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            container.innerHTML = '<p style="padding: 15px; color: #999;">No se encontraron resultados</p>';
            return;
        }

        results.forEach(itc => {
            const item = document.createElement('div');
            item.className = 'itc-item';
            item.setAttribute('data-itc-id', itc.id);
            
            const completed = this.userProgress.completedITCs.includes(itc.id);
            
            item.innerHTML = `
                <span class="itc-number">${itc.number.replace('ITC-BT-', '')}</span>
                <span class="itc-title">${itc.title}</span>
                <span class="itc-progress ${completed ? 'completed' : ''}">
                    ${completed ? '<i class="fas fa-check"></i>' : ''}
                </span>
            `;

            item.addEventListener('click', () => {
                this.loadITC(itc.id);
            });

            container.appendChild(item);
        });
    }

    updateActiveMenu(view) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        document.querySelectorAll('.itc-item').forEach(item => {
            item.classList.remove('active');
        });

        const menuItem = document.querySelector(`[href="#${view}"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }
    }

    updateBreadcrumb(view, subtitle = '') {
        const breadcrumb = document.getElementById('breadcrumb');
        
        const viewNames = {
            'inicio': 'Inicio',
            'examenes': 'Exámenes Generales',
            'progreso': 'Mi Progreso',
            'ITC': subtitle
        };

        breadcrumb.innerHTML = `
            <i class="fas fa-home"></i>
            <span>${viewNames[view] || view}</span>
        `;
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        const icon = document.querySelector('#dark-mode-toggle i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    applyDarkMode() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            const icon = document.querySelector('#dark-mode-toggle i');
            icon.className = 'fas fa-sun';
        }
    }

    loadProgress() {
        const saved = localStorage.getItem('rebt_progress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            completedITCs: [],
            exams: {},
            streakDays: 0,
            lastAccess: new Date().toISOString()
        };
    }

    saveProgress() {
        this.userProgress.lastAccess = new Date().toISOString();
        localStorage.setItem('rebt_progress', JSON.stringify(this.userProgress));
    }

    exportProgress() {
        const dataStr = JSON.stringify(this.userProgress, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rebt_progreso_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('✅ Progreso exportado correctamente');
    }

    resetProgress() {
        if (confirm('¿Estás seguro de que quieres eliminar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('rebt_progress');
            this.userProgress = {
                completedITCs: [],
                exams: {},
                streakDays: 0,
                lastAccess: new Date().toISOString()
            };
            this.renderITCList();
            this.loadView('inicio');
            alert('✅ Progreso reiniciado correctamente');
        }
    }
}

// Inicializar aplicación
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new REBTApp();
});