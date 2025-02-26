function login(){
    let user = prompt("Quien es?");
        switch(user){
            case null: alert("Cancelado");
            break;

            case "Administrador": password();
            break;

            default : alert("No te conozco");
        }

    function password(){
        let pass = prompt("Contraseña?");
        switch(pass){
            case null: alert("Cancelado");
            break;

            case "ElMejor": alert("Bienvenido");
            break;

            default: alert("Contraseña incorrecta");
        }
    }

            
}

login();