//Con una función creamos la estructura principal, creando a parte los div's, títulos y botones.
export function createLists(listId, title){
    let tablero = document.getElementById('tablero');
    let list = createDivs(listId, "list");
    list.insertAdjacentElement("afterbegin", createTitle(title));
    list.insertAdjacentElement("beforeend", createButton(listId+"Button", "add-task", "+ Agregar tarea"));
    list.insertAdjacentElement("beforeend", createButton(listId+"DeleteButton", "remove-task", "- Eliminar tareas"));
    list.insertAdjacentElement("beforeend", createButton(listId+"DeleteListButton", "remove-list", "- Eliminar Lista"));

    tablero.insertAdjacentElement("beforeend", list);

}


//Creamos los divs dado el id y la clase que tienen que llevar como parámetros.
function createDivs(divId, divClass){
    let div = document.createElement('div');
    div.setAttribute('id', divId);
    div.setAttribute('class', divClass);
    return div;
}


//Creamos los títulos de cada sección pasando como parámetro el contenido del texto
function createTitle(titleContent){
    let title = document.createElement('h2');
    title.innerText = titleContent;
    return title;
}


//Creamos los botones pasando por parámetro el id, clase y contenido del mismo.
export function createButton(idButton, classButton, buttonText){
    let button = document.createElement('div');
    button.setAttribute('id', idButton);
    button.setAttribute('class', classButton);
    button.innerText = buttonText;
    return button;
}