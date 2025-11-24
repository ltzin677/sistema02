document.getElementById("saqueForm").addEventListenerListener("submit", (e) => {
    e.preventdefault();

    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;

    if (!descricao || !valor){
        alert("preencha todos os campos!");
        return;
    }

    alert(`Saque realizado:

Descrição: ${descricao}
Valor: R$ ${valor}`);
e.target.reset();
})