

function crearTeclado() {
    //Cojo el div del teclado, para luego ir añadiendo
    let teclado = document.getElementById("teclado");
    
    for (let i = 65; i < 91; i++) {
        //Creo la tecla
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
        tecla.className = "tecla";

        tecla = cambiarFondoTecla(i,tecla);

        //Añado la tecla al teclado
        teclado.appendChild(tecla);
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

crearTeclado();