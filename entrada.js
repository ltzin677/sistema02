function salvarEntrada() {
    let valor = Number(document.getElementById("valor").value);

    if (!valor) return alert("Digite um valor!");

    let lista = JSON.parse(localStorage.getItem("entradas")) || [];
    let datas = JSON.parse(localStorage.getItem("datas")) || [];

    let agora = new Date().toLocaleString("pt-BR");

    lista.push(valor);
    datas.push("Entrada - " + agora);

    localStorage.setItem("entradas", JSON.stringify(lista));
    localStorage.setItem("datas", JSON.stringify(datas));

    alert("Entrada salva!");
}

