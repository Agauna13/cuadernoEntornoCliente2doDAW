const mainSelect = document.querySelector("#mainSelect");
const secSelect = document.querySelector("#secondarySelect");
const container = document.querySelector(".container");

// Función para insertar una carta de Pokémon en el DOM
function insertPokemonCard(name, id, ability, image) {
  let card = document.createElement('div');
  card.setAttribute("class", "card");
  card.insertAdjacentHTML("beforeend", "<h2><strong>" + name + "</strong></h2>");
  card.insertAdjacentHTML("beforeend", "<p><strong>" + id + "</strong></p>");
  card.insertAdjacentHTML("beforeend", "<p><strong>" + ability + "</strong></p>");
  card.insertAdjacentHTML("afterbegin", "<img src=" + image + "></img>");
  container.insertAdjacentElement("beforeend", card);
}

// Función para obtener datos por tipo
async function fetchByType(type) {
  let url = `https://pokeapi.co/api/v2/type/${type}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemons = await Promise.all(
    data.pokemon.map(entry => fetch(entry.pokemon.url).then(res => res.json()))
  );
  return pokemons;
}

async function fetchPokemon(nombreId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nombreId}`;

  const response = await fetch(url);

  if(!response.ok){
    throw new Error("No se encontró el pokemon especificado");
  }
  return await response.json();

  //return new Promise(data);
}

// Función para obtener datos por habilidad
async function fetchByAbility(ability) {
  let url = `https://pokeapi.co/api/v2/ability/${ability}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemons = await Promise.all(
    data.pokemon.map(entry => fetch(entry.pokemon.url).then(res => res.json()))
  );
  return pokemons;
}

// Función para obtener tipos o habilidades de la API
async function fetchData(endpoint) {
  const url = `https://pokeapi.co/api/v2/${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Función para llenar el segundo select con tipos o habilidades
async function fillSelect(param) {
  secSelect.classList.remove("hidden");
  secSelect.innerHTML = '<option selected disabled>Seleccione una opción</option>';
  
  let endpoint = '';
  if (param === 'type') {
    endpoint = 'type';
  } else if (param === 'ability') {
    endpoint = 'ability';
  }

  if (endpoint) {
    const data = await fetchData(endpoint);
    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.name;
      option.innerHTML = item.name;
      secSelect.appendChild(option);
    });
  }
}

// Evento de cambio en el primer select
mainSelect.addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  // Rellenar el segundo select basado en el filtro elegido
  if(selectedValue !== "pokemon"){
    let inpt = document.querySelector(".input");
    inpt.classList.add("hidden");
    inpt.classList.remove("shown");
    fillSelect(selectedValue);
  }else{
    secSelect.classList.add("hidden");
    secSelect.classList.remove("shown");
    let inpt = document.querySelector(".input");
    inpt.classList.remove("hidden");
    inpt.classList.add("shown");
  }
  
});

// Evento de cambio en el segundo select
secSelect.addEventListener("change", async (e) => {
  container.innerHTML = '';  // Limpiar los resultados previos
  const selectedValue = e.target.value;
  const mainFilter = mainSelect.value;
  
  if (mainFilter === "type") {
    // Obtener los pokemons según el tipo
    const pokemons = await fetchByType(selectedValue);
    pokemons.forEach(pokemon => {
      insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"+ pokemon.id +".gif");
    });
  } else if (mainFilter === "ability") {
    // Obtener los pokemons según la habilidad
    const pokemons = await fetchByAbility(selectedValue);
    pokemons.forEach(pokemon => {
      insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"+ pokemon.id +".gif");
    });
  }
});

document.querySelector("#searchBtn").addEventListener("click", async (e)=>{
  container.innerHTML = '';
  let nombreId = document.querySelector("#searchValue").value;
  const pokemon = await fetchPokemon(nombreId);
  insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities[0].ability.name, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"+ pokemon.id +".gif");
});