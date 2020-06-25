// CARD CREATION
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
                type.parentElement.children[3].classList.add(typeArr[i] + '2');
                type.parentElement.classList.add(typeArr[i] + '2');
                break;
            }
        }
    })
}
const createHpBar = (pokemon, i) => {
    var health = pokemon.hpValue
    let out = `
        <div class="total">${health}/${health}</div>
        <div class="health-box">
            <div class="health-bar-red"></div>
            <div class="health-bar-blue"></div>
            <div class="health-bar"></div>
            <div class="health-bar-text">100%</div>
        </div>
    `
    document.querySelectorAll('.pokemon')[i].innerHTML += out;
}
for (let i = 0; i < 2; i++) {
    document.querySelectorAll('.pick')[i].addEventListener('click', function () {
        document.querySelectorAll('.pokemon')[i].innerHTML = loader
        randomPicker(i)
    })
}
// BATTLE

document.querySelector("#start").addEventListener('click', function () {
    const pokeOneMaxHealth = parseInt(document.querySelectorAll('.total')[0].innerHTML.substring(0, Math.floor(document.querySelectorAll('.total')[0].innerHTML.length / 2)));
    const pokeTwoMaxHealth = parseInt(document.querySelectorAll('.total')[1].innerHTML.substring(0, Math.floor(document.querySelectorAll('.total')[1].innerHTML.length / 2)));
    pokeOneCurHealth = pokeOneMaxHealth;
    pokeTwoCurHealth = pokeTwoMaxHealth;
    const pokeOneAtt = parseInt(document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.length));
    const pokeTwoAtt = parseInt(document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.length));
    console.log('Poke one attack is ' + Math.floor(pokeOneAtt / 3))
    console.log('Poke two attack is ' + Math.floor(pokeTwoAtt / 3))
    const pokeOneAttack = () => {
        const i = 1;
        let damage = Math.floor(pokeOneAtt / 5);
        pokeTwoCurHealth = pokeTwoCurHealth - damage;
        if (pokeTwoCurHealth <= 0) {
            console.log('Poke two died')
            pokeTwoCurHealth = 0;
            end();
        } else {
            console.log('Poke Two took ' + damage + ' points of damage');
        }
        applyChange(pokeTwoCurHealth, pokeTwoMaxHealth, i);
    }
    const pokeTwoAttack = () => {
        const i = 0;
        let damage = Math.floor(pokeTwoAtt / 5);
        pokeOneCurHealth = pokeOneCurHealth - damage;
        if (pokeOneCurHealth <= 0) {
            console.log('Poke One died');
            pokeOneCurHealth = 0;
            end();
        } else {
            console.log('Poke One took ' + damage + ' points of damage');
        }
        applyChange(pokeOneCurHealth, pokeOneMaxHealth, i);
    }
    async function turn () {
        console.log('turn start')
        if (pokeOneCurHealth > 0) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    pokeOneAttack();
                    resolve(console.log('Poke two current hp is ' + pokeTwoCurHealth));
                }, 1500);
            });
        }
        if (pokeTwoCurHealth > 0) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    pokeTwoAttack();
                    resolve(console.log('Poke One current hp is ' + pokeOneCurHealth));
                }, 1500);
            })
        }
        console.log('turn finish')
    }
    interval = setInterval(turn, 3100)
    function end () {
        clearInterval(interval)
    }
});

function applyChange(curHealth, maxHealth, i) {
    var a = curHealth * (100 / maxHealth);
    document.querySelectorAll('.health-bar-text')[i].innerHTML = (Math.round(a) + "%");

    document.querySelectorAll(".health-bar-red")[i].classList.add('animate');
    setTimeout(() => document.querySelectorAll(".health-bar-red")[i].classList.remove('animate'), 1600);
    document.querySelectorAll(".health-bar-red")[i].style.width = (a + "%");

    document.querySelectorAll(".health-bar")[i].classList.add('animate');
    setTimeout(() => document.querySelectorAll(".health-bar")[i].classList.remove('animate'), 200);
    document.querySelectorAll(".health-bar")[i].style.width = (a + "%")

    document.querySelectorAll(".health-bar-blue")[i].classList.add('.animate');
    setTimeout(() => document.querySelectorAll(".health-bar-blue")[i].classList.remove('animate'), 700);
    document.querySelectorAll(".health-bar-blue")[i].style.width = (a + "%")

    document.querySelectorAll('.total')[i].innerHTML = (curHealth + "/" + maxHealth);
}