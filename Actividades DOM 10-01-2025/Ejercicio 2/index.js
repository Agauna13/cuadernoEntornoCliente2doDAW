const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");

const pass = document.getElementById("password");

const textArea = document.getElementById("createTextarea");

const label = document.getElementById("createLabel");

const img = document.getElementById("createImg");

const checkBox = document.getElementById("createCheckBox");

const radio = document.getElementById("createRadio");

const submit = document.getElementById("createSubmit");


nombre.addEventListener("click", ()=>{
    const nombreElemento = prompt("introduzca el nombre para su input");

    let elemento = crearElemento("name", nombreElemento, "input");


    formulario.insertAdjacentElement("beforeend", elemento);
});

pass.addEventListener("click", ()=>{
    const nombreElemento = prompt("introduzca el nombre para su input");

    let elemento = crearElemento("name", nombreElemento, "input");

    elemento.setAttribute("type", "password");

    formulario.insertAdjacentElement("beforeend", elemento);
});

textArea.addEventListener("click", ()=>{
    const nombreElemento = prompt("introduzca el nombre para su textArea");

    let elemento = crearElemento("name", nombreElemento, "textarea");

    elemento.setAttribute("cols", 40);
    elemento.setAttribute("rows", 40);

    formulario.insertAdjacentElement("beforeend", elemento);
});

label.addEventListener("click", ()=>{
    const elementoReferido = prompt("a qué input va referido?");

    let elemento = crearElemento("for", elementoReferido , "label");

    let referido = document.querySelector('[name="' + elementoReferido + '"]');

    elemento.innerHTML = "hola";

    referido.insertAdjacentElement("beforebegin", elemento);
})

img.addEventListener("click", ()=>{
    const ruta = prompt("Inserte la ruta a la imagen");

    let elemento = crearElemento("src", ruta , "img");


    formulario.insertAdjacentElement("beforeend", elemento);
});

checkBox.addEventListener("click", () => {
    let nombre = prompt("Nombre del checkbox?");
    let correcto = false;

    let valor;
    while (!correcto) {
        valor = prompt("Valor por defecto? (1 o 0)");
        if (valor == 1 || valor == 0) {
            correcto = true;
        }
    }

    let checkbox = crearElemento("type", "checkbox", "input");

    checkbox.checked = (valor == 1);

    let label = crearElemento("for", "nombre", "label");
    label.innerHTML = nombre;

    formulario.insertAdjacentElement("beforeend", label);
    formulario.insertAdjacentElement("beforeend", checkbox);
});

radio.addEventListener("click", () => {
    let nombre = prompt("Nombre del grupo de botones radiales?");
    let cantidad = prompt("cuantos botones desea crear?");

    for(let i = 1; i<= cantidad; i++){
        let valorRadio = prompt("Indique un valor para el botón número " + i);
        let radial = crearElemento("type", "radio", "input");
        let id = "radio-" + Math.random().toString(36).substring(7);
        radial.setAttribute("value", valorRadio);
        radial.setAttribute("name", "radio");
        let label = crearElemento("for", id, "label");
        label.innerHTML = valorRadio;
        formulario.insertAdjacentElement("beforeend", label);
        formulario.insertAdjacentElement("beforeend", radial);

    }
    
});

submit.addEventListener("click", () => {
    let nombre = prompt("Nombre del botón submit?");
    let valor = prompt("Valor del botón submit?");
    
    let botonSubmit = crearElemento("name", nombre, "button");
    
    botonSubmit.setAttribute("value", valor);
    botonSubmit.setAttribute("type", "submit");
    
    botonSubmit.innerHTML = valor;
    
    formulario.insertAdjacentElement("beforeend", botonSubmit);
});






function crearElemento(atributo, valor, elemento){
    let result = document.createElement(elemento);

    result.setAttribute(atributo, valor);

    return result;
}