

let palabra = "";
function palabraSecreta() {
   fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
       .then(response => response.json())
       .then(data => {
           palabra = data[0]; // La API devuelve un array, ej: ["perro"]
          
           palabra=palabra.toUpperCase();
           console.log("Tu palabra secreta es:", palabra);

       });

}

function crearTeclado() {
    //Cojo el div del teclado, para luego ir añadiendo
    let teclado = document.getElementById("teclado");

    for (let i = 65; i < 91; i++) {
        //Creo la tecla
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
        tecla.className = "tecla";

        tecla = cambiarFondoTecla(i, tecla);

        tecla.setAttribute("onclick", "escribeTecla('" + String.fromCharCode(i) + "')");

        //Añado la tecla al teclado
        teclado.appendChild(tecla);


    }

    for (let i = 0; i < 10; i++) {
        //Creo la tecla
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + i + "</p>";
        tecla.className = "tecla";

        tecla = cambiarFondoTecla(i, tecla);

        tecla.setAttribute("onclick", "escribeTecla('" + i + "')");

        //Añado la tecla al teclado
        teclado.appendChild(tecla);
    }

    let borrar = document.querySelector(".borrarLettra");
    if (borrar) {
        borrar.addEventListener("click", borrarLetra);
    }

    palabraSecreta();
}

function escribeTecla(letra) {
    console.log(letra);
    let miTexto = document.getElementById("miTexto");

    if (miTexto.textContent.length < 5) {
        miTexto.textContent += letra;
        
    }
    else {
        miTexto.style.color = "red";
    }
}

function borrarLetra() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length > 0) {
        miTexto.textContent = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
        miTexto.style.color = "black";
    }
}

function esPrimo(num) {
    if (num < 2) return false;        // 0 y 1 no son primos
    let limite = Math.sqrt(num);      // optimización

    for (let i = 2; i <= limite; i++) {
        if (num % i === 0) {
            return false;             // si es divisible, no es primo
        }
    }
    return true;                       // si no tuvo divisores, es primo
}

function cambiarFondoTecla(i, tecla) {
    if ((i % 2) == 0) {
        //poner fondo azul
        tecla.style.background = "blue";
        tecla.style.color = "white";
    }
    if ((i % 5) == 0) {
        //poner fondo amarillo
        tecla.style.background = "yellow";

    }
    if ((i % 3) == 0) {
        //poner fondo rojo
        tecla.style.background = "red";
        tecla.style.color = "white";
    }
    if ((i % 10) == 0) {
        //poner fondo naranja
        tecla.style.background = "orange";

    }
    if (esPrimo(i)) {
        //poner fondo verde
        tecla.style.background = "green";
        tecla.style.color = "white";
    }

    return tecla;
}

function comprobar() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent === palabra) {
        miTexto.style.background = "green";
        alert("¡Has acertado la palabra secreta: " + palabra + "!");
    } else {
        miTexto.style.background = "red";
        alert("Palabra incorrecta. Inténtalo de nuevo.");
    }
}

crearTeclado();