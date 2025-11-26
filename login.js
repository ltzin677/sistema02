// login.js
document.getElementById('btnEntrar').addEventListener('click', entrar);

function entrar(){
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('senha').value.trim();

  if(user === 'admin' && pass === '1234'){
    localStorage.setItem('logado', 'sim');
    // inicializa arrays se não existirem
    if(!localStorage.getItem('extratos')) localStorage.setItem('extratos', JSON.stringify([]));
    if(!localStorage.getItem('meta')) localStorage.setItem('meta', JSON.stringify({valor:0}));
    window.location.href = 'sistema.html';
  } else {
    alert('Usuário ou senha incorretos!');
  }
}