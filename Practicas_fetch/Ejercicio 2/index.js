// Funciones que devuelven Promesas
function nuevoPedido(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`📋 Entrando llamada de pedido #${numeroPedido}.`);
            Math.random() > 0.1 ? resolve(numeroPedido) : reject(`❌ Error al tomar el pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 500);
    });
}

//Ejemplo funcion con callback vs con Promise


//callback
/*function nuevoPedido(numeroPedido, callback) {
    setTimeout(() => {
        console.log(`📋 Entrando llamada de pedido #${numeroPedido}.`);
        Math.random() > 0.1 ? callback(null, numeroPedido) : callback(`❌ Error al tomar el pedido #${numeroPedido}.`);
    }, Math.random() * 1000 + 500);
}


//Promise
function nuevoPedido(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`📋 Entrando llamada de pedido #${numeroPedido}.`);
            Math.random() > 0.1 ? resolve(numeroPedido) : reject(`❌ Error al tomar el pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 500);
    });
}


//Se observa que el donde en un callback tenemos que usar if/else o ternarios para llamar a la funcion callback y que muestre un valor, Con promise usamos resolve o reject para resolver el mismo problema.
 */

function prepararIngredientes(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`🧑‍🍳 Revisando ingredientes del pedido #${numeroPedido}.`);
            Math.random() > 0.05 ? resolve(numeroPedido) : reject(`⚠️ Error al preparar ingredientes del pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 1000);
    });
}

function cocinarPizza(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`🍕 Pizza del pedido #${numeroPedido} en el horno.`);
            Math.random() > 0.05 ? resolve(numeroPedido) : reject(`⚠️ Error al cocinar la pizza del pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 2000);
    });
}

function empacarPizza(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`📦 Empaquetando pedido #${numeroPedido} .`);
            Math.random() > 0.01 ? resolve(numeroPedido) : reject(`⚠️ Error al empaquetar el pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 500);
    });
}

function entregarPedido(numeroPedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`🏍️ Llevando pedido #${numeroPedido}.`);
            Math.random() > 0.08 ? resolve(`✅ Cliente del pedido #${numeroPedido} satisfecho.`) : reject(`⚠️ Error al entregar el pedido #${numeroPedido}.`);
        }, Math.random() * 1000 + 3000);
    });
}

async function procesarPedido(numeroPedido) {
    try {
        await nuevoPedido(numeroPedido);
        await prepararIngredientes(numeroPedido);
        await cocinarPizza(numeroPedido);
        await empacarPizza(numeroPedido);
        const resultado = await entregarPedido(numeroPedido);
        console.log(resultado);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function procesarPedidosSimultaneos() {
    const pedidos = [1, 2, 3].map(procesarPedido);
    const resultados = await Promise.allSettled(pedidos);
    
    if (resultados.every(r => r.status === "fulfilled")) {
        console.log("🚀 Procesamiento de pedidos finalizado.");
    } else {
        console.log("😡 Esto no va bien");
    }
}

procesarPedidosSimultaneos();
