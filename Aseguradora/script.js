import {
  comunidades,
  marcasModelos,
  tipoSeguro,
  tipoVehiculo
} from "./objetos.js";

import * as funciones from "./comprobaciones.js";

import * as calculos from "./calculos.js";
//Manejando eventos del submit
const formulario = document.getElementById("formulario");


formulario.addEventListener("submit", (event) => {
  event.preventDefault();
});

//Rellenando los Select
const selectMarca = document.getElementById("marcasModelos");
const selectModelo = document.getElementById("modeloVehiculo");
const selectComunidad = document.getElementById("comunidad");
const selectProvincia = document.getElementById("provincia");
const selectVehiculo = document.getElementById("tipoVehiculo");
const selectSeguro = document.getElementById("tipoSeguro");

function fillSelect(objeto, elementoHtml, key) {
  elementoHtml.innerHTML = "";
  objeto.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[key];
    option.textContent = item[key];
    elementoHtml.appendChild(option);
  });
}

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

function imprimirErrores() {
  //scrollA(top);
  for (const errores of funciones.errorLog) {
    const target = document.getElementById(errores.nombre);
    target.innerHTML = errores.error;
    target.classList.remove("oculto");
    target.classList.add("flex", "error");
  }
}

//Manipulación de las tarjetas
var contenedor = document.getElementById("container");


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
  }

  if (event.target.id === "descartar") {
    const padre = event.target.parentElement;
    switchClass(padre, "visible", false);
    switchClass(padre, "oculto", true);
  }
});

//eventos del drag and drop

// Elementos directamente referenciados por su ID
const dropArea = document.getElementById("file-input").parentElement;
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("previewContainer");

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("highlight");
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
  if (!funciones.comprobarFotoVehiculo(file)) {
    previewContainer.innerHTML = "<p>El archivo debe ser una imagen válida.</p>";
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

/*function scrollA(elemento, posicion){
  if(elemento){
    elemento.scrollIntoView(
      {
        behavior: "smooth"
      }
    )
  }else{
    window.scrollTo(
      {
        top: posicion,
        behavior: "smooth"
      }
    );
  }

  
}*/



var datosFinales = [];




function rellenartarjetas(terceros, tercerosAmp, franquiciado, todoRiesgo, seguro) {
  let tarjetas = contenedor.children;

  for (const tarjeta of tarjetas) {
    let precioElemento = tarjeta.querySelector("#precioSeguro");
    if (tarjeta.id === seguro) {
      precioElemento.textContent = datosFinales[0].precio;
    } else {
      switch (true) {
        case (tarjeta.id === "terceros"):
          precioElemento.textContent = terceros;
          break;
        case (tarjeta.id === "tercerosAmp"):
          precioElemento.textContent = tercerosAmp;
          break;
        case (tarjeta.id === "franquiciado"):
          precioElemento.textContent = franquiciado;
          break;
        case (tarjeta.id === "todoRiesgo"):
          precioElemento.textContent = todoRiesgo;
          break;
      }
    }
  }

}
formulario.addEventListener("submit", (event) => {
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
    fotoVehiculo: document.getElementById("file-input").files[0],
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
  ];

  for (const bool of listaComprobaciones) {
    console.log(bool);
  }

  /*let todoOk = listaComprobaciones.every((comprobacion) => comprobacion);
  console.log(todoOk);

  if (!todoOk) {
    imprimirErrores();
    return;
  }*/
  console.log(cliente.cobertura);
  // Procesamiento exitoso
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
    "terceros");

  let tercerosAmp = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "tercerosAmp");


  let franquiciado = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "franquiciado");

  let todoRiesgo = calculos.calcularSeguro(cliente.nacimiento,
    cliente.fechaEmisionCarnet,
    cliente.fechaMatriculacion,
    cliente.motor,
    "todoRiesgo");

  console.log(terceros)
  console.log(tercerosAmp)
  console.log(franquiciado)
  console.log(todoRiesgo)

  // Mostrar el contenedor
  console.log(contenedor);
  mostrar(contenedor);
  switchClass(contenedor, "oculto", false); // Remueve la clase 'oculto'
  switchClass(contenedor, "visible", true); // Añade la clase 'visible'

  rellenartarjetas(terceros, tercerosAmp, franquiciado, todoRiesgo, cliente.cobertura);
  const divAlterado = document.getElementById(cliente.cobertura);
  mostrar(contenedor, divAlterado, "elegido");
});





