// Nomes das 6 tarefas, na mesma ordem da tabela
const tarefas = [
  "Passeio",
  "Alimentação",
  "Escovação",
  "Brincadeira",
  "Limpeza do espaço",
  "Água e remédios",
];

// Lê os minutos planejados ou realizados e retorna um array.
function lerTempos(prefixo) {
  const tempos = [];
  for (let i = 0; i < tarefas.length; i++) {
    const valor = Number(document.getElementById(`${prefixo}${i}`).value);
    tempos.push(valor);
  }
  return tempos;
}

// Soma todos os tempos do array
function calcularTotal(tempos) {
  let total = 0;
  for (const tempo of tempos) {
    total = total + tempo;
  }
  return total;
}

// Divide o total pela quantidade de tarefas
function calcularMedia(total, quantidade) {
  return total / quantidade;
}

// Conta quantas tarefas tiveram realizado >= planejado
function contarCumpridas(planejados, realizados) {
  let cumpridas = 0;
  for (let i = 0; i < planejados.length; i++) {
    if (realizados[i] >= planejados[i]) {
      cumpridas++;
    }
  }
  return cumpridas;
}

// Classifica a rotina pela quantidade de tarefas cumpridas
function classificarRotina(cumpridas, quantidade) {
  if (cumpridas === quantidade) {
    return "Rotina completa";
  } else if (cumpridas >= quantidade / 2) {
    return "Rotina parcial";
  } else {
    return "Rotina a organizar";
  }
}

// Função chamada pelo botão "Calcular rotina"
function calcularRotina() {
  const nome = document.getElementById("nomePet").value.trim() || "Seu pet";
  const especie = document.getElementById("especie").value;

  const planejados = lerTempos("plan");
  const realizados = lerTempos("real");

  const total = calcularTotal(realizados);
  const media = calcularMedia(total, realizados.length);
  const cumpridas = contarCumpridas(planejados, realizados);
  const classificacao = classificarRotina(cumpridas, tarefas.length);

  // Saída no Console
  console.log(`Pet: ${nome} (${especie})`);
  console.log(`Tempos planejados: ${planejados}`);
  console.log(`Tempos realizados: ${realizados}`);
  console.log(`Tempo total: ${total} min`);
  console.log(`Média por tarefa: ${media.toFixed(1)} min`);
  console.log(`Tarefas cumpridas: ${cumpridas} de ${tarefas.length}`);
  console.log(`Classificação: ${classificacao}`);

  // Saída na página
  document.getElementById("resumoPet").textContent =
    `Resultado da rotina de ${nome} (${especie}):`;
  document.getElementById("total").textContent = `${total} min`;
  document.getElementById("media").textContent = `${media.toFixed(1)} min`;
  document.getElementById("cumpridas").textContent =
    `${cumpridas} de ${tarefas.length}`;
  document.getElementById("classificacao").textContent = classificacao;
}
