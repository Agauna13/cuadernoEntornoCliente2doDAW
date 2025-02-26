const div = document.querySelector("div");
/*
const coches = ["ford", "toyota", "ferrari"];

function asyncAwait(callback) {
  div.insertAdjacentText("afterbegin", "leyendo Coches");
  return new Promise(function(resolve, reject){

    setTimeout(() => {
        callback();
        resolve();
      }, 2000);

    });

}

function final() {
  for (let i = 0; i < coches.length; i++) {
    console.log(coches[i]);
    div.insertAdjacentText("beforeend", "  ");
    div.insertAdjacentText("beforeend", coches[i]);
    div.insertAdjacentText("beforeend", ", ");
  }
}

asyncAwait(final).then(() => console.log("finalizado con éxito"));

function operar(n1, n2, f1) {
  return f1(n1, n2);
}

console.log(operar(2, 6, (a, b) => a + b));


function operacion() {
    return new Promise((resolve, reject) => {
      let exito = Math.random() > 0.5; // 50% de éxito
  
      setTimeout(() => {
        if (exito) {
          resolve("¡Operación exitosa!");
        } else {
          reject("Error en la operación");
        }
      }, 2000);
    });
  }
  
  operacion()
    .then(resultado => div.insertAdjacentText("beforeend", resultado))
    .catch(error => div.insertAdjacentText("beforeend", error));
  

document.querySelector("#go").addEventListener("click", () => {
  go();
});

function go() {
  showCircle(150, 150, 100).then((div) => {
    div.classList.add("message-ball");
    div.append("Hola, mundo!");
  });
}

function showCircle(cx, cy, radius) {
  let div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  document.body.append(div);

  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";

      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 0);
  });
}
*/

function insertPokemonCard(name, id, ability, image){
    let card = document.createElement('div');
    card.setAttribute("class", "card");
    card.insertAdjacentHTML("beforeend", "<h2><strong>" + name + "</strong></h2>");
    card.insertAdjacentHTML("beforeend", "<p><strong>" + id + "</strong></p>");
    card.insertAdjacentHTML("beforeend", "<p><strong>" + ability + "</strong></p>");
    card.insertAdjacentHTML("afterbegin", "<img src=" + image +"></img>");


    document.querySelector(".container").insertAdjacentElement("beforeend", card);
}

// Realizamos una solicitud a la API de Pokémon para obtener los primeros 10 Pokémon
/*fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0')
  // Cuando la respuesta llega, convertimos los datos en formato JSON
  .then(response => response.json())

  // Ahora `data` contiene la información de los Pokémon
  .then(data => {
    // `data.results` es un array que contiene objetos con `name` y `url` de cada Pokémon
    // Ahora usamos `map()` para recorrer cada Pokémon y hacer una nueva solicitud con su URL
    let promises = data.results.map(pokemon =>
      // Hacemos una nueva solicitud para obtener los detalles de cada Pokémon
      fetch(pokemon.url).then(res => res.json())
    );

    // `Promise.all()` espera a que todas las promesas en `promises` se resuelvan
    return Promise.all(promises);
  })

  // Cuando todas las solicitudes de los Pokémon terminan, recibimos un array con sus datos completos
  .then(pokemons => {
    // Recorremos la lista de Pokémon ya con sus datos completos
    pokemons.forEach(pokemon => {
        insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, pokemon.sprites.front_default);
        //console.log(`Nombre: ${pokemon.name}, ID: ${pokemon.id}, Peso: ${pokemon.weight}`);
    });
  })

  // Si ocurre algún error en cualquier parte de la cadena de promesas, lo capturamos aquí
  .catch(error => console.error("Error:", error));*/



function fetchApi(url){

  let counter = 0;
  fetch(url)
  // Cuando la respuesta llega, convertimos los datos en formato JSON
  .then(response => response.json())

  // Ahora `data` contiene la información de los Pokémon
  .then(data => {
    // `data.results` es un array que contiene objetos con `name` y `url` de cada Pokémon
    // Ahora usamos `map()` para recorrer cada Pokémon y hacer una nueva solicitud con su URL
    let promises = data.results.map(pokemon =>
      // Hacemos una nueva solicitud para obtener los detalles de cada Pokémon
      fetch(pokemon.url).then(res => res.json())
    );

    // `Promise.all()` espera a que todas las promesas en `promises` se resuelvan
    return Promise.all(promises);
  })

  // Cuando todas las solicitudes de los Pokémon terminan, recibimos un array con sus datos completos
  .then(pokemons => {
    // Recorremos la lista de Pokémon ya con sus datos completos
    pokemons.forEach(pokemon => {
      counter++;
        insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, pokemon.sprites.front_default);
        //console.log(`Nombre: ${pokemon.name}, ID: ${pokemon.id}, Peso: ${pokemon.weight}`);
    });
    console.log(counter + " Pokemons encontrados");
  })

  // Si ocurre algún error en cualquier parte de la cadena de promesas, lo capturamos aquí
  .catch(error => console.error("Error:", error));
}
  

  //https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/132.ogg  ruidito del pokemon

  fetchApi('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');