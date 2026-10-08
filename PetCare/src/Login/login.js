function logar() {
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === '1234') {
        alert('Login bem-sucedido!');
        location.href = 'rotina.html';  
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
}