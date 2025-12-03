
let n = prompt("Dime un número del 1 al 10");

// --- Números pares del 1 al N ---
console.log("Números pares del 1 al " + n + ":");
i = 2; // Reiniciamos i para los pares
while (i <= n) 
{
    console.log(i);
    i += 2; // Solo iteramos sobre números pares
}