/*1. Temporizador con alerta

Crear una función llamada temporizadorAlerta que tome un número entero segundos como argumento.
La función debe mostrar una alerta con el mensaje "Tiempo completado" después de los segundos especificados.
Mientras el temporizador esté corriendo, el título de la página (usando document.title) debe actualizarse cada segundo con el tiempo restante en formato Restan: X segundos. Al completarse el temporizador, restablecer el título original de la página.*/


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

    const botonAtras = document.getElementById('atras');
    botonAtras.disabled = true;

    
    const cerrar = setTimeout(()=>{
        ventanaEmergente.close();
        botonAtras.disabled = false;
    }, 3000);
}