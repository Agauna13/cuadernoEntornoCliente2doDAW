//1 página DOM navigation

let div = document.querySelector('div'); //o document.body.firstElementChild('div');

let ul = document.querySelector('ul');

let ultimoLi = ul.lastElementChild;



//2 página DOM navigation

//1ra pregunta es verdadera, porque no tiene más hermanos el ultimo elemento de un contenedor
//2da pregunta es falsa porque podemos tener un nodo de texto como salto de linea


//3 pág DOM navigation
let row = document.querySelectorAll('tr');
let table = document.querySelector('table');
console.log(row.length);
console.log(table.rows[0].cells.length);


/*for (let i = 0; i < row.length; i++) {
    //let tdata = row[i].children;
    let currentRow = table.rows[i];

    currentRow.cells[i].style.backgroundColor = 'red';
    currentRow.cells[row.length - 1 - i].style.backgroundColor = 'red';


    //tdata[i].style.background = "red";
    //tdata[tdata.length - 1 - i].style.background = "blue";

}*/

/*for (let i = 0; i < row.length; i++) {
    //let tdata = row[i].children;
    let currentRow = table.rows[i];
    currentRow.cells[i].style.backgroundColor = 'red';
    for (let j = 0; 0< currentRow.cells.length; j++) {
        table.rows[j].cells[i].style.backgroundColor = "green";
    }    //tdata[i].style.background = "red";
    //tdata[tdata.length - 1 - i].style.background = "blue";

}*/
for(let i = 0, j = row.length -1; i<row.length; i++, j--){
    table.rows[j].cells[i].style.backgroundColor = "green";
}


for(let i = row.length - 1, j = 0; i>=0; i--, j++){
    table.rows[j].cells[i].style.backgroundColor = "blue";
}

for(let i = 0, j = 0; i<row.length; i++, j++){
    table.rows[j].cells[i].style.backgroundColor = "blue";
}
/*for(let j = 0; j<tdata.length; j++){
        if(j === i){
            tdata[j].style.background = "red";
        }
    }
    for(let k = tdata.length; k>=0; k--){
        let inv = i-k;
        tdata[inv].style.background = "blue";
    
    }*/