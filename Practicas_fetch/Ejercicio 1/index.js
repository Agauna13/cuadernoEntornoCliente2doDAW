//Ejercicio 1

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const container = document.querySelector('.contenedor');
const comentContainer = document.querySelector('#comments');

function createDiv(userData) {
    let div = document.createElement('div');
    div.setAttribute("class", "usuario");
    div.setAttribute("id", userData.id);

    div.innerHTML = `<h1>${userData.name}</h1>
            <p>${userData.email}</p>
            <p>${userData.address.city}</p>
            <p>${userData.company.name}</p>`;

    container.insertAdjacentElement("beforeend", div);

    div.addEventListener("click", () => {
        document.querySelectorAll(".usuario").forEach(user => user.classList.remove("seleccionado"));
        div.classList.add("seleccionado");
        mostrarComentarios(userData.id);
    });
}

async function mostrarComentarios(userId) {
    comentContainer.innerHTML = "";
    const listaComents = document.createElement('ol');
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const data = await response.json();

    data.forEach(c => {
        let li = document.createElement('li');
        li.innerText = `${c.title}`;

        // Crear div de comentarios oculto
        let comentariosAsociados = document.createElement('div');
        comentariosAsociados.classList.add('hidden');

        li.insertAdjacentElement("beforeend", comentariosAsociados);

        li.addEventListener("click", async () => {
            // Si ya hay comentarios cargados, solo alternamos visibilidad
            if (comentariosAsociados.innerHTML !== "") {
                comentariosAsociados.classList.toggle("hidden");
                return;
            }


            let commResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${c.id}/comments`);
            let coments = await commResponse.json();

            let comentariosHTML = coments.map(c => `<p><strong>${c.email}</strong>: ${c.name}</p>`).join("");
            comentariosAsociados.insertAdjacentHTML("beforeend", comentariosHTML);

            comentariosAsociados.classList.toggle('hidden');
        });

        listaComents.insertAdjacentElement("beforeend", li);
    });

    comentContainer.insertAdjacentElement("afterbegin", listaComents);

}

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.forEach(userData => {
        createDiv(userData);
    });
});



