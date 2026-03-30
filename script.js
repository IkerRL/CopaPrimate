const container = document.getElementById("container-equipos");
const audio = document.getElementById("audioMono");
const modal = document.getElementById("teamModal");
const modalCard = document.getElementById("teamModalCard");
const btnGruposOriginal = document.getElementById('btn-fase-grupos');
const btnPlayoffs = document.getElementById('btn-playoffs');

// Sonido de los monos
document.querySelectorAll('.btn-sonido').forEach(mono => {
    mono.addEventListener('click', () => { audio.currentTime = 0; audio.play(); });
});

const equipos = [
    { nombre: "Rose Devil", logo: "logo1.png", jugadores: ["Tony", "Jokker"] },
    { nombre: "Golden Sex", logo: "logo2.png", jugadores: ["Max", "Broken"] },
    { nombre: "Al-dedillo VC", logo: "logo3.png", jugadores: ["Xolo", "Noavae"] },
    { nombre: "Los Akrtona2", logo: "logo4.png", jugadores: ["S3R4X", "MasterKira"] },
    { nombre: "Crimson Eclipse", logo: "logo5.png", jugadores: ["ReyFhantom", "zNyrex "] },
    { nombre: "Makaco NinjaPelocho", logo: "logo6.png", jugadores: ["Iker", "Adri"] },
    { nombre: "Bloody Fruit", logo: "logo7.png", jugadores: ["MrPain 神", "Sandiass21"] },
    { nombre: "Hijas del Kaos", logo: "logo8.png", jugadores: ["Satha", "Kaos"] },
    { nombre: "Konoha Makaca", logo: "logo9.png", jugadores: ["MakaQuillo", "MakaIsla"] },
    { nombre: "Team Obrikat", logo: "logo10.png", jugadores: ["JettDiffs", "EGOFack"] },
    { nombre: "TETONES: Equipo Nacional de Somalia", logo: "logo11.png", jugadores: ["Marrkitosss", "Davv"] },
    { nombre: "GOATS", logo: "logo12.png", jugadores: ["Mica", "Marco"] },
    { nombre: "SPIDYBOOBS", logo: "logo13.png", jugadores: ["Sama", "Potro"] },
    { nombre: "MUGIWARAS", logo: "logo14.png", jugadores: ["Andreloregon", "Jess"] },
    { nombre: "Miaus", logo: "logo15.png", jugadores: ["Kae", "Wilson"] }
];

const gruposOficiales = {
    "A": ["Rose Devil", "Hijas del Kaos", "Al-dedillo VC", "Bloody Fruit"],
    "B": ["GOATS", "Los Akrtona2", "Crimson Eclipse", "Miaus"],
    "C": ["SPIDYBOOBS", "MUGIWARAS", "TETONES", "Golden Sex"],
    "D": ["Konoha Makaca", "Makaco NinjaPelocho", "Team Obrikat"]
};

// --- INICIO: RENDER CARDS ---
equipos.forEach(eq => {
    const card = document.createElement("div");
    card.className = "card-equipo";
    card.innerHTML = `<div class="smoke-cover">REVELAR</div><div class="equipo-content"><img src="${eq.logo}" class="equipo-logo"><div><div class="nombre-equipo">${eq.nombre}</div></div></div>`;
    card.addEventListener("click", () => card.classList.add("revealed"));
    container.appendChild(card);
});

// --- FASE DE GRUPOS ---
btnGruposOriginal.onclick = () => {
    container.classList.add('fase-grupos');
    container.innerHTML = '';
    Object.keys(gruposOficiales).forEach(letra => {
        const grupoWrapper = document.createElement('div');
        grupoWrapper.className = 'contenedor-grupo';
        grupoWrapper.innerHTML = `<h2 class="titulo-grupo-header">GRUPO ${letra}</h2><div class="lista-interna"></div>`;
        const lista = grupoWrapper.querySelector('.lista-interna');
        gruposOficiales[letra].forEach(n => {
            const eq = equipos.find(e => e.nombre === n);
            const item = document.createElement('div');
            item.className = 'card-equipo revealed';
            item.style.width = '100%'; item.style.height = '60px';
            item.innerHTML = `<div class="equipo-content"><img src="${eq.logo}" class="equipo-logo" style="width:30px;height:30px"><div class="nombre-equipo" style="font-size:0.7rem">${eq.nombre}</div></div>`;
            lista.appendChild(item);
        });
        container.appendChild(grupoWrapper);
    });
    btnGruposOriginal.style.display = 'none';
    btnPlayoffs.style.display = 'inline-block';
};

// --- FASE FINAL (EL BRACKET) ---
btnPlayoffs.onclick = () => {
    // Cruces manuales (Simulación de clasificados 1A vs 2C, etc.)
    const cruces = [
        { t1: equipos[0], t2: equipos[7] }, 
        { t1: equipos[11], t2: equipos[14] },
        { t1: equipos[12], t2: equipos[1] },
        { t1: equipos[9], t2: equipos[3] }
    ];
    generarBracketUI(cruces);
};

function generarBracketUI(cruces) {
    container.innerHTML = '';
    container.classList.remove('fase-grupos');
    btnPlayoffs.style.display = 'none';

    const renderPels = (n) => `<div class="pelotitas-container">${Array(n).fill('<div class="pelotita" data-estado="0"></div>').join('')}</div>`;

    container.innerHTML = `
        <div class="bracket-container">
            <div class="bracket-column" id="col-cuartos">
                ${cruces.map((c, i) => `
                    <div class="match-box" data-partido="${i}" data-wins="2">
                        <div class="match-team-row" data-equipo="1"><img src="${c.t1.logo}"><span>${c.t1.nombre}</span></div>
                        ${renderPels(2)}
                        <div class="vs-line"></div>
                        <div class="match-team-row" data-equipo="2"><img src="${c.t2.logo}"><span>${c.t2.nombre}</span></div>
                        ${renderPels(2)}
                    </div>
                `).join('')}
            </div>
            <div class="bracket-column" id="col-semis">
                ${[0, 1].map(i => `<div class="match-box" data-partido="${i}" data-wins="2"><div class="match-team-row" data-equipo="1"><span>TBD</span></div>${renderPels(2)}<div class="vs-line"></div><div class="match-team-row" data-equipo="2"><span>TBD</span></div>${renderPels(2)}</div>`).join('')}
            </div>
            <div class="bracket-column" id="col-final">
                <div class="match-box" data-partido="0" data-wins="3"><div class="match-team-row" data-equipo="1"><span>TBD</span></div>${renderPels(3)}<div class="vs-line"></div><div class="match-team-row" data-equipo="2"><span>TBD</span></div>${renderPels(3)}</div>
            </div>
        </div>
    `;

    document.querySelectorAll('.match-box').forEach(box => {
        box.ondblclick = function() {
            const eq1 = this.querySelector('[data-equipo="1"]');
            const eq2 = this.querySelector('[data-equipo="2"]');
            if (eq1.innerText.includes("TBD") || eq2.innerText.includes("TBD")) return;

            modalCard.innerHTML = `
                <h2 style="font-family:'BertholdBlock';text-align:center;color:var(--omen-cyan)">MAPA RESULTADO</h2>
                <div class="fila-partido">
                    <span>${eq1.innerText}</span><input type="number" id="r1"><span>-</span><input type="number" id="r2"><span>${eq2.innerText}</span>
                </div>
                <button class="btn-valorant" id="conf" style="width:100%"><span class="btn-content">CONFIRMAR</span></button>
            `;
            modal.classList.add("active");

            document.getElementById('conf').onclick = () => {
                const s1 = parseInt(document.getElementById('r1').value) || 0;
                const s2 = parseInt(document.getElementById('r2').value) || 0;
                if (s1 === s2) return;

                const p1 = this.querySelectorAll('.pelotitas-container')[0].querySelectorAll('.pelotita');
                const p2 = this.querySelectorAll('.pelotitas-container')[1].querySelectorAll('.pelotita');
                
                let v1 = Array.from(p1).filter(p => p.dataset.estado === "1").length;
                let v2 = Array.from(p2).filter(p => p.dataset.estado === "1").length;

                if (s1 > s2 && v1 < p1.length) p1[v1].dataset.estado = "1", v1++;
                else if (s2 > s1 && v2 < p2.length) p2[v2].dataset.estado = "1", v2++;

                modal.classList.remove("active");

                // FINALIZAR PARTIDO
                const limit = parseInt(this.dataset.wins);
                if (v1 === limit || v2 === limit) {
                    const winnerHTML = (v1 === limit) ? eq1.innerHTML : eq2.innerHTML;
                    const loserRow = (v1 === limit) ? eq2 : eq1;
                    loserRow.parentElement.classList.add('team-perdedor');
                    
                    const col = this.parentElement.id;
                    const idx = parseInt(this.dataset.partido);
                    if (col === "col-cuartos") {
                        const target = document.querySelector(`#col-semis .match-box[data-partido="${Math.floor(idx/2)}"]`);
                        target.querySelector(`[data-equipo="${(idx%2===0)?'1':'2'}"]`).innerHTML = winnerHTML;
                    } else if (col === "col-semis") {
                        const target = document.querySelector(`#col-final .match-box`);
                        target.querySelector(`[data-equipo="${(idx===0)?'1':'2'}"]`).innerHTML = winnerHTML;
                    } else {
                        alert("¡TENEMOS UN CAMPEÓN!");
                    }
                }
            };
        };
    });
}

modal.onclick = (e) => { if(e.target === modal) modal.classList.remove("active"); };
