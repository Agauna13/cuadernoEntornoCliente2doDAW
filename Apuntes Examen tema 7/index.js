const url = "https://api.magicthegathering.io/v1/cards?name=";
const container = document.getElementById('container');

const searchButton = document.querySelector('button');



function createCard(cardInfo){
    container.innerHTML ="";

    cardInfo.forEach(c =>{
    let card = document.createElement('div');
    card.setAttribute("class", 'card');
    card.innerHTML = `<div class="cardHeader">
            <h3 class="cardName">${c.name}</h3>
            <div class="cardManaCost">${c.manaCost}</div>
        </div>
        <div class="cardImg">
            <img src="${c.imageUrl}">
        </div>
        <div class="cardTypes">
            <p>${c.type}</p>
        </div>
        <div class="cardHabilities">
            <p>${c.text}</p>
        </div>`;
    
    container.insertAdjacentElement("beforeend", card);
    })
    
}



async function getCardByName(name){
    console.log(url+name);
    let response = await fetch(url+name);
    let data = await response.json();
    //console.log(data.cards[0].name)
    return data.cards;
}


searchButton.addEventListener('click', async (e)=>{
    const cardName = document.getElementById('cardName').value;
    e.preventDefault();
    let card = await getCardByName(cardName);
    createCard(card);
})