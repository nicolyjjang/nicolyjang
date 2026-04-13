const html = document.querySelector("html");

const iconesTema = document.querySelectorAll(".theme-toggle-icon");
const temaClaro = document.querySelector(".moon-icon");
const temaEscuro = document.querySelector(".sun-icon");

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo) {
  alternarTema(temaSalvo);
} else {
  alternarTema("light");
}

temaClaro.addEventListener("click", () => {
  alternarTema("light");
});

temaEscuro.addEventListener("click", () => {
  alternarTema("dark");
});

function alternarTema(tema) {
  html.setAttribute("data-context", tema);
  localStorage.setItem("tema", tema);

  iconesTema.forEach((icone) => {
    icone.classList.remove("active");
  });

  if (tema === "dark") {
    temaClaro.style.display = "block"; 
    temaEscuro.style.display = "none"; 
  } else {
    temaClaro.style.display = "none"; 
    temaEscuro.style.display = "block"; 
  }
}