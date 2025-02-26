function countdown(event) {
    event.preventDefault();
    let s = document.getElementById("segundos").value;
    s = parseInt(s);
    const ventanaEmergente = window.open('ventanaEmergente.html', 'ventanaEmergente', 'width=150, height=150');
    const segundero = setInterval(() => {
        if(s>0){
            ventanaEmergente.document.body.innerHTML = `Quedan ${s} segundos`;
            s--;
            
        }else{
            clearInterval(segundero);
            ventanaEmergente.close();
        }
    }, 1000);
}


function bienvenida(){
    let leftSide = (window.innerWidth - 200) / 2;
    let topSide = (window.innerHeight - 150) / 2;
    const ventanaEmergente = window.open('', 'ventanaEmergente', `width=300, height=200, left=${leftSide}, top=${topSide}`);
    ventanaEmergente.document.write("<h1> Bienvenido!! </h1>");

    const botonAtras = document.getElementById('atras');  //Botón simulado ya que no he encontrado un método para desactivar el botón de atrás o circunvalar eso de ninguna manera. (con window.location o nada por el estilo)
    botonAtras.disabled = true;


    
    const cerrar = setTimeout(()=>{
        ventanaEmergente.close();
        botonAtras.disabled = false;
    }, 3000);
}