

// sistema.js
// Bloqueia acesso se não logado
if (localStorage.getItem("logado") !== "sim") {
  window.location.href = "login.html";
}

// elementos
const depositoForm = document.getElementById("depositoForm");
const listaExtratos = document.getElementById("listaExtratos");
const saldoTxt = document.getElementById("saldoTxt");
const avisoLimite = document.getElementById("avisoLimite");
const verTodosBtn = document.getElementById("verTodos");
const btnGrafico = document.getElementById("btnGrafico");
const btnPlano = document.getElementById("btnPlano");
const btnExtrato = document.getElementById("btnExtrato");
const logoutBtn = document.getElementById("logout");
const toggleThemeBtn = document.getElementById("toggleTheme");
const setMetaBtn = document.getElementById("setMeta");
const metaValorInput = document.getElementById("metaValor");

// iniciais
let extratos = JSON.parse(localStorage.getItem("extratos")) || [];
let limiteAviso = Number(localStorage.getItem("limiteAviso")) || 0;
let metaFinanceira = Number(localStorage.getItem("metaFinanceira")) || 0;

// carregamento inicial
carregarResumo();
aplicarTema();

// eventos
depositoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value.trim();
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || !valor || valor <= 0) {
    alert("Preencha descrição e valor válido.");
    return;
  }

  const agora = new Date();
  const data = agora.toLocaleDateString();
  const hora = agora.toLocaleTimeString();

  const extrato = {
    tipoOperacao: "ENTRADA",
    descricao,
    valor,
    tipo,
    data: `${data} às ${hora}`
  };

  extratos.push(extrato);
  localStorage.setItem("extratos", JSON.stringify(extratos));
  carregarResumo();
  depositoForm.reset();
});

// setar meta financeira
setMetaBtn.addEventListener("click", () => {
  const v = Number(metaValorInput.value);
  if (v && v > 0) {
    metaFinanceira = v;
    localStorage.setItem("metaFinanceira", String(metaFinanceira));
    alert(`Meta definida: R$ ${metaFinanceira}`);
    metaValorInput.value = "";
    carregarResumo();
  } else {
    alert("Informe um valor de meta válido.");
  }
});

// ver todos -> abre extrato completo (mostra na mesma página ou nova)
verTodosBtn.addEventListener("click", () => {
  window.location.href = "sistema.html#todos";
  alert("Role para baixo para ver todos os extratos (ou use Extrato no topo).");
});

// navegações -> abrem páginas
btnGrafico.addEventListener("click", () => window.location.href = "grafico.html");
btnPlano.addEventListener("click", () => window.location.href = "png3.html");
btnExtrato.addEventListener("click", () => window.location.href = "sistema.html#todos");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
});

// tema
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  aplicarTema();
});

// aplicar tema salvo
function aplicarTema() {
  const theme = localStorage.getItem("tema") || "dark";
  if (theme === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
}

// atualiza localStorage tema quando usuário troca
document.body.addEventListener("classchange", ()=>{}); // placeholder

// carregar resumo e checar avisos
function carregarResumo() {
  // atualiza extratos rápidos (3 últimos)
  listaExtratos.innerHTML = "";
  const ultimos = [...extratos].slice(-5).reverse();
  ultimos.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div><strong>${item.tipoOperacao}</strong> — ${item.descricao}</div>
        <div class="meta">${item.tipo} • ${item.data}</div>
      </div>
      <div><strong>R$ ${Number(item.valor).toFixed(2)}</strong></div>
    `;
    listaExtratos.appendChild(li);
  });

  // calcula saldo = ganhos - gastos
  let ganhos = 0, gastos = 0;
  extratos.forEach(it => {
    if (it.tipoOperacao === "ENTRADA") ganhos += Number(it.valor);
    else if (it.tipoOperacao === "SAÍDA") gastos += Number(it.valor);
  });
  const saldo = ganhos - gastos;
  saldoTxt.textContent = `Saldo atual: R$ ${saldo.toFixed(2)} (Entradas: R$ ${ganhos.toFixed(2)} • Saídas: R$ ${gastos.toFixed(2)})`;

  // checar limite de aviso
  if (limiteAviso > 0 && saldo <= limiteAviso) {
    avisoLimite.textContent = ` Atenção: Saldo abaixo do limite definido (R$ ${limiteAviso.toFixed(2)})`;
  } else {
    avisoLimite.textContent = "";
  }

  // checar meta
  if (metaFinanceira > 0 && saldo >= metaFinanceira) {
    setTimeout(()=> alert(` Parabéns! Você atingiu sua meta financeira: R$ ${metaFinanceira}`), 200);
  }
}

// atualizar tema salvo quando usuário alterna
document.getElementById("toggleTheme").addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("tema", isLight ? "light" : "dark");
});

// carrega ao abrir
carregarResumo();