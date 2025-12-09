let teclado = document.getElementById("teclado");


for (let i = 1; i < 10; i++) 
{
    
    let tecla = document.createElement("div");
    tecla.innerHTML = "<p>"+i+"</p>";
    tecla.className = "tecla";

    teclado.appendChild(tecla);
}



