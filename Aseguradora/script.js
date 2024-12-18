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

//Elementos Contenedores
var contenedor = document.getElementById("container");
var contenedorTarjetas = document.getElementById("cardContainer");

const dropArea = document.getElementById("file-input").parentElement;
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("previewContainer");


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

function handleSelectChange(event, selectedObject, targetElement) {
  const selectedItem = event.target.value;
  targetElement.innerHTML = '<option value="">Seleccione una opción</option>';

  fillDependantSelect(selectedItem, selectedObject, targetElement);
}

selectComunidad.addEventListener("change", (event) => {
  handleSelectChange(event, comunidades, selectProvincia);
});

selectMarca.addEventListener("change", (event) => {
  handleSelectChange(event, marcasModelos, selectModelo);
});



//Manipulación de las tarjetas



function switchClass(elemento, clase, addRemove) {
  if (addRemove) {
    elemento.classList.add(clase);
  } else {
    elemento.classList.remove(clase);
  }

}

//Si el cliente cambiar el tipo de seguro en el formulario, volvemos a mostrarle todas las opciones.
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


contenedor.addEventListener("click", (event) => {
  if (event.target.id === "contratar") {
    const padre = event.target.parentElement;
    mostrar(contenedor, padre, "elegido");
    alert("Gracias por contratar. Atentamente tu asesor de seguros Alan Adamson");
  }

  if (event.target.id === "descartar") {
    const padre = event.target.parentElement;
    switchClass(padre, "visible", false);
    switchClass(padre, "oculto", true);
  }
});

//eventos del drag and drop
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  //dropArea.classList.add("highlight");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files.length) {
    const file = files[0];
    handleFile(file);
  }
});
fileInput.addEventListener("change", () => {
  const files = fileInput.files;

  if (files.length) {
    const file = files[0];
    handleFile(file);
  }
});


function handleFile(file) {
  console.log(funciones.comprobarFotoVehiculo(file));
  //funciones.comprobarFotoVehiculo(file);
  if (!funciones.comprobarFotoVehiculo(file)) {
    previewContainer.innerHTML = "<p Style = 'color: red'>El archivo debe ser una imagen válida.</p>";
      funciones.errorLog.push({
        error: "Formato de imagen no soportado. Solo se permiten imágenes .jpg o .jpeg",
        nombre: "errorImagen"
      });
    return;
  }
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.alt = "Vista previa de la imagen cargada";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "200px";

  // Limpiar contenedor previo y añadir imagen
  previewContainer.innerHTML = ""; // Limpia cualquier contenido previo
  previewContainer.appendChild(img);
}

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


function imprimirErrores() {
  for (const errores of funciones.errorLog) {
    let target = document.getElementById(errores.nombre);
    target.innerHTML = errores.error;
    target.classList.remove("oculto");
    target.classList.add("flex", "error");
  }

}

function limpiaErrores() {
  for (const errores of funciones.errorLog) {
    const target = document.getElementById(errores.nombre);
    target.classList.add("oculto");
    target.classList.remove("flex", "error");
  }
  funciones.errorLog.length = 0;
}



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
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiaErrores();
  funciones.errorLog.length = 0;
  datosFinales.length = 0;
  console.log(funciones.errorLog);
  var fotoSubida = previewContainer.hasChildNodes();
  console.log(fotoSubida);
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
    funciones.comprobarFoto(cliente.fotoVehiculo, fotoSubida)
  ];
  let todoOk = listaComprobaciones.every((comprobacion) => comprobacion);

  if (!todoOk) {
    imprimirErrores();
    scrollA(document.documentElement);
    return;
  }
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

    console.log(terceros);
    console.log(tercerosAmp)
    console.log(franquiciado)
    console.log(todoRiesgo)

    console.log(cliente.cobertura)



  //Extraemos el Id del seguro elegido por el cliente
  let seguroId = "";

  for (const seguros of tipoSeguro) {
    if (seguros.tipo === cliente.cobertura) {
      seguroId = seguros.id;
    }
  }
  console.log(seguroId)

  // Mostrar el contenedor de tarjetas con los precios en funcion de la cobertura elegida por el cliente
  mostrar(contenedor);
  switchClass(contenedor, "oculto", false);
  switchClass(contenedor, "visible", true);


  //Imprimimos las tarjetas rellenadas con el precio que toca
  rellenartarjetas(terceros, tercerosAmp, franquiciado, todoRiesgo, seguroId);
  const divAlterado = document.getElementById(seguroId);
  mostrar(contenedorTarjetas, divAlterado, "elegido");
  scrollA(contenedor);
});








