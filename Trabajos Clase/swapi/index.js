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

document.querySelector("#searchBtn").addEventListener("click", async () => {
    container.innerHTML = "";
    let userInput = document.getElementById("userInput").value;

    if (userChoice === "people") {
        let character = await fetchApi(`https://swapi.dev/api/people/?search=${userInput}`);
        insertCharacterCard(character);
    }
    if (userChoice === "planets") {
        let planet = await fetchApi(`https://swapi.dev/api/planets/?search=${userInput}`);
        insertPlanetCard(planet);
    }
    if (userChoice === "starships") {
        let starShip = await fetchApi(`https://swapi.dev/api/starships/?search=${userInput}`);
        insertShipCard(starShip);
    }
    if (userChoice === "all") {
        let characterData = await fetchApi(`https://swapi.dev/api/people/${userInput}/`);
        let planetData = await fetchApi(`https://swapi.dev/api/planets/${userInput}/`);
        let starshipData = await fetchApi(`https://swapi.dev/api/starships/${userInput}/`);
        
        insertCharacterCard(characterData);
        insertPlanetCard(planetData);
        insertShipCard(starshipData);
    }
});

async function fetchApi(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("No se pudo obtener la información");
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Error:", error);
        return null; // Devolvemos null en caso de error
    }
}

function insertCharacterCard(character) {
    if (!character) {
        container.insertAdjacentHTML("beforeend", "<h2>No se encontró información del Personaje</h2>");
        return;
    }

    let charactersArray = character.results || [character]; // Si hay `results`, es búsqueda por nombre; si no, es ID.

    charactersArray.forEach(person => {
        container.insertAdjacentHTML("beforeend", `
            <div class="card">
                <div class="cardHeader">
                    <h3>${person.name}</h3>
                </div>
                <div class="cardBody">
                    <p>Género: ${person.gender}</p>
                    <p>Año de nacimiento: ${person.birth_year}</p>
                    <p>Pelo: ${person.hair_color}</p>
                    <p>Color de Piel: ${person.skin_color}</p>
                    <p>Color de ojos: ${person.eye_color}</p>
                    <p>Planeta de Nacimiento: <a href="${person.homeworld}">${person.homeworld}</a></p>
                </div>
            </div>
        `);
    });
}

function insertPlanetCard(planet) {
    if (!planet) {
        container.insertAdjacentHTML("beforeend", "<h2>No se encontró información del planeta</h2>");
        return;
    }

    let planetsArray = planet.results || [planet];

    planetsArray.forEach(p => {
        container.insertAdjacentHTML("beforeend", `
            <div class="card">
                <div class="cardHeader">
                    <h3>${p.name}</h3>
                </div>
                <div class="cardBody">
                    <p>Periodo Rotacional: ${p.rotation_period}</p>
                    <p>Periodo orbital: ${p.orbital_period}</p>
                    <p>Diámetro: ${p.diameter}</p>
                    <p>Condiciones Climáticas: ${p.climate}</p>
                    <p>Componente Gravitatorio: ${p.gravity}</p>
                    <p>Terreno: ${p.terrain}</p>
                </div>
            </div>
        `);
    });
}

function insertShipCard(starShip) {
    if (!starShip) {
        container.insertAdjacentHTML("beforeend", "<h2>No se encontró información de la nave</h2>");
        return;
    }

    let shipsArray = starShip.results || [starShip];

    shipsArray.forEach(s => {
        container.insertAdjacentHTML("beforeend", `
            <div class="card">
                <div class="cardHeader">
                    <h3>${s.name}</h3>
                </div>
                <div class="cardBody">
                    <p>Modelo: ${s.model}</p>
                    <p>Costo en créditos: ${s.cost_in_credits}</p>
                    <p>Capacidad de tripulación: ${s.crew}</p>
                    <p>Longitud: ${s.length}</p>
                </div>
            </div>
        `);
    });
}
