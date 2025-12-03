
let n = prompt("Dime un número del 1 al 10");

// --- Suma de todos los números del 1 al N ---
let i = 1;
let suma = 0;
while (i <= n) 
{
    suma += i;
    i++;
}
console.log("Resultado de la suma:", suma);
alert("Resultado de la suma:" + suma);