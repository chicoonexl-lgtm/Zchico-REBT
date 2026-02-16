// Base de datos completa del curso REBT
const REBT_DATA = {
    // Lista completa de las 52 ITC
    itcs: [
        {
            id: 'itc-01',
            number: 'ITC-BT-01',
            title: 'Terminología',
            description: 'Definiciones y términos técnicos utilizados en el reglamento',
            content: `
                <h1>ITC-BT-01: Terminología</h1>
                <p class="lead">Esta instrucción define los términos técnicos fundamentales utilizados en todo el Reglamento Electrotécnico para Baja Tensión.</p>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Alcance:</strong> Establece definiciones unificadas para asegurar una interpretación correcta del reglamento por parte de todos los agentes involucrados.
                    </div>
                </div>

                <h2><i class="fas fa-book"></i> Definiciones Principales</h2>
                
                <div class="card">
                    <h3>Baja Tensión</h3>
                    <p>Tensiones nominales iguales o inferiores a:</p>
                    <ul>
                        <li><strong>1.000 V</strong> en corriente alterna (AC)</li>
                        <li><strong>1.500 V</strong> en corriente continua (DC)</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Instalación Eléctrica</h3>
                    <p>Conjunto de aparatos y de circuitos asociados, en previsión de un fin particular: producción, conversión, transformación, transmisión, distribución o utilización de la energía eléctrica.</p>
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Término</th>
                                <th>Definición</th>
                                <th>Aplicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Acometida</strong></td>
                                <td>Derivación desde la red de distribución hasta las instalaciones de enlace</td>
                                <td>Conexión con la red pública</td>
                            </tr>
                            <tr>
                                <td><strong>CGP</strong></td>
                                <td>Caja General de Protección. Aloja elementos de protección de la línea general de alimentación</td>
                                <td>Edificios con múltiples suministros</td>
                            </tr>
                            <tr>
                                <td><strong>Conductor activo</strong></td>
                                <td>Conductor de fase o neutro que transporta corriente en servicio normal</td>
                                <td>Circuitos de alimentación</td>
                            </tr>
                            <tr>
                                <td><strong>Conductor de protección</strong></td>
                                <td>Conductor conectado a las masas y elementos metálicos para protección contra contactos indirectos</td>
                                <td>Sistema de puesta a tierra</td>
                            </tr>
                            <tr>
                                <td><strong>Derivación individual</strong></td>
                                <td>Línea que enlaza el contador con el dispositivo general de mando y protección</td>
                                <td>Suministros individuales</td>
                            </tr>
                            <tr>
                                <td><strong>Diferencial</strong></td>
                                <td>Dispositivo de protección contra contactos indirectos que detecta corrientes de fuga</td>
                                <td>Protección de personas</td>
                            </tr>
                            <tr>
                                <td><strong>Magnetotérmico</strong></td>
                                <td>Dispositivo de protección contra sobrecargas y cortocircuitos</td>
                                <td>Protección de instalaciones</td>
                            </tr>
                            <tr>
                                <td><strong>Masa</strong></td>
                                <td>Parte metálica accesible de un aparato que puede quedar en tensión en caso de fallo de aislamiento</td>
                                <td>Elementos a conectar a tierra</td>
                            </tr>
                            <tr>
                                <td><strong>Potencia instalada</strong></td>
                                <td>Suma de las potencias nominales de todos los receptores</td>
                                <td>Dimensionado de instalaciones</td>
                            </tr>
                            <tr>
                                <td><strong>Sección nominal</strong></td>
                                <td>Área de la sección transversal de un conductor expresada en mm²</td>
                                <td>Selección de cables</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2><i class="fas fa-plug"></i> Tipos de Sistemas de Conexión</h2>
                
                <div class="card">
                    <h3>Esquemas TT, TN e IT</h3>
                    <p>La nomenclatura describe la relación entre la red de distribución y las masas de la instalación:</p>
                    <ul>
                        <li><strong>Primera letra:</strong> Situación de la alimentación respecto a tierra
                            <ul>
                                <li><strong>T</strong> (Terra): Conexión directa a tierra</li>
                                <li><strong>I</strong> (Isolated): Aislado de tierra o conectado a través de impedancia</li>
                            </ul>
                        </li>
                        <li><strong>Segunda letra:</strong> Situación de las masas respecto a tierra
                            <ul>
                                <li><strong>T</strong>: Masas conectadas directamente a tierra</li>
                                <li><strong>N</strong>: Masas conectadas al neutro de la alimentación</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Sistema más común en España:</strong> El sistema TT es el más utilizado en instalaciones de baja tensión en edificios y viviendas.
                    </div>
                </div>

                <h2><i class="fas fa-shield-alt"></i> Clases de Aislamiento</h2>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Clase</th>
                                <th>Símbolo</th>
                                <th>Descripción</th>
                                <th>Conexión a tierra</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Clase 0</strong></td>
                                <td>-</td>
                                <td>Aislamiento funcional básico</td>
                                <td>No requerida</td>
                            </tr>
                            <tr>
                                <td><strong>Clase I</strong></td>
                                <td>⏚</td>
                                <td>Aislamiento básico + conexión a tierra de masas accesibles</td>
                                <td>Obligatoria</td>
                            </tr>
                            <tr>
                                <td><strong>Clase II</strong></td>
                                <td>⧈</td>
                                <td>Doble aislamiento o aislamiento reforzado</td>
                                <td>No requerida</td>
                            </tr>
                            <tr>
                                <td><strong>Clase III</strong></td>
                                <td>◇</td>
                                <td>Alimentación a muy baja tensión de seguridad (MBTS)</td>
                                <td>No requerida</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2><i class="fas fa-calculator"></i> Magnitudes Eléctricas Fundamentales</h2>
                
                <div class="card">
                    <h3>Tensión (V)</h3>
                    <p><strong>Fórmula:</strong> V = I × R (Ley de Ohm)</p>
                    <p>Diferencia de potencial eléctrico entre dos puntos. En España, la tensión normalizada de suministro es:</p>
                    <ul>
                        <li><strong>230 V</strong> monofásica (fase-neutro)</li>
                        <li><strong>400 V</strong> trifásica (fase-fase)</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Intensidad (A)</h3>
                    <p><strong>Fórmula:</strong> I = P / V (monofásica) | I = P / (√3 × V) (trifásica)</p>
                    <p>Cantidad de corriente eléctrica que circula por un conductor en amperes.</p>
                </div>

                <div class="card">
                    <h3>Potencia (W)</h3>
                    <p><strong>Fórmula activa:</strong> P = V × I × cos φ</p>
                    <p><strong>Fórmula aparente:</strong> S = V × I (en VA)</p>
                    <p>Energía eléctrica transferida por unidad de tiempo.</p>
                </div>

                <h2><i class="fas fa-graduation-cap"></i> Normativa Relacionada</h2>
                <ul>
                    <li>Real Decreto 842/2002 - REBT</li>
                    <li>UNE 21302 - Vocabulario electrotécnico internacional</li>
                    <li>IEC 60050 - International Electrotechnical Vocabulary</li>
                </ul>
            `
        },
        {
            id: 'itc-02',
            number: 'ITC-BT-02',
            title: 'Normas de referencia',
            description: 'Normas UNE aplicables al Reglamento Electrotécnico para Baja Tensión',
            content: `
                <h1>ITC-BT-02: Normas de Referencia</h1>
                <p class="lead">Esta instrucción recoge el conjunto de normas UNE y otras referencias técnicas aplicables a las instalaciones eléctricas de baja tensión.</p>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Importante:</strong> Las normas se actualizan periódicamente. Siempre debe consultarse la última versión vigente en cada momento.
                    </div>
                </div>

                <h2><i class="fas fa-file-alt"></i> Normas Principales</h2>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Norma UNE</th>
                                <th>Título</th>
                                <th>Aplicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>UNE 20-460</strong></td>
                                <td>Instalaciones eléctricas de baja tensión</td>
                                <td>Norma general de instalaciones</td>
                            </tr>
                            <tr>
                                <td><strong>UNE-HD 60364</strong></td>
                                <td>Instalaciones eléctricas de baja tensión (armonizada)</td>
                                <td>Requisitos fundamentales de seguridad</td>
                            </tr>
                            <tr>
                                <td><strong>UNE 21123</strong></td>
                                <td>Cables de tensión asignada hasta 450/750 V</td>
                                <td>Especificaciones de cables</td>
                            </tr>
                            <tr>
                                <td><strong>UNE 21144</strong></td>
                                <td>Cables de tensión asignada de 0,6/1 kV</td>
                                <td>Cables de distribución</td>
                            </tr>
                            <tr>
                                <td><strong>UNE-EN 60898</strong></td>
                                <td>Interruptores automáticos para protección de sobreintensidades</td>
                                <td>Magnetotérmicos</td>
                            </tr>
                            <tr>
                                <td><strong>UNE-EN 61008</strong></td>
                                <td>Interruptores diferenciales sin protección contra sobreintensidades</td>
                                <td>Diferenciales puros</td>
                            </tr>
                            <tr>
                                <td><strong>UNE-EN 61009</strong></td>
                                <td>Interruptores diferenciales con protección contra sobreintensidades</td>
                                <td>Diferenciales combinados</td>
                            </tr>
                            <tr>
                                <td><strong>UNE 21186</strong></td>
                                <td>Tubos rígidos curvables de PVC</td>
                                <td>Sistemas de canalización</td>
                            </tr>
                            <tr>
                                <td><strong>UNE-EN 50085</strong></td>
                                <td>Sistemas de canales para cables</td>
                                <td>Canaletas y bandejas</td>
                            </tr>
                            <tr>
                                <td><strong>UNE 20324</strong></td>
                                <td>Grados de protección IP</td>
                                <td>Envolventes y cajas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2><i class="fas fa-shield-alt"></i> Normas de Protección</h2>

                <div class="card">
                    <h3>Protección contra contactos eléctricos</h3>
                    <ul>
                        <li><strong>UNE 20-460-4-41:</strong> Protección contra choques eléctricos</li>
                        <li><strong>UNE 20-460-4-47:</strong> Aplicación de medidas de protección para la seguridad</li>
                        <li><strong>UNE-EN 61140:</strong> Protección contra choques eléctricos</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Puesta a tierra</h3>
                    <ul>
                        <li><strong>UNE 21056:</strong> Sistemas de puesta a tierra en edificios</li>
                        <li><strong>UNE 21186:</strong> Electrodos de puesta a tierra</li>
                    </ul>
                </div>

                <h2><i class="fas fa-plug"></i> Normas de Equipos y Materiales</h2>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Normas Aplicables</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Cables y conductores</strong></td>
                                <td>UNE 21123, UNE 21144, UNE-EN 50525</td>
                            </tr>
                            <tr>
                                <td><strong>Tubos protectores</strong></td>
                                <td>UNE-EN 61386, UNE 21186</td>
                            </tr>
                            <tr>
                                <td><strong>Cajas y envolventes</strong></td>
                                <td>UNE-EN 60670, UNE 20324 (IP)</td>
                            </tr>
                            <tr>
                                <td><strong>Interruptores y conmutadores</strong></td>
                                <td>UNE-EN 60669</td>
                            </tr>
                            <tr>
                                <td><strong>Bases de enchufe</strong></td>
                                <td>UNE 20315, UNE-EN 60884</td>
                            </tr>
                            <tr>
                                <td><strong>Luminarias</strong></td>
                                <td>UNE-EN 60598</td>
                            </tr>
                            <tr>
                                <td><strong>Transformadores</strong></td>
                                <td>UNE-EN 61558</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2><i class="fas fa-code-branch"></i> Normas por Tipo de Instalación</h2>

                <div class="card">
                    <h3>Viviendas (ITC-BT-25)</h3>
                    <ul>
                        <li>UNE 20-460-5-523: Intensidades admisibles</li>
                        <li>UNE-HD 60364-5-52: Selección de sistemas eléctricos</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Locales húmedos (ITC-BT-27)</h3>
                    <ul>
                        <li>UNE 20-460-7-701: Locales con bañera o ducha</li>
                        <li>UNE-EN 60529: Grados de protección IP</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Pública concurrencia (ITC-BT-28)</h3>
                    <ul>
                        <li>UNE 20-460-7-710: Locales con riesgo de incendio</li>
                        <li>UNE-EN 60598-1: Luminarias de emergencia</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Piscinas (ITC-BT-31)</h3>
                    <ul>
                        <li>UNE 20-460-7-702: Piscinas y otros estanques</li>
                        <li>UNE-EN 60335-2-60: Aparatos para piscinas</li>
                    </ul>
                </div>

                <h2><i class="fas fa-check-circle"></i> Actualización de Normas</h2>

                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Período de transición:</strong> Cuando se publique una nueva versión de una norma, se permite un período de coexistencia de 24 meses para agotar stocks de material fabricado según la versión anterior.
                    </div>
                </div>

                <h2><i class="fas fa-globe"></i> Organismos de Normalización</h2>

                <ul>
                    <li><strong>AENOR:</strong> Asociación Española de Normalización y Certificación</li>
                    <li><strong>CENELEC:</strong> Comité Europeo de Normalización Electrotécnica</li>
                    <li><strong>IEC:</strong> Comisión Electrotécnica Internacional</li>
                    <li><strong>CEN:</strong> Comité Europeo de Normalización</li>
                </ul>

                <div class="card">
                    <h3>Acceso a las normas</h3>
                    <p>Las normas UNE pueden consultarse y adquirirse a través de:</p>
                    <ul>
                        <li>Tienda AENOR: <a href="https://www.aenor.com" target="_blank">www.aenor.com</a></li>
                        <li>Bibliotecas técnicas especializadas</li>
                        <li>Colegios profesionales (arquitectos, ingenieros)</li>
                    </ul>
                </div>
            `
        }
    ]
};

// Función para generar las 52 ITC completas
function generateAllITCs() {
    const itcTitles = [
        { num: 1, title: 'Terminología' },
        { num: 2, title: 'Normas de referencia' },
        { num: 3, title: 'Empresas instaladoras' },
        { num: 4, title: 'Documentación y puesta en servicio' },
        { num: 5, title: 'Verificaciones e inspecciones' },
        { num: 6, title: 'Redes aéreas para distribución' },
        { num: 7, title: 'Redes subterráneas para distribución' },
        { num: 8, title: 'Sistemas de conexión del neutro y masas' },
        { num: 9, title: 'Instalaciones de alumbrado exterior' },
        { num: 10, title: 'Previsión de cargas' },
        { num: 11, title: 'Acometidas' },
        { num: 12, title: 'Esquemas de instalaciones de enlace' },
        { num: 13, title: 'Cajas Generales de Protección (CGP)' },
        { num: 14, title: 'Línea General de Alimentación (LGA)' },
        { num: 15, title: 'Derivaciones Individuales' },
        { num: 16, title: 'Contadores: ubicación y sistemas' },
        { num: 17, title: 'Dispositivos de mando y protección' },
        { num: 18, title: 'Instalaciones de puesta a tierra' },
        { num: 19, title: 'Instalaciones interiores: prescripciones generales' },
        { num: 20, title: 'Sistemas de instalación interior' },
        { num: 21, title: 'Tubos y canales protectoras' },
        { num: 22, title: 'Protección contra sobreintensidades' },
        { num: 23, title: 'Protección contra sobretensiones' },
        { num: 24, title: 'Protección contra contactos directos e indirectos' },
        { num: 25, title: 'Instalaciones interiores en viviendas: circuitos' },
        { num: 26, title: 'Instalaciones interiores en viviendas: prescripciones' },
        { num: 27, title: 'Locales con bañera o ducha' },
        { num: 28, title: 'Locales de pública concurrencia' },
        { num: 29, title: 'Locales con riesgo de incendio o explosión' },
        { num: 30, title: 'Locales de características especiales' },
        { num: 31, title: 'Piscinas y fuentes' },
        { num: 32, title: 'Máquinas de elevación y transporte' },
        { num: 33, title: 'Instalaciones provisionales y temporales' },
        { num: 34, title: 'Ferias y stands' },
        { num: 35, title: 'Establecimientos agrícolas y hortícolas' },
        { num: 36, title: 'Instalaciones a muy baja tensión' },
        { num: 37, title: 'Instalaciones a tensiones especiales' },
        { num: 38, title: 'Quirófanos y salas de intervención' },
        { num: 39, title: 'Cercas eléctricas para ganado' },
        { num: 40, title: 'Instalaciones generadoras de baja tensión' },
        { num: 41, title: 'Caravanas y parques de caravanas' },
        { num: 42, title: 'Puertos y marinas' },
        { num: 43, title: 'Instalación de receptores: prescripciones generales' },
        { num: 44, title: 'Receptores para alumbrado' },
        { num: 45, title: 'Aparatos de caldeo' },
        { num: 46, title: 'Cables y folios radiantes' },
        { num: 47, title: 'Motores' },
        { num: 48, title: 'Transformadores, reactancias y condensadores' },
        { num: 49, title: 'Instalaciones eléctricas en muebles' },
        { num: 50, title: 'Locales con radiadores para saunas' },
        { num: 51, title: 'Sistemas de automatización y seguridad' },
        { num: 52, title: 'Infraestructura para recarga de vehículos eléctricos' }
    ];

    return itcTitles.map(itc => ({
        id: `itc-${String(itc.num).padStart(2, '0')}`,
        number: `ITC-BT-${String(itc.num).padStart(2, '0')}`,
        title: itc.title,
        description: `Instrucción técnica complementaria sobre ${itc.title.toLowerCase()}`,
        content: '' // Se generará dinámicamente
    }));
}

// Agregar todas las ITC al objeto REBT_DATA
REBT_DATA.itcs = [...REBT_DATA.itcs, ...generateAllITCs().slice(2)];

// Contenido específico para las ITC principales restantes
const specificITCContent = {
    'itc-03': {
        content: `
            <h1>ITC-BT-03: Empresas Instaladoras</h1>
            <p class="lead">Requisitos y obligaciones para las empresas que ejecutan instalaciones eléctricas de baja tensión.</p>
            
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Objetivo:</strong> Regular la actividad profesional de las empresas instaladoras garantizando su cualificación técnica y medios adecuados.
                </div>
            </div>

            <h2><i class="fas fa-building"></i> Categorías de Instaladores</h2>

            <div class="card">
                <h3>Categoría Básica</h3>
                <p><strong>Ámbito de actuación:</strong></p>
                <ul>
                    <li>Instalaciones interiores de viviendas hasta 400 A</li>
                    <li>Instalaciones de enlace</li>
                    <li>Alumbrado exterior hasta 5 kW</li>
                    <li>Locales comerciales y oficinas hasta 400 A</li>
                </ul>
                <p><strong>Requisitos de formación:</strong></p>
                <ul>
                    <li>Ciclo Formativo de Grado Medio en Instalaciones Eléctricas</li>
                    <li>Formación profesional equivalente</li>
                    <li>Experiencia profesional acreditada de 3 años</li>
                </ul>
            </div>

            <div class="card">
                <h3>Categoría Especialista</h3>
                <p><strong>Ámbito de actuación:</strong></p>
                <ul>
                    <li>Todas las instalaciones de la categoría básica</li>
                    <li>Instalaciones industriales</li>
                    <li>Centros de transformación en BT</li>
                    <li>Alumbrado exterior de cualquier potencia</li>
                    <li>Instalaciones en locales de pública concurrencia</li>
                    <li>Locales con riesgo de incendio o explosión</li>
                </ul>
                <p><strong>Requisitos de formación:</strong></p>
                <ul>
                    <li>Ciclo Formativo de Grado Superior</li>
                    <li>Ingeniería Técnica o Superior</li>
                    <li>Experiencia profesional acreditada de 5 años</li>
                </ul>
            </div>

            <h2><i class="fas fa-clipboard-check"></i> Requisitos de la Empresa</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Requisito</th>
                            <th>Descripción</th>
                            <th>Documentación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Personal técnico</strong></td>
                            <td>Al menos un instalador autorizado en plantilla</td>
                            <td>Contrato laboral, nóminas</td>
                        </tr>
                        <tr>
                            <td><strong>Medios técnicos</strong></td>
                            <td>Herramientas y equipos de medida apropiados</td>
                            <td>Inventario de equipos</td>
                        </tr>
                        <tr>
                            <td><strong>Seguro de RC</strong></td>
                            <td>Cobertura mínima: 600.000 € por siniestro</td>
                            <td>Póliza vigente</td>
                        </tr>
                        <tr>
                            <td><strong>Alta censal</strong></td>
                            <td>Actividad económica de instalaciones eléctricas</td>
                            <td>IAE o certificado</td>
                        </tr>
                        <tr>
                            <td><strong>Registro autonómico</strong></td>
                            <td>Inscripción en el registro de empresas instaladoras</td>
                            <td>Carnet de instalador</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2><i class="fas fa-tools"></i> Medios Técnicos Mínimos</h2>

            <div class="card">
                <h3>Equipos de medida obligatorios</h3>
                <ul>
                    <li><strong>Multímetro digital:</strong> Tensión, intensidad, resistencia</li>
                    <li><strong>Pinza amperimétrica:</strong> Medida de corriente sin interrupción</li>
                    <li><strong>Telurómetro:</strong> Medida de resistencia de puesta a tierra</li>
                    <li><strong>Medidor de aislamiento:</strong> Megóhmetro 500/1000 V</li>
                    <li><strong>Verificador de diferenciales:</strong> Comprobación de sensibilidad y tiempo</li>
                    <li><strong>Detector de tensión:</strong> Seguridad antes de trabajar</li>
                    <li><strong>Analizador de redes:</strong> Calidad de suministro (para categoría especialista)</li>
                </ul>
            </div>

            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Calibración:</strong> Los equipos de medida deben estar calibrados y tener certificado vigente de verificación.
                </div>
            </div>

            <h2><i class="fas fa-file-signature"></i> Obligaciones</h2>

            <ul>
                <li>Ejecutar las instalaciones conforme al REBT y proyecto/memoria técnica</li>
                <li>Utilizar materiales que cumplan normativa y marcado CE</li>
                <li>Realizar certificado de instalación</li>
                <li>Entregar documentación al cliente</li>
                <li>Conservar copia de certificados durante 5 años</li>
                <li>Mantener actualizada la formación técnica</li>
                <li>Comunicar cambios en datos de la empresa</li>
            </ul>

            <h2><i class="fas fa-ban"></i> Sanciones</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Infracciones</th>
                            <th>Sanción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Leves</strong></td>
                            <td>Defectos en documentación, incumplimientos sin riesgo</td>
                            <td>Hasta 3.000 €</td>
                        </tr>
                        <tr>
                            <td><strong>Graves</strong></td>
                            <td>Instalaciones sin certificar, incumplimientos con riesgo</td>
                            <td>3.001 € - 60.000 €</td>
                        </tr>
                        <tr>
                            <td><strong>Muy graves</strong></td>
                            <td>Instalaciones con peligro inminente, reincidencia</td>
                            <td>60.001 € - 1.000.000 € + suspensión actividad</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },
    'itc-18': {
        content: `
            <h1>ITC-BT-18: Instalaciones de Puesta a Tierra</h1>
            <p class="lead">Requisitos para los sistemas de puesta a tierra, fundamentales para la seguridad de personas y protección de equipos.</p>
            
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Seguridad crítica:</strong> La puesta a tierra es la medida de protección más importante contra contactos indirectos y descargas atmosféricas.
                </div>
            </div>

            <h2><i class="fas fa-anchor"></i> Componentes del Sistema</h2>

            <div class="card">
                <h3>1. Tomas de tierra (electrodos)</h3>
                <p>Elementos enterrados que realizan el contacto eléctrico con el terreno:</p>
                <ul>
                    <li><strong>Picas verticales:</strong> Φ 14-25 mm, longitud ≥ 2 m, acero cobreado</li>
                    <li><strong>Placas enterradas:</strong> Mínimo 0,5 m², espesor ≥ 2 mm</li>
                    <li><strong>Conductores enterrados:</strong> Cable desnudo Cu ≥ 35 mm²</li>
                    <li><strong>Anillos/mallas:</strong> Perimetrales, Cu ≥ 50 mm²</li>
                </ul>
            </div>

            <div class="card">
                <h3>2. Líneas de enlace con tierra</h3>
                <p>Conductores que unen electrodos con el punto de puesta a tierra:</p>
                <ul>
                    <li>Material: Cobre o acero galvanizado</li>
                    <li>Sección mínima Cu: 16 mm² (35 mm² si enterrado)</li>
                    <li>Protección mecánica si pasa por zonas transitables</li>
                    <li>Arqueta de inspección accesible</li>
                </ul>
            </div>

            <div class="card">
                <h3>3. Punto de puesta a tierra (PPT)</h3>
                <p>Punto de conexión principal del sistema, situado en:</p>
                <ul>
                    <li>Cuarto de contadores o centralización</li>
                    <li>Lugar accesible para verificaciones</li>
                    <li>Conexión mediante bornes desmontables</li>
                    <li>Identificado con símbolo de tierra ⏚</li>
                </ul>
            </div>

            <div class="card">
                <h3>4. Conductores de protección (PE)</h3>
                <p>Unen masas metálicas con el punto de puesta a tierra:</p>
                <ul>
                    <li>Color: Verde-amarillo (obligatorio)</li>
                    <li>Misma canalización que conductores activos</li>
                    <li>Conexiones firmes y accesibles</li>
                </ul>
            </div>

            <h2><i class="fas fa-ruler"></i> Secciones Mínimas del Conductor de Protección</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sección fase (mm²)</th>
                            <th>Sección PE mínima (mm²)</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S ≤ 16</td>
                            <td>S (igual)</td>
                            <td>Mismo material que fase</td>
                        </tr>
                        <tr>
                            <td>16 < S ≤ 35</td>
                            <td>16</td>
                            <td>Cu o equivalente</td>
                        </tr>
                        <tr>
                            <td>S > 35</td>
                            <td>S / 2</td>
                            <td>Máximo 50% de la fase</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Regla práctica:</strong> En viviendas, lo habitual es usar 1,5 mm² para circuitos de iluminación y 2,5 mm² para tomas de corriente.
                </div>
            </div>

            <h2><i class="fas fa-calculator"></i> Resistencia de Puesta a Tierra</h2>

            <div class="card">
                <h3>Valores máximos admisibles</h3>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Instalación</th>
                                <th>Resistencia máxima</th>
                                <th>Fórmula verificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Edificios con diferencial 300 mA</td>
                                <td>≤ 80 Ω</td>
                                <td>R × IΔn ≤ 24 V</td>
                            </tr>
                            <tr>
                                <td>Edificios con diferencial 30 mA</td>
                                <td>≤ 800 Ω</td>
                                <td>R × 0,03 ≤ 24 V</td>
                            </tr>
                            <tr>
                                <td>Viviendas unifamiliares</td>
                                <td>≤ 37 Ω</td>
                                <td>Tensión contacto ≤ 50 V</td>
                            </tr>
                            <tr>
                                <td>Locales húmedos</td>
                                <td>≤ 24 Ω</td>
                                <td>Tensión contacto ≤ 24 V</td>
                            </tr>
                            <tr>
                                <td>Centros de transformación</td>
                                <td>Variable según Ucc</td>
                                <td>R ≤ Ucc / I defecto</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Cálculo de resistencia de puesta a tierra</h3>
                <p><strong>Pica vertical:</strong></p>
                <p>R = (ρ / 2πL) × ln(4L/d)</p>
                <ul>
                    <li>ρ = Resistividad del terreno (Ω·m)</li>
                    <li>L = Longitud de la pica (m)</li>
                    <li>d = Diámetro de la pica (m)</li>
                </ul>

                <p><strong>Placa enterrada:</strong></p>
                <p>R = ρ / (4√A)</p>
                <ul>
                    <li>A = Área de la placa (m²)</li>
                </ul>

                <p><strong>Conductor enterrado horizontal:</strong></p>
                <p>R = 2ρ / L</p>
                <ul>
                    <li>L = Longitud total del conductor (m)</li>
                </ul>
            </div>

            <h2><i class="fas fa-flask"></i> Resistividad del Terreno</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de terreno</th>
                            <th>Resistividad (Ω·m)</th>
                            <th>Calidad para PT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Terrenos pantanosos</td>
                            <td>10 - 50</td>
                            <td>Excelente</td>
                        </tr>
                        <tr>
                            <td>Limo</td>
                            <td>20 - 100</td>
                            <td>Muy buena</td>
                        </tr>
                        <tr>
                            <td>Arcilla húmeda</td>
                            <td>50 - 150</td>
                            <td>Buena</td>
                        </tr>
                        <tr>
                            <td>Arena húmeda</td>
                            <td>100 - 500</td>
                            <td>Aceptable</td>
                        </tr>
                        <tr>
                            <td>Grava</td>
                            <td>500 - 1.000</td>
                            <td>Mala</td>
                        </tr>
                        <tr>
                            <td>Roca</td>
                            <td>1.000 - 10.000</td>
                            <td>Muy mala</td>
                        </tr>
                        <tr>
                            <td>Granito</td>
                            <td>> 10.000</td>
                            <td>Pésima</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2><i class="fas fa-tachometer-alt"></i> Medición y Verificación</h2>

            <div class="card">
                <h3>Método de medida: Telurómetro</h3>
                <ol>
                    <li>Desconectar la instalación del electrodo</li>
                    <li>Clavar dos picas auxiliares en línea recta:
                        <ul>
                            <li>Pica P: a 20-25 m del electrodo</li>
                            <li>Pica C: a 40-50 m del electrodo</li>
                        </ul>
                    </li>
                    <li>Conectar telurómetro y realizar medida</li>
                    <li>Repetir con pica P a diferentes distancias</li>
                    <li>Anotar valor más estable</li>
                </ol>
            </div>

            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Periodicidad:</strong> Las medidas de puesta a tierra deben realizarse:
                    <ul>
                        <li>En la puesta en servicio inicial</li>
                        <li>Cada 5 años en instalaciones comunes</li>
                        <li>Anualmente en locales de pública concurrencia</li>
                        <li>Después de modificaciones importantes</li>
                    </ul>
                </div>
            </div>

            <h2><i class="fas fa-hard-hat"></i> Elementos que Deben Conectarse a Tierra</h2>

            <ul>
                <li><strong>Masas metálicas de equipos clase I:</strong> Carcasas, envolventes</li>
                <li><strong>Elementos conductores accesibles:</strong> Tuberías, estructuras, radiadores</li>
                <li><strong>Armaduras metálicas de construcción</strong></li>
                <li><strong>Elementos metálicos del baño:</strong> Bañera, grifería metálica</li>
                <li><strong>Antenas y pararrayos</strong></li>
                <li><strong>Pantallas de cables</strong></li>
                <li><strong>Cuadros eléctricos metálicos</strong></li>
            </ul>

            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Equipotencialidad:</strong> Todos los elementos conductores accesibles simultáneamente deben estar al mismo potencial mediante conexiones equipotenciales.
                </div>
            </div>
        `
    },
    'itc-25': {
        content: `
            <h1>ITC-BT-25: Instalaciones Interiores en Viviendas - Circuitos</h1>
            <p class="lead">Número mínimo de circuitos, características y potencias para instalaciones en viviendas.</p>
            
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Electrificación básica:</strong> 5.750 W (5.75 kW) con un grado de electrificación mínimo<br>
                    <strong>Electrificación elevada:</strong> > 5.750 W para viviendas con mayores necesidades
                </div>
            </div>

            <h2><i class="fas fa-plug"></i> Circuitos Mínimos Obligatorios</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Circuito</th>
                            <th>Código</th>
                            <th>Tipo protección</th>
                            <th>Sección (mm²)</th>
                            <th>Potencia prevista</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>C1 - Iluminación</strong></td>
                            <td>10 A</td>
                            <td>Magnetotérmico 10 A</td>
                            <td>1,5</td>
                            <td>2.300 W</td>
                        </tr>
                        <tr>
                            <td><strong>C2 - Tomas de uso general</strong></td>
                            <td>16 A</td>
                            <td>Magnetotérmico 16 A</td>
                            <td>2,5</td>
                            <td>3.680 W</td>
                        </tr>
                        <tr>
                            <td><strong>C3 - Cocina y horno</strong></td>
                            <td>25 A</td>
                            <td>Magnetotérmico 25 A</td>
                            <td>6</td>
                            <td>5.750 W</td>
                        </tr>
                        <tr>
                            <td><strong>C4 - Lavadora, lavavajillas y termo</strong></td>
                            <td>20 A</td>
                            <td>Magnetotérmico 20 A</td>
                            <td>4</td>
                            <td>4.600 W</td>
                        </tr>
                        <tr>
                            <td><strong>C5 - Baño y cocina (tomas)</strong></td>
                            <td>16 A</td>
                            <td>Magnetotérmico 16 A</td>
                            <td>2,5</td>
                            <td>3.680 W</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <h3>Circuitos adicionales para electrificación elevada</h3>
                <ul>
                    <li><strong>C6 - Calefacción eléctrica:</strong> 25 A, 6 mm², según potencia</li>
                    <li><strong>C7 - Aire acondicionado:</strong> 25 A, 6 mm², según potencia</li>
                    <li><strong>C8 - Secadora:</strong> 16 A, 2,5 mm², 3.680 W</li>
                    <li><strong>C9 - Tomas adicionales:</strong> 16 A, 2,5 mm²</li>
                    <li><strong>C10 - Iluminación adicional:</strong> 10 A, 1,5 mm²</li>
                    <li><strong>C11 - Automatización/domótica:</strong> 10 A, 1,5 mm²</li>
                    <li><strong>C12 - Toma recarga VE:</strong> Según ITC-BT-52</li>
                </ul>
            </div>

            <h2><i class="fas fa-shield-alt"></i> Dispositivos de Protección</h2>

            <div class="card">
                <h3>Interruptor General Automático (IGA)</h3>
                <ul>
                    <li>Intensidad nominal: 25 A (electrif. básica) o 40 A (electrif. elevada)</li>
                    <li>Corte omnipolar (todos los polos incluido neutro)</li>
                    <li>Poder de corte mínimo: 4.500 A</li>
                    <li>Curva de disparo: C o D</li>
                </ul>
            </div>

            <div class="card">
                <h3>Interruptor Diferencial (ID)</h3>
                <p><strong>Requisitos mínimos:</strong></p>
                <ul>
                    <li>Sensibilidad: 30 mA (obligatorio para toda la vivienda)</li>
                    <li>Intensidad asignada ≥ IGA</li>
                    <li>Tipo AC o A (Tipo A obligatorio si hay fuentes conmutadas)</li>
                    <li>Se permite un diferencial general o varios selectivos</li>
                </ul>

                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Tipo A recomendado:</strong> Electrodomésticos modernos con electrónica (lavadoras, vitrocerámicas, LED) generan corrientes continuas pulsantes que requieren diferencial tipo A.
                    </div>
                </div>
            </div>

            <h2><i class="fas fa-calculator"></i> Cálculo de Sección de Conductores</h2>

            <div class="card">
                <h3>Criterio 1: Intensidad máxima admisible</h3>
                <p>La sección del cable debe soportar la corriente del circuito sin calentarse excesivamente.</p>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sección (mm²)</th>
                                <th>Intensidad máxima (A)</th>
                                <th>Potencia 230V (W)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,5</td>
                                <td>15 A</td>
                                <td>3.450 W</td>
                            </tr>
                            <tr>
                                <td>2,5</td>
                                <td>21 A</td>
                                <td>4.830 W</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>27 A</td>
                                <td>6.210 W</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>36 A</td>
                                <td>8.280 W</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>50 A</td>
                                <td>11.500 W</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><em>Valores para cables en tubo empotrado (instalación tipo B1)</em></p>
            </div>

            <div class="card">
                <h3>Criterio 2: Caída de tensión máxima</h3>
                <p><strong>Límites:</strong></p>
                <ul>
                    <li>Iluminación: ≤ 3%</li>
                    <li>Otros usos: ≤ 5%</li>
                    <li>Total desde acometida: ≤ 7%</li>
                </ul>

                <p><strong>Fórmula caída de tensión monofásica:</strong></p>
                <div class="alert alert-info">
                    <strong>ΔV = 2 × I × L × cos φ / (γ × S)</strong>
                    <ul>
                        <li>ΔV = Caída de tensión (V)</li>
                        <li>I = Intensidad (A)</li>
                        <li>L = Longitud de la línea (m)</li>
                        <li>cos φ = Factor de potencia (≈ 1 para resist., 0.8-0.9 para motores)</li>
                        <li>γ = Conductividad del cobre = 56 m/(Ω·mm²)</li>
                        <li>S = Sección del conductor (mm²)</li>
                    </ul>
                </div>

                <p><strong>Ejemplo práctico:</strong></p>
                <p>Circuito de tomas generales C2: I=16A, L=15m, V=230V</p>
                <p>ΔV = 2 × 16 × 15 × 1 / (56 × 2.5) = 480 / 140 = 3.43 V</p>
                <p>% caída = (3.43 / 230) × 100 = 1.49% ✓ (< 5%)</p>
            </div>

            <h2><i class="fas fa-home"></i> Puntos de Utilización Mínimos</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Estancia</th>
                            <th>Puntos de luz</th>
                            <th>Tomas de corriente</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Acceso/Vestíbulo</strong></td>
                            <td>1</td>
                            <td>1</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td><strong>Salón/comedor</strong></td>
                            <td>1 por cada 10 m²</td>
                            <td>5 (hasta 20 m²)<br>7 (hasta 30 m²)</td>
                            <td>Al menos 1 toma TV/datos</td>
                        </tr>
                        <tr>
                            <td><strong>Dormitorios</strong></td>
                            <td>1</td>
                            <td>3 (hasta 10 m²)<br>4 (> 10 m²)</td>
                            <td>1 toma junto a cada lado de cama</td>
                        </tr>
                        <tr>
                            <td><strong>Baños</strong></td>
                            <td>1</td>
                            <td>1 junto al lavabo</td>
                            <td>Base de enchufe con tapa (IP44)</td>
                        </tr>
                        <tr>
                            <td><strong>Cocina</strong></td>
                            <td>2</td>
                            <td>3 en bancada<br>1 campana<br>1 horno</td>
                            <td>Tomas específicas C3, C4, C5</td>
                        </tr>
                        <tr>
                            <td><strong>Pasillos</strong></td>
                            <td>1 cada 5 m</td>
                            <td>1 cada 10 m</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td><strong>Garaje</strong></td>
                            <td>1</td>
                            <td>1</td>
                            <td>Toma VE si >5m² (ITC-52)</td>
                        </tr>
                        <tr>
                            <td><strong>Terraza/balcón</strong></td>
                            <td>1 si > 10 m²</td>
                            <td>1 si > 10 m²</td>
                            <td>IP44 mínimo en exterior</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2><i class="fas fa-bolt"></i> Previsión de Cargas</h2>

            <div class="card">
                <h3>Cálculo de potencia total instalada</h3>
                <p>P<sub>total</sub> = Σ P<sub>circuitos</sub></p>
                <p>Electrificación básica: ≥ 5.750 W</p>
                <p>Electrificación elevada: > 5.750 W (típico 7.000 - 15.000 W)</p>

                <div class="alert alert-warning">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Nota:</strong> La potencia contratada puede ser inferior a la instalada. El ICP (Interruptor de Control de Potencia) o contador inteligente limitará el consumo simultáneo.
                    </div>
                </div>
            </div>

            <h2><i class="fas fa-tools"></i> Cuadro General de Mando y Protección (CGMP)</h2>

            <div class="card">
                <h3>Composición típica de un CGMP</h3>
                <ol>
                    <li><strong>IGA:</strong> Interruptor General Automático 25-40 A</li>
                    <li><strong>ID general:</strong> 40 A / 30 mA tipo A</li>
                    <li><strong>PIA C1:</strong> Magnetotérmico 10 A (iluminación)</li>
                    <li><strong>PIA C2:</strong> Magnetotérmico 16 A (tomas generales)</li>
                    <li><strong>PIA C3:</strong> Magnetotérmico 25 A (cocina/horno)</li>
                    <li><strong>PIA C4:</strong> Magnetotérmico 20 A (lavadora/termo)</li>
                    <li><strong>PIA C5:</strong> Magnetotérmico 16 A (baño/cocina tomas)</li>
                    <li><strong>Bornes de puesta a tierra</strong></li>
                </ol>

                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Ubicación:</strong> Interior de la vivienda, de fácil acceso, altura 1,4-2 m, señalizado y con documentación de circuitos.
                    </div>
                </div>
            </div>

            <h2><i class="fas fa-lightbulb"></i> Ejemplos Prácticos</h2>

            <div class="card">
                <h3>Ejemplo 1: Vivienda de 70 m² - Electrificación básica</h3>
                <ul>
                    <li>Salón-comedor: 25 m²</li>
                    <li>2 Dormitorios: 12 m² y 10 m²</li>
                    <li>Cocina: 8 m²</li>
                    <li>Baño: 5 m²</li>
                    <li>Pasillo: 6 m</li>
                </ul>
                <p><strong>Circuitos necesarios:</strong> C1, C2, C3, C4, C5 (5 circuitos mínimo)</p>
                <p><strong>Potencia instalada:</strong> 2.300 + 3.680 + 5.750 + 4.600 + 3.680 = 20.010 W</p>
                <p><strong>Potencia a contratar:</strong> 5.750 W (o superior según necesidades)</p>
            </div>
        `
    }
};

// Aplicar contenido específico a las ITC correspondientes
Object.keys(specificITCContent).forEach(itcId => {
    const index = REBT_DATA.itcs.findIndex(itc => itc.id === itcId);
    if (index !== -1) {
        REBT_DATA.itcs[index].content = specificITCContent[itcId].content;
    }
});