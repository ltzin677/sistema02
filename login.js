function entrar() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("senha").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("logado", "sim");
        window.location.href = "sistema.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

