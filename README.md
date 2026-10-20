# PetCare
Projeto educativo de uma aplicação web que organiza uma rotina fictícia de cuidados com pets. O usuário faz login, cadastra seus pets, informa os minutos planejados e realizados de cada tarefa do dia e recebe um resumo com a classificação da rotina.

- Conteúdo apenas didático. Não substitui orientações de profissionais de saúde animal!

**Integrantes:** Lucas Azevedo e Maria Luiza  
**Turma:** TSI 2026.2 - IFRN

## Tecnologias Utilizadas
- HTML5
- CSS com Tailwind CSS (`output.css` é gerado pelo Tailwind)
- JavaScript
- `localStorage` do navegador para guardar os pets (sem banco de dados)

## Estrutura principal do projeto
├── index.html
└── src/
    ├── Login/
    │   ├── login.html
    │   └── login.js
    ├── base.css
    ├── rotina.html
    └── script.js

## Páginas
### `index.html` - Início
Apresentação do projeto com as seções **Início**, **PetCare em números**, **Sobre**, **Como funciona** e botões que levam ao login.

### `login.html` - Login
Formulário com usuário e senha.
Demonstração:
- Usuário: `admin`
- Senha: `1234`

### `rotina.html` - Rotina do pet
Três seções:

1. **Meu pet:** cadastro, seleção e remoção de pets (máximo de 6).
2. **Tarefas do dia:** tabela com 6 tarefas (Passeio, Alimentação, Escovação, Brincadeira, Limpeza do espaço, Água e remédios), cada uma com tempo planejado e realizado em minutos.
3. **Resultados:** tempo total, média por tarefa, tarefas cumpridas e classificação.

## Login (`login.js`)
Usuário e senha ficam no código e são comparados no envio do formulário. Se estiverem corretos, a pessoa é levada para a página da rotina.

```javascript
const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";

function validarLogin(usuario, senha) {
    return usuario === USUARIO_CORRETO && senha === SENHA_CORRETA;
}
```

## Rotina (`script.js`)
### Regras de cálculo

- **Tempo total:** soma dos minutos realizados.
- **Média por tarefa:** tempo total dividido pela quantidade de tarefas.
- **Tarefa cumprida:** tempo realizado maior ou igual ao planejado.
- **Classificação:** Rotina completa, parcial ou a organizar

### Funções de cálculo
```javascript
function contarCumpridas(planejados, realizados) {
  let cumpridas = 0;
  for (let i = 0; i < planejados.length; i++) {
    if (realizados[i] >= planejados[i]) {
      cumpridas++;
    }
  }
  return cumpridas;
}

function classificarRotina(cumpridas, quantidade) {
  if (cumpridas === quantidade) {
    return "Rotina completa";
  } else if (cumpridas >= quantidade / 2) {
    return "Rotina parcial";
  } else {
    return "Rotina a organizar";
  }
}
```

### Cadastro de pets
Cada pet é um objeto guardado em um array dentro do objeto `estado`:

```javascript
const estado = {
  pets: [],
  idSelecionado: null,
};

const novoPet = {
  id: Date.now(),
  nome: "Thor",
  especie: "Cachorro",
  ultimaClassificacao: null,
};
```

- A função `validarPet` confere nome preenchido, mínimo de 2 letras, pet duplicado e limite de 6 pets, retornando a mensagem de erro ou texto vazio se estiver tudo certo.

Principais funções:
`cadastrarPet` = Valida o formulário e adiciona o pet
`selecionarPet` = Escolhe qual pet terá a rotina calculada
`removerPet` = Remove o pet (com confirmação)
`criarCardPet` = Monta o card de um pet na tela
`renderizarPets` = Redesenha a lista de pets
`calcularRotina` = Lê a tabela, calcula e mostra os resultados

### Salvando os pets no navegador
Os pets são salvos no `localStorage`.

```javascript
const CHAVE_PETS = "petcare-pets";

function salvarPets(pets) {
  localStorage.setItem(CHAVE_PETS, JSON.stringify(pets));
}

function recuperarPets() {
  const texto = localStorage.getItem(CHAVE_PETS);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}
```

(Os dados ficam apenas naquele navegador. Para ver o que está salvo, abra o DevTools (F12) -> **Application > Local Storage** -> chave `petcare-pets`.)


## Como executar
1. Baixe ou clone o projeto.
2. Gere o `output.css` com o Tailwind (build ou `--watch`).
3. Abra o `index.html` no navegador.
4. Clique em **Acessar rotina**, entre com `admin` / `1234` e cadastre um pet.

## Limitações
- Login apenas demonstrativo: usuário e senha ficam visíveis no código e a página da rotina pode ser aberta direto.
- Sem banco de dados; os pets ficam só no `localStorage` do navegador.
- Valores de tempo e números da página inicial são fictícios.