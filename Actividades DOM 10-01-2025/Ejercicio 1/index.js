const lista = document.getElementById("lista");


const botonInsertar = document.getElementById("insertar");

const botonBorrarPrimerLi = document.getElementById("borrarPrimero");
const botonBorrarUltimoLi = document.getElementById("borrarUltimo");

botonInsertar.addEventListener("click" , (event)=>{
    let contenido = prompt("inserte contenido para el nuevo elemento de la lista");
    createLi(contenido);
});

botonBorrarPrimerLi.addEventListener("click", (event)=>{
    borrarLi(true);
});

botonBorrarUltimoLi.addEventListener("click", (event)=>{
    borrarLi(false);
});

function  createLi(contenido){
    var elementoLista = document.createElement("li");

    elementoLista.innerHTML = contenido;

    lista.insertAdjacentElement('beforeend', elementoLista);
}

function borrarLi(cual){
    const elementoBorrar = cual ?  lista.firstElementChild : lista.lastElementChild;
    elementoBorrar.remove();

}