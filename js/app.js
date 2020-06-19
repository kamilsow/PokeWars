const randomButtons = document.querySelectorAll('.pick')
const loader = `<div class="loader-wrapper"><div class="loader-text">Loading...</div><span class="loader"><span class="loader-inner"></span></span></div>`;

const randomPicker = (i) => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + (Math.floor(Math.random() * 807) + 1);
    fetch(url).then(data => data.json())
        .then(jsonObject => {
            console.log(jsonObject)
            return createPokeObject(jsonObject)
        }).then(pokemon => {
            createPokeTab(i, pokemon)
            checkType()
            createHpBar(pokemon, i)
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
const createPokeTab = (i, pokemon) => {
    console.log(i)
    let out = `
        <div class="card">
            <h1>${pokemon.name}</h1>
            <div class="hp-bar"></div>
            <img src=${pokemon.imgFront}>
            <div class="type">${pokemon.typesOut}</div>
            <div class="poke-info">
                <div class="stats">
                    <div><img src="img/crossed-swords.png"><p>${pokemon.attack} ${pokemon.attackValue}</p></div>
                    <div><img src="img/checked-shield.png"><p>${pokemon.defense} ${pokemon.defenseValue}</p></div>
                    <div><img src="img/wingfoot.png"><p>${pokemon.speed} ${pokemon.speedValue}</p></div>
                    <div><img src="img/heart-plus.png"><p>${pokemon.hp} ${pokemon.hpValue}</p></div>
                </div>
                <div class="id">Pokemon id: ${pokemon.id}</div>
            <div>
        </div>
    `
    document.querySelectorAll('.pokemon')[i].innerHTML = out;
}
const createType = (pokeType) => {
    return `<p class="${pokeType}">${pokeType}</p>`
}
const checkType = () => {
    var types = document.querySelectorAll('.type');
    Array.from(types).forEach(type => {
        var cardType = type.firstElementChild.textContent;
        var typeArr = ['bug', 'dark', 'normal', 'fire', 'dragon', 'flying', 'electric', 'fairy', 'fighting', 'ghost', 'poison', 'grass', 'ground', 'ice', 'steel', 'psychic', 'rock', 'water'];
        for (let i = 0; i < typeArr.length; i++) {
            if (cardType == typeArr[i]) {
                type.parentElement.firstElementChild.classList.add(typeArr[i]);
                //type.parentElement.lastElementChild.classList.add(typeArr[i]);
                type.parentElement.children[3].classList.add(typeArr[i] + '2');
                type.parentElement.classList.add(typeArr[i] + '2');
                break;
            }
        }
    })
}
const createHpBar = (pokemon, i) => {
    var currentHp = pokemon.hpValue;
    let out = `
        <div class="hp-bar">${currentHp}/${currentHp}</div>
    `
    document.querySelectorAll('.pokemon')[i].innerHTML += out;
}
for (let i = 0; i < 2; i++) {
    document.querySelectorAll('.pick')[i].addEventListener('click', function() {
        document.querySelectorAll('.pokemon')[i].innerHTML = loader
        randomPicker(i)
    })
}