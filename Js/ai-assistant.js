// Asistente de IA para el curso REBT
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.knowledgeBase = this.buildKnowledgeBase();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConversation();
    }

    setupEventListeners() {
        // Toggle chat window
        document.getElementById('ai-toggle').addEventListener('click', () => {
            this.toggleChat();
        });

        document.getElementById('ai-close').addEventListener('click', () => {
            this.toggleChat();
        });

        // Send message
        document.getElementById('ai-send').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('ai-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.currentTarget.getAttribute('data-question');
                document.getElementById('ai-input').value = question;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('ai-chat-window');
        
        if (this.isOpen) {
            chatWindow.classList.remove('hidden');
        } else {
            chatWindow.classList.add('hidden');
        }
    }

    async sendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to UI
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Process message
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTyping();
            this.addMessage(response, 'assistant');
            this.saveConversation();
        }, 800);
    }

    addMessage(content, role) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${role}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = role === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.conversationHistory.push({ role, content });
    }

    showTyping() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'ai-message ai-assistant-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <i class="fas fa-circle"></i>
                <i class="fas fa-circle"></i>
                <i class="fas fa-circle"></i>
                Pensando...
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Detección de intención
        if (this.isCalculationQuestion(lowerMessage)) {
            return this.handleCalculation(lowerMessage, userMessage);
        }
        
        if (this.isITCQuestion(lowerMessage)) {
            return this.handleITCQuestion(lowerMessage, userMessage);
        }
        
        if (this.isProtectionQuestion(lowerMessage)) {
            return this.handleProtectionQuestion(lowerMessage);
        }
        
        if (this.isInstallationQuestion(lowerMessage)) {
            return this.handleInstallationQuestion(lowerMessage);
        }
        
        if (this.isCableQuestion(lowerMessage)) {
            return this.handleCableQuestion(lowerMessage);
        }

        // Respuesta genérica inteligente
        return this.handleGeneralQuestion(lowerMessage, userMessage);
    }

    isCalculationQuestion(msg) {
        const keywords = ['calcul', 'sección', 'caída', 'intensidad', 'potencia', 'formula', 'cuanto'];
        return keywords.some(k => msg.includes(k));
    }

    isITCQuestion(msg) {
        return msg.includes('itc') || msg.includes('instrucción');
    }

    isProtectionQuestion(msg) {
        const keywords = ['protección', 'diferencial', 'magnetotérmico', 'tierra', 'puesta'];
        return keywords.some(k => msg.includes(k));
    }

    isInstallationQuestion(msg) {
        const keywords = ['instala', 'vivienda', 'circuito', 'cuadro', 'cgmp'];
        return keywords.some(k => msg.includes(k));
    }

    isCableQuestion(msg) {
        const keywords = ['cable', 'conductor', 'sección', 'mm'];
        return keywords.some(k => msg.includes(k));
    }

    handleCalculation(lowerMsg, originalMsg) {
        if (lowerMsg.includes('sección') && lowerMsg.includes('cable')) {
            return `
                <strong>📐 Cálculo de Sección de Cable</strong><br><br>
                Para calcular la sección de un cable necesitas considerar dos criterios:<br><br>
                
                <strong>1️⃣ Criterio de intensidad máxima admisible:</strong><br>
                El cable debe soportar la corriente sin calentarse. Valores típicos (instalación empotrada B1):<br>
                • 1,5 mm² → 15 A (3.450 W)<br>
                • 2,5 mm² → 21 A (4.830 W)<br>
                • 4 mm² → 27 A (6.210 W)<br>
                • 6 mm² → 36 A (8.280 W)<br><br>
                
                <strong>2️⃣ Criterio de caída de tensión:</strong><br>
                <code>ΔV = 2 × I × L × cos φ / (56 × S)</code><br><br>
                
                Donde:<br>
                • ΔV = Caída de tensión (V)<br>
                • I = Intensidad (A)<br>
                • L = Longitud (m)<br>
                • S = Sección (mm²)<br>
                • 56 = Conductividad del Cu<br><br>
                
                <strong>Límites de caída:</strong><br>
                • Iluminación: ≤ 3%<br>
                • Otros usos: ≤ 5%<br>
                • Total: ≤ 7%<br><br>
                
                ¿Necesitas que calcule una sección específica? Dame los datos: potencia, distancia y tipo de instalación.
            `;
        }

        if (lowerMsg.includes('intensidad')) {
            return `
                <strong>⚡ Cálculo de Intensidad</strong><br><br>
                
                <strong>Monofásica (230 V):</strong><br>
                <code>I = P / V</code><br>
                Ejemplo: 3.000 W / 230 V = 13 A<br><br>
                
                <strong>Trifásica (400 V):</strong><br>
                <code>I = P / (√3 × V × cos φ)</code><br>
                <code>I = P / (1,732 × 400 × 0,9)</code><br>
                Ejemplo: 10.000 W / (1,732 × 400 × 0,9) = 16 A<br><br>
                
                <strong>Con factor de potencia:</strong><br>
                • Resistencias puras: cos φ = 1<br>
                • Motores pequeños: cos φ = 0,8<br>
                • Motores grandes: cos φ = 0,9<br>
                • Fluorescentes compensados: cos φ = 0,95<br><br>
                
                ¿Qué potencia quieres convertir a intensidad?
            `;
        }

        if (lowerMsg.includes('caída') || lowerMsg.includes('tensión')) {
            return `
                <strong>📉 Caída de Tensión</strong><br><br>
                
                <strong>Fórmula monofásica:</strong><br>
                <code>ΔV = 2 × I × L / (56 × S)</code><br><br>
                
                <strong>Fórmula trifásica:</strong><br>
                <code>ΔV = √3 × I × L / (56 × S)</code><br><br>
                
                <strong>Ejemplo práctico:</strong><br>
                Circuito C2 de vivienda:<br>
                • I = 16 A<br>
                • L = 15 m<br>
                • S = 2,5 mm²<br>
                • ΔV = 2 × 16 × 15 / (56 × 2,5) = 3,43 V<br>
                • % = (3,43 / 230) × 100 = 1,49% ✓<br><br>
                
                <strong>Límites REBT:</strong><br>
                • Alumbrado: ≤ 3% (6,9 V en 230 V)<br>
                • Fuerza: ≤ 5% (11,5 V en 230 V)<br>
                • Total acometida: ≤ 7% (16,1 V)<br><br>
                
                Dame tus datos y te calculo la caída de tensión.
            `;
        }

        if (lowerMsg.includes('potencia')) {
            return `
                <strong>💡 Cálculo de Potencia</strong><br><br>
                
                <strong>Potencia activa (W):</strong><br>
                <code>P = V × I × cos φ</code><br>
                Monofásica: 230 V × 10 A × 1 = 2.300 W<br>
                Trifásica: √3 × 400 V × 10 A × 0,9 = 6.235 W<br><br>
                
                <strong>Potencia aparente (VA):</strong><br>
                <code>S = V × I</code><br>
                Se usa para dimensionar transformadores<br><br>
                
                <strong>Potencias típicas en viviendas:</strong><br>
                • Lámpara LED: 10-20 W<br>
                • Televisor: 100-200 W<br>
                • Lavadora: 2.000-2.500 W<br>
                • Horno: 2.500-3.500 W<br>
                • Vitrocerámica: 6.000-7.000 W<br>
                • Calefacción eléctrica: 1.000 W/radiador<br><br>
                
                ¿Qué potencia necesitas calcular?
            `;
        }

        return `
            <strong>🔢 Cálculos Eléctricos</strong><br><br>
            Puedo ayudarte con:<br>
            • Cálculo de secciones de cable<br>
            • Intensidades y potencias<br>
            • Caídas de tensión<br>
            • Resistencias de tierra<br>
            • Protecciones (PIA, diferencial)<br><br>
            
            ¿Qué necesitas calcular específicamente?
        `;
    }

    handleITCQuestion(lowerMsg, originalMsg) {
        // Detectar número de ITC
        const itcMatch = originalMsg.match(/ITC[-\s]?BT[-\s]?(\d+)/i) || originalMsg.match(/(\d+)/);
        
        if (itcMatch) {
            const num = itcMatch[1].padStart(2, '0');
            const itc = REBT_DATA.itcs.find(i => i.id === `itc-${num}`);
            
            if (itc) {
                return `
                    <strong>📋 ${itc.number}: ${itc.title}</strong><br><br>
                    ${itc.description}<br><br>
                    
                    <strong>Puntos clave:</strong><br>
                    ${this.getITCKeyPoints(num)}<br><br>
                    
                    <button class="btn btn-primary" onclick="app.loadITC('itc-${num}')" style="margin-top: 10px;">
                        Ver ITC completa →
                    </button>
                `;
            }
        }

        // Si pregunta por la ITC-18 (puesta a tierra)
        if (lowerMsg.includes('18') || lowerMsg.includes('tierra')) {
            return `
                <strong>⚡ ITC-BT-18: Puesta a Tierra</strong><br><br>
                
                <strong>Componentes principales:</strong><br>
                1️⃣ <strong>Electrodos:</strong> Picas (Φ14mm, L≥2m), placas, cables enterrados<br>
                2️⃣ <strong>Línea de enlace:</strong> Cu ≥35 mm² enterrado<br>
                3️⃣ <strong>Punto de puesta a tierra (PPT):</strong> Conexión principal<br>
                4️⃣ <strong>Conductores PE:</strong> Verde-amarillo, misma canalización<br><br>
                
                <strong>Resistencias máximas:</strong><br>
                • Diferencial 300 mA → ≤ 80 Ω<br>
                • Diferencial 30 mA → ≤ 800 Ω<br>
                • Viviendas unifamiliares → ≤ 37 Ω<br>
                • Locales húmedos → ≤ 24 Ω<br><br>
                
                <strong>Sección del PE:</strong><br>
                • Si fase ≤16 mm² → PE = fase<br>
                • Si 16 < fase ≤35 mm² → PE = 16 mm²<br>
                • Si fase >35 mm² → PE = fase/2<br><br>
                
                <button class="btn btn-primary" onclick="app.loadITC('itc-18')">
                    Ver ITC-18 completa →
                </button>
            `;
        }

        // ITC-25 (circuitos en viviendas)
        if (lowerMsg.includes('25') || lowerMsg.includes('vivienda') || lowerMsg.includes('circuito')) {
            return `
                <strong>🏠 ITC-BT-25: Circuitos en Viviendas</strong><br><br>
                
                <strong>Circuitos mínimos obligatorios:</strong><br>
                <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                    <tr style="background:#0066CC; color:white;">
                        <th style="padding:8px; text-align:left;">Circuito</th>
                        <th style="padding:8px;">Protección</th>
                        <th style="padding:8px;">Sección</th>
                    </tr>
                    <tr style="background:#f0f0f0;">
                        <td style="padding:8px;"><strong>C1</strong> Iluminación</td>
                        <td style="padding:8px;">10 A</td>
                        <td style="padding:8px;">1,5 mm²</td>
                    </tr>
                    <tr>
                        <td style="padding:8px;"><strong>C2</strong> Tomas generales</td>
                        <td style="padding:8px;">16 A</td>
                        <td style="padding:8px;">2,5 mm²</td>
                    </tr>
                    <tr style="background:#f0f0f0;">
                        <td style="padding:8px;"><strong>C3</strong> Cocina/horno</td>
                        <td style="padding:8px;">25 A</td>
                        <td style="padding:8px;">6 mm²</td>
                    </tr>
                    <tr>
                        <td style="padding:8px;"><strong>C4</strong> Lavadora/termo</td>
                        <td style="padding:8px;">20 A</td>
                        <td style="padding:8px;">4 mm²</td>
                    </tr>
                    <tr style="background:#f0f0f0;">
                        <td style="padding:8px;"><strong>C5</strong> Baño/cocina</td>
                        <td style="padding:8px;">16 A</td>
                        <td style="padding:8px;">2,5 mm²</td>
                    </tr>
                </table><br>
                
                <strong>Electrificación:</strong><br>
                • Básica: ≥ 5.750 W (5 circuitos)<br>
                • Elevada: > 5.750 W (+ circuitos adicionales)<br><br>
                
                <button class="btn btn-primary" onclick="app.loadITC('itc-25')">
                    Ver ITC-25 completa →
                </button>
            `;
        }

        return `
            <strong>📚 Instrucciones Técnicas Complementarias (ITC)</strong><br><br>
            
            El REBT tiene 52 ITC. Las más importantes son:<br><br>
            
            <strong>Instalaciones en viviendas:</strong><br>
            • ITC-BT-25: Número de circuitos<br>
            • ITC-BT-26: Prescripciones generales<br>
            • ITC-BT-27: Locales con bañera/ducha<br><br>
            
            <strong>Protecciones:</strong><br>
            • ITC-BT-18: Puesta a tierra<br>
            • ITC-BT-22: Sobreintensidades<br>
            • ITC-BT-24: Contactos eléctricos<br><br>
            
            <strong>Instalaciones especiales:</strong><br>
            • ITC-BT-28: Pública concurrencia<br>
            • ITC-BT-31: Piscinas<br>
            • ITC-BT-52: Recarga vehículos eléctricos<br><br>
            
            ¿Sobre qué ITC necesitas información?
        `;
    }

    handleProtectionQuestion(lowerMsg) {
        if (lowerMsg.includes('diferencial')) {
            return `
                <strong>🛡️ Interruptor Diferencial</strong><br><br>
                
                <strong>Función:</strong> Protege contra contactos indirectos detectando corrientes de fuga.<br><br>
                
                <strong>Características principales:</strong><br>
                • <strong>Sensibilidad en viviendas:</strong> 30 mA (obligatorio)<br>
                • <strong>Intensidad nominal:</strong> ≥ IGA (típico 40 A)<br>
                • <strong>Tiempo de actuación:</strong> < 0,3 s a IΔn<br>
                • <strong>Tipos:</strong><br>
                  - <strong>Tipo AC:</strong> Corrientes alternas senoidales<br>
                  - <strong>Tipo A:</strong> AC + corrientes continuas pulsantes (recomendado)<br>
                  - <strong>Tipo B:</strong> Incluye continua pura (industrial)<br><br>
                
                <strong>¿Por qué Tipo A?</strong><br>
                Los electrodomésticos modernos (lavadoras, vitrocerámicas, LED) generan corrientes continuas pulsantes que el tipo AC no detecta bien.<br><br>
                
                <strong>Verificación:</strong><br>
                • Pulsar botón TEST mensualmente<br>
                • Medida con verificador de diferenciales<br>
                • Debe actuar entre 0,5 × IΔn y 1 × IΔn<br><br>
                
                <strong>Fórmula de coordinación con tierra:</strong><br>
                <code>R × IΔn ≤ 24 V</code> (locales secos)<br>
                Ejemplo: 800 Ω × 0,03 A = 24 V ✓
            `;
        }

        if (lowerMsg.includes('magnetotérmico') || lowerMsg.includes('pia')) {
            return `
                <strong>⚙️ Interruptor Magnetotérmico (PIA)</strong><br><br>
                
                <strong>Función:</strong> Protege contra sobrecargas y cortocircuitos.<br><br>
                
                <strong>Componentes:</strong><br>
                1️⃣ <strong>Protección térmica:</strong> Bimetal que actúa ante sobrecargas (lento)<br>
                2️⃣ <strong>Protección magnética:</strong> Electroimán que actúa ante cortocircuitos (instantáneo)<br><br>
                
                <strong>Curvas de disparo:</strong><br>
                • <strong>Curva B:</strong> 3-5 × In (usos generales)<br>
                • <strong>Curva C:</strong> 5-10 × In (viviendas, pequeños motores) ← MÁS COMÚN<br>
                • <strong>Curva D:</strong> 10-20 × In (motores grandes, transformadores)<br><br>
                
                <strong>Poder de corte (PdC):</strong><br>
                • Viviendas: ≥ 4.500 A (4,5 kA)<br>
                • Industrial: ≥ 6.000 A (6 kA)<br>
                • Zonas conflictivas: ≥ 10.000 A<br><br>
                
                <strong>Selección de calibre:</strong><br>
                La intensidad nominal (In) debe ser:<br>
                • In ≥ Ib (corriente de diseño)<br>
                • Iz ≥ In (intensidad admisible del cable)<br>
                • Iz ≥ 1,45 × In (protección efectiva)<br><br>
                
                <strong>Normativa:</strong> UNE-EN 60898
            `;
        }

        if (lowerMsg.includes('tierra') || lowerMsg.includes('puesta')) {
            return `
                <strong>🌍 Sistema de Puesta a Tierra</strong><br><br>
                
                <strong>¿Por qué es vital?</strong><br>
                La puesta a tierra es LA medida de seguridad más importante. Desvía corrientes de fuga a tierra evitando electrocuciones.<br><br>
                
                <strong>Componentes:</strong><br>
                1️⃣ <strong>Electrodos:</strong> Elementos enterrados (picas, placas, cables)<br>
                2️⃣ <strong>Línea de enlace:</strong> Conecta electrodos con PPT<br>
                3️⃣ <strong>PPT:</strong> Punto de conexión principal<br>
                4️⃣ <strong>Conductores PE:</strong> Verde-amarillo, conectan masas<br><br>
                
                <strong>Resistencia máxima admisible:</strong><br>
                Se calcula con: <code>R ≤ 24 V / IΔn</code><br>
                • Diferencial 30 mA → R ≤ 800 Ω<br>
                • Diferencial 300 mA → R ≤ 80 Ω<br>
                • Locales húmedos → R ≤ 24 Ω (tensión ≤ 24 V)<br><br>
                
                <strong>Medición:</strong><br>
                Con telurómetro mediante método de 3 puntos:<br>
                • Desconectar instalación del electrodo<br>
                • Clavar 2 picas auxiliares (20m y 40m)<br>
                • Medir y anotar valor<br><br>
                
                <strong>Frecuencia de medidas:</strong><br>
                • Puesta en servicio: Obligatorio<br>
                • Viviendas: Cada 5 años<br>
                • Pública concurrencia: Anual<br><br>
                
                Ver <strong>ITC-BT-18</strong> para más detalles.
            `;
        }

        return `
            <strong>🛡️ Protecciones Eléctricas</strong><br><br>
            
            <strong>1. Contra sobreintensidades (ITC-BT-22):</strong><br>
            • Magnetotérmicos (PIA)<br>
            • Fusibles<br><br>
            
            <strong>2. Contra contactos indirectos (ITC-BT-24):</strong><br>
            • Interruptores diferenciales<br>
            • Puesta a tierra (ITC-BT-18)<br>
            • Separación de circuitos<br>
            • MBTS (Muy Baja Tensión de Seguridad)<br><br>
            
            <strong>3. Contra sobretensiones (ITC-BT-23):</strong><br>
            • Protectores de sobretensión (DPS)<br>
            • Categorías I, II, III, IV<br><br>
            
            ¿Sobre qué protección necesitas información específica?
        `;
    }

    handleInstallationQuestion(lowerMsg) {
        if (lowerMsg.includes('vivienda') || lowerMsg.includes('circuito')) {
            return `
                <strong>🏠 Instalación en Viviendas</strong><br><br>
                
                <strong>Grado de electrificación:</strong><br>
                • <strong>Básica:</strong> ≥ 5.750 W (5 circuitos mínimo)<br>
                • <strong>Elevada:</strong> > 5.750 W (+ circuitos adicionales)<br><br>
                
                <strong>5 Circuitos obligatorios (Básica):</strong><br>
                1️⃣ <strong>C1 - Iluminación:</strong> 10A, 1,5mm², 2.300W<br>
                2️⃣ <strong>C2 - Tomas generales:</strong> 16A, 2,5mm², 3.680W<br>
                3️⃣ <strong>C3 - Cocina/horno:</strong> 25A, 6mm², 5.750W<br>
                4️⃣ <strong>C4 - Lavadora/termo:</strong> 20A, 4mm², 4.600W<br>
                5️⃣ <strong>C5 - Baño/cocina tomas:</strong> 16A, 2,5mm², 3.680W<br><br>
                
                <strong>Circuitos adicionales (Elevada):</strong><br>
                • C6 - Calefacción eléctrica<br>
                • C7 - Aire acondicionado<br>
                • C8 - Secadora<br>
                • C9-C10 - Tomas/iluminación extra<br>
                • C11 - Domótica<br>
                • C12 - Recarga vehículo eléctrico<br><br>
                
                <strong>CGMP (Cuadro General):</strong><br>
                • IGA: 25A (básica) o 40A (elevada)<br>
                • Diferencial: 40A / 30mA tipo A<br>
                • PIAs individuales por circuito<br>
                • Ubicación: interior vivienda, accesible, altura 1,4-2m<br><br>
                
                Ver <strong>ITC-BT-25</strong> para detalles completos.
            `;
        }

        if (lowerMsg.includes('cuadro') || lowerMsg.includes('cgmp')) {
            return `
                <strong>🔌 Cuadro General de Mando y Protección (CGMP)</strong><br><br>
                
                <strong>Ubicación:</strong><br>
                • Interior de la vivienda/local<br>
                • Lugar accesible<br>
                • Altura: 1,4 a 2 metros<br>
                • Cerca de la entrada<br><br>
                
                <strong>Composición típica:</strong><br>
                1️⃣ <strong>IGA:</strong> Interruptor General Automático<br>
                   - 25A (electrificación básica)<br>
                   - 40A (electrificación elevada)<br>
                   - Corte omnipolar<br>
                   - PdC ≥ 4.500A<br><br>
                
                2️⃣ <strong>Diferencial(es):</strong><br>
                   - 30 mA (obligatorio)<br>
                   - Intensidad ≥ IGA<br>
                   - Tipo A recomendado<br><br>
                
                3️⃣ <strong>PIAs individuales:</strong><br>
                   - Un magnetotérmico por circuito<br>
                   - Calibres según ITC-BT-25<br><br>
                
                4️⃣ <strong>Bornes de tierra:</strong><br>
                   - Conexión visible<br>
                   - Identificado con símbolo ⏚<br><br>
                
                <strong>Señalización:</strong><br>
                • Esquema unifilar en puerta del cuadro<br>
                • Identificación clara de cada circuito<br>
                • Documentación técnica disponible<br><br>
                
                <strong>Normativa:</strong> ITC-BT-17, ITC-BT-25
            `;
        }

        return `
            <strong>🔧 Instalaciones Eléctricas</strong><br><br>
            
            Puedo ayudarte con:<br>
            • <strong>Viviendas:</strong> Circuitos, protecciones, dimensionado<br>
            • <strong>Locales comerciales:</strong> Requisitos específicos<br>
            • <strong>Pública concurrencia:</strong> ITC-BT-28<br>
            • <strong>Piscinas:</strong> ITC-BT-31<br>
            • <strong>Locales húmedos:</strong> Baños (ITC-BT-27)<br>
            • <strong>Recarga VE:</strong> ITC-BT-52<br><br>
            
            ¿Qué tipo de instalación necesitas consultar?
        `;
    }

    handleCableQuestion(lowerMsg) {
        return `
            <strong>🔌 Cables y Conductores</strong><br><br>
            
            <strong>Secciones normalizadas (mm²):</strong><br>
            1,5 - 2,5 - 4 - 6 - 10 - 16 - 25 - 35 - 50 - 70 - 95 - 120 - 150...<br><br>
            
            <strong>Intensidades máximas admisibles (Tipo B1 empotrado):</strong><br>
            • 1,5 mm² → 15 A → 3.450 W<br>
            • 2,5 mm² → 21 A → 4.830 W<br>
            • 4 mm² → 27 A → 6.210 W<br>
            • 6 mm² → 36 A → 8.280 W<br>
            • 10 mm² → 50 A → 11.500 W<br><br>
            
            <strong>Tipos de cables para viviendas:</strong><br>
            • <strong>H07V-U:</strong> Unipolar rígido (más común empotrado)<br>
            • <strong>H07V-K:</strong> Unipolar flexible (cuadros, registros)<br>
            • <strong>ES07Z1-K (AS):</strong> Libre halógenos (seguridad)<br>
            • <strong>RZ1-K:</strong> 0,6/1kV aislamiento XLPE<br><br>
            
            <strong>Colores normalizados:</strong><br>
            • <strong>Fase L1:</strong> Marrón (o negro, gris)<br>
            • <strong>Fase L2:</strong> Negro<br>
            • <strong>Fase L3:</strong> Gris<br>
            • <strong>Neutro N:</strong> Azul claro (OBLIGATORIO)<br>
            • <strong>Protección PE:</strong> Verde-amarillo (OBLIGATORIO)<br><br>
            
            <strong>Selección de sección:</strong><br>
            1. Por intensidad máxima (tabla UNE)<br>
            2. Por caída de tensión (≤3% luz, ≤5% fuerza)<br>
            3. Se elige la <strong>mayor</strong> de ambas<br><br>
            
            ¿Necesitas ayuda para seleccionar un cable específico?
        `;
    }

    handleGeneralQuestion(lowerMsg, originalMsg) {
        // Respuestas contextuales basadas en palabras clave
        const responses = {
            'hola': '¡Hola! 👋 Soy tu asistente especializado en el REBT. ¿En qué puedo ayudarte hoy?',
            'gracias': '¡De nada! Estoy aquí para ayudarte. Si tienes más dudas sobre el REBT, no dudes en preguntar. 😊',
            'ayuda': `
                <strong>¿Cómo puedo ayudarte?</strong><br><br>
                Puedo responder preguntas sobre:<br>
                • 📐 Cálculos eléctricos (secciones, intensidades, caídas de tensión)<br>
                • 📚 Interpretación de ITC del REBT<br>
                • 🛡️ Protecciones (diferenciales, magnetotérmicos, tierra)<br>
                • 🏠 Instalaciones en viviendas<br>
                • ⚡ Casos prácticos<br>
                • 📋 Normativa aplicable<br><br>
                
                Ejemplos de preguntas:<br>
                • "¿Cómo calculo la sección de un cable?"<br>
                • "¿Qué diferencial necesito para una vivienda?"<br>
                • "Explícame la ITC-BT-18 sobre puesta a tierra"<br>
                • "¿Cuáles son los circuitos mínimos en una vivienda?"
            `,
            'examen': `
                <strong>📝 Preparación para el Examen</strong><br><br>
                
                Para prepararte adecuadamente:<br><br>
                
                1️⃣ <strong>Estudia las ITC principales:</strong><br>
                • ITC-BT-18: Puesta a tierra<br>
                • ITC-BT-25: Circuitos en viviendas<br>
                • ITC-BT-22: Protecciones contra sobreintensidades<br>
                • ITC-BT-24: Contactos eléctricos<br><br>
                
                2️⃣ <strong>Practica cálculos:</strong><br>
                • Secciones de cables<br>
                • Caídas de tensión<br>
                • Intensidades y potencias<br>
                • Resistencia de tierra<br><br>
                
                3️⃣ <strong>Realiza los 5 exámenes generales</strong> disponibles en la sección "Exámenes"<br><br>
                
                4️⃣ <strong>Completa los tests de cada ITC</strong> (30 preguntas por módulo)<br><br>
                
                <strong>Consejo:</strong> Para aprobar necesitas ≥70% de aciertos. Repasa los errores y vuelve a intentarlo hasta dominarlo.
            `
        };

        for (const [key, response] of Object.entries(responses)) {
            if (lowerMsg.includes(key)) {
                return response;
            }
        }

        // Respuesta por defecto con sugerencias
        return `
            <strong>💬 Pregunta recibida</strong><br><br>
            
            He recibido tu pregunta: "<em>${originalMsg}</em>"<br><br>
            
            Te puedo ayudar mejor si me preguntas sobre:<br>
            • 📐 Cálculos específicos (intensidades, secciones, caídas de tensión)<br>
            • 📋 Alguna ITC en particular (ej: ITC-BT-18, ITC-BT-25)<br>
            • 🛡️ Protecciones eléctricas (diferenciales, magnetotérmicos)<br>
            • 🏠 Instalaciones en viviendas o locales<br>
            • ⚡ Casos prácticos del REBT<br><br>
            
            <strong>Ejemplos de preguntas:</strong><br>
            • "¿Cómo calculo la sección de un cable de 20A a 15 metros?"<br>
            • "¿Qué es un diferencial tipo A?"<br>
            • "Explícame la puesta a tierra"<br>
            • "¿Cuántos circuitos necesita una vivienda?"<br><br>
            
            ¿Podrías reformular tu pregunta de forma más específica?
        `;
    }

    getITCKeyPoints(itcNum) {
        const keyPoints = {
            '01': '• Define términos técnicos del REBT<br>• Establece nomenclatura unificada<br>• Fundamental para interpretar el reglamento',
            '18': '• Resistencia máxima según diferencial<br>• Sección del conductor PE según fase<br>• Componentes: electrodos, línea enlace, PPT',
            '25': '• 5 circuitos mínimos obligatorios<br>• Electrificación básica: ≥5.750W<br>• Secciones y protecciones por circuito',
            '03': '• Categoría básica vs especialista<br>• Requisitos de formación y medios técnicos<br>• Seguro RC mínimo 600.000€',
            '27': '• Volúmenes de protección en baños<br>• IP mínimo según volumen<br>• Prohibiciones y requisitos especiales'
        };

        return keyPoints[itcNum] || '• Consulta la ITC completa para más detalles<br>• Normativa UNE aplicable<br>• Verificaciones e inspecciones';
    }

    buildKnowledgeBase() {
        // Base de conocimiento simplificada del REBT
        return {
            voltages: {
                monofasica: 230,
                trifasica: 400,
                bajaTensionAC: 1000,
                bajaTensionDC: 1500
            },
            sections: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150],
            circuits: {
                C1: { name: 'Iluminación', protection: '10A', section: '1.5mm²', power: '2300W' },
                C2: { name: 'Tomas generales', protection: '16A', section: '2.5mm²', power: '3680W' },
                C3: { name: 'Cocina/horno', protection: '25A', section: '6mm²', power: '5750W' },
                C4: { name: 'Lavadora/termo', protection: '20A', section: '4mm²', power: '4600W' },
                C5: { name: 'Baño/cocina', protection: '16A', section: '2.5mm²', power: '3680W' }
            }
        };
    }

    saveConversation() {
        localStorage.setItem('ai_conversation', JSON.stringify(this.conversationHistory));
    }

    loadConversation() {
        const saved = localStorage.getItem('ai_conversation');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
            // No cargar historial en UI para empezar fresco
        }
    }
}

// Inicializar asistente de IA
let aiAssistant;
document.addEventListener('DOMContentLoaded', () => {
    aiAssistant = new AIAssistant();
});