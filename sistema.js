// sistema.js
// Verifica login
if(localStorage.getItem('logado') !== 'sim'){
  window.location.href = 'login.html';
}

// Utilidades
function formatMoney(v){
  return Number(v).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function agoraFormat(){
  const d = new Date();
  return d.toLocaleDateString() + ' às ' + d.toLocaleTimeString();
}

// Carrega extratos e meta
let extratos = JSON.parse(localStorage.getItem('extratos')) || [];
let meta = JSON.parse(localStorage.getItem('meta')) || {valor:0};

// DOM
const listaExtratos = document.getElementById('listaExtratos');
const depositoForm = document.getElementById('depositoForm');
const metaValor = document.getElementById('metaValor');
const salvarMeta = document.getElementById('salvarMeta');
const metaInfo = document.getElementById('metaInfo');
const limparExtratos = document.getElementById('limparExtratos');

// Mostrar meta atual
function atualizarMetaInfo(){
  metaInfo.textContent = `Meta atual: R$ ${formatMoney(meta.valor || 0)}`;
  // Aviso de limite: se saldo total >= meta -> mensagem
  const saldoTotal = extratos.reduce((s, x) => s + (x.tipoOperacao === 'ENTRADA' ? Number(x.valor) : -Number(x.valor)), 0);
  if(meta.valor > 0 && saldoTotal >= meta.valor){
    alert('🎉 Parabéns! Você atingiu sua meta financeira.');
  }
}

// Renderizar extratos
function renderExtratos(){
  listaExtratos.innerHTML = '';
  extratos.slice().reverse().forEach((item, idx)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${item.tipoOperacao} • ${item.tipo}</strong><br>
        ${item.descricao} • R$ ${formatMoney(item.valor)}<br>
        <span class="meta">${item.data}</span>
      </div>
      <div>
        <button class="btnRem" data-index="${extratos.length - 1 - idx}">Excluir</button>
      </div>
    `;
    listaExtratos.appendChild(li);
  });

  // botoes excluir
  document.querySelectorAll('.btnRem').forEach(b=>{
    b.addEventListener('click', ()=> {
      const i = Number(b.dataset.index);
      extratos.splice(i,1);
      localStorage.setItem('extratos', JSON.stringify(extratos));
      renderExtratos();
    });
  });
}

// Submeter depósito (entrada)
depositoForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const desc = document.getElementById('descEntrada').value.trim();
  const valor = document.getElementById('valorEntrada').value.trim();
  const tipo = document.getElementById('tipoEntrada').value;

  if(!desc || !valor || Number(valor) <= 0){
    alert('Preencha a descrição e valor válido.');
    return;
  }

  const extrato = {
    tipoOperacao: 'ENTRADA',
    descricao: desc,
    valor: Number(valor),
    tipo: tipo,
    data: agoraFormat()
  };

  extratos.push(extrato);
  localStorage.setItem('extratos', JSON.stringify(extratos));

  // atualiza arrays para gráfico
  atualizarDadosGrafico(extrato);

  renderExtratos();
  depositoForm.reset();
  atualizarMetaInfo();
});

// Salvar meta
salvarMeta.addEventListener('click', ()=>{
  const v = Number(metaValor.value || 0);
  if(v <= 0){
    alert('Defina um valor de meta maior que zero.');
    return;
  }
  meta.valor = v;
  localStorage.setItem('meta', JSON.stringify(meta));
  metaValor.value = '';
  atualizarMetaInfo();
  alert('Meta salva com sucesso!');
});

// Limpar extratos
limparExtratos.addEventListener('click', ()=>{
  if(confirm('Deseja realmente limpar todos os extratos?')){
    extratos = [];
    localStorage.setItem('extratos', JSON.stringify(extratos));
    localStorage.removeItem('ganhos');
    localStorage.removeItem('gastos');
    localStorage.removeItem('datas');
    renderExtratos();
  }
});

// Logout e navegação
document.getElementById('btnLogout').addEventListener('click', ()=>{
  localStorage.removeItem('logado');
  window.location.href = 'login.html';
});
document.getElementById('btnSaque').addEventListener('click', ()=> window.location.href = 'saque.html');
document.getElementById('btnGrafico').addEventListener('click', ()=> window.location.href = 'grafico.html');

// Tema claro/escuro
const temaToggle = document.getElementById('temaToggle');
temaToggle.addEventListener('click', ()=>{
  if(document.documentElement.dataset.theme === 'light'){
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme','light');
    localStorage.setItem('theme','light');
  }
});

// Aplica tema salvo
if(localStorage.getItem('theme') === 'light'){
  document.documentElement.setAttribute('data-theme','light');
}

// Função para atualizar dados do gráfico em localStorage
function atualizarDadosGrafico(extrato){
  // vamos manter arrays paralelos: datas, ganhos, gastos (adicionando novo ponto)
  const datas = JSON.parse(localStorage.getItem('datas')) || [];
  const ganhos = JSON.parse(localStorage.getItem('ganhos')) || [];
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];

  const dataLabel = new Date().toLocaleString();
  datas.push(dataLabel);
  if(extrato.tipoOperacao === 'ENTRADA'){
    ganhos.push(Number(extrato.valor));
    gastos.push(0);
  } else {
    ganhos.push(0);
    gastos.push(Number(extrato.valor));
  }
  localStorage.setItem('datas', JSON.stringify(datas));
  localStorage.setItem('ganhos', JSON.stringify(ganhos));
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

// Inicialização
renderExtratos();
atualizarMetaInfo();