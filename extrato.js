// Carrega dados salvos no localStorage
let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

// Seleciona a área onde o extrato será exibido
const listaExtrato = document.getElementById("listaExtrato");

// Função que monta o extrato na tela
function carregarExtrato() {
    listaExtrato.innerHTML = "";

    if (transacoes.length === 0) {
        listaExtrato.innerHTML = "<p>Nenhuma transação registrada.</p>";
        return;
    }

    // Ordena do mais novo para o mais antigo
    transacoes.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Percorre cada item e mostra
    transacoes.forEach(t => {
        const item = document.createElement("div");
        item.className = "item-extrato";

        item.innerHTML = `
            <p><strong>${t.tipo.toUpperCase()}</strong></p>
            <p>Valor: R$ ${t.valor.toFixed(2)}</p>
            <p>Data: ${t.data}</p>
            <hr>
        `;

        listaExtrato.appendChild(item);
    });
}

// Chama a função ao abrir a página
carregarExtrato();

