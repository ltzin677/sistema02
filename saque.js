

// saque.js
if(localStorage.getItem('logado') !== 'sim') window.location.href = 'login.html';

const saqueForm = document.getElementById('saqueForm');

saqueForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const desc = document.getElementById('descSaque').value.trim();
  const valor = document.getElementById('valorSaque').value.trim();
  const tipo = document.getElementById('tipoSaque').value;

  if(!desc || !valor || Number(valor) <= 0){
    alert('Preencha a descrição e valor válido.');
    return;
  }

  const extratos = JSON.parse(localStorage.getItem('extratos')) || [];
  const item = {
    tipoOperacao:'SAÍDA',
    descricao: desc,
    valor: Number(valor),
    tipo: tipo,
    data: new Date().toLocaleDateString() + ' às ' + new Date().toLocaleTimeString()
  };

  extratos.push(item);
  localStorage.setItem('extratos', JSON.stringify(extratos));

  // atualiza arrays do gráfico
  const datas = JSON.parse(localStorage.getItem('datas')) || [];
  const ganhos = JSON.parse(localStorage.getItem('ganhos')) || [];
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];

  datas.push(new Date().toLocaleString());
  ganhos.push(0);
  gastos.push(Number(valor));

  localStorage.setItem('datas', JSON.stringify(datas));
  localStorage.setItem('ganhos', JSON.stringify(ganhos));
  localStorage.setItem('gastos', JSON.stringify(gastos));

  alert('Saque registrado!');
  window.location.href = 'sistema.html';
});