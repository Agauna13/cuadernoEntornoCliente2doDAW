// Creamos para cada función una promesa y luego una función promesa que agrupa
// todo el proceso, con los then/catchs pertinentes


// Las promesas nuevoPedido, prepararIngredientes, cocinarPizza, empacarPizza 
// y entregarPedido siguen la lógica mostrada en el documento, en el caso de que
// la probabilidad sea mayor a la indicada resuelve la promesa y continua el proceso
// en caso contrario la rechaza y no continua ese proceso

// La promesa procesoPizzas, agrupa todas las promesas mencionadas anteriormente y las
// encapsula mediante thens y si fallan muestra el error y se rechaza a sí misma
// Y si el proceso es correcto todo el rato, esta promesa se resuelve de forma correcta

// En el main event cuando se carga la página, se genera un Promise.all que agrupa 3 casos
// de la promesa procesoPizzas, si todas se resuelven de forma correcta, se muestra 
// el caso correcto,
// en el caso de que haya un caso incorrecto se rechaza la promesa mostrando un mensaje de error, 
// pero se siguen ejecutando las otras hasta que se resuelven o se rechazan.


function nuevoPedido(numeroPedido) {
    return new Promise (function(resolve,reject){
        setTimeout(() => {
        console.log(`📋 Entrando llamada de pedido #${numeroPedido}.`);
        if (Math.random()>0.1){
            resolve(numeroPedido);
        } else {
            reject(`❌ Error al tomar el pedido #${numeroPedido}.`);
        }
    }, Math.random() * 1000 + 500);
    });
}


function prepararIngredientes(numeroPedido) {
    return new Promise (function(resolve,reject){
        setTimeout(() => {
            console.log(`🧑‍🍳 Revisando ingredientes del pedido #${numeroPedido}.`);
            if (Math.random()>0.05){
                resolve(numeroPedido);
            } else {
                reject(`⚠️ Error al preparar ingredientes del pedido #${numeroPedido}.`);
            }
    }, Math.random() * 1000 + 500);
    });
}

function cocinarPizza(numeroPedido){
    return new Promise (function(resolve,reject){
        setTimeout(() => {
            console.log(`🍕 Pizza del pedido #${numeroPedido} en el horno.`);
            if (Math.random()>0.05){
                resolve(numeroPedido);
            } else {
                reject(`⚠️ Error al cocinar la pizza del pedido #${numeroPedido}.`);
            }
    }, Math.random() * 1000 + 2000);
    });
}

function empacarPizza(numeroPedido){
    return new Promise (function(resolve,reject){
        setTimeout(() => {
            console.log(`📦 Empaquetando pedido #${numeroPedido} .`);
            if (Math.random()>0.01){
                resolve(numeroPedido);
            } else {
                reject(`⚠️ Error al empaquetar el pedido #${numeroPedido}.`);
            }
    }, Math.random() * 1000 + 500);
    }); 
}
function entregarPedido(numeroPedido){
    return new Promise (function(resolve,reject){
        setTimeout(() => {
            console.log(`🏍️ Llevando pedido #${numeroPedido}.`);
            if (Math.random()>0.08){
                resolve(`✅ Cliente del pedido #${numeroPedido} satisfecho.`);
            } else {
                reject(`⚠️ Error al entregar el pedido #${numeroPedido}.`);
            }
    }, Math.random() * 1000 + 500);
    });
}

function procesoPizzas(id){
    return new Promise (function(resolve,reject){

        nuevoPedido(id)
        .then(numeroPedido=>prepararIngredientes(numeroPedido))
        .then(numeroPedido=>cocinarPizza(numeroPedido))
        .then(numeroPedido=>empacarPizza(numeroPedido))
        .then(numeroPedido=>entregarPedido(numeroPedido))
        .then(res=> {
            console.log(res);
            resolve( "🚀 Procesamiento de pedidos finalizado.");
        }).catch(err => {
            console.error(err);
            reject("😡 Esto no va bien");
        })
    });
}


window.addEventListener('load', function (){

    Promise.all([
        procesoPizzas(1),
        procesoPizzas(2),
        procesoPizzas(3),
    ]).then( resolve => console.log(resolve[0]))
    .catch(error => console.error(error));



});
