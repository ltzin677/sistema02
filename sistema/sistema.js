const form = document.getElementById('depositoForm');
const lista = document.getElementById('listaDepositos');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const tipo = document.getElementById('tipo').value;

  if (!descricao || !valor) {
    alert("Preencha todos os campos!");
    return;
  }



  const li = document.createElement('li');
  li.textContent = `${descricao} : R$ ${valor} (${tipo})`;
  lista.appendChild(li);

  let agora = new Date();
let dia = agora.getDate();
let mes = agora.getMonth() + 1; 
let ano = agora.getFullYear();
let dataFormatada = `30${dia}/04${mes}/2025${ano}`;
console.log(dataFormatada);


  li.style.opacity = '0';
  setTimeout(() => li.style.opacity = '1', 100);

  form.reset();
});

