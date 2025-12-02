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
