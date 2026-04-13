import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];
const mensagens = {
  name: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "O nome deve conter pelo menos 2 caracteres.",
  },
  email: {
    valueMissing: "O campo de email não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
  },
  telefone: {
    valueMissing: "O campo de telefone não pode estar vazio.",
    patternMismatch: "Por favor, preencha um telefone válido.",
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior de idade para se enviar mensagem.",
  },
  mensagem: {
    valueMissing: "O campo de mensagem não pode estar vazio.",
    tooShort: "A mensagem deve conter pelo menos 10 caracteres.",
  },
};

camposDoFormulario.forEach(function (campo) {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let formularioValido = true;

  camposDoFormulario.forEach((campo) => {
    if (!campo.checkValidity()) {
      verificaCampo(campo);
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    return;
  }

  const listaResposta = {
    name: evento.target.elements["name"]?.value,
    email: evento.target.elements["email"]?.value,
    telefone: evento.target.elements["telefone"]?.value,
    aniversario: evento.target.elements["aniversario"]?.value,
    mensagem: evento.target.elements["mensagem"]?.value,
  };
  console.log(listaResposta);
  localStorage.setItem("listaResposta", JSON.stringify(listaResposta));
  window.location.href = "./contato.html";
});

function verificaCampo(campo) {
  let mensagem = "";

  campo.setCustomValidity("");

  if (campo.name === "aniversario" && campo.value != "") {
    ehMaiorDeIdade(campo);
  }

  tiposDeErro.forEach((erro) => {
    if (
      campo.validity[erro] &&
      mensagens[campo.name]?.[erro] &&
      mensagens[campo.name][erro]
    ) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  });

  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");

  const validadorDeCampo = campo.checkValidity();
  if (!validadorDeCampo) {
    mensagemErro.textContent = mensagem;
    campo.classList.add("erro");
    campo.classList.remove("sucesso");
  } else {
    mensagemErro.textContent = "";
    campo.classList.add("sucesso");
    campo.classList.remove("erro");
  }
}
