// Tarefas da tabela
const tarefas = [
  "Passeio",
  "Alimentação",
  "Escovação",
  "Brincadeira",
  "Limpeza do espaço",
  "Água e remédios",
];

// Lê os tempos da tabela
function lerTempos(prefixo) {
  const tempos = [];
  for (let i = 0; i < tarefas.length; i++) {
    const valor = Number(document.getElementById(`${prefixo}${i}`).value);
    tempos.push(valor);
  }
  return tempos;
}

// Soma os tempos
function calcularTotal(tempos) {
  let total = 0;
  for (const tempo of tempos) {
    total = total + tempo;
  }
  return total;
}

// Média dos tempos
function calcularMedia(total, quantidade) {
  return total / quantidade;
}

// Conta tarefas cumpridas
function contarCumpridas(planejados, realizados) {
  let cumpridas = 0;
  for (let i = 0; i < planejados.length; i++) {
    if (realizados[i] >= planejados[i]) {
      cumpridas++;
    }
  }
  return cumpridas;
}

// Classifica a rotina
function classificarRotina(cumpridas, quantidade) {
  if (cumpridas === quantidade) {
    return "Rotina completa";
  } else if (cumpridas >= quantidade / 2) {
    return "Rotina parcial";
  } else {
    return "Rotina a organizar";
  }
}

// Cadastro de pets

// Chave do localStorage
const CHAVE_PETS = "petcare-pets";
const LIMITE_PETS = 6;

// Pets e pet selecionado
const estado = {
  pets: [],
  idSelecionado: null,
};

// Salva os pets
function salvarPets(pets) {
  localStorage.setItem(CHAVE_PETS, JSON.stringify(pets));
}

// Carrega os pets
function recuperarPets() {
  const texto = localStorage.getItem(CHAVE_PETS);
  if (texto === null) {
    return [];
  }
  try {
    return JSON.parse(texto);
  } catch (erro) {
    localStorage.removeItem(CHAVE_PETS);
    return [];
  }
}

// Verifica pet repetido
function petJaExiste(pets, nome, especie) {
  for (const pet of pets) {
    if (pet.nome.toLowerCase() === nome.toLowerCase() && pet.especie === especie) {
      return true;
    }
  }
  return false;
}

// Valida o formulário
function validarPet(nome, especie, pets) {
  if (nome === "") {
    return "Digite o nome do pet.";
  } else if (nome.length < 2) {
    return "O nome precisa ter pelo menos 2 letras.";
  } else if (petJaExiste(pets, nome, especie)) {
    return `${nome} (${especie}) já está cadastrado.`;
  } else if (pets.length >= LIMITE_PETS) {
    return `Limite de ${LIMITE_PETS} pets atingido. Remova um para cadastrar outro.`;
  } else {
    return "";
  }
}

// Pet selecionado
function buscarPetSelecionado() {
  return estado.pets.find((pet) => pet.id === estado.idSelecionado);
}

// Cria o card do pet
function criarCardPet(pet) {
  const selecionado = pet.id === estado.idSelecionado;

  const item = document.createElement("li");
  item.className = selecionado
    ? "rounded-xl border-2 border-[#16834A] bg-[#E5F3E7] p-6"
    : "rounded-xl border-2 border-[#E5F3E7] bg-white p-6";

  const titulo = document.createElement("p");
  titulo.className = "text-lg font-bold text-[#174936]";
  titulo.textContent = pet.nome;

  const especie = document.createElement("p");
  especie.className = "text-sm text-[#647067]";
  especie.textContent = `Espécie: ${pet.especie}`;

  const resultado = document.createElement("p");
  resultado.className = "mt-3 text-sm font-medium text-[#16834A]";
  resultado.textContent = pet.ultimaClassificacao
    ? `Última rotina: ${pet.ultimaClassificacao}`
    : "Rotina ainda não calculada";

  const botoes = document.createElement("div");
  botoes.className = "mt-5 grid grid-cols-2 gap-4";

  const botaoSelecionar = document.createElement("button");
  botaoSelecionar.type = "button";
  botaoSelecionar.textContent = selecionado ? "Selecionado" : "Selecionar";
  botaoSelecionar.disabled = selecionado;
  botaoSelecionar.className =
    "cursor-pointer rounded-lg bg-[#16834A] px-3 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#174936] focus:outline-2 focus:outline-offset-2 focus:outline-[#174936] disabled:cursor-default disabled:bg-[#174936]";
  botaoSelecionar.addEventListener("click", () => selecionarPet(pet.id));

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.textContent = "Remover";
  botaoRemover.setAttribute("aria-label", `Remover ${pet.nome}`);
  botaoRemover.className =
    "cursor-pointer rounded-lg border border-[#b42318] bg-white px-3 py-2 text-sm font-bold text-[#b42318] transition-colors duration-300 hover:bg-[#b42318] hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#b42318]";
  botaoRemover.addEventListener("click", () => removerPet(pet.id));

  botoes.append(botaoSelecionar, botaoRemover);
  item.append(titulo, especie, resultado, botoes);
  return item;
}

// Mostra a lista
function renderizarPets() {
  const lista = document.getElementById("listaPets");
  lista.textContent = "";

  for (const pet of estado.pets) {
    lista.appendChild(criarCardPet(pet));
  }

  const vazia = estado.pets.length === 0;
  document.getElementById("listaVazia").hidden = !vazia;
  document.getElementById("quantidadePets").textContent = `(${estado.pets.length})`;
}

// Cadastra pet
function cadastrarPet(evento) {
  evento.preventDefault();

  const campoNome = document.getElementById("nomePet");
  const mensagem = document.getElementById("mensagemPet");
  const nome = campoNome.value.trim();
  const especie = document.getElementById("especie").value;

  const erro = validarPet(nome, especie, estado.pets);
  mensagem.textContent = erro;
  if (erro !== "") {
    campoNome.focus();
    return;
  }

  const novoPet = {
    id: Date.now(),
    nome: nome,
    especie: especie,
    ultimaClassificacao: null,
  };

  estado.pets = [...estado.pets, novoPet];
  estado.idSelecionado = novoPet.id;
  salvarPets(estado.pets);

  campoNome.value = "";
  renderizarPets();
}

// Seleciona pet
function selecionarPet(id) {
  estado.idSelecionado = id;
  renderizarPets();
}

// Remove pet
function removerPet(id) {
  const pet = estado.pets.find((p) => p.id === id);
  if (!confirm(`Deseja remover ${pet.nome}?`)) {
    return;
  }

  estado.pets = estado.pets.filter((p) => p.id !== id);
  if (estado.idSelecionado === id) {
    estado.idSelecionado = estado.pets.length > 0 ? estado.pets[0].id : null;
  }
  salvarPets(estado.pets);
  renderizarPets();
}

// Cálculo da rotina

// Calcula a rotina
function calcularRotina() {
  const pet = buscarPetSelecionado();

  if (pet === undefined) {
    document.getElementById("resumoPet").textContent =
      "Cadastre e selecione um pet em \"Meu pet\" antes de calcular a rotina.";
    document.getElementById("pet").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const nome = pet.nome;
  const especie = pet.especie;

  const planejados = lerTempos("plan");
  const realizados = lerTempos("real");

  const total = calcularTotal(realizados);
  const media = calcularMedia(total, realizados.length);
  const cumpridas = contarCumpridas(planejados, realizados);
  const classificacao = classificarRotina(cumpridas, tarefas.length);

  // Console
  console.log(`Pet: ${nome} (${especie})`);
  console.log(`Tempos planejados: ${planejados}`);
  console.log(`Tempos realizados: ${realizados}`);
  console.log(`Tempo total: ${total} min`);
  console.log(`Média por tarefa: ${media.toFixed(1)} min`);
  console.log(`Tarefas cumpridas: ${cumpridas} de ${tarefas.length}`);
  console.log(`Classificação: ${classificacao}`);

  // Página
  document.getElementById("resumoPet").textContent =
    `Resultado da rotina de ${nome} (${especie}):`;
  document.getElementById("total").textContent = `${total} min`;
  document.getElementById("media").textContent = `${media.toFixed(1)} min`;
  document.getElementById("cumpridas").textContent =
    `${cumpridas} de ${tarefas.length}`;
  document.getElementById("classificacao").textContent = classificacao;

  // Salva no pet
  estado.pets = estado.pets.map((p) =>
    p.id === pet.id ? { ...p, ultimaClassificacao: classificacao } : p
  );
  salvarPets(estado.pets);
  renderizarPets();
}

// Início

function iniciar() {
  estado.pets = recuperarPets();
  if (estado.pets.length > 0) {
    estado.idSelecionado = estado.pets[0].id;
  }
  renderizarPets();
}

document.getElementById("formPet").addEventListener("submit", cadastrarPet);
iniciar();