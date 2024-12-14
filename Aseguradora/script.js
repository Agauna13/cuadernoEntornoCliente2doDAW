import {
  comunidades,
  marcasModelos,
  tipoSeguro,
  tipoVehiculo,
  restoDni,
  codigosPostales,
} from "./objetos.js";

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

  console.log(selectedItem);
  console.log(selectedObject);
  console.log(targetElement);

  fillDependantSelect(selectedItem, selectedObject, targetElement);
}

selectComunidad.addEventListener("change", (event) => {
  handleSelectChange(event, comunidades, selectProvincia);
});

selectMarca.addEventListener("change", (event) => {
  handleSelectChange(event, marcasModelos, selectModelo);
});

//Comprobaciones

var errorLog = [];

function comprobarNombreApellidos(nombreCliente, apellidoCliente) {
  const nombre = nombreCliente.match(/[a-zA-ZáéíóúÁÉÍÓÚ -]{2,}/g);
  const apellido = apellidoCliente.match(/[a-zA-ZáéíóúÁÉÍÓÚ -]{2,}/g);

  if (!nombre || !apellido) {
    errorLog.push("nombre o apellido incorrectos");
    return false;
  }
  return true;
}

function comprobarMayoriaEdad(fechaNacimiento){
    let hoy = new Date();
    let nacimiento = new Date(fechaEmisionCarnet);

    return (hoy.getFullYear() - 18 >= nacimiento.getFullYear());
}

function comprobarDni(dni) {
    let numero = dni.slice(0, 8);
    numero = parseInt(numero);
    let letraDni = dni.slice(8, 9);

    const letraObjetivo = restoDni.find((item) => item.letra === letraDni.toLowerCase());


    console.log(dni);
    console.log(numero);
    console.log(letraDni);

    return(letraObjetivo && numero % 23 == letraObjetivo.resto);

}

function comprobarFechaCarnet(fechaEmisionCarnet){
    let hoy = new Date();
    let fechaEmision = new Date(fechaEmisionCarnet);
    return fechaEmision <= hoy;
}

function comprobarFechaMatriculacion(fechaMatriculacion){
    let hoy = new Date();
    let fechaMatricula = new Date(fechaMatriculacion);
    return fechaMatricula <= hoy;
}

function comprobarMatricula(matricula){
    const letrasProhibidas = ["A", "CH", "E", "I", "L", "Ñ", "O", "Q", "U"];
    const numeroStr = matricula.slice(0,4);
    let numero = parseInt(numeroStr);
    const letras = matricula.slice(4, 7).toUpperCase();
    const letra = letras.split('');

    switch(true){
        case (matricula.length !== 7):
            errorLog.push("Formato de matrícula incorrecto, (Requerido 4 números y 3 letras)");
            console.log("Formato de matrícula incorrecto, (Requerido 4 números y 3 letras)");
            return false;
        case (numero > 9999 || numero < 0):
            errorLog.push("Revise el numero de matricula. Requerido: 4 dígitos y 3 letras");
            console.log("Revise el numero de matricula. Requerido: 4 dígitos y 3 letras");
            return false;
        case (letras.length < 3 || letra.some(letra => letrasProhibidas.includes(letra))):
            console.log("Hay alguna letra incorrecta");
            return false;
        default:
            return true;
        
    }
}

function comprobarCodigoPostal(codigoPostal, provinciaCliente) {
    let provincias = codigosPostales.find((item) => item.provincia === provinciaCliente);

    if(provincias){
        let inicioRango = provincias.inicio;
        let finRango = provincias.fin;

        inicioRango = parseInt(inicioRango);
        finRango= parseInt(finRango);
        console.log("inicio: " + inicioRango + " Fin: " + finRango);
        if(codigoPostal >= inicioRango && codigoPostal <= finRango){
            return true;
        }else{
            return false;
        }

    }else{
        errorLog.push("Código postal incorrecto");

        return false;
    }
    
}

document.addEventListener("submit", (event) => {

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
        fotoVehiculo: document.getElementById("file-input").value,
        comunidad: selectComunidad.value,
        provincia: selectProvincia.value,
        marca: selectMarca.value,
        modelo: selectModelo.value,

    }
  /*      
  const nombreCliente = document.getElementById("nombreCliente").value;

  const apellidoCliente = document.getElementById("apellidoCliente").value;

  //const sexo = document.getElementById("sexo").value;

  const nacimiento = document.getElementById("fechaNacimiento").value;

  var dni = document.getElementById("numeroDocumento").value;

  const email = document.getElementById("email").value;

  const telefono = document.getElementById("telefono").value;

  const codigoPostal = document.getElementById("codigoPostal").value;

  const fechaEmisionCarnet =
    document.getElementById("fechaEmisionCarnet").value;

  const fechaMatriculacion =
    document.getElementById("fechaMatriculacion").value;

  const matricula = document.getElementById("matricula").value;

  const fotoVehiculo = document.getElementById("file-input").value;*/

  comprobarNombreApellidos(cliente.nombre, cliente.apellido);

  console.log("comprobar nacimiento: " + (comprobarMayoriaEdad(cliente.nacimiento)));
  
  console.log(comprobarFechaCarnet(cliente.fechaEmisionCarnet));

  console.log(comprobarFechaMatriculacion(cliente.fechaMatriculacion));

  console.log(comprobarMatricula(cliente.matricula));

  console.log(comprobarCodigoPostal(cliente.codigoPostal, cliente.provincia));


});



//Pendiente comprobar mayoria de edad