import * as comprobaciones from "./comprobaciones.js";

import * as objetos from "./objetos.js";



//Calculamos la penalización sobre el precio base si el cliente es menor de 25 años 
function penalizacionEdad(precioBase, edadCliente){
    let penalizacion = comprobaciones.comprobarAntiguedad(edadCliente, 24);

    //0 si el cliente es mayor, 10% de la base si es menor
    return penalizacion ? 0 : (precioBase * 0.1); 
}


//Calculamos el descuento por experiencia al volante, si tiene 5 años o más de experiencia
//devolvemos un importe negativo del 10% del precio base
function calcularDescuentoExperiencia(precioBase, antiguedadCarnet){
    let descuento = comprobaciones.comprobarAntiguedad(antiguedadCarnet, 5);

    return descuento ? -(precioBase * 0.1) : 0;
}


//calculamos la penalizacion por tipo de motor buscando en el objeto correspondiente 
//y dividiendo el porcentaje entre 100
function calcularPenalizacionTipoVehiculo(precioBase, tipoMotor){
    let motor = objetos.tipoVehiculo.find((motor) => motor.tipo === tipoMotor);

    let handicap = motor.penalizacion;

    return handicap !== 0 ? precioBase * (handicap / 100) : 0;
}



//calculamos la penalizacion por antigüedad del coche,
//si es mayor a 10 años, lo que sobra hacia arriba será penalización.
function penalizacionAntiguedadCoche(precioBase, edadCoche){
    return edadCoche > 10 ? (precioBase * ((edadCoche - 10)/100)) : 0;
}


//Calculamos la edad en sí del coche por su fecha de matriculacion
function calcularEdad(fechaMatriculacion){
    return comprobaciones.HOY.getFullYear() - new Date(fechaMatriculacion).getFullYear();
}


//Calculamos el precio del seguro sumando el resultado de todas las operaciones anteriores 
//según los parámeros indicados
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



