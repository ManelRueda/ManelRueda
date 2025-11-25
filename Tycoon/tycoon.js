// Variables
let dinero = 0;
let ingresoPorSegundo = 0;
let negociosComprados = 0;
let nivel = 1;
let exp = 0;
let dineroHistorial = [];

// Referencias
const dineroSpan = document.getElementById("dinero");
const ipsSpan = document.getElementById("ips");
const negociosSpan = document.getElementById("negocios");
const nivelSpan = document.getElementById("nivel");
const expSpan = document.getElementById("exp");
const generarBtn = document.getElementById("generar");
const guardarBtn = document.getElementById("guardar");
const itemsContainer = document.querySelector(".items");
const upgradesContainer = document.querySelector(".upgrades-list");
const eventoSpan = document.getElementById("evento");
const misionesList = document.getElementById("misiones");
const clickSound = document.getElementById("clickSound");
const compraSound = document.getElementById("compraSound");

// Negocios
const negocios = [
    {nombre:"Limonada",costo:50,ingreso:5,cantidad:0,progreso:0},
    {nombre:"Juguetes",costo:200,ingreso:20,cantidad:0,progreso:0},
    {nombre:"Videojuegos",costo:500,ingreso:50,cantidad:0,progreso:0},
    {nombre:"Software",costo:2000,ingreso:200,cantidad:0,progreso:0}
];

// Mejoras
const upgrades = [
    {nombre:"Eficiencia +50%",costo:100,multiplicador:1.5,aplicado:false},
    {nombre:"Marketing x2",costo:500,multiplicador:2,aplicado:false},
    {nombre:"Automatización",costo:2000,multiplicador:3,aplicado:false}
];

// Misiones
const misiones = [
    {texto:"Comprar tu primer negocio",completado:false,cond:()=> negociosComprados>=1},
    {texto:"Alcanzar $1000",completado:false,cond:()=> dinero>=1000},
    {texto:"Nivel 5",completado:false,cond:()=> nivel>=5}
];

// Eventos
const eventos = [
    {texto:"Día de bonificación +$50",efecto:()=> dinero+=50},
    {texto:"Gastos inesperados -$30",efecto:()=> dinero=Math.max(0,dinero-30)},
    {texto:"Inversión exitosa +$100",efecto:()=> dinero+=100}
];

// Actualizar pantalla
function actualizarPantalla(){
    dineroSpan.textContent = dinero.toFixed(2);
    ipsSpan.textContent = ingresoPorSegundo.toFixed(2);
    negociosSpan.textContent = negociosComprados;
    nivelSpan.textContent = nivel;
    expSpan.textContent = exp+"/100";
    actualizarMisiones();
}

// Crear negocios
function crearNegocios(){
    itemsContainer.innerHTML = "";
    negocios.forEach((n,i)=>{
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `<span>${n.nombre} ($${n.costo}, +$${n.ingreso}/sec)</span>
                         <button data-index="${i}">Comprar</button>
                         <div class="progress-bar"><div class="progress" id="progress${i}"></div></div>`;
        itemsContainer.appendChild(div);
    });
}

// Crear mejoras
function crearUpgrades(){
    upgradesContainer.innerHTML="";
    upgrades.forEach((u,i)=>{
        const div=document.createElement("div");
        div.classList.add("upgrade");
        div.innerHTML=`<span>${u.nombre} ($${u.costo})</span>
                       <button data-index="${i}" ${u.aplicado?"disabled":""}>Comprar</button>`;
        upgradesContainer.appendChild(div);
    });
}

// Recalcular IPS
function recalcularIPS(){
    ingresoPorSegundo=negocios.reduce((t,n)=>t+n.ingreso*n.cantidad,0);
    upgrades.forEach(u=>{if(u.aplicado) ingresoPorSegundo*=u.multiplicador;});
}

// Misiones
function actualizarMisiones(){
    misionesList.innerHTML="";
    misiones.forEach(m=>{
        if(!m.completado && m.cond()){m.completado=true; alert("¡Misión completada: "+m.texto+"!");}
        const li=document.createElement("li");
        li.textContent=m.texto+(m.completado?" ✅":" ❌");
        misionesList.appendChild(li);
    });
}

// Eventos
generarBtn.addEventListener("click",()=>{
    dinero+=1;
    dineroHistorial.push(dinero);
    clickSound.play();
    exp+=1; if(exp>=100){nivel++;exp=exp-100;}
    actualizarPantalla();
});

guardarBtn.addEventListener("click",()=>{
    localStorage.setItem("tycoonProData",JSON.stringify({dinero,negocios,upgrades,nivel,exp}));
    alert("Progreso guardado!");
});

// Comprar máximo de un negocio
itemsContainer.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON"){
        const idx = e.target.dataset.index;
        const negocio = negocios[idx];

        const maxCantidad = Math.floor(dinero / negocio.costo);
        if(maxCantidad >= 1){
            dinero -= negocio.costo * maxCantidad;
            negocio.cantidad += maxCantidad;
            negociosComprados += maxCantidad;
            recalcularIPS();
            actualizarPantalla();
            compraSound.play();
            alert(`Compraste ${maxCantidad} unidades de ${negocio.nombre}`);
        } else {
            alert("Dinero insuficiente para comprar este negocio");
        }
    }
});

// Comprar upgrade (solo 1 vez)
upgradesContainer.addEventListener("click", e=>{
    if(e.target.tagName==="BUTTON"){
        const idx = e.target.dataset.index;
        const u=upgrades[idx];
        if(!u.aplicado && dinero>=u.costo){
            dinero-=u.costo;
            u.aplicado=true;
            recalcularIPS();
            actualizarPantalla();
            crearUpgrades();
            compraSound.play();
        } else alert("No puedes comprar esta mejora");
    }
});

// Generación automática
setInterval(()=>{
    dinero+=ingresoPorSegundo;
    dineroHistorial.push(dinero);
    exp+=ingresoPorSegundo*0.1;
    if(exp>=100){nivel++; exp=exp-100;}
    actualizarPantalla();
    // Progreso de negocios
    negocios.forEach((n,i)=>{
        if(n.cantidad>0){
            const prog=document.getElementById("progress"+i);
            n.progreso=(n.progreso+0.05*n.cantidad*ingresoPorSegundo/10)%100;
            prog.style.width=n.progreso+"%";
        }
    });
},1000);

// Eventos aleatorios cada 15-25s
setInterval(()=>{
    const evt=eventos[Math.floor(Math.random()*eventos.length)];
    evt.efecto();
    eventoSpan.textContent=evt.texto;
    setTimeout(()=>{eventoSpan.textContent="Ningún evento activo";},5000);
}, Math.random()*10000+15000);

// Gráfico
const ctx=document.getElementById('graficoDinero').getContext('2d');
const grafico=new Chart(ctx,{type:'line',data:{labels:[],datasets:[{label:'Dinero ($)',data:[],borderColor:'rgba(75,192,192,1)',fill:false,tension:0.1}]},options:{responsive:true,animation:false,scales:{x:{display:false},y:{beginAtZero:true}}}});
setInterval(()=>{
    const time=new Date().toLocaleTimeString();
    grafico.data.labels.push(time);
    grafico.data.datasets[0].data.push(dinero.toFixed(2));
    if(grafico.data.labels.length>20){grafico.data.labels.shift();grafico.data.datasets[0].data.shift();}
    grafico.update();
},1000);

// Cargar progreso
window.addEventListener("load",()=>{
    const data=JSON.parse(localStorage.getItem("tycoonProData"));
    if(data){
        dinero=data.dinero||0;
        negocios.forEach((n,i)=>n.cantidad=data.negocios[i].cantidad||0);
        upgrades.forEach((u,i)=>u.aplicado=data.upgrades[i].aplicado||false);
        nivel=data.nivel||1; exp=data.exp||0;
        recalcularIPS();
    }
    actualizarPantalla(); crearNegocios(); crearUpgrades();
});
