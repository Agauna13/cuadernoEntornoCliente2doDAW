/**
 * Necesitamos:
 * 
 * Filtrar por tipo de pokemon
 * 
 * Fultrar pokemon por habilidad
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