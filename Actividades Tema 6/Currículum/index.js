// 1. Función para cargar el archivo JSON
async function cargarCurriculum() {
  try {
    const response = await fetch("cv.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.curriculum_vitae;
  } catch (error) {
    console.error("Error cargando el curriculum:", error);
  }
}

cargarCurriculum().then((curriculum) => {
  generarHTML(curriculum);
});

// 3. Función para mostrar datos en el HTML
async function generarHTML(data) {
    let results = await fetch('https://randomuser.me/api/');
    if (!results.ok) {
        throw new Error("No se pudo obtener la información");
    }



    let userData = await results.json();
  const contenedor = document.getElementById("curriculum-container");
  // Información personal
  contenedor.innerHTML = `
        <div id="cvHeader">
            <div id="nombre">
                <img src="${userData.results[0].picture.large}">
                <h1>${data.informacion_personal.nombre_completo}</h1>
            </div>
            <div id="contacto">
                <p>📧 ${data.informacion_personal.contacto.email}</p>
                <p>📱 ${data.informacion_personal.contacto.telefono}</p>
            </div>
        </div>

        <hr>
        <div id="cvBody">
            <main>
                <h2>Experiencia Laboral</h2>
                ${data.experiencia_laboral
                    .map(
                    (exp) => `
                    <div class="experiencia">
                    <h3>${exp.posicion}</h3>
                    <p><strong>Empresa:</strong> ${exp.empresa}</p>
                    <p><strong>Periodo:</strong> ${exp.periodo}</p>
                    <ul>
                        ${exp.responsabilidades.map((resp) => `<li>${resp}</li>`).join("")}
                    </ul>
                    </div>
                `
                )
                .join("")}
                <hr>
                <h2>Habilidades Técnicas</h2>
                <div class="habilidades">
                ${Object.entries(data.habilidades_tecnicas)
                .map(
                    ([categoria, items]) => `
                <div class="categoria">
                    <h3>${categoria.replace("_", " ").toUpperCase()}</h3>
                    <ul>
                    ${items.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
                `
                )
                .join("")}
                </div>
            </main>
            <aside>
                <div class="otros">
                    <h3>Otros</h3>
                    <p><strong>Intereses</strong></p>
                    <ul>
                        ${data.otros.intereses.map((interes)=> `<li>${interes}</li>`).join("")}
                    </ul>
                    <br>
                    <p><strong>Voluntariado</strong></p>
                    <p>${data.otros.voluntariado}</p>
                    <br>
                    <p><strong>Disponibilidad</strong>: ${data.otros.disponibilidad}</p>
                    <hr>
                    <br>
                    <h3>Idiomas</h3>
                    <p><strong>${data.idiomas[0].idioma}</strong></p>
                    <p>${data.idiomas[0].nivel}</p>
                    <br>
                    <p><strong>${data.idiomas[1].idioma}</strong></p>
                    <p>${data.idiomas[1].nivel}</p>

                </div>
            </aside>
        </div>
    `;
}