                                                    /*
let n = prompt("Dime un número del 1 al 10");

// --- Suma de todos los números del 1 al N ---
let i = 1;
let suma = 0;
while (i <= n) {
    suma += i;
    i++;
}
console.log("Resultado de la suma:", suma);

// --- Números pares del 1 al N ---
console.log("Números pares del 1 al " + n + ":");
i = 2; // Reiniciamos i para los pares
while (i <= n) 
{
    console.log(i);
    i += 2; // Solo iteramos sobre números pares
}

// --- Triángulo ---

console.log("Triángulo de altura " + n + ":");
let fila = 1;
while (fila <= n) 
{
    let linea = "";
    let estrella = 1;
    while (estrella <= fila) {
        linea += "*";
        estrella++;
    }
    console.log(linea);
    fila++;
}
while (fila <= n) 
{
    let linea = "";
    let estrella = 1;
    while (estrella <= fila) {
        linea += "*";
        estrella++;
    }
    console.log(linea);
    fila++;
}


                                                            /*

i= 0;
// Condición: Mientras la variable contador sea menor de 5
do{
console.log("Valor de i:", i);
i = i + 1; // Incrementamos el valor de i
}while (i <= 10)

                                                            */

                                                            /*

// for (inicialización; condición; incremento)
for (i = 0; i <= 10; i++) {
   console.log("Valor de i:", i);
}

// doble contador
for (i = 0, j = 10; i <= 10; i++, j--) {
   console.log("Valor de i y j:", i, j);
}

                                                            */

// Pedimos al usuario el rango
                                                            /*
let inicio = prompt("Dime el número de inicio del rango:");
let fin = prompt("Dime el número final del rango:");

console.log("Números primos del " + inicio + " al " + fin + ":");

while (inicio <= fin) 
{
    if (inicio > 1) 
    { 
        let esPrimo = true;
        let divisor = 2;

        
        while (divisor <= Math.sqrt(inicio))
        {
            if (inicio % divisor === 0) 
            {
                esPrimo = false;
                break;
            }
            divisor++;
        }

        if (esPrimo) {
            console.log(inicio);
        }
    }
    inicio++;
}

let adivinar= prompt("Adivina el numero secreto")

function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
*/


/*
let inicio = prompt("Dime el número de inicio del rango:");
let fin = prompt("Dime el número final del rango:");

if(inicio>0 && fin>inicio)
{
    for(let posiblePrimo = inicio; posiblePrimo<=fin; posiblePrimo++)
        {
            let esPrimo=0
            for(let num=1; num<=posiblePrimo;num++)
                {
                    if(posiblePrimo%num==0)
                        {
                            esPrimo++
                        }
                }
            if(esPrimo==4)
                {
                    console.log(posiblePrimo);
                }
        }

}

else 
{ 
    console.error("El rango es erroneo")
}

*/

// Generamos un número aleatorio entre 1 y 100
// Generamos un número secreto aleatorio entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Para depuración, podemos mostrar el número secreto en la consola
console.log("Número secreto (para depuración):", numeroSecreto);

let intento = 0;

alert("¡Bienvenido al juego de adivinar el número!");
while (intento !== numeroSecreto) 
{
    intento = (prompt("Introduce un número entre 1 y 100:"));
    
    
    if (intento < 1 || intento > 100) 
    {
        console.log("Número inválido, intenta de nuevo.");
        continue;
    }


    if (intento > numeroSecreto) 
    {
        alert("Mas pequeño");
    } 
    else if (intento < numeroSecreto) 
    {
        alert("Mas grande");
    } 
    else 
    {
        console.log(`¡Felicidades! Has acertado el número ${numeroSecreto}`);
        break;
    }
}
alert("Has hacertado en "+ intento + "intentos");
