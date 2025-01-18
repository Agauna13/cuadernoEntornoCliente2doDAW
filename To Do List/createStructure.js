export function createLists(){
    let tablero = document.getElementById('tablero');

    let toDolist = document.createElement('div');


    let todo = createDivs("list", "todo");
    tablero.insertAdjacentElement("afterbegin", )
    createDivs("list", "in-progress");
    createDivs("list", "done");


}

function createDivs(divId, divClass){
    let div = document.createElement('div');
    div.setAttribute('id', divId);
    div.setAttribute('class', divClass);

    return div;

}

function createTitles(titleContent){

}