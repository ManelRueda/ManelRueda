const bola = document.getElementById("bola");
const boton = document.getElementById("lanzar");
const numerosContainer = document.getElementById("numeros");
const dineroDiv = document.getElementById("dinero");

let girando = false;
let dinero = 1000;

function actualizarDinero() {
    dineroDiv.innerText = `💰 Dinero: ${dinero}€`;
}

actualizarDinero();

const numeros = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const total = numeros.length;
const centerX = 200;
const centerY = 200;
const radius = 180;

// Números rojos
const numerosRojos = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];

// Colocar números
numeros.forEach((num, i) => {
  const div = document.createElement("div");
  div.classList.add("numero");
  div.innerText = num;
  div.style.color = "white";

  const angle = (i * 360 / total - 90) * Math.PI / 180;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  div.style.transform = `translate(-50%, -50%)`;

  numerosContainer.appendChild(div);
});

// Botones toggle apuestas
const botonesApuesta = document.querySelectorAll('.apuesta');
const apuestasSeleccionadas = {};

botonesApuesta.forEach(btn => {
    btn.addEventListener('click', () => {
        const tipo = btn.dataset.tipo;
        if(apuestasSeleccionadas[tipo]) {
            btn.classList.remove('active');
            delete apuestasSeleccionadas[tipo];
        } else {
            btn.classList.add('active');
            apuestasSeleccionadas[tipo] = true;
        }
    });
});

// Limitar los inputs de apuesta al dinero disponible
const inputs = document.querySelectorAll('.cantidad');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        let val = parseInt(input.value) || 0;
        if(val > dinero) input.value = dinero;
        if(val < 0) input.value = 0;
    });
});

// Giro de la bola
boton.addEventListener("click", () => {
  if (girando) return;
  girando = true;

  let velocidad = Math.random() * 20 + 15;
  let angulo = 0;

  const spin = setInterval(() => {
    angulo += velocidad;
    bola.style.transform = `translateX(-50%) rotate(${angulo}deg)`;
    velocidad *= 0.98;

    if (velocidad < 0.1) {
      clearInterval(spin);
      girando = false;

      const anglePerSlot = 360 / total;
      const offset = 5;
      const adjustedAngle = (angulo + offset + anglePerSlot/2) % 360;
      const slot = Math.floor(adjustedAngle / anglePerSlot);
      const finalAngle = slot * anglePerSlot;

      bola.style.transform = `translateX(-50%) rotate(${finalAngle}deg)`;

      const numeroSalido = numeros[slot % total];

      // Determinar color
      let color = "Negro";
      if (numeroSalido === 0) color = "Verde";
      else if (numerosRojos.includes(numeroSalido)) color = "Rojo";

      // Calcular ganancias
      const contenedores = document.querySelectorAll('.apuesta-contenedor');
      contenedores.forEach(cont => {
          const btn = cont.querySelector('.apuesta');
          const tipo = btn.dataset.tipo;
          let cantidad = parseInt(cont.querySelector('.cantidad').value) || 0;

          // Ajustar si es mayor que dinero disponible
          if(cantidad > dinero) cantidad = dinero;

          if(cantidad <= 0) return;

          let ganado = 0;
          if(tipo === "rojo" && color === "Rojo") ganado = cantidad * 2;
          if(tipo === "negro" && color === "Negro") ganado = cantidad * 2;
          if(tipo === "par" && numeroSalido !== 0 && numeroSalido % 2 === 0) ganado = cantidad * 2;
          if(tipo === "impar" && numeroSalido % 2 === 1) ganado = cantidad * 2;

          dinero += (ganado - cantidad); // sumamos la ganancia neta
      });

      actualizarDinero();
      alert(`🎉 Ha salido el número: ${numeroSalido} (${color})`);
    }
  }, 16);
});
