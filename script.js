const container = document.getElementById("container-equipos")



const equipos = [

  { nombre: "Rose Devil", jugadores: ["Tony", "Jokker"], logo: "logo1.png" },

  { nombre: "Golden Sex", jugadores: ["Max", "Broken"], logo: "logo2.png" },

  { nombre: "Al-dedillo VC", jugadores: ["Xolo", "Noavae"], logo: "logo3.png" },

  { nombre: "Los Akrtona2", jugadores: ["S3R4X", "MasterKira"], logo: "logo4.png" },

  { nombre: "Crimson Eclipsed", jugadores: ["ReyFhantom", "zNyrex "], logo: "logo5.png" },

  { nombre: "MakacoNinjaPelocho", jugadores: ["Iker", "Adri"], logo: "logo6.png" },

  { nombre: "Bloody Fruit", jugadores: ["MrPain 神", "Sandiass21"], logo: "logo7.png" },

  { nombre: "Hijas del Kaos", jugadores: ["Satha", "Kaos"], logo: "logo8.png" },

  { nombre: "Konoha Makaca", jugadores: ["MakaQuillo", "MakaIsla"], logo: "logo9.png" },

  { nombre: "Team Obrikat", jugadores: ["JettDiffs", "EGOFack"], logo: "logo10.png" },

  { nombre: "TETONES: Equipo Nacional de Somalia", jugadores: ["Marrkitosss", "Davv"], logo: "logo11.png" },

  { nombre: "GOATS", jugadores: ["Mica", "Marco"], logo: "logo12.png" },

  { nombre: "SPIDYBOOBS", jugadores: ["Sama", "Potro"], logo: "logo13.png" },

  { nombre: "Tarsiers", jugadores: ["Tar", "Si"], logo: "logo14.png" },

  { nombre: "Sakis", jugadores: ["Sak", "Ki"], logo: "logo15.png" },

  { nombre: "Uakaris", jugadores: ["Uaka", "Riki"], logo: "logo16.png" },

  ]



equipos.forEach(equipo=>{



const card=document.createElement("div")

card.className="card-equipo"



card.innerHTML=`



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

`



card.addEventListener("click",()=>{



if(card.classList.contains("revealed")) return



card.classList.add("revealed")



})



container.appendChild(card)



})



/* MODAL */



const modal=document.getElementById("teamModal")

const modalCard=document.getElementById("teamModalCard")



document.addEventListener("dblclick",(e)=>{



const card=e.target.closest(".card-equipo")

if(!card) return



const logo=card.querySelector(".equipo-logo").src

const nombre=card.querySelector(".nombre-equipo").textContent

const jugadores=[...card.querySelectorAll(".jugadores-row span")].map(j=>j.textContent).join("<br>")



modalCard.innerHTML=`



<img src="${logo}">



<div>



<div class="team-modal-nombre">${nombre}</div>



<div class="team-modal-jugadores">${jugadores}</div>



</div>



`



modal.classList.add("active")



})



modal.addEventListener("click",(e)=>{



if(e.target===modal){



modal.classList.remove("active")



}



})
