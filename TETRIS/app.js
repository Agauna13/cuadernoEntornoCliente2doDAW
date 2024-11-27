const canvas = document.getElementById('tetris');
const lienzo = canvas.getContext('2d');
const celda = 30;
const filas = 20;
const columnas = 10;
var puntuacion = 0;
var dificultad = 500;


var barra = {
  nombre: "barra",
  forma: [[1], [1], [1], [1]],
  probabilidad: 0.15,
  color: "blue",
  anguloRotado: 0
}

var cuadrado = {
  nombre: "cuadrado",
  forma: [
    [1, 1],
    [1, 1]
  ],
  probabilidad: 0.3,
  color: "red",
  anguloRotado: 0
}

var rayito = {
  nombre: "rayito",
  forma: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  probabilidad: 0.15,
  color: "green",
  anguloRotado: 0
}
var laQueTieneFormitaDeT = {
  nombre: "laQueTieneFormitaDeT",
  forma: [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  probabilidad: 0.2,
  color: "orange",
  anguloRotado: 0
}

var ele = {
  nombre: "ele",
  forma: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  probabilidad: 0.2,
  color: "pink",
  anguloRotado: 0
}

var piezas = [barra, cuadrado, rayito, laQueTieneFormitaDeT, ele];

const tablero = arrayTablero();

function arrayTablero() {
  let arr = []
  for (let i = 0; i < columnas; i++) {
    let fila = [];
    for (let j = 0; j < filas; j++) {
      fila.push(0);
    }
    arr.push(fila);
  }
  return arr;
}
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


function posicionarPieza(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        tablero[x + i][y + j] = 1;
      }
    }
  }
}

function rotarPieza(pieza, x, y) {
  let traspuesta = pieza.forma[0].map((_, i) => pieza.forma.map(row => row[i]));
  let rotada = traspuesta.map(row => row.reverse());

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
        if (tableroX >= columnas) ajusteX = Math.min(ajusteX, columnas - tableroX - 1);
      }
    }
  }

  pieza.forma = rotada;
  return x + ajusteX;
}



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
      dificultad -= 50;
    }
    document.getElementById('puntuacion').innerHTML = `<h3>Puntuación: ${puntuacion}</h3>`;
  }
}

function comprobarPrimeraFila() {
  for (let i = 0; i < columnas; i++) {
    if (tablero[i][0] !== 0) {
      return true;
    }
  }
  return false;
}

function actualizar(pieza, x, y) {
  dibujarTablero();
  dibujarPieza(pieza, x, y);
}

function jugar() {
  let x = 4;
  let y = -1;
  let pieza = generarPieza();

  function moverPieza(dirX, dirY) {
    const nuevoX = x + dirX;
    const nuevoY = y + dirY;
    if (!chequearColisiones(pieza, nuevoX, nuevoY)) {
      x = nuevoX;
      y = nuevoY;
    } else if (dirY === 1) {
      posicionarPieza(pieza, x, y);
      pieza = generarPieza();
      eliminarLinea();
      if (comprobarPrimeraFila()) {
        alert("Perdiste, tu puntuación es " + puntuacion);
        location.reload();
        clearInterval(intervaloDescenso);
      } else {
        x = 4;
        y = 0;
      }
    }
    actualizar(pieza, x, y);
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "a":
        moverPieza(-1, 0);
        break;
      case "d":
        moverPieza(1, 0);
        break;
      case "s":
        moverPieza(0, 1);
        break;
      case "w":
        const nuevoX = rotarPieza(pieza, x, y);
        if (nuevoX !== x) {
          x = nuevoX;
        }
        actualizar(pieza, x, y);
        break;
      default:
        return;
    }
  });
  const intervaloDescenso = setInterval(() => {
    moverPieza(0, 1);
  }, dificultad);
}



jugar();











