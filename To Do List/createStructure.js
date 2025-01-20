//Con una función creamos la estructura principal, creando a parte los div's, títulos y botones.
export function createLists(){
    let tablero = document.getElementById('tablero');
    let todo = createDivs("todo", "list");
    todo.insertAdjacentElement("afterbegin", createTitle("Por Hacer"));
    todo.insertAdjacentElement("beforeend", createButton("todoButton", "add-task", "+ Agregar tarea"));
    todo.insertAdjacentElement("beforeend", createButton("toDoDeleteButton", "remove-task", "- Eliminar tarea"));
    let inProgress = createDivs("in-progress", "list");
    inProgress.insertAdjacentElement("afterbegin", createTitle("En Progreso"));
    inProgress.insertAdjacentElement("beforeend", createButton("inProgressButton", "add-task", "+ Agregar tarea"));
    inProgress.insertAdjacentElement("beforeend", createButton("inProgressDeleteButton", "remove-task", "- Eliminar tarea"));
    let done = createDivs("done", "list");
    done.insertAdjacentElement("afterbegin", createTitle("Hechas"));
    done.insertAdjacentElement("beforeend", createButton("doneButton", "add-task", "+ Agregar tarea"));
    done.insertAdjacentElement("beforeend", createButton("doneDeleteButton", "remove-task", "- Eliminar tarea"));

    tablero.insertAdjacentElement("beforeend", todo);
    tablero.insertAdjacentElement("beforeend", inProgress);
    tablero.insertAdjacentElement("beforeend", done);

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
function createButton(idButton, classButton, buttonText){
    let button = document.createElement('div');
    button.setAttribute('id', idButton);
    button.setAttribute('class', classButton);
    button.innerText = buttonText;
    console.log(idButton, classButton);
    return button;
}