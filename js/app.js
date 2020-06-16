const randomButtons = document.querySelectorAll('.pick')
const loader = `<div class="loader-wrapper"><div class="loader-text">Loading...</div><span class="loader"><span class="loader-inner"></span></span></div>`;

const randomPicker = (e) => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + (Math.floor(Math.random() * 807) + 1);
    fetch(url).then(data => data.json())
        .then(jsonObject => {
            console.log(jsonObject)
            return createPokeObject(jsonObject)
        }).then(pokemon => {
            createPokeTab(e, pokemon)
            checkType()
        })
}
const createPokeObject = (jsonObject) => {
    jsonObject.types.sort((a, b) => (a.slot > b.slot) ? 1 : -1)
    typesOut = createType(jsonObject.types[0].type.name);
    const pokemon = {
        imgFront: jsonObject.sprites.front_default,
        name: jsonObject.species.name,
        attack: jsonObject.stats[1].stat.name,
        attackValue: jsonObject.stats[1].base_stat,
        defense: jsonObject.stats[2].stat.name,
        defenseValue: jsonObject.stats[2].base_stat,
        speed: jsonObject.stats[5].stat.name,
        speedValue: jsonObject.stats[5].base_stat,
        hp: jsonObject.stats[0].stat.name,
        hpValue: jsonObject.stats[0].base_stat,
        id: jsonObject.id, 
        typesOut: typesOut
    }
    return pokemon
}
const createPokeTab = (e, pokemon) => {
    out = `
        <div class="card">
            <h1>${pokemon.name}</h1>
            <img src=${pokemon.imgFront}>
            <div class="stats">
                <div><img src="img/sword.png"><p>${pokemon.attack} ${pokemon.attackValue}</p></div>
                <div><img src="img/shield.png"><p>${pokemon.defense} ${pokemon.defenseValue}</p></div>
                <div><img src="img/speed.png"><p>${pokemon.speed} ${pokemon.speedValue}</p></div>
                <div><img src="img/heart.png"><p>${pokemon.hp} ${pokemon.hpValue}</p></div>
            </div>
            <div class="types">
                <p>Type:</p>
                <div class="typeValues">${pokemon.typesOut}</div>
            </div>
            <div class="id">${pokemon.id}</div>
        </div>
    `
    e.target.parentElement.innerHTML += out
}
function createType(pokeType) {
    return `<p class="${pokeType}">${pokeType}</p>`
}
function checkType() {
    var types = document.querySelectorAll('.types');
    Array.from(types).forEach(type => {
        var cardType = type.children[1].firstElementChild.textContent;
        var typeArr = ['bug', 'dark', 'normal', 'fire', 'dragon', 'flying', 'electric', 'fairy', 'fighting', 'ghost', 'poison', 'grass', 'ground', 'ice', 'steel', 'psychic', 'rock', 'water'];
        for (let i = 0; i < typeArr.length; i++) {
            if (cardType == typeArr[i]) {
                type.parentElement.firstElementChild.classList.add(typeArr[i]);
                type.parentElement.lastElementChild.classList.add(typeArr[i]);
                type.parentElement.classList.add(typeArr[i] + '2');
                break;
            }
        }
    })
}
Array.from(randomButtons).forEach(button => {
    button.addEventListener('click', function(e) {
        e.target.parentElement.innerHTML = loader;
        randomPicker(e)
    })
})