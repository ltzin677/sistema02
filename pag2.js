// pag2.js
if (localStorage.getItem("logado") !== "sim") {
  window.location.href = "login.html";
}

const saqueForm = document.getElementById("saqueForm");

saqueForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricaoSaque").value.trim();
  const valor = Number(document.getElementById("valorSaque").value);
  const tipo = document.getElementById("tipoSaque").value;

  if (!descricao || !valor || valor <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const agora = new Date();
  const data = agora.toLocaleDateString();
  const hora = agora.toLocaleTimeString();

  const extrato = {
    tipoOperacao: "SAÍDA",
    descricao,
    valor,
    tipo,
    data: `${data} às ${hora}`
  };

  const extratos = JSON.parse(localStorage.getItem("extratos")) || [];
  extratos.push(extrato);
  localStorage.setItem("extratos", JSON.stringify(extratos));

  alert("Saque registrado com sucesso!");
  window.location.href = "sistema.html";
});

