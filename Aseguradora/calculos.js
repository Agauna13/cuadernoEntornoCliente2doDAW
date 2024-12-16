import * as comprobaciones from "./comprobaciones.js";

import * as objetos from "./objetos.js";


function penalizacionEdad(precioBase, edadCliente){
    let penalizacion = comprobaciones.comprobarAntiguedad(edadCliente, 24);

    return penalizacion ? 0 : (precioBase * 0.1);
}


function calcularDescuentoExperiencia(precioBase, antiguedadCarnet){
    let descuento = comprobaciones.comprobarAntiguedad(antiguedadCarnet, 5);

    return descuento ? -(precioBase * 0.1) : 0;
}

function calcularPenalizacionTipoVehiculo(precioBase, tipoMotor){
    let motor = objetos.tipoVehiculo.find((motor) => motor.tipo === tipoMotor);

    let handicap = motor.penalizacion;

    return handicap !== 0 ? precioBase * (handicap / 100) : 0;
}


function penalizacionAntiguedadCoche(precioBase, edadCoche){
    return edadCoche > 10 ? (precioBase * ((edadCoche - 10)/100)) : 0;
}


function calcularEdad(fechaMatriculacion){
    return comprobaciones.HOY.getFullYear() - new Date(fechaMatriculacion).getFullYear();
}



export function calcularSeguro(edadCliente, antiguedadCarnet, fechaMatriculacion, tipoMotor, cobertura){
    let edadCoche = calcularEdad(fechaMatriculacion);

    let seguro = objetos.tipoSeguro.find((seguro) => seguro.tipo === cobertura);

    let precioBase = seguro.precio;

    let penalizacionEdadCliente = penalizacionEdad(precioBase, edadCliente);

    let descuentoExperiencia = calcularDescuentoExperiencia(precioBase, antiguedadCarnet);

    let penalizacionTipoVehiculo = calcularPenalizacionTipoVehiculo(precioBase, tipoMotor);

    let precioBaseTipoSeguro = penalizacionAntiguedadCoche(precioBase, edadCoche);

    return precioBase +
        penalizacionEdadCliente
        + descuentoExperiencia
        + penalizacionTipoVehiculo
        + precioBaseTipoSeguro;
}



