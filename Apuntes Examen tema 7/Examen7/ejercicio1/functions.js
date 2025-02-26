
// Declaramos la url inicial desde la cual llamaremos al primer Fetch de la Api

const url = 'https://jsonplaceholder.typicode.com/users';

// Función que muestra y oculta los comentarios
// Si existe un div de comentarios de ese post, destruye el div y por tanto lo 'oculta'
// Si no existe el div, llama a la url que cargará los comentarios de ese post
// Y creará un div con dos elementos p, uno para el email y otro
// par el nombre de cada comentario
// luego los agregará al div de comentarios previamente creado
// y luego este div se agregará al li pertinente, que sería el título del post

async function mostrarComentarios(id){

    const commDiv = document.getElementById(`comms_id_${id}`);
    if (commDiv){
        commDiv.remove();
    } else {
        const commUrl = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
        
        const respComms = await fetch(commUrl);
        const dataComms = await respComms.json();

        const li = document.getElementById(`post_id_${id}`);
        
            const divComms = document.createElement('div');
            divComms.setAttribute('id', `comms_id_${id}`);
            for (let comm of dataComms){
                const email = comm['email'];
                const name = comm['name'];
                const divComm = document.createElement('div');
                divComm.classList.add('comentario');
                const pemail = document.createElement('p');
                pemail.innerHTML = `<strong>Email: </strong>${email}`;
                const pname = document.createElement('p');
                pname.innerHTML = `<strong>Name: </strong>${name}`;
                divComm.append(pemail);
                divComm.append(pname);
                divComms.append(divComm);
            }

            li.append(divComms);
    }
}

// Esta función llama a los posts creados por el usuario seleccionado
// Vacía el div de posts, y luego lo llena con los posts del usuario seleccionado
// Estos posts se llaman a través de un fetch a urlPosts, que se crea a partir del id pasado
// como argumento, que sería el id del usuario. Luego se crea una lista ordenada y se
// introduce en cada línea el título de cada post, además a cada línea se le añade un 
// evento de click para cargar o eliminar los comentarios de ese post
// finalmente se llena el div de posts con la lista ordenada

async function llamarPosts(id){

    const selecteddiv = document.querySelector('.seleccionado');
    if (selecteddiv){
        selecteddiv.classList.remove('seleccionado');
    }
    const actualSelectedDiv = document.getElementById(id);
    actualSelectedDiv.classList.add('seleccionado');

    const urlPost = `https://jsonplaceholder.typicode.com/users/${id}/posts`;

    const divPosts = document.getElementById('posts');
    divPosts.classList.add('publicacion');
    divPosts.innerHTML ='';

    const respPosts = await fetch(urlPost);
    const dataPosts = await respPosts.json();
    
    const ol = document.createElement('ol');


    for (let post of dataPosts){
        const li = document.createElement('li');
        li.textContent = post['title'];
        li.setAttribute('id', `post_id_${post['id']}`);
        li.addEventListener('click', () => mostrarComentarios(post['id']));
        ol.append(li);
    }
    divPosts.append(ol);
}

// main event, que se genera cuando carga la página.
// inicialmente utiliza la url declarada al inicio del script
// hace un fetch de esta, y carga y crea los elementos usuario con la información solicitada
// finalmente les añade un evento click para mostrar los posts de cada uno de ellos
// y los añade al div que contiene los usuarios
// finalmente genera el div que guardará los posts de cada usuario pero
// completamente vacío y sin información alguna

window.addEventListener('load', async function (){

    document.body.innerHTML = '';

    const respUsers = await fetch(url);
    const dataUsers = await respUsers.json();
    const contenedor = document.createElement('div');
    contenedor.classList.add('contenedor');
    for (let user of dataUsers){
        const userDiv = document.createElement('div');

        const id = user['id'];

        userDiv.classList.add('usuario');
        const name = document.createElement('p');
        name.textContent = user['name']
        userDiv.append(name);

        const email = document.createElement('p');
        email.textContent = user['email']
        userDiv.append(email);

        const address = document.createElement('p');
        address.textContent = user['address']['city']
        userDiv.append(address);

        const company = document.createElement('p');
        company.textContent = user['company']['name']
        userDiv.append(company);

        userDiv.setAttribute('id', id);
        userDiv.addEventListener('click', () => llamarPosts(id));

        contenedor.append(userDiv);
        document.body.append(contenedor);

    }

    const posts = document.createElement('div');
    posts.setAttribute('id', 'posts');
    document.body.append(posts);

});
