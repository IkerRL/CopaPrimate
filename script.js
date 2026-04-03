const container = document.getElementById("container-equipos");
const audio = document.getElementById("audioMono");
const modal = document.getElementById("teamModal");
const modalCard = document.getElementById("teamModalCard");

// Sonido Original
document.querySelectorAll('.btn-sonido').forEach(mono => {
    mono.addEventListener('click', () => { audio.currentTime = 0; audio.play(); });
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

const memoriaResultados = { 
    "A": [{sL: "4", sV: "5"}, {sL: "5", sV: "0"}, {sL: "5", sV: "3"}, {sL: "5", sV: "0"}, {sL: "5", sV: "0"}, {sL: "5", sV: "2"}], 
    "B": [{sL: "1", sV: "5"}, {sL: "0", sV: "5"}, {sL: "5", sV: "0"}, {sL: "2", sV: "5"}, {sL: "1", sV: "5"}, {sL: "5", sV: "0"}],
    "C": [{sL: "5", sV: "1"}, {sL: "5", sV: "0"}, {sL: "3", sV: "5"}, {sL: "1", sV: "5"}, {sL: "2", sV: "5"}, {sL: "4", sV: "5"}],
    "D": [{sL: "0", sV: "5"}, {sL: "2", sV: "5"}, {sL: "1", sV: "5"}]
};

// Generación inicial
equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "card-equipo";
    card.innerHTML = `<div class="smoke-cover"></div><div class="equipo-content"><img src="${eq.logo}" class="equipo-logo"><div class="equipo-data"><div class="nombre-equipo">${eq.nombre}</div><div class="jugadores-row"><span>👤 ${eq.jugadores[0]}</span><span>👤 ${eq.jugadores[1]}</span></div></div></div>`;
    card.addEventListener("click", () => card.classList.add("revealed"));
    container.appendChild(card);
});

// Zoom Original
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

btnGruposOriginal.onclick = function() {
    document.body.classList.add('sorteo-realizado');
    container.classList.add('fase-grupos'); 
    container.innerHTML = '';
    ["A", "B", "C", "D"].forEach(letra => {
        const grupoWrapper = document.createElement('div');
        grupoWrapper.className = 'contenedor-grupo';
        grupoWrapper.innerHTML = `<h2 class="titulo-grupo-header">GRUPO ${letra}</h2><div class="lista-interna"></div>`;
        const listaInterna = grupoWrapper.querySelector('.lista-interna');
        const cardsGrupo = [];
        gruposOficiales[letra].forEach(nombre => {
            const eq = equipos.find(e => e.nombre === nombre);
            const card = document.createElement("div");
            card.className = "card-equipo revealed";
            card.innerHTML = `<div class="equipo-content" style="opacity:1"><img src="${eq.logo}" class="equipo-logo"><div style="flex:1"><div class="nombre-equipo">${eq.nombre}</div></div><div class="pelotitas-container">${Array(3).fill('<div class="pelotita"></div>').join('')}</div></div>`;
            listaInterna.appendChild(card);
            cardsGrupo.push(card);
        });
        grupoWrapper.querySelector('.titulo-grupo-header').onclick = () => abrirGestionPartidos(letra, cardsGrupo, listaInterna);
        container.appendChild(grupoWrapper);
        procesarResultados(letra, cardsGrupo, listaInterna);
    });
    this.style.display = 'none'; btnPlayoffs.style.display = 'inline-block';
};

btnPlayoffs.onclick = () => {
    const clasificados = {};
    document.querySelectorAll('.contenedor-grupo').forEach((con, idx) => {
        const letra = ["A","B","C","D"][idx];
        const cards = Array.from(con.querySelectorAll('.card-equipo'));
        clasificados[letra] = [
            { nombre: cards[0].querySelector('.nombre-equipo').textContent, logo: cards[0].querySelector('.equipo-logo').src },
            { nombre: cards[1].querySelector('.nombre-equipo').textContent, logo: cards[1].querySelector('.equipo-logo').src }
        ];
    });
    generarBracketUI([
        { t1: clasificados["A"][0], t2: clasificados["C"][1] }, { t1: clasificados["B"][0], t2: clasificados["D"][1] },
        { t1: clasificados["C"][0], t2: clasificados["A"][1] }, { t1: clasificados["D"][0], t2: clasificados["B"][1] }
    ]);
};

function generarBracketUI(cruces) {
    container.innerHTML = ''; container.classList.remove('fase-grupos'); btnPlayoffs.style.display = 'none';
    const p = (n) => `<div class="pelotitas-container">${Array(n).fill('<div class="pelotita" data-estado="0"></div>').join('')}</div>`;
    
    // El "top" está calculado para que las líneas del CSS encajen (184px de separación en Cuartos)
    container.innerHTML = `<div class="bracket-container">
        <div class="bracket-column" id="col-cuartos">
            ${cruces.map((c, i) => `
                <div class="match-box" style="top: ${i * 184}px" data-partido="${i}" data-wins="2">
                    <div class="match-team-row" data-eq="1"><img src="${c.t1.logo}"><span>${c.t1.nombre}</span></div>
                    ${p(2)}
                    <div class="vs-line"></div>
                    <div class="match-team-row" data-eq="2"><img src="${c.t2.logo}"><span>${c.t2.nombre}</span></div>
                    ${p(2)}
                </div>`).join('')}
        </div>
        <div class="bracket-column" id="col-semis">
            ${[0,1].map(i => `
                <div class="match-box" style="top: ${i * 368 + 92}px" data-partido="${i}" data-wins="2">
                    <div class="match-team-row" data-eq="1"><span>TBD</span></div>
                    ${p(2)}
                    <div class="vs-line"></div>
                    <div class="match-team-row" data-eq="2"><span>TBD</span></div>
                    ${p(2)}
                </div>`).join('')}
        </div>
        <div class="bracket-column" id="col-final">
            <div class="match-box" style="top: 276px; border-left-color: gold;" data-partido="0" data-wins="3">
                <div class="match-team-row" data-eq="1"><span>TBD</span></div>
                ${p(3)}
                <div class="vs-line"></div>
                <div class="match-team-row" data-eq="2"><span>TBD</span></div>
                ${p(3)}
            </div>
        </div>
    </div>`;

    document.querySelectorAll('.match-box').forEach(box => {
        box.ondblclick = function() {
            const r1 = this.querySelector('[data-eq="1"]'); const r2 = this.querySelector('[data-eq="2"]');
            if(r1.innerText === 'TBD' || r2.innerText === 'TBD') return;
            
            const img1 = r1.querySelector('img') ? r1.querySelector('img').src : '';
            const img2 = r2.querySelector('img') ? r2.querySelector('img').src : '';

            modalCard.innerHTML = `
                <h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan); margin-bottom:10px">RESULTADO MAPA</h2>
                <div class="fila-partido">
                    <img src="${img1}" style="width:140px; height:140px; object-fit:contain">
                    <input type="number" id="sc1" class="input-score">
                    <span style="font-size:3rem; font-family:'BertholdBlock'">-</span>
                    <input type="number" id="sc2" class="input-score">
                    <img src="${img2}" style="width:140px; height:140px; object-fit:contain">
                </div>
                <button class="btn-valorant" id="saveM" style="width:100%"><span class="btn-content">CONFIRMAR</span></button>
            `;
            modal.classList.add("active");

            document.getElementById('saveM').onclick = () => {
                const limit = parseInt(this.dataset.wins);
                const p1 = this.querySelectorAll('.pelotitas-container')[0].querySelectorAll('.pelotita');
                const p2 = this.querySelectorAll('.pelotitas-container')[1].querySelectorAll('.pelotita');
                
                let v1 = Array.from(p1).filter(p => p.dataset.estado === "1").length;
                let v2 = Array.from(p2).filter(p => p.dataset.estado === "1").length;

                // Si ya hay un ganador, no permitir sumar más
                if(v1 >= limit || v2 >= limit) {
                    modal.classList.remove("active");
                    return;
                }

                const s1 = parseInt(document.getElementById('sc1').value) || 0;
                const s2 = parseInt(document.getElementById('sc2').value) || 0;
                if(s1 === s2) return;

                if(s1 > s2 && v1 < p1.length) { p1[v1].dataset.estado = "1"; v1++; }
                else if(s2 > s1 && v2 < p2.length) { p2[v2].dataset.estado = "1"; v2++; }

                modal.classList.remove("active");

                if(v1 === limit || v2 === limit) {
                    const winH = (v1 === limit) ? r1.innerHTML : r2.innerHTML;
                    const loserRow = (v1 === limit) ? r2 : r1;
                    
                    // Solo el equipo perdedor se vuelve gris
                    loserRow.classList.add('team-perdedor');
                    
                    const col = this.parentElement.id; const idx = parseInt(this.dataset.partido);
                    if(col === "col-cuartos") {
                        const target = document.querySelector(`#col-semis .match-box[data-partido="${Math.floor(idx/2)}"]`);
                        target.querySelector(`[data-eq="${(idx%2===0)?'1':'2'}"]`).innerHTML = winH;
                    } else if (col === "col-semis") {
                        document.querySelector(`#col-final .match-box`).querySelector(`[data-eq="${(idx===0)?'1':'2'}"]`).innerHTML = winH;
                    }
                }
            };
        };
    });
}

function abrirGestionPartidos(letra, cardsGrupo, listaInterna) {
    const datos = cardsGrupo.map(c => ({ nombre: c.querySelector('.nombre-equipo').textContent, logo: c.querySelector('.equipo-logo').src }));
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    modalCard.innerHTML = `<h2 style="font-family:'BertholdBlock'; text-align:center; color:var(--omen-cyan)">GRUPO ${letra}</h2>${cruces.map((par, i) => `<div class="fila-partido" style="font-size:0.8rem; background:rgba(255,255,255,0.05); padding:10px; border-radius:10px"><span>${datos[par[0]].nombre}</span><input type="number" class="in-l" value="${memoriaResultados[letra][i].sL}" style="width:40px"> - <input type="number" class="in-v" value="${memoriaResultados[letra][i].sV}" style="width:40px"><span>${datos[par[1]].nombre}</span></div>`).join('')}<button class="btn-valorant" id="sv" style="width:100%"><span class="btn-content">GUARDAR</span></button>`;
    modal.classList.add("active");
    document.getElementById('sv').onclick = () => {
        const inputs = modalCard.querySelectorAll('.fila-partido');
        inputs.forEach((f, idx) => { memoriaResultados[letra][idx] = { sL: f.querySelector('.in-l').value, sV: f.querySelector('.in-v').value }; });
        procesarResultados(letra, cardsGrupo, listaInterna);
        modal.classList.remove("active");
    };
}

function procesarResultados(letra, cardsGrupo, listaInterna) {
    const cruces = (letra === "D") ? [[0,1], [1,2], [0,2]] : [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
    const stats = cardsGrupo.map(c => ({ wins: 0, diff: 0, element: c }));
    memoriaResultados[letra].forEach((res, i) => {
        const l = parseInt(res.sL) || 0, v = parseInt(res.sV) || 0;
        const p1 = cruces[i][0], p2 = cruces[i][1];
        if(l > v) { stats[p1].wins++; stats[p1].diff += (l-v); stats[p2].diff -= (l-v); }
        else if(v > l) { stats[p2].wins++; stats[p2].diff += (v-l); stats[p1].diff -= (v-l); }
    });
    stats.sort((a,b) => b.wins - a.wins || b.diff - a.diff);
    stats.forEach((s, i) => {
        listaInterna.appendChild(s.element); s.element.classList.toggle('eliminado', i >= 2);
        const p = s.element.querySelectorAll('.pelotita'); p.forEach((pel, pi) => pel.dataset.estado = (pi < s.wins) ? "1" : "0");
    });
}
