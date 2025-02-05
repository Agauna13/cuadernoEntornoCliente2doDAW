/**
 * Necesitamos:
 * 
 * Filtrar por tipo de pokemon
 * 
 * Filtrar pokemon por habilidad
 * 
 * Extraer info de las especies (como si fuera una wiki)
 * 
 * buscar por nombre
 * 
 * buscar por ID
 * 
 * Buscar por rango de ID
 * 
 * 
 */
import { 
  mainSelect, 
  secSelect, 
  container, 
  insertPokemonCard, 
  fetchByType, 
  fetchPokemon, 
  fetchByAbility, 
  fetchData, 
  fillSelect, 
  addButtonListener 
} from "./domComponents.js";


var results = 0;
/*

async function fetchApi(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();

        let pokemonList = [];

        if (Array.isArray(data.results)) {
            pokemonList = data.results.map(p => p.url);
        } else if (Array.isArray(data.pokemon)) {
            pokemonList = data.pokemon.map(entry => entry.pokemon.url);
        } else {
            throw new Error("Estructura de datos no reconocida.");
        }

        let pokemonDetails = await Promise.all(pokemonList.map(url => fetch(url).then(res => res.json())));

        pokemonDetails.forEach(pokemon => {
            console.log(`Nombre: ${pokemon.name}, ID: ${pokemon.id}`);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

// Llamadas a la función
fetchApi("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");

fetchApi("https://pokeapi.co/api/v2/type/3");

/*
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
  
    fetchApi('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');*/


  // Evento de cambio en el primer select
mainSelect.addEventListener("change", async (e) => {
  const selectedValue = e.target.value;
  // Rellenar el segundo select basado en el filtro elegido
  if (selectedValue !== "pokemon") {
    let inpt = document.querySelector(".input");
    inpt.classList.add("hidden");
    inpt.classList.remove("shown");
    fillSelect(selectedValue);
  } else {
    secSelect.classList.add("hidden");
    secSelect.classList.remove("shown");
    let inpt = document.querySelector(".input");
    inpt.classList.remove("hidden");
    inpt.classList.add("shown");
  }

  if (selectedValue === "pokemon?limit=1025&offset=0") {
    secSelect.classList.add("hidden");
    secSelect.classList.remove("shown");
    const pokemons = await fetchData("pokemon", "?limit=1025&offset=0");
    results *= 0;

    const allPokemons = await Promise.all(
      pokemons.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
    );

    allPokemons.forEach(pokemon =>{
      results++;
      insertPokemonCard(pokemon.name, pokemon.id, pokemon.abilities?.[0]?.ability?.name || "Unknown", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`);
    });
    document.querySelector("#results").innerText = `Found Pokemons: ${results}`;
    addButtonListener();
  }
});

// Evento de cambio en el segundo select
secSelect.addEventListener("change", async (e) => {
  container.innerHTML = ""; // Limpiar los resultados previos
  const selectedValue = e.target.value;
  const mainFilter = mainSelect.value;

  if (mainFilter === "type") {
    // Obtener los pokemons según el tipo
    const pokemons = await fetchByType(selectedValue);
    results *= 0;
    pokemons.forEach((pokemon) => {
      results++;
      insertPokemonCard(
        pokemon.name,
        pokemon.id,
        pokemon.abilities[0].ability.name,
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
          pokemon.id +
          ".gif"
      );
    });
    document.querySelector("#results").innerText = `Found Pokemons: ${results}`;
    addButtonListener();
  } else if (mainFilter === "ability") {
    // Obtener los pokemons según la habilidad
    const pokemons = await fetchByAbility(selectedValue);
    results *= 0;
    pokemons.forEach((pokemon) => {
      results++;
      insertPokemonCard(
        pokemon.name,
        pokemon.id,
        pokemon.abilities[0].ability.name,
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
          pokemon.id +
          ".gif"
      );
    });
    addButtonListener();
  }

  document.querySelector("#results").innerText = `Found Pokemons: ${results}`;
});

document.querySelector("#searchBtn").addEventListener("click", async (e) => {
  results *= 0;
  container.innerHTML = "";
  let nombreId = document.querySelector("#searchValue").value;
  const pokemon = await fetchPokemon(nombreId);

  if (!pokemon) {
    container.innerHTML =
      "<p style='color: red; font-weight: bold;'>No se encontró un Pokemon con ese nombre o ID.</p>";
    return;
  }
  insertPokemonCard(
    pokemon.name,
    pokemon.id,
    pokemon.abilities[0].ability.name,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
      pokemon.id +
      ".gif"
  );
  addButtonListener();
  document.querySelector("#results").innerText = "";
});
