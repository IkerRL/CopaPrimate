const container = document.getElementById("container-equipos");

const equipos = [
    { nombre: "Rose Devil", jugadores: ["Tony", "Jokker"], logo: "logo1.png" },
    { nombre: "Golden Sex", jugadores: ["Max", "Broken"], logo: "logo2.png" },
    { nombre: "Al-dedillo VC", jugadores: ["Xolo", "Noavae"], logo: "logo3.png" },
    { nombre: "Los Akrtona2", jugadores: ["S3R4X", "MasterKira"], logo: "logo4.png" },
    { nombre: "Crimson Eclipsed", jugadores: ["ReyFhantom", "zNyrex "], logo: "logo5.png" },
    { nombre: "Makaco NinjaPelocho", jugadores: ["Iker", "Adri"], logo: "logo6.png" },
    { nombre: "Bloody Fruit", jugadores: ["MrPain 神", "Sandiass21"], logo: "logo7.png" },
    { nombre: "Hijas del Kaos", jugadores: ["Satha", "Kaos"], logo: "logo8.png" },
    { nombre: "Konoha Makaca", jugadores: ["MakaQuillo", "MakaIsla"], logo: "logo9.png" },
    { nombre: "Team Obrikat", jugadores: ["JettDiffs", "EGOFack"], logo: "logo10.png" },
    { nombre: "TETONES: Equipo Nacional de Somalia", jugadores: ["Marrkitosss", "Davv"], logo: "logo11.png" },
    { nombre: "GOATS", jugadores: ["Mica", "Marco"], logo: "logo12.png" },
    { nombre: "SPIDYBOOBS", jugadores: ["Sama", "Potro"], logo: "logo13.png" },
    { nombre: "MUGIWARAS", jugadores: ["Andreloregon", "Jess"], logo: "logo14.png" },
    { nombre: "Miaus", jugadores: ["Kae", "Wilson"], logo: "logo15.png" },
    { nombre: "Uakaris", jugadores: ["Uaka", "Riki"], logo: "logo16.png" },
];

const memoriaResultados = { "A": [], "B": [], "C": [], "D": [] };
const modal = document.getElementById("teamModal");
const modalCard = document.getElementById("teamModalCard");

// --- RENDERIZADO INICIAL ---
equipos.forEach(equipo => {
    const card = document.createElement("div");
    card.className = "card-equipo";
    card.innerHTML = `
        <div class="smoke-cover"></div>
        <div class="equipo-content">
            <img src="${equipo.logo}" class="equipo-logo">
            <div class="equipo-data">
                <div class="nombre-equipo">${equipo.nombre}</div>
                <div class="jugadores-row">
                    <span>👤 ${equipo.jugadores[0]}</span>
                    <span>👤 ${equipo.jugadores[1]}</span>
                </div>
            </div>
        </div>
    `;
    card.addEventListener("click", () => {
        if (card.classList.contains("revealed")) return;
        card.classList.add("revealed");
    });
    container.appendChild(card);
});

// --- EVENTO DBLCLICK (DATOS EQUIPO) ---
document.addEventListener("dblclick", (e) => {
    const card = e.target.closest(".card-equipo");
    if (!card || document.body.classList.contains('sorteo-realizado')) return;
    
    const logo = card.querySelector(".equipo-logo").src;
    const nombre = card.querySelector(".nombre-equipo").textContent;
    const jugadores = [...card.querySelectorAll(".jugadores-row span")].map(j => j.textContent).join("<br>");
    
    // Modal en modo "Información"
    modalCard.innerHTML = `
        <img src="${logo}">
        <div style="text-align:center">
            <div class="team-modal-nombre">${nombre}</div>
            <div class="team-modal-jugadores">${jugadores}</div>
        </div>
    `;
    modal.classList.add("active");
});

modal.addEventListener("click", (e) => { 
    if (e.target === modal) modal.classList.remove("active"); 
});

// --- LÓGICA DEL SORTEO ---
const btnSorteo = document.querySelector('.btn-valorant');
btnSorteo.addEventListener('click', () => {
    document.body.classList.add('sorteo-realizado');
    const cards = Array.from(document.querySelectorAll('.card-equipo'));
    const mezcladas = cards.sort(() => Math.random() - 0.5);
    
    container.innerHTML = ''; 
    const letras = ["A", "B", "C", "D"];

    letras.forEach((letra, i) => {
        const grupoWrapper = document.createElement('div');
        grupoWrapper.className = 'contenedor-grupo';
        grupoWrapper.innerHTML = `<h2 class="titulo-grupo-header">GRUPO ${letra}</h2><div class="lista-interna"></div>`;
        
        const listaInterna = grupoWrapper.querySelector('.lista-interna');
        const titulo = grupoWrapper.querySelector('.titulo-grupo-header');
        const cardsGrupo = mezcladas.slice(i * 4, (i * 4) + 4);

        memoriaResultados[letra] = Array(6).fill(null).map(() => ({ sL: "", sV: "" }));

        cardsGrupo.forEach(card => {
            card.classList.add('revealed');
            const nombre = card.querySelector('.nombre-equipo').textContent;
            const logo = card.querySelector('.equipo-logo').src;
            
            // LIMPIEZA TOTAL: Aquí quitamos el humo y el texto REVELAR para el modo grupo
            card.innerHTML = `
                <div class="equipo-content" style="opacity:1; width:100%; display:flex; align-items:center;">
                    <img src="${logo}" class="equipo-logo" style="width:40px; height:40px; margin-right:15px">
                    <div class="nombre-equipo" style="font-size:0.9rem; flex:1">${nombre}</div>
                    <div class="pelotitas-container">
                        <div class="pelotita" data-estado="0"></div>
                        <div class="pelotita" data-estado="0"></div>
                        <div class="pelotita" data-estado="0"></div>
                    </div>
                </div>
            `;
            listaInterna.appendChild(card);
        });

        titulo.onclick = () => abrirGestionPartidos(letra, cardsGrupo, listaInterna);
        container.appendChild(grupoWrapper);
        actualizarPuntosYOrden(listaInterna);
    });
    
    // Ocultar el botón y su contenedor (.cierre)
    btnSorteo.closest('.cierre').style.display = 'none';
});

// --- GESTIÓN DE PARTIDOS (MODAL VERTICAL) ---
function abrirGestionPartidos(letra, cardsGrupo, listaInterna) {
    const nombres = cardsGrupo.map(c => c.querySelector('.nombre-equipo').textContent);
    const cruces = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
    const resG = memoriaResultados[letra];

    // Estructura Vertical: Título -> Partidos -> Botón
    modalCard.innerHTML = `
        <h2 class="team-modal-nombre">PARTIDOS GRUPO ${letra}</h2>
        <div id="contenedor-partidos">
            ${cruces.map((par, i) => `
                <div class="fila-partido">
                    <span style="flex:1; text-align:right; font-size:0.85rem">${nombres[par[0]]}</span>
                    <div style="display:flex; gap:8px; margin:0 15px">
                        <input type="number" class="marcador-input in-l" value="${resG[i].sL}" placeholder="0">
                        <input type="number" class="marcador-input in-v" value="${resG[i].sV}" placeholder="0">
                    </div>
                    <span style="flex:1; font-size:0.85rem">${nombres[par[1]]}</span>
                </div>
            `).join('')}
        </div>
        <button class="btn-valorant" id="close-modal" style="width:100%">
            <span class="btn-content" style="padding:10px">GUARDAR</span>
        </button>
    `;

    // Listener para inputs (actualización en tiempo real)
    modal.querySelectorAll('input').forEach(input => {
        input.oninput = () => {
            const filas = modal.querySelectorAll('.fila-partido');
            filas.forEach((f, idx) => {
                memoriaResultados[letra][idx] = { 
                    sL: f.querySelector('.in-l').value, 
                    sV: f.querySelector('.in-v').value 
                };
            });
            procesarResultadosGrupo(letra, cardsGrupo, listaInterna);
        };
    });

    modal.classList.add("active");
    document.getElementById('close-modal').onclick = () => modal.classList.remove("active");
}

function procesarResultadosGrupo(letra, cardsGrupo, listaInterna) {
    const cruces = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
    const resultados = memoriaResultados[letra];
    const conteo = Array(4).fill(0);
    
    // Reset de pelotitas
    cardsGrupo.forEach(c => c.querySelectorAll('.pelotita').forEach(p => p.dataset.estado = "0"));

    cruces.forEach((par, i) => {
        const res = resultados[i];
        if (res.sL !== "" && res.sV !== "") {
            const vL = parseInt(res.sL); 
            const vV = parseInt(res.sV);
            const pL = cardsGrupo[par[0]].querySelectorAll('.pelotita')[conteo[par[0]]];
            const pV = cardsGrupo[par[1]].querySelectorAll('.pelotita')[conteo[par[1]]];
            
            if (pL && pV) {
                if (vL > vV) { pL.dataset.estado = "1"; pV.dataset.estado = "2"; }
                else if (vV > vL) { pL.dataset.estado = "2"; pV.dataset.estado = "1"; }
                else { pL.dataset.estado = "0"; pV.dataset.estado = "0"; } // Empate (opcional)
                conteo[par[0]]++; 
                conteo[par[1]]++;
            }
        }
    });
    actualizarPuntosYOrden(listaInterna);
}

function actualizarPuntosYOrden(lista) {
    const cards = Array.from(lista.querySelectorAll('.card-equipo'));
    cards.forEach(card => {
        let pts = 0;
        card.querySelectorAll('.pelotita').forEach(p => { 
            if(p.dataset.estado === "1") pts++; 
        });
        card.dataset.puntos = pts;
    });

    // Ordenar por puntos (descendente)
    cards.sort((a, b) => b.dataset.puntos - a.dataset.puntos);
    
    cards.forEach((card, idx) => {
        lista.appendChild(card);
        // Los 2 mejores pasan, los otros 2 se ven como "eliminados"
        if(idx >= 2) card.classList.add('eliminado');
        else card.classList.remove('eliminado');
    });
}
