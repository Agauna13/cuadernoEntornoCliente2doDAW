/*Ejercicio 1 :Escribir un programa que pregunte al usuario por el número de horas trabajadas y el coste por hora. Después debe mostrar por pantalla la paga que le corresponde. */

function calcSalario(){
    let horas = document.getElementById('horasTrabajadas').value;
    let precio = document.getElementById('precioPorHora').value;


    /*let salario = */document.getElementById('salario').innerHTML = horas*= precio; /*Utilizando el Operador de multiplicación y asignación */
}


/*Ejercicio 2  Escribir un programa que pida al usuario su peso (en kg) y estatura (en metros), calcule el índice de masa corporal y lo almacene en una variable, y muestre por pantalla la frase Tu índice de masa corporal es <imc> donde <imc> es el índice de masa corporal calculado redondeado con dos decimales.*/

function calcIMC(){
    let peso = document.getElementById('peso').value;
    let altura = document.getElementById('altura').value;

    document.getElementById('imc').innerHTML = peso/(altura ** 2); /*Utilizando el Operador de exponenciación y asignación */
}


/*Ejercicio 3 Escribir un programa que pida al usuario dos números enteros y muestre por pantalla: La división resultante de dividir <n> entre <m> da un cociente <c> y un resto <r> donde <n> y <m> son los números introducidos por el usuario, y <c> y <r> son el cociente y el resto de la división entera respectivamente.*/

function dividide(){
    let a = document.getElementById('numA').value;
    let b = document.getElementById('numB').value;

    document.getElementById('dividision').innerHTML = "La división resultante de dividir "+ a + " entre " + b + " da un cociente " + (Math.trunc(a/b)) +" y un resto " + (1/b);
}

/*Ejercicio 4 Escribir un programa que pregunte al usuario una cantidad a invertir, el interés anual y el número de años, y muestre por pantalla el capital obtenido en la inversión.*/

function invierte(){
    let inv = document.getElementById('inversion').value;
    let intr = document.getElementById('interesAnual').value;
    let años = document.getElementById('tiempoEnAños').value;

    inv = Number(inv);
    intr = Number(intr);
    años = Number(años);
    let resultado = inversion(inv, intr, años);

    document.getElementById('ganancias').innerHTML = "Si realiza la inversión ganará " + resultado;

    function inversion(inv, intr, años){
        let dinero = inv;
    
        for(let i = 0; i <= años; i++){
            dinero += (dinero *= intr);
        }
    
        return dinero;
    }
}


/*Ejercicio 5 Una juguetería tiene mucho éxito en dos de sus productos: payasos y muñecas. Suele hacer venta por correo y la empresa de logística les cobra por peso de cada paquete así que deben calcular el peso de los payasos y muñecas que saldrán en cada paquete a demanda. Cada payaso pesa 112 g y cada muñeca 75 g. Escribir un programa que lea el número de payasos y muñecas vendidos en el último pedido y calcule el peso total del paquete que será enviado.*/

function payasos(){
    let a = document.getElementById('muñecas').value;
    let b = document.getElementById('payasos').value;

    document.getElementById('pesoPayaso').innerHTML = "El peso total del pedido es " + ((a*=0.75) + (b*=125)) + "gramos";
}


/*Ejercicio 6: Una panadería vende barras de pan a 3.49€ cada una. El pan que no es el día tiene un descuento del 60%. Escribir un programa que comience leyendo el número de barras vendidas que no son del día y el total de barras vendidas. Después el programa debe mostrar el precio ganado y el que hubiera obtenido si todo el pan hubiera sido del día.
*/


function panMohoso(){
    let a = document.getElementById('panNuevo').value;
    let b = document.getElementById('panViejo').value;
    let totalFacturado = ((a * 3.49) + (b* (3.49*0.6)));
    let totalTotalDeVeras = totalFacturado + (b * (3.49 * 0.4));

    document.getElementById('perdidas').innerHTML = "Hemos facturado " + totalFacturado + " pero podríamos haber facturado " + totalTotalDeVeras;
}


/*Ejercicio 7
Crear un programa que sea un cuestionario con 3 preguntas de sí o no. Al finalizar, mostrará un mensaje de felicitaciones si se respondió bien a todas, o uno de que ha perdido el juego si respondió mal al menos una.
*/

function saberYganar(){
    let p1 = document.getElementById('p1').value;
    let p2 = document.getElementById('p2').value;
    let p3 = document.getElementById('p3').value;


    if((p1 == "paris" || p1 == "ahj, francia :(") && (p2 == "berlin") && (p3 == "roma")){
        document.getElementById('saber').innerHTML = "Ganaste¡¡¡";
    }else{
        document.getElementById('saber').innerHTML = "No sabes, No ganas";
    }
}


/*Crear un programa que pida ingresar el usuario y la contraseña y los compare con el usuario y contraseña guardados en variables (Tú_Nombre y Tú_Primer_Apellido). Si coinciden debe mostrar un mensaje que diga "Autenticación exitosa" y si no, debe mostrar "Usuario o contraseña equivocados". */

function logIn(){
    let user = document.getElementById('userName').value;
    let pass = document.getElementById('password').value;

    let userName = "Alan1234";
    let password = "borjaElMoll@2024";

    if(user === userName && password === pass){
        document.getElementById('login').innerHTML = "Autenticación exitosa";
    }else{
        document.getElementById('login').innerHTML = "Usuario o contraseña equivocados";
    }

}



/*Crear un programa que pida al usuario evaluar del 1 al 10 cuánto le gusta X una cosa (a elección). Dependiendo de la respuesta, debe mostrar un mensaje en consonancia. Hacer mínimo 4 casos posibles. Si se ingresa algo que no sea un número del 1 al 10, mostrar un mensaje de advertencia y volver a pedir dicho número. */


function cuantoTeGustaEsto() {
    let valoracion = parseInt(document.getElementById('valoracionCliente').value);
    
    if(isNaN(valoracion)){
        alert("ingresa un NUMERO¡ no es tan dificil")
    }
    if (valoracion < 1 || valoracion > 10) {
        alert("Por favor, ingresa un número válido del 1 al 10.");
    }
    if (valoracion >= 1 && valoracion <= 3) {
        document.getElementById('valoracion').innerHTML = "Que vas de aplicado?";
    } else if (valoracion >= 4 && valoracion <= 6) {
        document.getElementById('valoracion').innerHTML = "No me mientas";
    } else if (valoracion >= 7 && valoracion <= 8) {
        document.getElementById('valoracion').innerHTML = "a mi también me gusta salir un ratito antes sin pasarnos";
    } else if (valoracion >= 9 && valoracion <= 10) {
        document.getElementById('valoracion').innerHTML = "Totalmente, qUé pereza salir a las 21:30";
    }
}
