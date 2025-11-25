
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
let inicio = parseInt(prompt("Dime el número de inicio del rango:"));
let fin = parseInt(prompt("Dime el número final del rango:"));

console.log("Números primos del " + inicio + " al " + fin + ":");

let num = inicio;

while (num <= fin) 
{
    if (num > 1) 
    { // Los números primos son mayores que 1
        let esPrimo = true;
        let divisor = 2;

        // Solo comprobamos hasta la raíz cuadrada de num
        while (divisor <= Math.sqrt(num)) {
            if (num % divisor === 0) {
                esPrimo = false;
                break;
            }
            divisor++;
        }

        if (esPrimo) {
            console.log(num);
        }
    }
    num++;
}

