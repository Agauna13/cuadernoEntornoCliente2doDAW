/*He separado en 2 archivos para mejor claridad. En éste encontraás
los escuchadores de eventos que esperan las promesas hechas por los fetch de domComponents.js */



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
  addButtonListener,
  fetchFlavorText,
  checkImageExists 
} from "./domComponents.js";

var results = 0; //contador que iremos incrementando para mostrar el número de resultados encontrados

// Evento Para controlar cuando cambiamos algo en el primer Select
mainSelect.addEventListener("change", async (e) => {
  const selectedValue = e.target.value;
  //capturamos el valor seleccionado y en función a ello mostramos el segundo select para
  //filtrar por Habilidad, tipo o habilitar un input para introducir nombre o ID y buscar un 
  //Pokemon determinado en la appi
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
  //para mostrar todos los pokemon podemos seleccionar mostrarlos todos y haremos un fetch de los 1025 pokemons oficiales.
  if (selectedValue === "pokemon?limit=1025&offset=0") {
    secSelect.classList.add("hidden");
    secSelect.classList.remove("shown");
    const pokemons = await fetchData("pokemon", "?limit=1025&offset=0"); //esperamos la respuesta de la funcion que nos hace el fetch
    results = 0;

    //Al recibirla, mapeamos el resultado convirtiendo los pokemons a objetos json y buscamos el texto que describe al pokemon.
    const allPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        const data = await fetch(pokemon.url).then(res => res.json());
        const flavorText = await fetchFlavorText(data.id);
        return { ...data, flavorText };
      })
    );

    allPokemons.sort((a, b) => a.id - b.id);

    //cuando tenemos la promesa procesada, contamos cada pokemon que hemos conseguido y
    //hacemos la inserción de cartas mediante la funcion que nos lo mete como adyacente al
    //contenedor.
    allPokemons.forEach(async pokemon => {
      results++;
      let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
      let imageExists = await checkImageExists(imageUrl);
      insertPokemonCard(
        pokemon.name,
        pokemon.id,
        pokemon.abilities?.[0]?.ability?.name || "Unknown",
        imageExists ? imageUrl : "./media/pikachuEmpotrao.png", // Imagen de respaldo si no existe
        pokemon.flavorText
      );
    });

    //imprimimos un pequeño mensaje para mostrar el numero de pokemons encontrados
    document.querySelector("#results").innerText = `Found Pokemons: ${results}`;
    addButtonListener(); //añadimos a todos los botones el evento que elimina el pokemon

  }
});

// Evento de cambio en el segundo select (filtro por tipo o habilidad)
secSelect.addEventListener("change", async (e) => {
  container.innerHTML = "";
  const selectedValue = e.target.value;
  const mainFilter = mainSelect.value;
  results *= 0;

  let pokemons = [];

  if (mainFilter === "type") {
    pokemons = await fetchByType(selectedValue);
  } else if (mainFilter === "ability") {
    pokemons = await fetchByAbility(selectedValue);
  }

  const allPokemons = await Promise.all(
    pokemons.map(async (pokemon) => {
      const data = await fetchPokemon(pokemon.id);
      const flavorText = await fetchFlavorText(data.id);
      return { ...data, flavorText };
    })
  );

  allPokemons.sort((a, b) => a.id - b.id);

  allPokemons.forEach(async pokemon => {
    results++;
    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
    let imageExists = await checkImageExists(imageUrl);
    insertPokemonCard(
      pokemon.name,
      pokemon.id,
      pokemon.abilities[0]?.ability?.name || "Unknown",
      imageExists ? imageUrl : "./media/pikachuEmpotrao.png", // Imagen de respaldo si no existe
      pokemon.flavorText
    );
  });

  document.querySelector("#results").innerText = `Found Pokemons: ${results}`;
  addButtonListener();
});

// Evento de búsqueda por nombre o ID
document.querySelector("#searchBtn").addEventListener("click", async () => {
  results *= 0;
  container.innerHTML = "";
  let nombreId = document.querySelector("#searchValue").value;
  const pokemon = await fetchPokemon(nombreId);

  if (!pokemon) {
    container.innerHTML =
      "<p style='color: red; font-weight: bold;'>No se encontró un Pokémon con ese nombre o ID.</p>";
    return;
  }

  const flavorText = await fetchFlavorText(pokemon.id);
  let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
  let imageExists = await checkImageExists(imageUrl);

  insertPokemonCard(
    pokemon.name,
    pokemon.id,
    pokemon.abilities[0]?.ability?.name || "Unknown",
    imageExists ? imageUrl : "./media/pikachuEmpotrao.png", // Imagen de respaldo si no existe,
    flavorText
  );

  addButtonListener();
  document.querySelector("#results").innerText = "";
});
