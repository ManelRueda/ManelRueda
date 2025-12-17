

let palabra = "";
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0]; // La API devuelve un array, ej: ["perro"]

            palabra = palabra.toUpperCase();
            console.log("Tu palabra secreta es:", palabra);

        });

}

function crearTeclado() {
    //Cojo el div del teclado, para luego ir añadiendo
    let teclado = document.getElementById("teclado");

    for (let i = 65; i < 91; i++) {
        //Creo la tecla con la letra
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
        tecla.className = "teclaLetra";
        tecla.setAttribute("onclick", "escribeTecla('" + String.fromCharCode(i) + "')");
        //Añado la tecla al teclado
        teclado.appendChild(tecla);
    }
    /*
        for (let i = 0; i < 10; i++) {
            //Creo la tecla con el numero
            let tecla = document.createElement("div");
            tecla.innerHTML = "<p>" + i + "</p>";
            tecla.className = "teclaNumero";
            tecla.setAttribute("onclick", "escribeTecla('" + i + "')");
            //Añado la tecla al teclado
            teclado.appendChild(tecla);
        }
            */
    palabraSecreta();
}

function escribeTecla(letra) {
    console.log(letra);
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length < 5) {
        miTexto.textContent += letra;
    }
}

function borrarLetra() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length > 0) {
        miTexto.textContent = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
        miTexto.style.color = "black";
        miTexto.style.background = "white";
    }
}

function comprobar() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent === palabra) {
        miTexto.style.background = "LightGreen";
        alert("¡Has acertado la palabra secreta: " + palabra + "!");
    } else {
        miTexto.style.background = "Salmon";
        alert("Palabra incorrecta. Inténtalo de nuevo.");
    }
}

function crearMatriz() {
    //Cojo el div del teclado, para luego ir añadiendo
    let matrizDiv = document.getElementById("matrizDiv");

    for (let i = 65; i < 91; i++) {
        //Creo la tecla con la letra
        const matriz = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
            [26, 27, 28, 29, 30]
        ];
        let fila = document.createElement("div");
        fila.className = "filaMatriz";
        for (let j = 0; j < matriz[i - 65].length; j++) {
            let celda = document.createElement("div");
            celda.className = "celdaMatriz";
            celda.textContent = matriz[i - 65][j];
            fila.appendChild(celda);
        }
        matrizDiv.appendChild(fila);
    }
}

crearTeclado();
crearMatriz();