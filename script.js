const container = document.getElementById("container-equipos");
const audio = document.getElementById("audioMono");

// Lógica del Sonido de los Monos (Original)
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

// RESULTADOS ORIGINALES RESPETAODS
const memoriaResultados = { 
    "A": [{sL: "4", sV: "5"}, {sL: "5", sV: "0"}, {sL: "5", sV: "3"}, {sL: "5", sV: "0"}, {sL: "5", sV: "0"}, {sL: "5", sV: "2"}], 
    "B": [{sL: "1", sV: "5"}, {sL: "0", sV: "5"}, {sL: "5", sV: "0"}, {sL: "2", sV: "5"}, {sL: "1", sV: "5"}, {sL: "5", sV: "0"}],
    "C": [{sL: "5", sV: "1"}, {sL: "5", sV: "0"}, {sL: "3", sV: "5"}, {sL: "1", sV: "5"}, {sL: "2", sV: "5"}, {sL: "4", sV: "5"}],
    "D": [{sL: "0", sV: "5"}, {sL: "2", sV: "5"}, {sL: "1", sV: "5"}]
};

// Generar Cards Iniciales
equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "card-equipo";
    card.innerHTML = `<div class="smoke-cover"></div><div class="equipo-content"><img src="${eq.logo}" class="equipo-logo"><div class="equipo-data"><div class="nombre-equipo">${eq.nombre}</div><div class="jugadores-row"><span>👤 ${eq.jugadores[0]}</span><span>👤 ${eq.jugadores[1]}</span></div></div></div>`;
    card.addEventListener("click", () => card.classList.add("revealed"));
    container.appendChild(card);
});

const modal = document.getElementById("teamModal");
const modalCard = document.getElementById("teamModalCard");

// Zoom Doble Click (Original)
document.addEventListener("dblclick", (e) => {
    const card = e.target.closest(".card-equipo");
    if (!card || document.body.classList.contains('sorteo-realizado')) return;
    const logoSrc = card.querySelector(".equipo-logo").src;
    const nombre = card.querySelector(".nombre-equipo").textContent;
    const jugadores = card.querySelector(".jugadores-row").innerHTML;
    modalCard.innerHTML = `<div style="display:flex; align-items:center; gap:30px"><img src="${logoSrc}" style="width:140px; height:140px; object-fit:contain"><div><h2 style="font-family:'BertholdBlock'; font-size:3rem; margin-bottom:10px">${nombre}</h2><div style="font-size:1.2rem; color:var(--omen-cyan)">${jugadores}</div></div></div>`;
    modal.classList.add("active");
});
modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("active"); });

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
            card.innerHTML = `<div class="equipo-content" style="opacity:1"><img src="${eq.logo}" class="equipo-logo"><div style="flex:1"><div class="nombre-equipo">${eq.nombre}</div></div><div class="pelotitas-container"><div class="pelotita" data-estado="0"></div><div class="pelotita" data-estado="0"></div><div class="pelotita" data-estado="0"></div></div></div>`;
            listaInterna.appendChild(card);
            cardsGrupo.push(card);
        });
        grupoWrapper.querySelector('.titulo-grupo-header').onclick = () => abrirGestionPartidos(letra, cardsGrupo, listaInterna);
        container.appendChild(grupoWrapper);
        procesarResultados(letra, cardsGrupo, listaInterna);
    });
    this.style.display = 'none';
    btnPlayoffs.style.display = 'inline-block';
});

btnPlayoffs.addEventListener('click', () => {
    const clasificados = {};
    ["A", "B", "C", "D"].forEach(letra => {
        const contenedores = Array.from(document.querySelectorAll('.contenedor-grupo'));
        const con = contenedores.find(c => c.querySelector('.titulo-grupo-header').textContent.includes(letra));
        const cards = Array.from(con.querySelectorAll('.card-equipo'));
        clasificados[letra] = [
            { nombre: cards[0].querySelector('.nombre-equipo').textContent, logo: cards[0].querySelector('.equipo-logo').src },
            { nombre: cards[1].querySelector('.nombre-equipo').textContent, logo: cards[1].querySelector('.equipo-logo').src }
        ];
    });
    const crucesFinales = [
        { t1: clasificados["A"][0], t2: clasificados["C"][1] },
        { t1: clasificados["B"][0], t2: clasificados["D"][1] },
        { t1: clasificados["C"][0], t2: clasificados["A"][1] },
        { t1: clasificados["D"][0], t2: clasificados["B"][1] }
    ];
    generarBracketUI(crucesFinales);
});

function generarBracketUI(cruces) {
    container.innerHTML = ''; 
    container.classList.remove('fase-grupos');
    btnPlayoffs.style.display = 'none'; 
    
    const crearPels = (cant) => `<div class="pelotitas-container" style="justify-content:flex-start; margin-top:4px;">${Array(cant).fill('<div class="pelotita" data-estado="0"></div>').join('')}</div>`;

    container.innerHTML = `
        <div class="bracket-container">
            <div class="bracket-column" id="col-cuartos">
                ${cruces.map((c, i) => `
                    <div class="match-box" data-partido="${i}" data-wins="2">
                        <div class="match-team-row" data-equipo="1"><img src="${c.t1.logo}"><span>${c.t1.nombre}</span></div>
                        ${crearPels(2)}
                        <div class="vs-line"></div>
                        <div class="match-team-row" data-equipo="2"><img src="${c.t2.logo}"><span>${c.t2.nombre}</span></div>
                        ${crearPels(2)}
                    </div>
                `).join('')}
            </div>
            <div class="bracket-column" id="col-semis">
                ${[0,1].map(i => `<div class="match-box" data-partido="${i}" data-wins="2"><div class="match-team-row" data-equipo="1"><span>TBD</span></div>${crearPels(2)}<div class="vs-line"></div><div class="match-team-row" data-equipo="2"><span>TBD</span></div>${crearPels(2)}</div>`).join('')}
            </div>
            <div class="bracket-column" id="col-final">
                <div class="match-box" data-partido="0" data-wins="3" style="border-left-color: gold;">
                    <div class="match-team-row" data-equipo="1"><span>TBD</span></div>${crearPels(3)}
                    <div class="vs-line"></div>
                    <div class="match-team-row" data-equipo="2"><span>TBD</span></div>${crearPels(3)}
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.match-box').forEach(box => {
        box.ondblclick = function() {
            const row1 = this.querySelector('[data-equipo="1"]');
            const row2 = this.querySelector('[data-equipo="2"]');
            if(row1.innerText === 'TBD' || row2.innerText === 'TBD') return;

            modalCard.innerHTML = `
                <h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan)">REGISTRAR MAPA</h2>
                <div class="fila-partido">
                    <div style="flex:1; text-align:right;">${row1.innerHTML}</div>
                    <input type="number" id="sc1"><span>-</span><input type="number" id="sc2">
                    <div style="flex:1; text-align:left;">${row2.innerHTML}</div>
                </div>
                <button class="btn-valorant" id="saveM" style="width:100%"><span class="btn-content">CONFIRMAR</span></button>
            `;
            modal.classList.add("active");

            document.getElementById('saveM').onclick = () => {
                const s1 = parseInt(document.getElementById('sc1').value) || 0;
                const s2 = parseInt(document.getElementById('sc2').value) || 0;
                if(s1 === s2) return;

                const pels1 = this.querySelectorAll('.pelotitas-container')[0].querySelectorAll('.pelotita');
                const pels2 = this.querySelectorAll('.pelotitas-container')[1].querySelectorAll('.pelotita');
                
                let v1 = Array.from(pels1).filter(p => p.dataset.estado === "1").length;
                let v2 = Array.from(pels2).filter(p => p.dataset.estado === "1").length;

                if(s1 > s2 && v1 < pels1.length) pels1[v1].dataset.estado = "1", v1++;
                else if(s2 > s1 && v2 < pels2.length) pels2[v2].dataset.estado = "1", v2++;

                modal.classList.remove("active");
                const winLimit = parseInt(this.dataset.wins);
                if(v1 === winLimit || v2 === winLimit) {
                    const winH = (v1 === winLimit) ? row1.innerHTML : row2.innerHTML;
                    const col = this.parentElement.id;
                    const idx = parseInt(this.dataset.partido);
                    if(col === "col-cuartos") {
                        const target = document.querySelector(`#col-semis .match-box[data-partido="${Math.floor(idx/2)}"]`);
                        target.querySelector(`[data-equipo="${(idx%2===0)?'1':'2'}"]`).innerHTML = winH;
                    } else if (col === "col-semis") {
                        const target = document.querySelector(`#col-final .match-box`);
                        target.querySelector(`[data-equipo="${(idx===0)?'1':'2'}"]`).innerHTML = winH;
                    }
                }
            };
        };
    });
}

function abrirGestionPartidos(letra, cardsGrupo, listaInterna) {
    const datos = cardsGrupo.map(c => ({ nombre: c.querySelector('.nombre-equipo').textContent, logo: c.querySelector('.equipo-logo').src }));
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    const resG = memoriaResultados[letra];
    modalCard.innerHTML = `<div style="width:100%"><h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan); margin-bottom:15px">RESULTADOS GRUPO ${letra}</h2>${cruces.map((par, i) => `<div class="fila-partido"><img src="${datos[par[0]].logo}" class="logo-partido"><span style="flex:1; text-align:right">${datos[par[0]].nombre}</span><input type="number" class="in-l" value="${resG[i].sL}"><span>-</span><input type="number" class="in-v" value="${resG[i].sV}"><span style="flex:1; text-align:left">${datos[par[1]].nombre}</span><img src="${datos[par[1]].logo}" class="logo-partido"></div>`).join('')}<button class="btn-valorant" id="save-close" style="width:100%; margin-top:15px"><span class="btn-content">GUARDAR</span></button></div>`;
    modalCard.querySelectorAll('input').forEach(inp => {
        inp.oninput = () => {
            const filas = Array.from(modalCard.querySelectorAll('.fila-partido'));
            filas.forEach((f, idx) => { memoriaResultados[letra][idx] = { sL: f.querySelector('.in-l').value, sV: f.querySelector('.in-v').value }; });
            procesarResultados(letra, cardsGrupo, listaInterna);
        };
    });
    modal.classList.add("active");
    document.getElementById('save-close').onclick = () => modal.classList.remove("active");
}

function procesarResultados(letra, cardsGrupo, listaInterna) {
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    const resultados = memoriaResultados[letra];
    const stats = cardsGrupo.map(c => ({ wins: 0, diff: 0, element: c }));
    resultados.forEach((res, i) => {
        const l = parseInt(res.sL) || 0, v = parseInt(res.sV) || 0;
        const p1 = cruces[i][0], p2 = cruces[i][1];
        if(l > v) stats[p1].wins++, stats[p1].diff += (l-v), stats[p2].diff -= (l-v);
        else if(v > l) stats[p2].wins++, stats[p2].diff += (v-l), stats[p1].diff -= (v-l);
    });
    stats.sort((a,b) => b.wins - a.wins || b.diff - a.diff);
    stats.forEach((s, i) => {
        listaInterna.appendChild(s.element);
        s.element.classList.toggle('eliminado', i >= 2);
        const pels = s.element.querySelectorAll('.pelotita');
        pels.forEach((p, pi) => p.dataset.estado = (pi < s.wins) ? "1" : "0");
    });
}
