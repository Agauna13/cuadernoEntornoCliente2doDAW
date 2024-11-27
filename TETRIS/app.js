//Variables globales para pintar el canvas y la dificultad
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");
const celda = 30;
const filas = 20;
const columnas = 10;
var puntuacion = 0;
var dificultad = 500;


//Variables globales para pintar la pieza siguiente
const canvaSiguiente = document.getElementById("siguientePieza");
const lienzoSiguiente = canvaSiguiente.getContext("2d");


//Objetos para las piezas
var barra = {
  nombre: "barra",
  forma: [[1], [1], [1], [1]],
  probabilidad: 0.15,
  color: "blue",
};

var cuadrado = {
  nombre: "cuadrado",
  forma: [
    [1, 1],
    [1, 1],
  ],
  probabilidad: 0.3,
  color: "red",
};

var rayito = {
  nombre: "rayito",
  forma: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  probabilidad: 0.15,
  color: "green",
};
var laQueTieneFormitaDeT = {
  nombre: "laQueTieneFormitaDeT",
  forma: [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  probabilidad: 0.2,
  color: "orange",
};

var ele = {
  nombre: "ele",
  forma: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  probabilidad: 0.2,
  color: "pink",
};


//Array para recorrer las piezas Separado para mayor facilidad de lectura
var piezas = [barra, cuadrado, rayito, laQueTieneFormitaDeT, ele];

//Constructor del array que contiene el tablero
const tablero = arrayTablero();

//Cola de piezas para representar la pieza siguiente
var cola = [];

  
//creamos un array de las medidas del tablero lleno de 0
function arrayTablero() {
  let arr = [];
  for (let i = 0; i < columnas; i++) {
    let fila = [];
    for (let j = 0; j < filas; j++) {
      fila.push(0);
    }
    arr.push(fila);
  }
  return arr;
}


//dibujamos el tablero teniendo en cuenta los valores que se encuentran dentro del array
function dibujarTablero() {
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      lienzo.fillStyle = tablero[i][j] == 0 ? "black" : "gray";
      lienzo.strokeStyle = "white";
      lienzo.fillRect(i * celda, j * celda, celda, celda);
      lienzo.strokeRect(i * celda, j * celda, celda, celda);
    }
  }
}


//dibujamos el tablero que muestra la proxima pieza
function dibujarSiguiente(){
  for(let i = 0; i<(columnas/2) + 1; i++){
    for(let j = 0; j<(columnas/2); j++){
      lienzoSiguiente.fillStyle ="black";
      lienzoSiguiente.strokeStyle = "white";
      lienzoSiguiente.fillRect(i * celda, j * celda, celda, celda);
      lienzoSiguiente.strokeRect(i * celda, j * celda, celda, celda);
    }
  }
}



//dibujamos la pieza que estamos usando ahora
function dibujarPieza(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        lienzo.fillStyle = pieza.color;
        lienzo.fillRect((x + i) * celda, (y + j) * celda, celda, celda);
      }
    }
  }
}


//dibujamos la proxima pieza
function dibujarPiezaSiguiente(pieza){
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        lienzoSiguiente.fillStyle = pieza.color;
        lienzoSiguiente.fillRect((i + 1) * celda, (j + 1) * celda, celda, celda);
      }
    }
  }

}



//generamos una pieza al azar mapeando la probabilidad de cada pieza en el array y eligiendo la mas cercana a un numero random
function generarPieza() {
  let probabilidadAcumulada = 0;
  const rango = piezas.map((pieza) => {
    probabilidadAcumulada += pieza.probabilidad;
    return { ...pieza, rango: probabilidadAcumulada };
  });

  let numeroAleatorio = Math.random();

  for (let r of rango) {
    if (numeroAleatorio <= r.rango) {
      return r;
    }
  }
}



//recorremos cada pieza para chequear por qué lado puede colisionar y si es así, devolvemos true si no, false
function chequearColisiones(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        let tableroX = x + i;
        let tableroY = y + j;
        if (
          tableroX < 0 ||
          tableroX >= columnas ||
          tableroY >= filas ||
          tablero[tableroX][tableroY] !== 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}



//cambiamos los valores dentro del array tablero para que la pieza se quede "fija"
function posicionarPieza(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        tablero[x + i][y + j] = 1;
      }
    }
  }
}


//mapeamos y trasponemos el array de la pieza que estamos usando en ese momento para dar el efecto de giro de 90º
function rotarPieza(pieza, x, y) {
  let traspuesta = pieza.forma[0].map((_, i) =>
    pieza.forma.map((row) => row[i])
  );
  let rotada = traspuesta.map((row) => row.reverse());


  //controlamos que si está demasiado cerca de los bordes como para que se salga, no gire
  let ajusteX = 0;
  for (let i = 0; i < rotada.length; i++) {
    for (let j = 0; j < rotada[i].length; j++) {
      if (rotada[i][j] === 1) {
        let tableroX = x + i;
        let tableroY = y + j;
        if (
          tableroX < 0 ||
          tableroX >= columnas ||
          tableroY >= filas ||
          (tableroX >= 0 && tableroY >= 0 && tablero[tableroX][tableroY] !== 0)
        ) {
          return x;
        }
        if (tableroX < 0) ajusteX = Math.max(ajusteX, -tableroX);
        if (tableroX >= columnas)
          ajusteX = Math.min(ajusteX, columnas - tableroX - 1);
      }
    }
  }

  //reemplazamos la forma de la pieza por su forma rotada y devolvemos la posicion x para saber si queremos girar o no
  pieza.forma = rotada;
  return x + ajusteX;
}


//Si la suma de todos los valores de una linea es mayor a 10, eliminamos la linea, sumamos 100 a la puntuación y creamos una nueva al principio del array
function eliminarLinea() {
  for (let j = 0; j < filas; j++) {
    let sumaFila = 0;
    for (let i = 0; i < columnas; i++) {
      sumaFila += tablero[i][j];
    }
    if (sumaFila >= 10) {
      for (let i = 0; i < columnas; i++) {
        tablero[i].splice(j, 1);
        tablero[i].unshift(0);
      }
      puntuacion += 100;

      if(puntuacion % 1000 == 0){
        dificultad = dificultad - 50;

        clearInterval(intervaloDescenso);
        iniciarIntervalo(cola[0], x, y);
      }
      
    }
    document.getElementById(
      "puntuacion"
    ).innerHTML = `<h3>Puntuación: ${puntuacion}</h3>`;
  }
}



//comprobamos si hay una pieza tocando la parte más alta y si es así devolvemos true para finalizar la partida
function comprobarPrimeraFila() {
  for (let i = 0; i < columnas; i++) {
    if (tablero[i][0] !== 0) {
      return true;
    }
  }
  return false;
}



//actualizamos a cada iteracion ambos tableros y dibujamos ambas piezas
function actualizar(pieza, x, y) {
  dibujarTablero();
  dibujarPieza(pieza, x, y);
  dibujarSiguiente();
  dibujarPiezaSiguiente(cola[1]);
}

// Variables globales para evitar atascos en el flujo de control de las coordenadas y la pieza activa
var x = 4;
var y = 0;
var pieza;
var intervaloDescenso;

// Función principal para iniciar el intervalo de tiempo entre pasos de la pieza, teniendo en cuenta la dificultad y actualizandolo cada 1000 puntos (ver eliminarLinea)
function iniciarIntervalo() {
  if (intervaloDescenso) clearInterval(intervaloDescenso);
  intervaloDescenso = setInterval(() => {
    moverPieza(0, 1);
  }, dificultad);
}

// Función paramétrica para que la pieza se posicione según los parametros pasados
function moverPieza(dirX, dirY) {
  const nuevoX = x + dirX;
  const nuevoY = y + dirY;
  if (!chequearColisiones(pieza, nuevoX, nuevoY)) {
    x = nuevoX;
    y = nuevoY;
  } else if (dirY === 1) {//tras chequear las colisiones, fijamos la pieza, alteramos la cola y reiniciamos las variables x e y
    posicionarPieza(pieza, x, y);
    cola.shift();
    cola.push(generarPieza());
    pieza = cola[0];
    x = 4;
    y = -1;
    eliminarLinea();//comprobamos si una linea esta llena y la eliminamos
    if (comprobarPrimeraFila()) { //comprobamos si el jugador ha perdido y le mostramos su puntuación
      alert("Perdiste, tu puntuación es " + puntuacion + "Juego desarrollado por Alan Adamson Fun and Games");
      clearInterval(intervaloDescenso);
      return;
    }
    iniciarIntervalo();
  }
  actualizar(pieza, x, y);
}

// Función principal para iniciar el juego y controlarlo
function jugar() {
  if (cola.length < 2) {
    for (let i = 0; i < 2; i++) {
      cola.push(generarPieza());
    }
  }
  pieza = cola[0];
  x = 4;
  y = -1;

  // Event listener para controlar el movimiento y la rotación
  document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "a": //movemos a la izquierda
        moverPieza(-1, 0);
        break;
      case "d"://movemos a la derecha
        moverPieza(1, 0);
        break;
      case "s"://aceleramos
        moverPieza(0, 1);
        break;
      case "w"://rotamos
        const nuevoX = rotarPieza(pieza, x, y); //cambiamos la posicion de la pieza si al comprobar la rotación no ha colisionado
        if (nuevoX !== x) {
          x = nuevoX;
        }
        actualizar(pieza, x, y);
        break;
    }
  });

  iniciarIntervalo();
}

jugar();




