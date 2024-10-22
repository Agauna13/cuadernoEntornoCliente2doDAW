function agrupa(){
    document.getElementById('agrupamiento').innerHTML = 5+(6*3);
}


function accederApropiedad(propiedad){
    let alumno = {
        edad: 35,
        altura: 1.8,
        
    }
    
    if(propiedad == 1){
        document.getElementById('edad').innerHTML= "El alumno Tiene " + alumno.edad + " años.";
    }else if(propiedad == 2){
        document.getElementById('altura').innerHTML= "El alumno mide " + alumno['altura'] + "m.";
    }



}
