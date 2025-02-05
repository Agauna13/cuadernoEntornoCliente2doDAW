export const mainSelect = document.querySelector("#mainSelect");
export const secSelect = document.querySelector("#secondarySelect");
export const container = document.querySelector(".container");



// Función para insertar una carta de Pokémon en el DOM
export function insertPokemonCard(name, id, ability, image) {
  let card = document.createElement("div");
  let button = document.createElement("button");
  button.setAttribute("class", "delete");
  button.classList.add("button-44");
  button.setAttribute("role", "button");
  button.innerText = "Delete";
  card.setAttribute("class", "card");
  card.insertAdjacentHTML(
    "afterbegin",
    "<h2><strong>" +
    name.charAt(0).toUpperCase() +
    name.slice(1) +
    "</strong></h2>"
  );
  card.insertAdjacentHTML("beforeend", "<img src=" + image + "></img>");
  card.insertAdjacentHTML(
    "beforeend",
    "<p><strong>Pokemon ID: " + id + "</strong></p>"
  );
  card.insertAdjacentHTML(
    "beforeend",
    "<p><strong>Ability: " + ability + "</strong></p>"
  );
  card.insertAdjacentElement("beforeend", button);
  container.insertAdjacentElement("beforeend", card);
}

// Función para obtener datos por tipo
export async function fetchByType(type) {
  let url = `https://pokeapi.co/api/v2/type/${type}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemons = await Promise.all(
    data.pokemon.map((entry) =>
      fetch(entry.pokemon.url).then((res) => res.json())
    )
  );
  return pokemons;
}

export async function fetchPokemon(nombreId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${nombreId}`;

  const response = await fetch(url);

  if (!response.ok) {
    return false;
  }
  return await response.json();

  //return new Promise(data);
}

// Función para obtener datos por habilidad
export async function fetchByAbility(ability) {
  let url = `https://pokeapi.co/api/v2/ability/${ability}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemons = await Promise.all(
    data.pokemon.map((entry) =>
      fetch(entry.pokemon.url).then((res) => res.json())
    )
  );
  return pokemons;
}

// Función para obtener tipos o habilidades de la API
export async function fetchData(endpoint, params = "") {
  const url = `https://pokeapi.co/api/v2/${endpoint}${params}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Función para llenar el segundo select con tipos o habilidades
export async function fillSelect(param) {
  secSelect.classList.remove("hidden");
  secSelect.innerHTML =
    "<option selected disabled>Seleccione una opción</option>";

  let endpoint = "";
  if (param === "type") {
    endpoint = "type";
  } else if (param === "ability") {
    endpoint = "ability";
  }

  if (endpoint) {
    const data = await fetchData(endpoint);
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.name;
      option.innerHTML = item.name;
      secSelect.appendChild(option);
    });
  }
}

export function addButtonListener() {
  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      let targ = e.target;
      targ.closest(".card").remove(); // Corrected `.closest()` usage
    });
  });
}

