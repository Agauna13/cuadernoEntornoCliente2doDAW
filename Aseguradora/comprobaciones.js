import * as objetos from "./objetos.js";

//Comprobaciones


export var errorLog = [];

export var HOY = new Date();

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

export function comprobarDni(dni) {
    let numero = dni.slice(0, 8);
    let numeroCorrecto = numero.match(/[0-9]{8}/g);
    if (!numeroCorrecto) {
        errorLog.push(
            {
                error: "Numero DNI incorrecto",
                nombre: "errorDni"
            }
        );
        return false;
    }

    numero = parseInt(numero);
    let letraDni = dni.slice(8, 9);
    const letraObjetivo = objetos.restoDni.find((item) => item.letra === letraDni.toLowerCase());

    if (numeroCorrecto && !letraObjetivo) {
        errorLog.push(
            {
                error: "Letra DNI incorrecta",
                nombre: "errorDni"
            }
        );
        return false;
    }

    return (letraObjetivo && numero % 23 == letraObjetivo.resto);

}

export function comprobarEmail(email) {
    const correcto = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g) //Fuente del regex w3.org

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


export function comprobarTelefono(telefono) {
    //comprobamos que el primer dígito sea un 6 o un 7 y que contenga 9 dígitos en total.
    //(6 o 7 y 8 dígitos cualquiera entre 0-9)
    telefono = telefono.toString();//convertimos a string para hacer una comprobacion mediante regex
    const correcto = telefono.match(/^[6-7]{1}[0-9]{8}$/g);

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
// (Ej: Para la mayoría de edad, el rango son 18 años).
export function comprobarAntiguedad(fecha, rango, comprobacion) {
    const fechaNacimiento = new Date(fecha);
    const fechaLimite = new Date();
    fechaLimite.setFullYear(fechaLimite.getFullYear() - rango); // Restamos los años necesarios

    if (fechaNacimiento > fechaLimite || isNaN(fechaNacimiento.getTime())) {
        // Si la fecha de nacimiento está después de la fecha límite
        switch (comprobacion) {
            case "nacimiento":
                if (isNaN(fechaNacimiento.getTime())) {
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


export function comprobarMatricula(matricula) {
    const letrasProhibidas = ["A", "CH", "E", "I", "L", "Ñ", "O", "Q", "U"];
    const numeroStr = matricula.slice(0, 4);
    let numero = parseInt(numeroStr);
    const letras = matricula.slice(4, 7).toUpperCase();
    const letra = letras.split('');

    switch (true) {
        case (matricula.length !== 7):
            errorLog.push(
                {
                    error: "Formato de matrícula incorrecto, (Requerido 4 números y 3 letras)",
                    nombre: "errorMatricula"
                }

            );
            return false;
        case (numero > 9999 || numero < 0):
            errorLog.push(
                {
                    error: "Revise el numero de matricula. Requerido: 4 dígitos y 3 letras",
                    nombre: "errorMatricula"
                }
            );
            return false;
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

export function comprobarCodigoPostal(codigoPostal, provinciaCliente) {
    let provincias = objetos.codigosPostales.find((item) => item.provincia === provinciaCliente);

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
                error: "Codigo Postal Incorrecto",
                nombre: "errorCodigoPostal"
            }
        );
        return false;
    }

}

export function comprobarFotoVehiculo(fotoVehiculo) {
    const extensionesPermitidas = ["image/jpeg", "image/jpg"];
    if (!extensionesPermitidas.includes(fotoVehiculo.type)) {
        errorLog.push({
            error: "Formato de imagen no soportado. Solo se permiten imágenes .jpg o .jpeg",
            nombre: "errorImagen"
        });
        return false;
    }
    if (!/\.(jpg|jpeg)$/i.test(fotoVehiculo.name)) {
        errorLog.push({
            error: "Extensión de archivo incorrecta. Solo se permiten imágenes .jpg o .jpeg",
            nombre: "errorImagen"
        });
        return false;
    }

    return true;
}

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
