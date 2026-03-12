const container = document.getElementById("container-equipos")

// Lista de 24 equipos
const equipos = [
  { nombre: "Rose Devil", jugadores: ["Tony", "Jokker"], logo: "logo1.png" },
  { nombre: "Golden Sex", jugadores: ["Max", "Broken"], logo: "logo2.png" },
  { nombre: "Al-dedillo VC", jugadores: ["Xolo", "Noavae"], logo: "logo3.png" },
  { nombre: "Los Akrtona2", jugadores: ["S3R4X", "MasterKira"], logo: "logo4.png" },
  { nombre: "Crimson Eclipsed", jugadores: ["ReyFhantom", "zNyrex "], logo: "logo5.png" },
  { nombre: "MakacoNinjaPelocho", jugadores: ["Iker", "Adri"], logo: "logo6.png" },
  { nombre: "Baboon", jugadores: ["Babu", "Tito"], logo: "logo7.png" },
  { nombre: "Mono Araña", jugadores: ["Ara", "Spidey"], logo: "logo8.png" },
  { nombre: "Capuchinos", jugadores: ["Capu", "Nino"], logo: "logo9.png" },
  { nombre: "Saimiris", jugadores: ["Sai", "Miri"], logo: "logo10.png" },
  { nombre: "Macacos", jugadores: ["Mac", "Roco"], logo: "logo11.png" },
  { nombre: "Colobos", jugadores: ["Colo", "Bobo"], logo: "logo12.png" },
  { nombre: "Gibones", jugadores: ["Gib", "Bim"], logo: "logo13.png" },
  { nombre: "Tarsiers", jugadores: ["Tar", "Si"], logo: "logo14.png" },
  { nombre: "Sakis", jugadores: ["Sak", "Ki"], logo: "logo15.png" },
  { nombre: "Uakaris", jugadores: ["Uaka", "Riki"], logo: "logo16.png" },
  { nombre: "Muriquis", jugadores: ["Muri", "Qui"], logo: "logo17.png" },
  { nombre: "Howlers", jugadores: ["Howl", "Er"], logo: "logo18.png" },
  { nombre: "Langures", jugadores: ["Lan", "Gure"], logo: "logo19.png" },
  { nombre: "Probóscidos", jugadores: ["Probo", "Scido"], logo: "logo20.png" },
  { nombre: "Monos Dorados", jugadores: ["Dorado", "Sol"], logo: "logo21.png" },
  { nombre: "Mono León", jugadores: ["Leo", "King"], logo: "logo22.png" },
  { nombre: "Mono Capuchino", jugadores: ["Cap", "Chino"], logo: "logo23.png" },
  { nombre: "Mono Araña 2", jugadores: ["Spider", "Man"], logo: "logo24.png" }
]

const fragment = document.createDocumentFragment()

equipos.forEach((equipo, i) => {
  const card = document.createElement("div")
  card.className = "card-equipo"

  card.innerHTML = `
    <div class="smoke-cover"></div>

    <div class="equipo-content">
      <div class="logo-frame">
        <img src="${equipo.logo}" class="equipo-logo">
      </div>

      <div class="equipo-data">
        <div class="nombre-equipo">${equipo.nombre}</div>
        <div class="jugadores-row">
          <span>👤 ${equipo.jugadores[0]}</span>
          <span>👤 ${equipo.jugadores[1]}</span>
        </div>
      </div>
    </div>
  `

  const content = card.querySelector(".equipo-content")
  content.style.opacity = 0
  content.style.transform = "translateX(-20px)"
  content.style.transition = "opacity 0.6s ease, transform 0.6s ease"

  card.addEventListener("click", () => {
    if(card.classList.contains("revealed")) return
    card.classList.add("revealed")
    content.style.opacity = 1
    content.style.transform = "translateX(0)"
  })

  fragment.appendChild(card)
})

container.appendChild(fragment)

/* BOTON SORTEO */
const boton = document.querySelector(".btn-valorant")
boton.addEventListener("click", iniciarSorteo)

function iniciarSorteo() {
  const cards = [...document.querySelectorAll(".card-equipo")]
  shuffle(cards)
  cards.forEach((card,i)=>{
    setTimeout(()=>{
      card.classList.add("revealed")
      const content = card.querySelector(".equipo-content")
      content.style.opacity = 1
      content.style.transform = "translateX(0)"
    }, i*250)
  })
}

// Mezclar tarjetas
function shuffle(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1))
    [array[i],array[j]]=[array[j],array[i]]
  }
}
