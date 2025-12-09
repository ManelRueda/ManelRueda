let titulo = document.getElementById("titulo");
titulo.textContent = "Titulo actualizado"

let parrafo = document.getElementById("parrafo");
parrafo.textContent = "Texto actualizado"

let mascota = document.getElementById("mascota");
mascota.src="Captura de pantalla 2025-12-09 a les 18.32.27.png"
mascota.alt="Basura"


let newArticle = document.createElement("article");
newArticle.innerHTML="<h3> Titulo del articulo </h3> <p> parrafo del articulo </p>"
document.getElementById("main").appendChild(newArticle);


let newParagraf = document.createElement("parrafo");
newParagraf.innerHTML="<p>Este es el nuevo parrafo </p>"
document.getElementById("contenedor").appendChild(newParagraf);