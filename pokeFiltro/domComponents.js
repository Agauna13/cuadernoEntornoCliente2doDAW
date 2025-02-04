const mainSelect = document.querySelector("#mainSelect");

const secSelect = document.querySelector("#secondarySelect");

const container = document.querySelector(".container");


function insertPokemonCard(name, id, ability, image){
    let card = document.createElement('div');
    card.setAttribute("class", "card");
    card.insertAdjacentHTML("beforeend", "<h2><strong>" + name + "</strong></h2>");
    card.insertAdjacentHTML("beforeend", "<p><strong>" + id + "</strong></p>");
    card.insertAdjacentHTML("beforeend", "<p><strong>" + ability + "</strong></p>");
    card.insertAdjacentHTML("afterbegin", "<img src=" + image +"></img>");


    container.insertAdjacentElement("beforeend", card);
}


function fetchByType(typeId) {
    let url = "https://pokeapi.co/api/v2/type/" + typeId;
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Usamos map para devolver las promesas de las solicitudes fetch
        let promises = data.pokemon.map(entry => {
            return fetch(entry.pokemon.url)  // Aseguramos que la promesa se devuelva
                .then(res => res.json());
        });
        return Promise.all(promises); // Esperamos a que todas las promesas se resuelvan
    })
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"+pokemon.id+".gif ");
        });
    })
    .catch(error => console.error('Error:', error));  // Manejo de errores
}


async function fetchTypes() {
  let url = "https://pokeapi.co/api/v2/type";
  let response = await fetch(url);
  let data = await response.json();

  let typeList = data.results;

  if (Array.isArray(data.results)) {
    typeList = data.results.map((p) => p.url);
  } else {
    throw new Error("Resultado de la búsqueda no reconocido");
  }

  return await Promise.all(
    typeList.map((url) => fetch(url).then((res) => res.json()))
  );
}

export async function fillTypes() {
  let types = await fetchTypes();
  secSelect.classList.add("shown");
  secSelect.classList.remove("hidden");
  for (let i = 0; i < 18; i++) {
    console.log(types[i].name);
    let option = document.createElement("option");
    option.setAttribute("value", types[i].id);
    option.innerHTML = types[i].name;
    secSelect.add(option);
  }
}

mainSelect.addEventListener("change", (e) => {
  console.log("cambio");
  const selected = e.target.value;

  if (selected === "type") {
    fillTypes();
    secSelect.addEventListener("change", (e) => {
        console.log(e.target.value);
        container.innerHTML = ""
        fetchByType(e.target.value);
    });
  }
});


