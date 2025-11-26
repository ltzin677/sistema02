function addRetirada() {
    let valor = Number(document.getElementById("valor").value);
    let data = new Date().toLocaleString();

    let retiradas = JSON.parse(localStorage.getItem("retiradas")) || [];
    retiradas.push({ valor, data });

    localStorage.setItem("retiradas", JSON.stringify(retiradas));

    alert("Retirada registrada!");
}

