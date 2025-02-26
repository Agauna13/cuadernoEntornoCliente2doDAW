export const mainSelect = document.querySelector("#mainSelect");
export const secSelect = document.querySelector("#secondarySelect");
export const container = document.querySelector(".container");



// Función para insertar una carta de Pokémon en el DOM
export function insertPokemonCard(name, id, ability, image, flavorText) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  container.insertAdjacentHTML("beforeend", `<div class="card">
        <div class="cardHeader">
            <p>${name}</p>
            <button class="delete">&#10006</button>
        </div>
        <div class="cardBody">
            <div class="cardImage">
                <img src="${image}" alt="">
                <p><strong>Ability:</strong> ${ability}</p>
                <p><strong>ID:</strong> ${id}</p>
            </div>
            <div class="cardInfo">
                <p>${flavorText}</p>
            </div>
        </div>

    </div>`);
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


export async function fetchFlavorText(pokemonIdOrName) {
  try {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIdOrName}/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("No se encontró el Pokémon");

      const data = await response.json();

      // Buscar el flavor text en español
      const flavorEntry = data.flavor_text_entries.find(entry => entry.language.name === "es");

      return flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, " ") : "Otro bicho de éstos mas, son todos una adaptación japonesa de alguna animal real con cosas raras extra";
  } catch (error) {
      console.error("Error obteniendo el flavor text:", error);
      return "Otro bicho de éstos mas, son todos una adaptación japonesa de alguna animal real con cosas raras extra";
  }
}

// Función para verificar si la imagen existe usando fetch
export async function checkImageExists(url) {
  try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok; // Retorna true si la imagen existe, false si no
  } catch (error) {
      return false; // Retorna false si hay un error en la petición
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

