function addDiv() {
    const div = document.createElement('div');
    document.body.insertAdjacentElement("beforeend", div);
}

let count = 10;
let position = 0;

function counter(step) {
    // Crear un nuevo div
    addDiv();
    let newDiv = document.body.lastChild;

    // Modificar valores según el paso (arriba o abajo)
    count += step;
    position += (50 * step);
    console.log(step);
    console.log(position);

    // Establecer estilos y contenido
    count % 2 == 0 ? newDiv.classList.add('color') : newDiv.classList.remove('color');
    newDiv.textContent = count;
    newDiv.style.position = 'absolute';
    newDiv.style.top = position + 'px';
    newDiv.style.left = position + 'px';
}

function dibujar() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < 10) {
            counter(-1); // Decrementa (forma la primera mitad de la V)
        } else if (i >= 10) {
            counter(1); // Incrementa (forma la segunda mitad de la V)
        } else {
            clearInterval(interval); // Detener cuando se haya dibujado toda la "V"
        }
        i++;
    }, 1000); // Intervalo de 1 segundo
}

document.addEventListener("DOMContentLoaded", () => {
    dibujar();
});
