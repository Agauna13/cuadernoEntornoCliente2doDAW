/*

📌 **Conceptos Claves:**  
✔ **Callbacks**: Función que se ejecuta después de una tarea asíncrona.  
✔ **Promesas**: Representa un valor futuro (puede resolverse o rechazarse).  
✔ **Fetch API**: Método para hacer peticiones HTTP.  
✔ **JSON**: Formato de intercambio de datos.  
✔ **Async/Await**: Sintaxis moderna para manejar Promesas de forma más limpia.  


1. Callbacks (Manejo Clásico de Asincronía)

Un callback es una función pasada como argumento que se ejecuta cuando la tarea termina.  

Ejemplo: Petición a una API simulada con `setTimeout` y callback
*/

function obtenerDatosCallback(callback) {
    setTimeout(() => {
        const datos = { nombre: "Ejemplo", edad: 25 };
        callback(null, datos); // Llamamos al callback con los datos
    }, 2000);
}

// Uso con Callback
obtenerDatosCallback((error, datos) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Datos obtenidos:", datos);
    }
});
/*

Problema: Callback Hell cuando se encadenan varias funciones asíncronas.


2. Promesas (Evitar el Callback Hell)

Una Promesa puede estar en 3 estados:
Resuelta (`resolve`) → Operación exitosa.  
Rechazada (`reject`) → Hubo un error.  
Pendiente → No se ha completado.  

Ejemplo: Convertir el Callback anterior en una Promesa

*/
function obtenerDatosPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const datos = { nombre: "Ejemplo", edad: 25 };
            resolve(datos); // La promesa se resuelve
        }, 2000);
    });
}

// Uso con .then() y .catch()
obtenerDatosPromesa()
    .then(datos => console.log("Datos obtenidos:", datos))
    .catch(error => console.error("Error:", error));
/*

Ventaja: Se pueden encadenar .then() y .catch().

-------------------------------------------------

3. Fetch API (Hacer Peticiones HTTP a APIs Reales)

Ejemplo: Obtener datos de una API con fetch() y .then()
*/

fetch("https://jsonplaceholder.typicode.com/posts/1") // Petición GET
    .then(response => response.json()) // Convertimos la respuesta en JSON
    .then(data => console.log("Post obtenido:", data))
    .catch(error => console.error("Error en la petición:", error));


/*

✔ Clave:
- fetch() devuelve una Promesa.
- response.json() convierte la respuesta en JSON.

---------------------------------------------------
4. Async/Await (Manejo Moderno de Promesas y Fetch)

Ejemplo: Obtener datos con async/await (versión más limpia de fetch)
*/
async function obtenerPost() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json(); // Convertimos la respuesta a JSON
        console.log("Post obtenido:", data);
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

obtenerPost();
/*

Ventaja: Código más legible y fácil de manejar.

-------------------------------------------------------


Ejemplo de callback a promesa*/

const fs = require('fs');

// Función basada en callback
function leerArchivoCallback(ruta, callback) {
    fs.readFile(ruta, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

// Convertirla a Promesa
function leerArchivoPromesa(ruta) {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Uso con async/await
leerArchivoPromesa('archivo.txt')
    .then(contenido => console.log(contenido))
    .catch(error => console.error(error));


/*
Ejemplo de promesa a callback

*/

// Función basada en promesas
function obtenerDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true;
            if (exito) resolve("Datos obtenidos");
            else reject("Error al obtener datos");
        }, 1000);
    });
}

// Función que la adapta a un callback
function obtenerDatosConCallback(callback) {
    obtenerDatos()
        .then(resultado => callback(null, resultado))
        .catch(error => callback(error, null));
}

// Uso con callback
obtenerDatosConCallback((error, datos) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Éxito:", datos);
    }
});

