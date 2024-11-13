
//objeto Date

var fechaActual = new Date();
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
var año = fechaActual.getFullYear();
console.log(dia + "/" + mes + "/" + año); // Formato: DD/MM/YYYY

// Obtener la fecha actual
var fechaActual = new Date();
console.log(fechaActual);

// Establecer una fecha específica
var fechaEspecifica = new Date(2024, 10, 13); // 13 de noviembre de 2024
console.log(fechaEspecifica);

// Obtener el año actual
var año = fechaActual.getFullYear();
console.log(año);



//MATH
// Calcular la raíz cuadrada de un número
var raizCuadrada = Math.sqrt(16);
console.log(raizCuadrada); // 4

// Generar un número aleatorio entre 0 y 1
var aleatorio = Math.random();
console.log(aleatorio);

// Redondear un número al entero más cercano
var redondeado = Math.round(4.7);
console.log(redondeado); // 5




//objeto STRING
// Convertir una cadena a mayúsculas
var texto = "hola mundo";
var textoMayusculas = texto.toUpperCase();
console.log(textoMayusculas); // "HOLA MUNDO"

// Obtener la longitud de una cadena
var longitud = texto.length;
console.log(longitud); // 10

// Reemplazar una parte de la cadena
var nuevoTexto = texto.replace("mundo", "JavaScript");
console.log(nuevoTexto); // "hola JavaScript"




//Objeto WINDOW
// Abrir una nueva ventana
var nuevaVentana = window.open("https://www.example.com", "Ejemplo", "width=600,height=400");

// Cerrar la ventana abierta
nuevaVentana.close();

// Mostrar una alerta
window.alert("¡Hola, mundo!");







//setTimeout
setTimeout(() => {
    document.location.href = 'blabla.html'; //location funciona con window y con document
}, 100);

//seInterval




//scrollBy(), scrollTo()
window.scrollTo(0, 0);

// Desplazar la página al final
window.scrollTo(0, document.body.scrollHeight);

// Desplazar la página a un elemento específico (por ejemplo, con un ID "miElemento")
const elemento = document.getElementById('miElemento');
window.scrollTo(0, elemento.offsetTop);


//To scroll down one page:
window.scrollBy(0, window.innerHeight);

//To scroll up

window.scrollBy(0, -window.innerHeight);


//Using options:
window.scrollBy({
    top: 100,
    left: 100,
    behavior: "smooth",
});



/*
El método blur() del objeto window en JavaScript se utiliza para quitar el enfoque (o "desenfocar") de la ventana del navegador. Cuando se llama a window.blur(), la ventana actual pierde el enfoque, lo que significa que ya no estará activa en el navegador y no recibirá eventos como la interacción del teclado.*/

window.blur();


//resizeTo()

resizeTo(width, height);