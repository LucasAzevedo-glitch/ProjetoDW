// Dados de acesso de demonstração
const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";

// Confere se usuário e senha estão corretos
function validarLogin(usuario, senha) {
    return usuario === USUARIO_CORRETO && senha === SENHA_CORRETA;
}

// Chamada quando o formulário é enviado
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

    // Impede o formulário de recarregar a página
    return false;
}