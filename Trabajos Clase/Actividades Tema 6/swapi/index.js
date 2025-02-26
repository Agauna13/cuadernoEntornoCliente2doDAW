//index.js

//https://swapi.dev/api/people/?search=maul --> para buscar por nombre.

//planets/?search=Tatooine --> para planetas

//starships/?search=falcon  --> para naves

const mainUrl = "https://swapi.dev/api/";
const container = document.getElementById("container");

var userChoice;
document.querySelector("#searchParamSelector").addEventListener("change", (e)=>{
    userChoice = e.target.value;
    document.querySelector(".searchBar").classList.remove("hidden");
});

document.querySelector("#searchBtn").addEventListener("click", async ()=>{
    let userInput = document.getElementById("userInput").value;
    if(userChoice === "people"){
        let character = await fetchApi(`https://swapi.dev/api/people/?search=${userInput}`);
        insertCharacterCard(character);
    }
    if(userChoice === "planets"){
        let planet = await fetchApi(`https://swapi.dev/api/planets/?search=${userInput}`);
        insertPlanetCard(planet);

    }
    if(userChoice === "starships"){
        let starShip = await fetchApi(`https://swapi.dev/api/starships/?search=${userInput}`);
        insertShipCard(starShip);
    }
    if(userChoice === "all"){
        let characterData = await fetchApi(`https://swapi.dev/api/people/${userInput}/`);
        let planetData = await fetchApi(`https://swapi.dev/api/planets/${userInput}/`);
        let starshipData = await fetchApi(`https://swapi.dev/api/starships/${userInput}/`);
        insertCard(characterData);
        insertCard(planetData);
        insertCard(starshipData);
    }
})




async function fetchApi(params) {
    try {
        let result = await fetch(params);

        if (!result.ok) {
            throw new Error("No se pudo obtener la información");
        }

        let data = await result.json();

        // Si la API no devuelve resultados, devolvemos un array vacío
        if (!data.results || data.results.length === 0) {
            return { results: [] };
        }

        return data;
    } catch (error) {
        console.error("❌ Error:", error);
        return { results: [] }; // Evitamos que el código falle
    }
}

function insertCharacterCard(character) {
    container.innerHTML = "";
    if (character.results.length === 0) {
        container.insertAdjacentHTML("beforeend", "<h2>No se encontró información del Personaje</h2>");
        return;
    }

    character.results.forEach(person => {
        container.insertAdjacentHTML("beforeend", `
            <div class="card">
                <h3>${person.name}</h3>
                <p>Género: ${person.gender}</p>
                <p>Año de nacimiento: ${person.birth_year}</p>
                <p>Pelo: ${person.hair_color}</p>
                <p>Color de Piel: ${person.skin_color}</p>
                <p>Color de ojor: ${person.eye_color}</p>
                <p>Género: ${person.gender}</p>
                <p>planeta de Nacimiento: <a href="${person.homeworld}">${person.homeworld}</a></p>
            </div>
        `);
    });
}


function insertPlanetCard(planet){
    container.innerHTML = "";
    if (planet.results.length === 0) {
        container.insertAdjacentHTML("beforeend", "<h2>No se encontró información del planeta</h2>");
        return;
    }

    planet.results.forEach(p => {
        container.insertAdjacentHTML("beforeend", `
            <div class="card">
                <h3>${p.name}</h3>
                <p>Periodo Rotacional: ${p.rotation_period}</p>
                <p>Periodo orbital: ${p.orbital_period}</p>
                <p>Diametro: ${p.diameter}</p>
                <p>Condiciones Climaticas: ${p.climate}</p>
                <p>Componenta Gravitatoria: ${p.gravity}</p>
                <p>Terreno: ${p.terrain}</p>
            </div>
        `);
    });

}

function insertShipCard(starShip){

}