function hypotenuse(a, b){
    function square(x){  //función anidada para ocultarla del ámbito general del programa
        return Math.pow(x, 2);
    }

    return Math.sqrt(square(a) + square(b));
}

let a = hypotenuse(3, 5);
let b = hypotenuse(2, 2);


console.log(a);
console.log(b);

/*let j = square(5); //no debería darnos el resultado ya que no nos encontramos dentro del ámbito de la funcion square
console.log(j);*/

