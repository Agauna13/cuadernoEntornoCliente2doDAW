const container = document.getElementById("container");

async function createProduct() {
  let p = await getProduct();

  p.productos.forEach(async (producto) => {
    let image = await getImage(producto.id);
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="producto">
            <h3>${producto.producto}</h3>
            <p>${producto.descripcion}</p>
            <img src="${image}" alt="foto de café random">
            <p><strong>${producto.precio}€/kg</strong></p>
        </div>
    `;
    
    container.insertAdjacentElement("beforeend", div);

  });
}

async function getProduct() {
  let response = await fetch("productos.json");
  let data = await response.json();
  return data;
}

async function getImage(coffeeId) {
  const response = await fetch(
    `https://fake-coffee-api.vercel.app/api/${coffeeId}`
  );

  //debido a problemas con imágenes repetidas y restricciones de CORS, 
  //he buscado las imágenes en ésta api https://fake-coffee-api.vercel.app/
  //y me traigo la imágen en función del ID del tipo de café.
  const data = await response.json();
  console.log(data[0].image_url);
  const imagenURL = data[0].image_url;
  return imagenURL;
}


document.addEventListener("DOMContentLoaded", () =>{
  createProduct();
});
