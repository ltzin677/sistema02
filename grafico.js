// grafico.js
if (localStorage.getItem("logado") !== "sim") {
  window.location.href = "login.html";
}

const extratos = JSON.parse(localStorage.getItem("extratos")) || [];

// Prepara dados: agrupamos por data (dd/mm) somando ganhos e gastos daquele dia.
// Simples e direto.
const agrupado = {}; // { "01/11": {ganhos: 0, gastos:0} }
extratos.forEach(item => {
  // extrato.data tem formato "DD/MM/YYYY às HH:MM:SS" -> pegamos a parte da data
  const dataFull = item.data || "";
  const dataPart = dataFull.split(" às ")[0] || dataFull || "Sem data";
  if (!agrupado[dataPart]) agrupado[dataPart] = { ganhos:0, gastos:0 };
  if (item.tipoOperacao === "ENTRADA") agrupado[dataPart].ganhos += Number(item.valor);
  else agrupado[dataPart].gastos += Number(item.valor);
});

// Ordena as datas cronologicamente (tentativa simples)
const labels = Object.keys(agrupado);
labels.sort((a,b)=>{
  // tenta transformar dd/mm/yyyy em timestamp
  const pa = a.split("/"), pb = b.split("/");
  if (pa.length===3 && pb.length===3) {
    const ta = new Date(`${pa[2]}-${pa[1]}-${pa[0]}`).getTime();
    const tb = new Date(`${pb[2]}-${pb[1]}-${pb[0]}`).getTime();
    return ta - tb;
  }
  return 0;
});

const ganhos = labels.map(l => agrupado[l].ganhos.toFixed(2));
const gastos = labels.map(l => agrupado[l].gastos.toFixed(2));

const ctx = document.getElementById('graficoFinanceiro').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Ganhos',
        data: ganhos,
        borderWidth: 3,
        borderColor: 'green',
        backgroundColor: 'rgba(0,255,0,0.15)',
        tension: 0.3
      },
      {
        label: 'Gastos',
        data: gastos,
        borderWidth: 3,
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.15)',
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

