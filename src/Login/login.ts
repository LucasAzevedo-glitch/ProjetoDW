// Login de teste
const USUARIO_CORRETO: string = "admin";
const SENHA_CORRETA: string = "1234";

// Valida usuário e senha
function validarLogin(usuario: string, senha: string): boolean {
    return usuario === USUARIO_CORRETO && senha === SENHA_CORRETA;
}

// Envia o login
function logar(): boolean {
    const usuarioInput = document.getElementById("login");
    const senhaInput = document.getElementById("senha");
    const mensagem = document.getElementById("mensagem");

    if (
        !(usuarioInput instanceof HTMLInputElement) ||
        !(senhaInput instanceof HTMLInputElement) ||
        !(mensagem instanceof HTMLElement)
    ) {
        console.error("Não foi possível localizar os elementos do formulário.");
        return false;
    }

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;

    if (validarLogin(usuario, senha)) {
        console.log(`Login realizado: ${usuario}`);
        mensagem.textContent = "";
        window.location.href = "../rotina.html";
    } else {
        console.log("Tentativa de login inválida");
        mensagem.textContent = "Usuário ou senha incorretos. Tente novamente.";
    }

    return false;
}

// Localiza o formulário
const formulario = document.getElementById("form-login");

if (formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", (evento: SubmitEvent): void => {
        evento.preventDefault();
        logar();
    });
}
