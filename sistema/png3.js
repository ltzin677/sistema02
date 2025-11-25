// Destaque nos checkboxes
document.querySelectorAll(".option").forEach((checkbox) =>{
    checkbox.addEventListener("change", (e) => {
        const li = e.target.closest("li");
        if (e. target.checked){
            li.style.background = "#ffd6d6";
            li.style.border = "2px solid #B22222";
        }
    });
});

//confimação ao clicar no botão 
document.getElementById("confirmar").addEventListener("click", () =>{
    const conta = document.getElementById("conta").value.trim.trim();
    const opcao = document.getElementById("opcao").value.trim();

    if(conta === "")
        alert("Por favor, informe a corta bancária para transfência");
        return;
    }

    alert( retirada confirmada!\n\nConta: ${conta}\nOpcao)
})