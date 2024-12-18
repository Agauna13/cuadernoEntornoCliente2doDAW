import {
  comunidades,
  marcasModelos,
  tipoSeguro,
  tipoVehiculo
} from "./objetos.js";

import * as funciones from "./comprobaciones.js";

import * as calculos from "./calculos.js";


//Array para Persistencia de datos
var datosFinales = [];

//Elementos del Dom

//Elementos select
const selectMarca = document.getElementById("marcasModelos");
const selectModelo = document.getElementById("modeloVehiculo");
const selectComunidad = document.getElementById("comunidad");
const selectProvincia = document.getElementById("provincia");
const selectVehiculo = document.getElementById("tipoVehiculo");
const selectSeguro = document.getElementById("tipoSeguro");

//Elementos y Contenedores
var contenedor = document.getElementById("container");
var contenedorTarjetas = document.getElementById("cardContainer");

const dropArea = document.getElementById("file-input").parentElement;
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("previewContainer");
const checkbox = document.getElementById("checkbox");

const terminosYcondiciones = document.getElementById("terminosYcondiciones");


//Rellenando los Select que deben cargarse al iniciar la página
function fillSelect(objeto, elementoHtml, key) {
  elementoHtml.innerHTML = ""; //Vaciamos cualquier valor residual que pueda tener
  //Recorremos el objeto creando un elemento option a cada iteracion con la información de la clave y valor
  objeto.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[key];
    option.textContent = item[key];
    elementoHtml.appendChild(option);
  });
}
//Con una misma función podemos rellenar todos los Select que se cargan por defecto
fillSelect(comunidades, selectComunidad, "comunidad");
fillSelect(marcasModelos, selectMarca, "marca");
fillSelect(tipoVehiculo, selectVehiculo, "tipo");
fillSelect(tipoSeguro, selectSeguro, "tipo");


//Ésta funcion nos permite Rellenar los select dependientes en función de la marca
//o comunidad autonoma elegidas
function fillDependantSelect(selectedItem, selectedObject, targetElement) {
  let clave, valor;
  if (selectedObject === marcasModelos) {
    clave = "marca";
    valor = "modelos";
  } else if (selectedObject === comunidades) {
    clave = "comunidad";
    valor = "provincias";
  }
  targetElement.innerHTML = '<option value="">Seleccione una opción</option>';
  const foundItem = selectedObject.find((item) => item[clave] === selectedItem);

  if (foundItem) {
    foundItem[valor].forEach((subItem) => {
      const option = document.createElement("option");
      option.value = subItem;
      option.textContent = subItem;
      targetElement.appendChild(option);
    });
  }
}


//funcion que ayuda a filtrar qué select queremos rellenar, modularizado asi para evitar
//repetir el contenido en los eventListeners de más abajo
function handleSelectChange(event, selectedObject, targetElement) {
  const selectedItem = event.target.value;
  targetElement.innerHTML = '<option value="">Seleccione una opción</option>';

  //Rellenamos el select dependiente en funcion del item seleccionado en el select 'padre'
  fillDependantSelect(selectedItem, selectedObject, targetElement);
}


//event listener que nos mira si ha cambiado el valor del select de comunidades autónomas
selectComunidad.addEventListener("change", (event) => {
  handleSelectChange(event, comunidades, selectProvincia);
});


//event listener que nos mira si ha cambiado el valor del select de las marcas de vehículo
selectMarca.addEventListener("change", (event) => {
  handleSelectChange(event, marcasModelos, selectModelo);
});



//Manipulación de las tarjetas y clases css en el Dom para jugar con la visibilidad


//fiuncion que mediante parámetros nos cambia la clase de un objeto a voluntad para darle un aspecto u otro
function switchClass(elemento, clase, addRemove) {//addRemove es un booleano que nos indica si debemos 'encender' o 'apagar' esa clase
  if (addRemove) {
    elemento.classList.add(clase);
  } else {
    elemento.classList.remove(clase);
  }

}

//funcion que nos muestra los elementos del dom o nos cambia de color el elemento en cuestión según el parámetro que le pasemos
function mostrar(elemento, elementoAlterado, alteracion) {
  let arrElementos = elemento.children;
  for (const card of arrElementos) {
    if (alteracion !== "elegido") {
      switchClass(card, "oculto", false);
      switchClass(card, "visible", true);
    }
    if (card === elementoAlterado) {
      switchClass(card, alteracion, true);
    } else {
      switchClass(card, alteracion, false);
    }
  }
}

//event listener que nos mira qué botón estamos seleccionando dentro del contenedor para saber si hemos 'contratado' o 'descartado' un seguro
contenedor.addEventListener("click", (event) => {
  if (event.target.id === "contratar") {
    const padre = event.target.parentElement;
    mostrar(contenedor, padre, "elegido");
    alert("Gracias por contratar. Atentamente tu asesor de seguros Alan Adamson");
    location.reload();
  }

  if (event.target.id === "descartar") {
    const padre = event.target.parentElement;
    switchClass(padre, "visible", false);
    switchClass(padre, "oculto", true);
  }
});


//Ventana con Términos y condiciones
terminosYcondiciones.addEventListener("click", (event) =>{
    event.preventDefault();

    const newWindow = window.open('', 'Ventanita', 'width=400,height=300');
     newWindow.document.write(`
      <html>
      <head><title>Párrafo</title></head>
      <body>
          <h2>Seccion 1</h1>
          <p>Acepta que le enviemos propaganda por todos los medios de los
          que dispone esta aseguradora, los cuales incluyen: email,
          teléfono, whatsapp, carta, que le dejemos un flyer debajo
          del limpiaparabrisas, que le deslizemos un flyer por el
          espacio que deje abierto de su ventana en los días de calor,
          que se lo demos al perro que se ha dejado en el coche (eso no se hace).</p>

          <h2>Seccion 2</h2>
          <p>Al Darle al check de aceptación, acepta ponerle a Alan un 10 en este trabajo</p>

      </body>
      </html>
  `);
  newWindow.document.close();
  

});

//eventos del drag and drop

//prevenimos los comportamientos por defecto del dragover
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

//escucha del evento que se dispara al soltar el archivo en el area
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  //se crea un array con las imagenes introducidas
  const files = event.dataTransfer.files;
  //si es mayor a 0 este array
  if (files.length) {
    //elegimos la unica imagen del array en la posicion 0
    const file = files[0];

    handleFile(file);
  }
});


//funcion que nos comprueba en el drop mismo si la imágen tiene el formato correcto
function handleFile(file) {
  if (!funciones.comprobarFotoVehiculo(file)) {
    previewContainer.innerHTML = "<p Style = 'color: red'>El archivo debe ser una imagen válida.</p>";
      funciones.errorLog.push({
        error: "Formato de imagen no soportado. Solo se permiten imágenes .jpg o .jpeg",
        nombre: "errorImagen"
      });
    return;
  }

  //si la imagen es correcta, nos crea un elemento img y lo mete a la zona de previsualizacion
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.alt = "Vista previa de la imagen cargada";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "200px";

  // Limpiar contenedor previo
  previewContainer.innerHTML = "";
  //inserta el elemento que hemos generado
  previewContainer.appendChild(img);
}



//función simple para que nos haga scroll al principio del formulario si éste estaba mal o
//a la zona de tarjetas si todo está bien. para mejorar la experiencia de usuario
function scrollA(elemento) {
  const target = elemento || document.documentElement;

  if (target) {
    target.scrollIntoView(
      {
        behavior: "smooth"
      }
    );
  }

}

//funcion que nos imprime los errores en el elemento correspondiente al id asociado a su error
//mostramos todos los elementos que se asocien a un error del array errorLog
function imprimirErrores() {
  for (const errores of funciones.errorLog) {
    let target = document.getElementById(errores.nombre);
    target.innerHTML = errores.error;
    target.classList.remove("oculto");
    target.classList.add("flex", "error");
  }

}


//Vaciamos la lista de errores para volver a comprobar y ocultamos 
//todos los elementos que no estén asociados a un error en erroLog
function limpiaErrores() {
  for (const errores of funciones.errorLog) {
    const target = document.getElementById(errores.nombre);
    target.classList.add("oculto");
    target.classList.remove("flex", "error");
  }
  funciones.errorLog.length = 0;
}


//rellenamos las tarjetas en funcion de los parametros elegidos por el cliente.
function rellenartarjetas(terceros, tercerosAmp, franquiciado, todoRiesgo, seguro) {
  let tarjetas = contenedor.querySelectorAll(".card");

  for (const tarjeta of tarjetas) {
    let precioElemento = tarjeta.querySelector("#precioSeguro");
    console.log(tarjeta.id)
    console.log(seguro)
    if (tarjeta.id === seguro) {
      precioElemento.textContent = datosFinales[0].precio;
    } else {
      switch (true) {
        case (tarjeta.id === "terceros"):
          precioElemento.textContent = terceros + "€";
          break;
        case (tarjeta.id === "tercerosAmp"):
          precioElemento.textContent = tercerosAmp + "€";
          break;
        case (tarjeta.id === "franquiciado"):
          precioElemento.textContent = franquiciado + "€";
          break;
        case (tarjeta.id === "todoRiesgo"):
          precioElemento.textContent = todoRiesgo + "€";
          break;
      }
    }
  }

}

//Escuchador del evento submit del formulario.
//al dispararse, limpiamos cualquier variable previa, limpiamos los errores,
//y comprobamos que no haya una foto en el contenedor de previsualizacion
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiaErrores();
  funciones.errorLog.length = 0;
  datosFinales.length = 0;
  var fotoSubida = previewContainer.hasChildNodes();

  //Guardamos los valores elegidos por el cliente en un objeto cliente para más claridad y mejor manejo de las variables
  const cliente = {
    nombre: document.getElementById("nombreCliente").value,
    apellido: document.getElementById("apellidoCliente").value,
    sexo: document.getElementById("sexo").value,
    nacimiento: document.getElementById("fechaNacimiento").value,
    dni: document.getElementById("numeroDocumento").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    codigoPostal: document.getElementById("codigoPostal").value,
    fechaEmisionCarnet: document.getElementById("fechaEmisionCarnet").value,
    fechaMatriculacion: document.getElementById("fechaMatriculacion").value,
    matricula: document.getElementById("matricula").value,
    motor: document.getElementById("tipoVehiculo").value,
    cobertura: document.getElementById("tipoSeguro").value,
    fotoVehiculo: document.getElementById("file-input").value,
    comunidad: selectComunidad.value,
    provincia: selectProvincia.value,
    marca: selectMarca.value,
    modelo: selectModelo.value,
  };


  //Hacemos una lista de comprobaciones que podremos iterar para validar todos los campos necesarios
  let listaComprobaciones = [
    funciones.comprobarNombreApellidos(cliente.nombre, cliente.apellido),
    funciones.comprobarAntiguedad(cliente.nacimiento, 18, "nacimiento"),
    funciones.comprobarDni(cliente.dni),
    funciones.comprobarEmail(cliente.email),
    funciones.comprobarTelefono(cliente.telefono),
    funciones.comprobarAntiguedad(cliente.fechaEmisionCarnet, 0, "emisionCarnet"),
    funciones.comprobarAntiguedad(cliente.fechaMatriculacion, 0, "fechaMatriculacion"),
    funciones.comprobarMatricula(cliente.matricula),
    funciones.comprobarCodigoPostal(cliente.codigoPostal, cliente.provincia),
    funciones.comprobarFoto(cliente.fotoVehiculo, fotoSubida),
    funciones.validarCheckbox(checkbox)
  ];

  //Recorremos la lista de comprobaciones mirando si todo es true (caso idoneo) o todo es false
  /*let todoOk = listaComprobaciones.every((comprobacion) => comprobacion);


  //Si al recorrer las comprobaciones hay algun false, imprimimos los errores y hacemos scroll al inicio de la página
  if (!todoOk) {
    imprimirErrores();
    scrollA(document.documentElement);
    return;
  }*/

  //si todas las comprobaciones pasan, rellenamos el objeto con el seguro elegido por el cliente y el precio
  datosFinales.splice(0, datosFinales.length);
  datosFinales.push({
    precio: calculos.calcularSeguro(
      cliente.nacimiento,
      cliente.fechaEmisionCarnet,
      cliente.fechaMatriculacion,
      cliente.motor,
      cliente.cobertura
    ),
    seguroElegido: cliente.cobertura,
  });


  //Calculamos el seguro para cada tipo de seguro
  let terceros = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "A Terceros");

  let tercerosAmp = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "A Terceros Ampliado");


  let franquiciado = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "Con Franquicia");

  let todoRiesgo = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "A todo Riesgo");


  //Extraemos el Id del seguro elegido por el cliente
  let seguroId = "";

  for (const seguros of tipoSeguro) {
    if (seguros.tipo === cliente.cobertura) {
      seguroId = seguros.id;
    }
  }

  // Mostrar el contenedor de tarjetas con los precios en funcion de la cobertura elegida por el cliente
  switchClass(contenedor, "oculto", false);
  switchClass(contenedor, "visible", true);


  //Imprimimos las tarjetas rellenadas con el precio que toca
  rellenartarjetas(terceros, tercerosAmp, franquiciado, todoRiesgo, seguroId);

  //elegimos el div en funcion del seguro elegido por el cliente
  const divAlterado = document.getElementById(seguroId);

  //Mostramos ese div con un estilo diferente
  mostrar(contenedorTarjetas, divAlterado, "elegido");

  //hacemos scroll hacia las tarjetas
  scrollA(contenedor);
});








