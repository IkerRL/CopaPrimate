const container = document.getElementById("container-equipos");
const audio = document.getElementById("audioMono");

// Lógica del Sonido de los Monos
document.querySelectorAll('.btn-sonido').forEach(mono => {
    mono.addEventListener('click', () => {
        audio.currentTime = 0; 
        audio.play();
    });
});

const equipos = [
  { nombre: "Rose Devil", jugadores: ["Tony", "Jokker"], logo: "logo1.png" },
  { nombre: "Golden Sex", jugadores: ["Max", "Broken"], logo: "logo2.png" },
  { nombre: "Al-dedillo VC", jugadores: ["Xolo", "Noavae"], logo: "logo3.png" },
  { nombre: "Los Akrtona2", jugadores: ["S3R4X", "MasterKira"], logo: "logo4.png" },
  { nombre: "Crimson Eclipse", jugadores: ["ReyFhantom", "zNyrex "], logo: "logo5.png" },
  { nombre: "Makaco NinjaPelocho", jugadores: ["Iker", "Adri"], logo: "logo6.png" },
  { nombre: "Bloody Fruit", jugadores: ["MrPain 神", "Sandiass21"], logo: "logo7.png" },
  { nombre: "Hijas del Kaos", jugadores: ["Satha", "Kaos"], logo: "logo8.png" },
  { nombre: "Konoha Makaca", jugadores: ["MakaQuillo", "MakaIsla"], logo: "logo9.png" },
  { nombre: "Team Obrikat", jugadores: ["JettDiffs", "EGOFack"], logo: "logo10.png" },
  { nombre: "TETONES: Equipo Nacional de Somalia", jugadores: ["Marrkitosss", "Davv"], logo: "logo11.png" },
  { nombre: "GOATS", jugadores: ["Mica", "Marco"], logo: "logo12.png" },
  { nombre: "SPIDYBOOBS", jugadores: ["Sama", "Potro"], logo: "logo13.png" },
  { nombre: "MUGIWARAS", jugadores: ["Andreloregon", "Jess"], logo: "logo14.png" },
  { nombre: "Miaus", jugadores: ["Kae", "Wilson"], logo: "logo15.png" }
];

const gruposOficiales = {
    "A": ["Rose Devil", "Hijas del Kaos", "Al-dedillo VC", "Bloody Fruit"],
    "B": ["GOATS", "Los Akrtona2", "Crimson Eclipse", "Miaus"],
    "C": ["SPIDYBOOBS", "MUGIWARAS", "TETONES: Equipo Nacional de Somalia", "Golden Sex"],
    "D": ["Konoha Makaca", "Makaco NinjaPelocho", "Team Obrikat"]
};

// RESULTADOS GRUPO A INTEGRADOS
const memoriaResultados = { 
    "A": [
        { sL: "4", sV: "5" }, // Rose Devil vs Hijas del Kaos
        { sL: "5", sV: "0" }, // Al-dedillo VC vs Bloody Fruit
        { sL: "5", sV: "3" }, // Rose Devil vs Al-dedillo VC
        { sL: "5", sV: "0" }, // Hijas del Kaos vs Bloody Fruit
        { sL: "5", sV: "0" }, // Rose Devil vs Bloody Fruit
        { sL: "5", sV: "2" }  // Hijas del Kaos vs Al-dedillo VC
    ], 
"B": [
        { sL: "1", sV: "5" }, // GOATS vs Los Akrtona2
        { sL: "0", sV: "5" }, // Crimson Eclipse vs Miaus
        { sL: "5", sV: "0" }, // GOATS vs Crimson Eclipse
        { sL: "2", sV: "5" }, // Los Akrtona2 vs Miaus
        { sL: "1", sV: "5" }, // GOATS vs Miaus
        { sL: "5", sV: "0" }  // Los Akrtona2 vs Crimson Eclipse
    ],
"C": [
        { sL: "5", sV: "1" }, // SPIDYBOOBS vs MUGIWARAS
        { sL: "5", sV: "0" }, // TETONES vs Golden Sex
        { sL: "3", sV: "5" }, // SPIDYBOOBS vs TETONES
        { sL: "1", sV: "5" }, // MUGIWARAS vs Golden Sex
        { sL: "2", sV: "5" }, // SPIDYBOOBS vs Golden Sex
        { sL: "4", sV: "5" }  // MUGIWARAS vs TETONES
    ],
    "D": Array(3).fill(null).map(() => ({ sL: "", sV: "" })) 
};

// Generar Cards Iniciales
equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "card-equipo";
    card.innerHTML = `
        <div class="smoke-cover"></div>
        <div class="equipo-content">
            <img src="${eq.logo}" class="equipo-logo">
            <div class="equipo-data">
                <div class="nombre-equipo">${eq.nombre}</div>
                <div class="jugadores-row">
                    <span>👤 ${eq.jugadores[0]}</span>
                    <span>👤 ${eq.jugadores[1]}</span>
                </div>
            </div>
        </div>
    `;
    card.addEventListener("click", () => card.classList.add("revealed"));
    container.appendChild(card);
});

const modal = document.getElementById("teamModal");
const modalCard = document.getElementById("teamModalCard");

// Zoom Doble Click
document.addEventListener("dblclick", (e) => {
    const card = e.target.closest(".card-equipo");
    if (!card || document.body.classList.contains('sorteo-realizado')) return;
    
    const logoSrc = card.querySelector(".equipo-logo").src;
    const nombre = card.querySelector(".nombre-equipo").textContent;
    const jugadores = card.querySelector(".jugadores-row").innerHTML;

    modalCard.innerHTML = `
        <div style="display:flex; align-items:center; gap:30px">
            <img src="${logoSrc}" style="width:140px; height:140px; object-fit:contain">
            <div>
                <h2 style="font-family:'BertholdBlock'; font-size:3rem; margin-bottom:10px">${nombre}</h2>
                <div style="font-size:1.2rem; color:var(--omen-cyan)">${jugadores}</div>
            </div>
        </div>
    `;
    modal.classList.add("active");
});

modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("active"); });

// ==========================================
// NUEVA LÓGICA DE BOTONES Y FASE FINAL
// ==========================================

const btnGruposOriginal = document.getElementById('btn-fase-grupos');
const btnPlayoffs = document.getElementById('btn-playoffs');

btnGruposOriginal.addEventListener('click', function() {
    document.body.classList.add('sorteo-realizado');
    container.classList.add('fase-grupos'); 
    container.innerHTML = '';
    
    ["A", "B", "C", "D"].forEach(letra => {
        const nombresEnGrupo = gruposOficiales[letra];
        const grupoWrapper = document.createElement('div');
        grupoWrapper.className = 'contenedor-grupo';
        grupoWrapper.innerHTML = `<h2 class="titulo-grupo-header">GRUPO ${letra}</h2><div class="lista-interna"></div>`;
        const listaInterna = grupoWrapper.querySelector('.lista-interna');

        const cardsGrupo = [];
        nombresEnGrupo.forEach(nombreBusqueda => {
            const eq = equipos.find(e => e.nombre === nombreBusqueda);
            if(!eq) return;

            const card = document.createElement("div");
            card.className = "card-equipo revealed";
            card.innerHTML = `
                <div class="equipo-content" style="opacity:1">
                    <img src="${eq.logo}" class="equipo-logo">
                    <div style="flex:1"><div class="nombre-equipo">${eq.nombre}</div></div>
                    <div class="pelotitas-container">
                        <div class="pelotita" data-estado="0"></div>
                        <div class="pelotita" data-estado="0"></div>
                        <div class="pelotita" data-estado="0"></div>
                    </div>
                </div>
            `;
            listaInterna.appendChild(card);
            cardsGrupo.push(card);
        });

        grupoWrapper.querySelector('.titulo-grupo-header').onclick = () => abrirGestionPartidos(letra, cardsGrupo, listaInterna);
        container.appendChild(grupoWrapper);
        
        // Auto-procesar si ya hay datos (como en el Grupo A, B y C)
        procesarResultados(letra, cardsGrupo, listaInterna);
    });

    // En lugar de ocultar todo el footer, escondemos este botón y mostramos el de playoffs
    this.style.display = 'none';
    btnPlayoffs.style.display = 'inline-block';
});

// Evento para el botón de Fase Final (Generar Bracket)
btnPlayoffs.addEventListener('click', () => {
    const clasificados = {};
    const grupos = ["A", "B", "C", "D"];

    // 1. Extraer los 2 mejores de cada grupo basándonos en el orden actual en pantalla
    grupos.forEach(letra => {
        const contenedores = Array.from(document.querySelectorAll('.contenedor-grupo'));
        const con = contenedores.find(c => c.querySelector('.titulo-grupo-header').textContent.includes(letra));
        const cards = Array.from(con.querySelectorAll('.card-equipo'));
        
        clasificados[letra] = [
            { nombre: cards[0].querySelector('.nombre-equipo').textContent, logo: cards[0].querySelector('.equipo-logo').src },
            { nombre: cards[1].querySelector('.nombre-equipo').textContent, logo: cards[1].querySelector('.equipo-logo').src }
        ];
    });

    // 2. Definir cruces cruzados para que los del mismo grupo NO se toquen hasta la final
    const crucesFinales = [
        { t1: clasificados["A"][0], t2: clasificados["C"][1] }, // 1º A vs 2º C
        { t1: clasificados["B"][0], t2: clasificados["D"][1] }, // 1º B vs 2º D
        { t1: clasificados["C"][0], t2: clasificados["A"][1] }, // 1º C vs 2º A
        { t1: clasificados["D"][0], t2: clasificados["B"][1] }  // 1º D vs 2º B
    ];

    generarBracketUI(crucesFinales);
});
function generarBracketUI(cruces) {
    container.innerHTML = ''; 
    container.classList.remove('fase-grupos');
    btnPlayoffs.style.display = 'none'; 
    
    const bracketHTML = `
        <div style="width:100%">
            <div class="bracket-container">
                
                <div class="bracket-column" id="col-cuartos">
                    ${cruces.map((c, i) => `
                        <div class="match-box" data-partido="${i}" style="cursor:pointer;">
                            <div class="match-team-row" data-equipo="1">
                                <img src="${c.t1.logo}"><span>${c.t1.nombre}</span>
                            </div>
                            <div class="vs-line"></div>
                            <div class="match-team-row" data-equipo="2">
                                <img src="${c.t2.logo}"><span>${c.t2.nombre}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="bracket-column" id="col-semis">
                    <div class="match-box" data-partido="0" style="cursor:pointer;">
                        <div class="match-team-row" data-equipo="1"><span>TBD</span></div>
                        <div class="vs-line"></div>
                        <div class="match-team-row" data-equipo="2"><span>TBD</span></div>
                    </div>
                    <div class="match-box" data-partido="1" style="cursor:pointer;">
                        <div class="match-team-row" data-equipo="1"><span>TBD</span></div>
                        <div class="vs-line"></div>
                        <div class="match-team-row" data-equipo="2"><span>TBD</span></div>
                    </div>
                </div>

                <div class="bracket-column" id="col-final">
                    <div class="match-box" data-partido="0" style="border-left-color: gold; box-shadow: 0 0 30px rgba(255,215,0,0.15); cursor:pointer; height: 140px;">
                        
                        <div class="match-team-row" data-equipo="1"><span>TBD</span></div>
                        <div class="pelotitas-container" id="pelotitas-final-1" style="margin-bottom: 10px; justify-content: flex-start;">
                            <div class="pelotita" data-estado="0"></div>
                            <div class="pelotita" data-estado="0"></div>
                            <div class="pelotita" data-estado="0"></div>
                        </div>

                        <div class="vs-line"></div>

                        <div class="match-team-row" data-equipo="2" style="margin-top: 10px;"><span>TBD</span></div>
                        <div class="pelotitas-container" id="pelotitas-final-2" style="justify-content: flex-start;">
                            <div class="pelotita" data-estado="0"></div>
                            <div class="pelotita" data-estado="0"></div>
                            <div class="pelotita" data-estado="0"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    
    container.innerHTML = bracketHTML;

    // --- EVENTO DE DOBLE CLIC ---
    const boxes = container.querySelectorAll('.match-box');
    boxes.forEach(box => {
        box.addEventListener('dblclick', function() {
            const eq1 = this.querySelector('[data-equipo="1"]').innerHTML;
            const eq2 = this.querySelector('[data-equipo="2"]').innerHTML;
            const partidoIdx = this.dataset.partido;
            const columna = this.parentElement.id;

            if(eq1.includes('TBD') || eq2.includes('TBD')) return;

            // CASO ESPECIAL: Doble clic en la Gran Final
            if (columna === "col-final") {
                modalCard.innerHTML = `
                    <div style="width:100%">
                        <h2 style="font-family:'BertholdBlock'; text-align:center; color:gold; margin-bottom:15px">MARCADOR DE LA FINAL</h2>
                        <div class="fila-partido">
                            <div style="flex:1; display:flex; align-items:center; gap:10px; justify-content:flex-end;">${eq1}</div>
                            <input type="number" id="final-res1" class="in-l" placeholder="0" style="width:60px; text-align:center;">
                            <span>-</span>
                            <input type="number" id="final-res2" class="in-v" placeholder="0" style="width:60px; text-align:center;">
                            <div style="flex:1; display:flex; align-items:center; gap:10px; justify-content:flex-start;">${eq2}</div>
                        </div>
                        <button class="btn-valorant" id="guardar-final" style="width:100%; margin-top:15px">
                            <span class="btn-content">REGISTRAR MAPA</span>
                        </button>
                    </div>
                `;
                modal.classList.add("active");

                document.getElementById('guardar-final').onclick = () => {
                    const r1 = parseInt(document.getElementById('final-res1').value) || 0;
                    const r2 = parseInt(document.getElementById('final-res2').value) || 0;

                    const pelotitas1 = document.querySelectorAll('#pelotitas-final-1 .pelotita');
                    const pelotitas2 = document.querySelectorAll('#pelotitas-final-2 .pelotita');

                    // Contamos cuántas victorias ya tenían
                    let victorias1 = 0;
                    let victorias2 = 0;
                    pelotitas1.forEach(p => { if(p.dataset.estado === "1") victorias1++; });
                    pelotitas2.forEach(p => { if(p.dataset.estado === "1") victorias2++; });

                    if (r1 > r2) {
                        if(victorias1 < 3) {
                            pelotitas1[victorias1].dataset.estado = "1";
                            victorias1++;
                        }
                    } else if (r2 > r1) {
                        if(victorias2 < 3) {
                            pelotitas2[victorias2].dataset.estado = "1";
                            victorias2++;
                        }
                    } else {
                        alert("En la final no hay empates. Pon el marcador de este mapa.");
                        return;
                    }

                    modal.classList.remove("active");

                    // Comprobamos si alguno ha llegado a 3 victorias
                    if (victorias1 === 3) {
                        alert(`🏆 ¡TORNEO FINALIZADO! El campeón absoluto es el equipo de arriba.`);
                    } else if (victorias2 === 3) {
                        alert(`🏆 ¡TORNEO FINALIZADO! El campeón absoluto es el equipo de abajo.`);
                    }
                };
                return; // Fin lógica de la final
            }

            // CASO NORMAL: Cuartos y Semis
            modalCard.innerHTML = `
                <div style="width:100%">
                    <h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan); margin-bottom:15px">RESULTADO DEL PARTIDO</h2>
                    <div class="fila-partido">
                        <div style="flex:1; display:flex; align-items:center; gap:10px; justify-content:flex-end;">${eq1}</div>
                        <input type="number" id="res-eq1" class="in-l" placeholder="0" style="width:60px; text-align:center;">
                        <span>-</span>
                        <input type="number" id="res-eq2" class="in-v" placeholder="0" style="width:60px; text-align:center;">
                        <div style="flex:1; display:flex; align-items:center; gap:10px; justify-content:flex-start;">${eq2}</div>
                    </div>
                    <button class="btn-valorant" id="guardar-bracket" style="width:100%; margin-top:15px">
                        <span class="btn-content">CONFIRMAR GANADOR</span>
                    </button>
                </div>
            `;
            modal.classList.add("active");

            document.getElementById('guardar-bracket').onclick = () => {
                const r1 = parseInt(document.getElementById('res-eq1').value);
                const r2 = parseInt(document.getElementById('res-eq2').value);

                if (isNaN(r1) || isNaN(r2)) { alert("Pon los goles/puntos."); return; }

                let ganadorHTML = (r1 > r2) ? eq1 : (r2 > r1) ? eq2 : null;
                if (!ganadorHTML) { alert("¡Debe haber un ganador!"); return; }

                if (columna === "col-cuartos") {
                    const boxSemisIdx = Math.floor(partidoIdx / 2);
                    const slotEquipo = (partidoIdx % 2 === 0) ? "1" : "2";
                    const targetBox = document.querySelector(`#col-semis .match-box[data-partido="${boxSemisIdx}"]`);
                    targetBox.querySelector(`[data-equipo="${slotEquipo}"]`).innerHTML = ganadorHTML;
                } else if (columna === "col-semis") {
                    const slotEquipo = (partidoIdx == 0) ? "1" : "2";
                    const targetBox = document.querySelector(`#col-final .match-box[data-partido="0"]`);
                    targetBox.querySelector(`[data-equipo="${slotEquipo}"]`).innerHTML = ganadorHTML;
                }
                modal.classList.remove("active");
            };
        });
    });
}


// ==========================================
// FUNCIONES DE PROCESAMIENTO ORIGINALES
// ==========================================

function abrirGestionPartidos(letra, cardsGrupo, listaInterna) {
    const datos = cardsGrupo.map(c => ({ 
        nombre: c.querySelector('.nombre-equipo').textContent, 
        logo: c.querySelector('.equipo-logo').src 
    }));
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    const resG = memoriaResultados[letra];

    modalCard.innerHTML = `
        <div style="width:100%">
            <h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan); margin-bottom:15px">RESULTADOS GRUPO ${letra}</h2>
            ${cruces.map((par, i) => `
                <div class="fila-partido">
                    <img src="${datos[par[0]].logo}" class="logo-partido">
                    <span style="flex:1; text-align:right">${datos[par[0]].nombre}</span>
                    <input type="number" class="in-l" value="${resG[i].sL}" placeholder="0">
                    <span>-</span>
                    <input type="number" class="in-v" value="${resG[i].sV}" placeholder="0">
                    <span style="flex:1; text-align:left">${datos[par[1]].nombre}</span>
                    <img src="${datos[par[1]].logo}" class="logo-partido">
                </div>
            `).join('')}
            <button class="btn-valorant" id="save-close" style="width:100%; margin-top:15px"><span class="btn-content">GUARDAR</span></button>
        </div>
    `;

    modalCard.querySelectorAll('input').forEach(inp => {
        inp.oninput = () => {
            const filas = Array.from(modalCard.querySelectorAll('.fila-partido'));
            filas.forEach((f, idx) => {
                memoriaResultados[letra][idx] = { 
                    sL: f.querySelector('.in-l').value, 
                    sV: f.querySelector('.in-v').value 
                };
            });
            procesarResultados(letra, cardsGrupo, listaInterna);
        };
    });
    modal.classList.add("active");
    document.getElementById('save-close').onclick = () => modal.classList.remove("active");
}

function procesarResultados(letra, cardsGrupo, listaInterna) {
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    const resultados = memoriaResultados[letra];
    const conteoPelotitas = Array(cardsGrupo.length).fill(0);
    const statsEquipos = cardsGrupo.map(c => ({ wins: 0, diff: 0, element: c }));
    
    cardsGrupo.forEach(c => c.querySelectorAll('.pelotita').forEach(p => p.dataset.estado = "0"));

    let partidosCompletados = 0;

    cruces.forEach((par, i) => {
        const r = resultados[i];
        if(r.sL !== "" && r.sV !== "") {
            partidosCompletados++;
            const vL = parseInt(r.sL), vV = parseInt(r.sV);
            const pL = cardsGrupo[par[0]].querySelectorAll('.pelotita')[conteoPelotitas[par[0]]];
            const pV = cardsGrupo[par[1]].querySelectorAll('.pelotita')[conteoPelotitas[par[1]]];
            
            if(pL && pV) {
                if(vL > vV) { 
                    pL.dataset.estado = "1"; pV.dataset.estado = "2"; 
                    statsEquipos[par[0]].wins++;
                } else if(vV > vL) { 
                    pL.dataset.estado = "2"; pV.dataset.estado = "1"; 
                    statsEquipos[par[1]].wins++;
                } else {
                    pL.dataset.estado = "0"; pV.dataset.estado = "0";
                }
                conteoPelotitas[par[0]]++; 
                conteoPelotitas[par[1]]++;
            }
            statsEquipos[par[0]].diff += (vL - vV);
            statsEquipos[par[1]].diff += (vV - vL);
        }
    });

    statsEquipos.forEach(s => {
        s.element.dataset.puntos = s.wins;
        s.element.dataset.diferencia = s.diff;
    });

    const grupoTerminado = (partidosCompletados === cruces.length);
    actualizarPuntosYOrden(listaInterna, letra, grupoTerminado);
}

function actualizarPuntosYOrden(lista, letra, grupoTerminado) {
    const cards = Array.from(lista.querySelectorAll('.card-equipo'));
    
    cards.sort((a, b) => {
        const ptsA = parseInt(a.dataset.puntos) || 0;
        const ptsB = parseInt(b.dataset.puntos) || 0;
        if (ptsA !== ptsB) return ptsB - ptsA;

        const diffA = parseInt(a.dataset.diferencia) || 0;
        const diffB = parseInt(b.dataset.diferencia) || 0;
        return diffB - diffA;
    });

    cards.forEach((c, idx) => {
        lista.appendChild(c);
        c.classList.remove('eliminado');
        if (grupoTerminado) {
            if (letra === "D") {
                if(idx === 2) c.classList.add('eliminado');
            } else {
                if(idx >= 2) c.classList.add('eliminado');
            }
        }
    });
}
