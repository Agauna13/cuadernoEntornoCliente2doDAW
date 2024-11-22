//Declaración de objetos y arrays comunes a todo el código
function construirTablero() {
  let tablero = [];
  for (let i = 0; i < 10; i++) {
    let fila = [];
    for (let j = 0; j < 20; j++) {
      fila.push(0);
    }
    tablero.push(fila);
  }
  return tablero;
}

var tablero = construirTablero();

let barra = {
  nombre: "barra",
  forma: [[1], [1], [1], [1]],
  probabilidad: 0.2,
  color: "blue",
};

let cuadrado = {
  nombre: "cuadrado",
  forma: [
    [1, 1],
    [1, 1],
  ],
  probabilidad: 0.2,
  color: "red",
};

let ele = {
  nombre: "ele",
  forma: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  probabilidad: 0.3,
  color: "pink",
};

let rayitoVerde = {
  nombre: "rayitoVerde",
  forma: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  probabilidad: 0.4,
  color: "green",
};

let laQueTieneFormitaDeT = {
  nombre: "laQueTieneFormitaDeT",
  forma: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  probabilidad: 0.3,
  color: "orange",
};

var piezas = [barra, cuadrado, rayitoVerde, ele, laQueTieneFormitaDeT];
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");
const filas = 20;
const columnas = 10;
const ladoCelda = 30;
var puntuacion = 0;
//var nuevaPieza = generarPieza();

//función para dibujar el tablero, podemos usar esta funcion varias veces para el movimiento de las piezas
function dibujarTablero(colorPieza) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      if (tablero[i][j] == 0) {
        lienzo.fillStyle = "black";
      } else if (tablero[i][j] == 1) {
        lienzo.fillStyle = colorPieza;
      } else {
        tablero.fillStyle = "gray";
      }
      lienzo.fillRect(i * 30, j * 30, 30, 30);
    }
  }
}

//Funcion para elegir una pieza en función de su probabilidad
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

//Funcion para dibujar la pieza en función de unas coordenadas.
function colocarPieza(pieza, coordenadaX, coordenadaY) {
  const inicioX = coordenadaX;
  const inicioY = coordenadaY;
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        tablero[inicioX + i][inicioY + j] = 1;
      }
    }
  }
}

function chequearColisiones(pieza, x, y) {}

function eliminarLinea() {
  for (let i = 0; i < tablero.length; i++) {
    let total = 0;
    let sumaFila = tablero[i].reduce(
      (acumulador, current) => acumulador + current,
      total
    );

    if (total >= 10) {
      tablero.splice(tablero[i], 1);
      puntuacion += 10;
    }
  }
  document.getElementById(
    "puntuacion"
  ).innerHTML = `<h3>Puntuación: ${puntuacion}</h3>`;
}


function actualizar(dirX, dirY) {
  const nuevaPieza = generarPieza();
  console.log(nuevaPieza);
  colocarPieza(nuevaPieza, (4 + dirX), (0 + dirY));
  dibujarTablero(nuevaPieza.color);
  eliminarLinea();
}

actualizar(0, 10);

/*const nuevaPieza = elegirPieza();
  console.log(nuevaPieza.nombre);
  dibujarPieza(nuevaPieza, 4 + dirX, 0 + dirY);
  dibujarTablero(nuevaPieza.color);*/
