import { comunidades, marcasModelos } from "./objetos.js";


const selectMarca = document.getElementById("marcasModelos");//relleno
const selectModelo = document.getElementById("modeloVehiculo");//a rellenar
const selectComunidad = document.getElementById("comunidad"); //relleno
const selectProvincia = document.getElementById("provincia");//a rellenar

/*
export const comunidades = [
    {
        comunidad: "Andalucía",
        provincias: ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]
    },
    
    
export const marcasModelos = [
    {
        marca: "Toyota",
        modelos: ["Corolla", "Camry", "RAV4", "Highlander", "Prius", "Yaris", "Tacoma", "Tundra", "C-HR"]
    }
    
*/

function fillSelect(objeto, elementoHtml, key){
    elementoHtml.innerHTML="";
    objeto.forEach((item)=>{
        const option = document.createElement("option");
        option.value = item[key];
        option.textContent = item[key];
        elementoHtml.appendChild(option);
    })
}

fillSelect(comunidades, selectComunidad, "comunidad");
fillSelect(marcasModelos, selectMarca, "marca");




function fillDependantSelect(selectedItem, selectedObject, targetElement){
    let clave, valor;
    if(selectedObject === marcasModelos){
        clave = "marca";
        valor = "modelos";
    }else if(selectedObject === comunidades){
        clave = "comunidad";
        valor = "provincias";
    }
    targetElement.innerHTML = '<option value="">Seleccione una opción</option>';
    const foundItem = selectedObject.find((item) => item[clave] === selectedItem);

    if(foundItem){
        foundItem[valor].forEach((subItem)=>{
            const option = document.createElement("option");
            option.value = subItem;
            option.textContent = subItem;
            targetElement.appendChild(option);
        });
    }
}

function handleSelectChange(event, selectedObject, targetElement) {
    const selectedItem = event.target.value;
    targetElement.innerHTML = '<option value="">Seleccione una opción</option>';

    console.log(selectedItem);
    console.log(selectedObject);
    console.log(targetElement);

    fillDependantSelect(selectedItem, selectedObject, targetElement);
}


selectComunidad.addEventListener("change", (event) => {
    handleSelectChange(event, comunidades, selectProvincia);
});

selectMarca.addEventListener("change", (event) => {
    handleSelectChange(event, marcasModelos, selectModelo);
});


