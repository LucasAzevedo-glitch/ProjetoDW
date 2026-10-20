// Login de teste
const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";

// Valida usuário e senha
function validarLogin(usuario, senha) {
    return usuario === USUARIO_CORRETO && senha === SENHA_CORRETA;
}

// Envia o login
function logar() {
    const usuario = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (validarLogin(usuario, senha)) {
        console.log(`Login realizado: ${usuario}`);
        mensagem.textContent = "";
        location.href = "../rotina.html";
    } else {
        console.log("Tentativa de login inválida");
        mensagem.textContent = "Usuário ou senha incorretos. Tente novamente.";
    }

    return false;
}