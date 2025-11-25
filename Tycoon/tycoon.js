// Variables principales
let dinero = 0;
let ingresoPorSegundo = 0;
let negociosComprados = 0;
let nivel = 1;
let dineroHistorial = [];

// Referencias al DOM
const dineroSpan = document.getElementById("dinero");
const ipsSpan = document.getElementById("ips");
const negociosSpan = document.getElementById("negocios");
const nivelSpan = document.getElementById("nivel");
const generarBtn = document.getElementById("generar");
const guardarBtn = document.getElementById("guardar");
const itemsContainer = document.querySelector(".items");
const upgradesContainer = document.querySelector(".upgrades-list");
const eventoSpan = document.getElementById("evento");

// Negocios disponibles
const negocios = [
    { nombre: "Máquina de limonada", costo: 50, ingreso: 5, cantidad: 0 },
    { nombre: "Fábrica de juguetes", costo: 200, ingreso: 20, cantidad: 0 },
    { nombre: "Tienda de videojuegos", costo: 500, ingreso: 50, cantidad: 0 },
    { nombre: "Empresa de software", costo: 2000, ingreso: 200, cantidad: 0 }
];

// Mejoras disponibles
const upgrades = [
    { nombre: "Eficiencia +50%", costo: 100, multiplicador: 1.5, aplicado: false },
    { nombre: "Marketing avanzado x2", costo: 500, multiplicador: 2, aplicado: false },
    { nombre: "Automatización total", costo: 2000, multiplicador: 3, aplicado: false }
];

// Eventos aleatorios
const eventos = [
    { texto: "Día de bonificación: +$50!", efecto: () => dinero += 50 },
    { texto: "Gastos inesperados: -$30", efecto: () => dinero = Math.max(0, dinero - 30) },
    { texto: "Inversión exitosa: +$100", efecto: () => dinero += 100 }
];

// Función para actualizar pantalla
function actualizarPantalla() {
    dineroSpan.textContent = dinero.toFixed(2);
    ipsSpan.textContent = ingresoPorSegundo.toFixed(2);
    negociosSpan.textContent = negociosComprados;
    nivelSpan.textContent = nivel;
}

// Crear botones de negocios
function crearNegocios() {
    itemsContainer.innerHTML = "";
    negocios.forEach((negocio, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <span>${negocio.nombre} ($${negocio.costo}, +$${negocio.ingreso}/sec)</span>
            <button data-index="${index}">Comprar</button>
        `;
        itemsContainer.appendChild(div);
    });
}

// Crear botones de mejoras
function crearUpgrades() {
    upgradesContainer.innerHTML = "";
    upgrades.forEach((upg, index) => {
        const div = document.createElement("div");
        div.classList.add("upgrade");
        div.innerHTML = `
            <span>${upg.nombre} ($${upg.costo})</span>
            <button data-index="${index}" ${upg.aplicado ? "disabled" : ""}>Comprar</button>
        `;
        upgradesContainer.appendChild(div);
    });
}

// Recalcular IPS
function recalcularIPS() {
    ingresoPorSegundo = negocios.reduce((total, negocio) => total + negocio.ingreso * negocio.cantidad, 0);
    upgrades.forEach(upg => { if(upg.aplicado) ingresoPorSegundo *= upg.multiplicador; });
}

// Eventos de click
generarBtn.addEventListener("click", () => {
    dinero += 1;
    dineroHistorial.push(dinero);
    actualizarPantalla();
});

guardarBtn.addEventListener("click", () => {
    localStorage.setItem("tycoonUltraData", JSON.stringify({ dinero, negocios, upgrades, nivel }));
    alert("Progreso guardado!");
});

itemsContainer.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index;
        const negocio = negocios[index];
        if(dinero >= negocio.costo) {
            dinero -= negocio.costo;
            negocio.cantidad += 1;
            negociosComprados += 1;
            recalcularIPS();
            actualizarPantalla();
        } else alert("Dinero insuficiente.");
    }
});

upgradesContainer.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index;
        const upg = upgrades[index];
        if(!upg.aplicado && dinero >= upg.costo) {
            dinero -= upg.costo;
            upg.aplicado = true;
            recalcularIPS();
            actualizarPantalla();
            crearUpgrades();
        } else alert("No puedes comprar esta mejora.");
    }
});

// Generación automática de dinero
setInterval(() => {
    dinero += ingresoPorSegundo;
    dineroHistorial.push(dinero);
    actualizarPantalla();
}, 1000);

// Eventos aleatorios cada 10-20s
setInterval(() => {
    const evt = eventos[Math.floor(Math.random() * eventos.length)];
    evt.efecto();
    eventoSpan.textContent = evt.texto;
    setTimeout(() => { eventoSpan.textContent = "Ningún evento activo"; }, 5000);
}, Math.random() * 10000 + 10000);

// Nivelación cada 1000$ ganados
setInterval(() => {
    nivel = Math.floor(dinero / 1000) + 1;
    actualizarPantalla();
}, 1000);

// Gráfico de dinero usando Chart.js
const ctx = document.getElementById('graficoDinero').getContext('2d');
const grafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dinero ($)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: { display: false },
            y: { beginAtZero: true }
        }
    }
});

// Actualizar gráfico cada segundo
setInterval(() => {
    const time = new Date().toLocaleTimeString();
    grafico.data.labels.push(time);
    grafico.data.datasets[0].data.push(dinero.toFixed(2));
    if(grafico.data.labels.length > 20){
        grafico.data.labels.shift();
        grafico.data.datasets[0].data.shift();
    }
    grafico.update();
}, 1000);

// Cargar progreso si existe
window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("tycoonUltraData"));
    if(data){
        dinero = data.dinero || 0;
        negocios.forEach((n,i) => n.cantidad = data.negocios[i].cantidad || 0);
        upgrades.forEach((u,i) => u.aplicado = data.upgrades[i].aplicado || false);
        nivel = data.nivel || 1;
        recalcularIPS();
    }
    actualizarPantalla();
    crearNegocios();
    crearUpgrades();
});
