const container = document.getElementById("container-equipos")

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
  { nombre: "TETONES: Somalia", jugadores: ["Marrkitosss", "Davv"], logo: "logo11.png" },
  { nombre: "GOATS", jugadores: ["Mica", "Marco"], logo: "logo12.png" },
  { nombre: "SPIDYBOOBS", jugadores: ["Sama", "Potro"], logo: "logo13.png" },
  { nombre: "MUGIWARAS", jugadores: ["Andreloregon", "Jess"], logo: "logo14.png" },
  { nombre: "Miaus", jugadores: ["Kae", "Wilson"], logo: "logo15.png" },
  { nombre: "Uakaris", jugadores: ["Uaka", "Riki"], logo: "logo16.png" },
]

const memoriaResultados = { "A": [], "B": [], "C": [], "D": [] };

equipos.forEach(equipo=>{
    const card=document.createElement("div")
    card.className="card-equipo"
    card.innerHTML=`
        <div class="smoke-cover">REVELAR</div>
        <img src="${equipo.logo}" class="equipo-logo">
        <div class="equipo-data">
            <div class="nombre-equipo">${equipo.nombre}</div>
            <div class="jugadores-row">👤 ${equipo.jugadores[0]} | 👤 ${equipo.jugadores[1]}</div>
        </div>
    `
    card.addEventListener("click",()=>{
        if(card.classList.contains("revealed")) return
        card.classList.add("revealed")
    })
    container.appendChild(card)
})

const modal=document.getElementById("teamModal")
const modalCard=document.getElementById("teamModalCard")

document.addEventListener("dblclick",(e)=>{
    const card=e.target.closest(".card-equipo")
    if(!card || document.body.classList.contains('sorteo-realizado')) return
    const logoSrc=card.querySelector(".equipo-logo").src
    const nombre=card.querySelector(".nombre-equipo").textContent
    const jugadoresRaw = card.querySelector(".jugadores-row").textContent;
    const jugadoresFormateados = jugadoresRaw.replace("|", "<br>");
    modalCard.innerHTML=`
        <div class="modal-equipo-content">
            <img src="${logoSrc}" class="modal-logo">
            <div class="modal-data">
                <div class="modal-nombre">${nombre}</div>
                <div class="modal-jugadores">${jugadoresFormateados}</div>
            </div>
        </div>
    `
    modal.classList.add("active")
})

modal.addEventListener("click",(e)=>{ if(e.target===modal) modal.classList.remove("active") })

const btnSorteo = document.querySelector('.btn-valorant');
btnSorteo.addEventListener('click', () => {
    document.body.classList.add('sorteo-realizado');
    const cards = Array.from(document.querySelectorAll('.card-equipo'));
    const mezcladas = cards.sort(() => Math.random() - 0.5);
    container.innerHTML = ''; 
    const letras = ["A", "B", "C", "D"];

    for (let i = 0; i < 4; i++) {
        const letra = letras[i];
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
            card.innerHTML = `
                <div class="equipo-content" style="display:flex; align-items:center; gap:15px; width:100%">
                    <img src="${logo}" class="equipo-logo" style="width:35px; height:35px">
                    <div class="nombre-equipo" style="font-size:0.95rem; flex:1">${nombre}</div>
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
    }
    btnSorteo.parentElement.style.display = 'none';
});

function abrirGestionPartidos(letra, cardsGrupo, listaInterna) {
    // Obtenemos nombres y logos de los equipos del grupo
    const datosEquipos = cardsGrupo.map(c => ({
        nombre: c.querySelector('.nombre-equipo').textContent,
        logo: c.querySelector('.equipo-logo').src
    }));

    const cruces = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
    const resG = memoriaResultados[letra];

    modalCard.innerHTML = `
        <h2 style="font-family:'BertholdBlock'; color:var(--omen-cyan); text-align:center; margin-bottom:20px; letter-spacing:2px">GESTIÓN GRUPO ${letra}</h2>
        <div id="contenedor-partidos">
            ${cruces.map((par, i) => `
                <div class="fila-partido" style="display:flex; align-items:center; margin:10px 0; background:rgba(255,255,255,0.03); padding:10px; border-radius:10px; gap:10px">
                    <img src="${datosEquipos[par[0]].logo}" class="logo-partido">
                    <span style="flex:1; text-align:right; font-size:0.85rem">${datosEquipos[par[0]].nombre}</span>
                    <div style="display:flex; gap:5px; margin:0 10px">
                        <input type="number" class="in-l" value="${resG[i].sL}">
                        <input type="number" class="in-v" value="${resG[i].sV}">
                    </div>
                    <span style="flex:1; font-size:0.85rem">${datosEquipos[par[1]].nombre}</span>
                    <img src="${datosEquipos[par[1]].logo}" class="logo-partido">
                </div>
            `).join('')}
        </div>
        <button class="btn-valorant" id="save-close" style="width:100%; margin-top:20px"><span class="btn-content">GUARDAR CAMBIOS</span></button>
    `;

    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => {
        input.oninput = () => {
            const filas = Array.from(modal.querySelectorAll('.fila-partido'));
            filas.forEach((fila, idx) => {
                memoriaResultados[letra][idx] = {
                    sL: fila.querySelector('.in-l').value,
                    sV: fila.querySelector('.in-v').value
                };
            });
            procesarResultadosGrupo(letra, cardsGrupo, listaInterna);
        };
    });

    modal.classList.add("active");
    document.getElementById('save-close').onclick = () => modal.classList.remove("active");
}

function procesarResultadosGrupo(letra, cardsGrupo, listaInterna) {
    const cruces = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
    const resultados = memoriaResultados[letra];
    const conteo = Array(4).fill(0);
    cardsGrupo.forEach(c => c.querySelectorAll('.pelotita').forEach(p => p.dataset.estado = "0"));
    cruces.forEach((par, i) => {
        const res = resultados[i];
        if (res.sL !== "" && res.sV !== "") {
            const vL = parseInt(res.sL); const vV = parseInt(res.sV);
            const pL = cardsGrupo[par[0]].querySelectorAll('.pelotita')[conteo[par[0]]];
            const pV = cardsGrupo[par[1]].querySelectorAll('.pelotita')[conteo[par[1]]];
            if (pL && pV) {
                if (vL > vV) { pL.dataset.estado = "1"; pV.dataset.estado = "2"; }
                else if (vV > vL) { pL.dataset.estado = "2"; pV.dataset.estado = "1"; }
                conteo[par[0]]++; conteo[par[1]]++;
            }
        }
    });
    actualizarPuntosYOrden(listaInterna);
}

function actualizarPuntosYOrden(lista) {
    const cards = Array.from(lista.querySelectorAll('.card-equipo'));
    cards.forEach(card => {
        let pts = 0;
        card.querySelectorAll('.pelotita').forEach(p => { if(p.dataset.estado === "1") pts++; });
        card.dataset.puntos = pts;
    });
    cards.sort((a, b) => b.dataset.puntos - a.dataset.puntos);
    cards.forEach((card, idx) => {
        lista.appendChild(card);
        if(idx >= 2) card.classList.add('eliminado');
        else card.classList.remove('eliminado');
    });
}
