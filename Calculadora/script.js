function calcula(){
    let n1 = parseInt(document.getElementById('primerNumero').value);
    let n2 = parseInt(document.getElementById('segundoNumero').value);
    let calculo = String(document.getElementById('opcion').value);
    let result = document.getElementById('resultado');

    /*if(n2 === 0 && calculo == '/'){
        alert('NO SE PUEDE DIVIDIR POR 0¡¡¡');
    }*/


    switch(calculo){
        case '+': 
        result.innerHTML= n1+n2;
        break;

        case "-": result.innerHTML= n1-n2;
        break;

        case "*": result.innerHTML= n1*n2;
        break;
        
        case "/":  if(n2 === 0){
            alert('NO SE PUEDE DIVIDIR POR 0¡¡¡');
        }else{
            result.innerHTML= n1/n2;
        };
        break;

        case "**": result.innerHTML= n1**n2;
        break;

        case "%": result.innerHTML= n1%n2;
        break;

        default: alert ("revisa los datos");

    }


}