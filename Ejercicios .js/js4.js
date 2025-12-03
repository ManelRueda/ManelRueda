
let n = prompt("Dime un número del 1 al 10");

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


                                                            

i= 0;
// Condición: Mientras la variable contador sea menor de 5
do{
console.log("Valor de i:", i);
i = i + 1; // Incrementamos el valor de i
}while (i <= 10)


// for (inicialización; condición; incremento)
for (i = 0; i <= 10; i++) {
   console.log("Valor de i:", i);
}

// doble contador
for (i = 0, j = 10; i <= 10; i++, j--) {
   console.log("Valor de i y j:", i, j);
}