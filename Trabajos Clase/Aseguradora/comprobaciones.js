import * as objetos from "./objetos.js";

//Comprobaciones

//Array en el que introduciremos los distintos errores con el id del elemento
//al que querremos apuntar si existe. sólo se rellena con los errores producto
//de la validación de los datos, se vacía y rellena en cada submit
export var errorLog = [];


//para reutilizar en las diversas comprobaciones, variable con la fecha presente.
export var HOY = new Date();


//Comprobamos que el nombre y el apellido tengan el formato correcto con Regex
//Si no es asi, metemos al array de errores el error correspondiente
export function comprobarNombreApellidos(nombreCliente, apellidoCliente) {
    const nombre = nombreCliente.match(/[a-zA-ZáéíóúÁÉÍÓÚ -]{2,30}/g);
    const apellido = apellidoCliente.match(/[a-zA-ZáéíóúÁÉÍÓÚ -]{2,30}/g);
    let validez = true;

    if (!nombre) {
        errorLog.push(
            {
                error: "Formato nombre incorrecto",
                nombre: "errorNombre"
            }
        );

        validez = false;
    }
    if (!apellido) {
        errorLog.push(
            {
                error: "Formato apellido incorrectos",
                nombre: "errorApellido"
            }
        );
        validez = false;
    }
    return validez;
}



//Comprobamos que el Dni se componga de 8 numeros y que la letra coincida
// con el número introducido
export function comprobarDni(dni) {
    const numero = dni.slice(0, 8);
    const letraDni = dni.slice(8, 9).toLowerCase();


    //8 dígitos para el numero
    if (!/^\d{8}$/.test(numero)) {
        errorLog.push({
            error: "Número DNI incorrecto",
            nombre: "errorDni"
        });
        return false;
    }

    const numeroInt = parseInt(numero, 10);

    //La comprobación de la letra se hace en función de la tabla de equivalencias
    //fuente: https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/
    const letraObjetivo = objetos.restoDni.find(item => item.resto === numeroInt % 23);

    // Verificar si la letra calculada coincide con la letra proporcionada
    if (!letraObjetivo || letraObjetivo.letra !== letraDni) {
        errorLog.push({
            error: "Letra DNI incorrecta",
            nombre: "errorDni"
        });
        return false;
    }

    // Si la letra coincide, el DNI es válido
    return true;
}


//Comprobamos el Email con un Regex, fuente: w3.org
export function comprobarEmail(email) {
    const correcto = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g) 

    if (!correcto) {
        errorLog.push(
            {
                error: "E-mail incorrecto",
                nombre: "errorEmail"
            }
        );
        return false;
    }

    return true;
}



//Comprobación de que el número de teléfono tenga el formato español
//mediante regex de manera simple
export function comprobarTelefono(telefono) {
    //Comprobamos que el primer dígito sea un 6 o un 7 y que contenga 9 dígitos en total.
    //(6 o 7 y 8 dígitos cualquiera entre 0-9)
    telefono = telefono.toString();//convertimos a string para hacer una comprobacion mediante regex
    const correcto = telefono.match(/^[6-7][0-9]{8}$/g);

    if (!correcto) {
        errorLog.push(
            {
                error: "Formato o nº telefono incorrectos",
                nombre: "errorTelefono"
            }
        );
        return false;
    }

    return true;

}


//Comprobamos que la fecha que le pasamos sea anterior a la actual según el rango en años.
// (Ej.: Para la mayoría de edad, el rango son 18 años).
export function comprobarAntiguedad(fecha, rango, comprobacion) {
    const fechaObjetivo = new Date(fecha);
    HOY.setFullYear(HOY.getFullYear() - rango); // Restamos los años necesarios

    if (fechaObjetivo > HOY || isNaN(fechaObjetivo.getTime())) {
        // Si la fecha objetivo está después de la fecha límite (fecha presente menos el rango que se pasa por parametro)
        switch (comprobacion) {
            case "nacimiento":
                if (isNaN(fechaObjetivo.getTime())) {
                    errorLog.push({
                        error: "Por Favor introduzca su fecha de nacimiento",
                        nombre: "errorNacimiento"
                    });
                } else {
                    errorLog.push({
                        error: "Revise la fecha de nacimiento, No puede ser menor de edad",
                        nombre: "errorNacimiento"
                    });
                }
                break;
            case "emisionCarnet":
                errorLog.push({
                    error: "Fecha de emisión del carnet Incorrecta",
                    nombre: "errorFechaCarnet"
                });
                break;
            case "fechaMatriculacion":
                errorLog.push({
                    error: "Fecha de matriculación incorrecta",
                    nombre: "errorFechaMatriculacion"
                });
                break;
        }
        return false;
    }
    return true;
}



//Comprobamos que la matrícula tiene el formato correcto y no
//contiene ninguna de la letras 'prohibidas'
export function comprobarMatricula(matricula) {
    const letrasProhibidas = ["A", "CH", "E", "I", "L", "Ñ", "O", "Q", "U"];
    const numeroStr = matricula.slice(0, 4);
    let numero = parseInt(numeroStr);
    const letras = matricula.slice(4, 7).toUpperCase();
    const letra = letras.split('');

    switch (true) {
        //si la longitud de la matricula es diferente de 7 (4 nums 3 letras), devolvemos false 
        case (matricula.length !== 7):
            errorLog.push(
                {
                    error: "Formato de matrícula incorrecto, (Requerido 4 números y 3 letras)",
                    nombre: "errorMatricula"
                }

            );
            return false;
        
        //sobre todo para numero negativos por si el cliente mete un -750 por ejemplo
        case (numero > 9999 || numero < 0):
            errorLog.push(
                {
                    error: "Revise el numero de matricula. Requerido: 4 dígitos y 3 letras",
                    nombre: "errorMatricula"
                }
            );
            return false;
        //si hay menos de 3 letras o alguna está entre las prohibidas
        case (letras.length < 3 || letra.some(letra => letrasProhibidas.includes(letra))):
            errorLog.push(
                {
                    error: "Revise las letras de su matrícula",
                    nombre: "errorMatricula"
                }
            );
            return false;
        default:
            return true;

    }
}


//Comprobamos el código postal en funcion del rango asociado a la provincia que ha seleccionado el cliente
export function comprobarCodigoPostal(codigoPostal, provinciaCliente) {
    //establecemos la provincia seleccionada
    let provincias = objetos.codigosPostales.find((item) => item.provincia === provinciaCliente);

    //si la provincia es válida comprobamos que el codigo postal esté en el rango de esa provincia
    if (provincias) {
        let inicioRango = provincias.inicio;
        let finRango = provincias.fin;

        inicioRango = parseInt(inicioRango);
        finRango = parseInt(finRango);
        console.log("inicio: " + inicioRango + " Fin: " + finRango);
        if (codigoPostal >= inicioRango && codigoPostal <= finRango) {
            return true;
        } else {
            errorLog.push(
                {
                    error: "Codigo Postal Incorrecto",
                    nombre: "errorCodigoPostal"
                }
            );
            return false;
        }

    } else {
        errorLog.push(
            {
                error: "El código postal no pertenece a la provincia",
                nombre: "errorCodigoPostal"
            }
        );
        return false;
    }

}



//Comprobamos la extension de la foto subida por el cliente en el mismo
//momento de la subida antes del submit mediante un su tipo o un regex segun el caso
export function comprobarFotoVehiculo(fotoVehiculo) {
    const extensionesPermitidas = ["image/jpeg", "image/jpg"];
    if (!extensionesPermitidas.includes(fotoVehiculo.type)) {
        errorLog.push({
            error: "Formato de imagen no soportado. Solo se permiten imágenes .jpg o .jpeg",
            nombre: "errorImagen"
        });
        return false;
    }
    if (!/\.(jpg|jpeg)$/i.test(fotoVehiculo.name)) { //regex cortesía de fracesc sorà quevedo
        errorLog.push({
            error: "Extensión de archivo incorrecta. Solo se permiten imágenes .jpg o .jpeg",
            nombre: "errorImagen"
        });
        return false;
    }

    return true;
}


//Validamos si el cliente ha subido una foto o no en el submit
export function comprobarFoto(fotoVehiculo, fotoSubida) {

    if(fotoSubida){
        return true;
    }
    if (!fotoVehiculo || !fotoSubida) {
        errorLog.push({
            nombre: "errorImagen",
            error: "Debe subir una imagen del vehículo."
        });
        return false;
    }
    
    return true;
}


//Validamos que haya aceptado los términos y condiciones
export function validarCheckbox(checkbox){
    //si el checkbox no esta seleccionado introducimos un error para que se acepten los términos y condiciones
    if(!checkbox.checked){
        errorLog.push({
            nombre: "errorCheckbox",
            error: "Debe Aceptar los términos y condiciones."
        })
        return false;
    }
    return true;
}