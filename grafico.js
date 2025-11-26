let entradas = JSON.parse(localStorage.getItem("entradas")) || [];
let retiradas = JSON.parse(localStorage.getItem("retradas")) || [];

let labels = entradas.map(e => e.data).concat(retiradas.map(r => r.data));
let ganhos = entradas.map(e => e.valor);
let gastos = retiradas.map(r => r.valor);

const ctx = document.getElementById("grafico");

new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Ganhos",
                data: ganhos,
                borderColor: "green",
                borderWidth: 2
            },
            {
                label: "Gastos",
                data: gastos,
                borderColor: "red",
                borderWidth: 2
            }
        ]
    }
});

