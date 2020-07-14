// CARD CREATION
const loader = `<div class="loader-wrapper"><div class="loader-text">Loading...</div><span class="loader"><span class="loader-inner"></span></span></div>`
const searchBoxes = document.querySelectorAll('.search-box')
const messageBox = document.querySelector('.message-box')
const picker = (i, query) => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + query
    fetch(url).then(data => data.json())
        .then(jsonObject => {
            console.log(jsonObject)
            return createPokeObject(jsonObject)
        }).then(pokemon => {
            createPoke(i, pokemon)
            checkType()
            createHpBar(pokemon, i)
        })
}
const createPokeObject = (jsonObject) => {
    jsonObject.types.sort((a, b) => (a.slot > b.slot) ? 1 : -1)
    typesOut = createType(jsonObject.types[0].type.name)
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
const createPoke = (i, pokemon) => {
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
                <div class="misc">
                    <div class="id">Pokemon id: ${pokemon.id}</div>
                    <div class="elements"></div>
                    <div class="elements"></div>
                </div>
                
            <div>
        </div>
    `
    document.querySelectorAll('.pokemon')[i].innerHTML = out
}
const createType = (pokeType) => {
    return `<p class="${pokeType}">${pokeType}</p>`
}
const checkType = () => {
    let types = document.querySelectorAll('.type')
    Array.from(types).forEach(type => {
        let cardType = type.firstElementChild.textContent
        const typeArr = ['bug', 'dark', 'normal', 'fire', 'dragon', 'flying', 'electric', 'fairy', 'fighting', 'ghost', 'poison', 'grass', 'ground', 'ice', 'steel', 'psychic', 'rock', 'water']
        const strongAgainst = ['psychic', 'ghost', 'NONE', 'steel', 'bug', 'fighting', 'fire', 'dark', 'rock', 'fairy', 'grass', 'water', 'poison', 'dragon', 'ice', 'electric', 'flying', 'ground']
        const weakAgainst = ['dragon', 'fairy', 'NONE', 'electric', 'ice', 'rock', 'psychic', 'ghost', 'flying', 'dark', 'ground', 'poison', 'water', 'steel', 'fire', 'bug', 'fighting', 'grass']
        for (let i = 0; i < typeArr.length; i++) {
            if (cardType == typeArr[i]) {
                type.parentElement.lastElementChild.children[1].children[1].innerHTML = `Strong against <p class="${strongAgainst[i]}">${strongAgainst[i]}</p>`
                type.parentElement.lastElementChild.children[1].children[2].innerHTML = `Weak against <p class="${weakAgainst[i]}">${weakAgainst[i]}</p>`
                type.parentElement.firstElementChild.classList.add(typeArr[i])
                type.parentElement.children[3].classList.add(typeArr[i] + '2')
                type.parentElement.classList.add(typeArr[i] + '2')
                break
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
    document.querySelectorAll('.pokemon')[i].innerHTML += out
}
for (let i = 0; i < 2; i++) {
    document.querySelectorAll('.pick-random')[i].addEventListener('click', function () {
        document.querySelectorAll('.pokemon')[i].innerHTML = loader
        const query = (Math.floor(Math.random() * 807) + 1)
        picker(i, query)
    })
    document.querySelectorAll('.pick-search')[i].addEventListener('click', function () {
        document.querySelectorAll('.pokemon')[i].innerHTML = loader
        const query = searchBoxes[i].value
        picker(i, query)
    })
}
// BATTLE
/* 
    %DEF reduction (max 90%)
*/
document.querySelector("#stop").addEventListener('click', function () { console.log(Math.floor(Math.random() * 100 + 1)) })
document.querySelector("#start").addEventListener('click', function () {
    messageBox.innerHTML += `Battle starts in 3 sec<br />`
    let counter = 0
    const pokeOne = document.querySelectorAll('.card')[0].firstElementChild.textContent.charAt(0).toLocaleUpperCase() + document.querySelectorAll('.card')[0].firstElementChild.textContent.slice(1)
    const pokeTwo = document.querySelectorAll('.card')[1].firstElementChild.textContent.charAt(0).toLocaleUpperCase() + document.querySelectorAll('.card')[1].firstElementChild.textContent.slice(1)
    const pokeOneMaxHealth = parseInt(document.querySelectorAll('.total')[0].innerHTML.substring(0, Math.floor(document.querySelectorAll('.total')[0].innerHTML.length / 2)))
    const pokeTwoMaxHealth = parseInt(document.querySelectorAll('.total')[1].innerHTML.substring(0, Math.floor(document.querySelectorAll('.total')[1].innerHTML.length / 2)))
    pokeOneCurHealth = pokeOneMaxHealth
    pokeTwoCurHealth = pokeTwoMaxHealth
    let pokeOneAtt = parseInt(document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.length))
    let pokeTwoAtt = parseInt(document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.length))
    const pokeOneDef = parseInt(document.querySelectorAll('.stats')[0].children[1].lastElementChild.innerHTML.substring(8, document.querySelectorAll('.stats')[0].children[1].lastElementChild.length))
    const pokeTwoDef = parseInt(document.querySelectorAll('.stats')[1].children[1].lastElementChild.innerHTML.substring(8, document.querySelectorAll('.stats')[1].children[1].lastElementChild.length))
    const pokeOneSpeed = parseInt(document.querySelectorAll('.stats')[0].children[2].lastElementChild.innerHTML.substring(6, document.querySelectorAll('.stats')[0].children[2].lastElementChild.innerHTML.length))
    const pokeTwoSpeed = parseInt(document.querySelectorAll('.stats')[1].children[2].lastElementChild.innerHTML.substring(6, document.querySelectorAll('.stats')[1].children[2].lastElementChild.innerHTML.length))
    const pokeOneElement = document.querySelectorAll('.type')[0].firstElementChild.textContent
    const pokeTwoElement = document.querySelectorAll('.type')[1].firstElementChild.textContent
    const pokeOneStrong = document.querySelectorAll('.elements')[0].firstElementChild.textContent
    const pokeOneWeak = document.querySelectorAll('.elements')[1].firstElementChild.textContent
    const pokeTwoStrong = document.querySelectorAll('.elements')[2].firstElementChild.textContent
    const pokeTwoWeak = document.querySelectorAll('.elements')[3].firstElementChild.textContent
    // Checking if attacked pokemon's element is weak against attacking pokemon's element
    if (pokeTwoElement == pokeOneStrong) {
        pokeOneAtt += pokeOneAtt * 0.5
        messageBox.innerHTML += `Poke one deals additional 50% damage because he is strong against poke two <br />`
    }
    if (pokeOneElement == pokeTwoStrong) {
        pokeTwoAtt += pokeTwoAtt * 0.5
        messageBox.innerHTML += `Poke two deals additional 50% damage because he is strong against poke one <br />`
    }
    const pokeOneAttack = () => {
        const i = 1
        let dodgeChance = 5 //it is dodge chance of pokemon two
        let critChance = 5
        let damage = pokeOneAtt
        let dodgeRNG = Math.floor(Math.random() * 100 + 1)
        let critRNG = Math.floor(Math.random() * 100 + 1)
        let reduction = pokeTwoDef * 0.01
        let additionalInfo = ``
        // For every 5 points of speed above 50, pokemon get +1% to dodge chance

        if (pokeTwoDef > 90) {
            let blockChance = Math.floor((pokeTwoDef - 90) / 3)
            let blockRNG = Math.floor(Math.random() * 100 + 1)
            dodgeChance = 0
            if (blockRNG <= blockChance) {
                damage = 0
                messageBox.innerHTML += `${pokeTwo} blocks incomming damage. <br />`
                updateScroll()
                return
            }
        } else if (pokeTwoSpeed > 50) {
            console.log('odpalilo sie sprawdzanie dodga pokemona 2')
            dodgeChance += Math.floor((pokeTwoSpeed - 50) / 5)
            console.log(dodgeChance)
            if (dodgeRNG <= dodgeChance) {
                // Checking if pokemon dodges the attack (Base dodge chance is 5%, dodgeRNG is random number between 1 and 100 and determines dodge success)
                damage = 0
                messageBox.innerHTML += `${pokeTwo} dodges and takes no damage. <br />`
                updateScroll()
                return
            }
        }
        // normal battle
        // max 90% dmg reducted (more than 90 gives block chance)
        if (pokeTwoDef >= 90) {
            reduction = 0.9
        }
        if (critRNG <= critChance) {
            damage += damage * 0.5
            additionalInfo += `(+50% crit)`
        }
        // Base dmg
        damage = (1 - reduction) * damage
        // Dmg range 
        let min = (damage * 0.8).toFixed(1)
        let max = (damage * 1.2).toFixed(1)
        console.log(min + ' ' + max)
        let calc = (Math.random() * (Number(max) - Number(min)) + Number(min)).toFixed(1)
        damage = calc
        pokeTwoCurHealth = (pokeTwoCurHealth - damage).toFixed(1)
        if (pokeTwoCurHealth <= 0) {
            messageBox.innerHTML += `${pokeTwo} took ${damage} points of damage and died. ${pokeOne} wins! ${additionalInfo}`
            pokeTwoCurHealth = 0
            updateScroll()
            end()
        } else {
            messageBox.innerHTML += `${pokeTwo} took ${damage} points of damage ${additionalInfo}<br />`
            updateScroll()
        }
        applyChange(pokeTwoCurHealth, pokeTwoMaxHealth, i)
    }
    const pokeTwoAttack = () => {
        const i = 0
        let dodgeChance = 5
        let critChance = 5
        let damage = pokeTwoAtt
        let dodgeRNG = Math.floor(Math.random() * 100 + 1)
        let critRNG = Math.floor(Math.random() * 100 + 1)
        let reduction = pokeOneDef * 0.01
        let additionalInfo = ``

        if (pokeOneDef > 90) {
            let blockChance = Math.floor((pokeOneDef - 90) / 3)
            let blockRNG = Math.floor(Math.random() * 100 + 1)
            dodgeChance = 0
            if (blockRNG <= blockChance) {
                damage = 0
                messageBox.innerHTML += `${pokeOne} blocks incomming damage. <br />`
                updateScroll()
                return
            }
        } else if (pokeOneSpeed > 50) {
            console.log('odpalilo sie sprawdzanie dodga pokemona 1')
            dodgeChance += Math.floor((pokeOneSpeed - 50) / 5)
            console.log(dodgeChance)
            if (dodgeRNG <= dodgeChance) {
                damage = 0
                messageBox.innerHTML += `${pokeOne} dodges and takes no damage. <br />`
                updateScroll()
                return
            }
        }

        if (pokeOneDef >= 90) {
            reduction = 0.9
        }
        if (critRNG <= critChance) {
            damage += damage * 0.5
            additionalInfo += `(+50% crit)`
        }
        damage = (1 - reduction) * damage
        let min = (damage * 0.8).toFixed(1)
        let max = (damage * 1.2).toFixed(1)
        console.log(min + ' ' + max)
        let calc = (Math.random() * (Number(max) - Number(min)) + Number(min)).toFixed(1)
        damage = calc
        pokeOneCurHealth = (pokeOneCurHealth - damage).toFixed(1)
        if (pokeOneCurHealth <= 0) {
            messageBox.innerHTML += `${pokeOne} took ${damage} points of damage and died. ${pokeTwo} wins! ${additionalInfo}`
            pokeOneCurHealth = 0
            updateScroll()
            end()
        } else {
            messageBox.innerHTML += `${pokeOne} took ${damage} points of damage ${additionalInfo}<br />`
            updateScroll()
        }
        applyChange(pokeOneCurHealth, pokeOneMaxHealth, i)
    }
    async function turn() {
        counter++
        messageBox.innerHTML += `Turn ${counter}<br />`
        if (pokeOneSpeed > pokeTwoSpeed) {
            if (pokeOneCurHealth > 0) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(pokeOneAttack())
                    }, 1500)
                })
            }
        }
        if (pokeTwoCurHealth > 0) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(pokeTwoAttack())
                }, 1500)
            })
        }
        if (pokeTwoSpeed > pokeOneSpeed) {
            if (pokeOneCurHealth > 0) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(pokeOneAttack())
                    }, 1500)
                })
            }
        }
    }
    interval = setInterval(turn, 3100)
    function end() {
        clearInterval(interval)
    }
})

function applyChange(curHealth, maxHealth, i) {
    var a = curHealth * (100 / maxHealth)
    document.querySelectorAll('.health-bar-text')[i].innerHTML = (Math.round(a) + "%")

    document.querySelectorAll(".health-bar-red")[i].classList.add('animate')
    setTimeout(() => document.querySelectorAll(".health-bar-red")[i].classList.remove('animate'), 1600)
    document.querySelectorAll(".health-bar-red")[i].style.width = (a + "%")

    document.querySelectorAll(".health-bar")[i].classList.add('animate')
    setTimeout(() => document.querySelectorAll(".health-bar")[i].classList.remove('animate'), 200)
    document.querySelectorAll(".health-bar")[i].style.width = (a + "%")

    document.querySelectorAll(".health-bar-blue")[i].classList.add('.animate')
    setTimeout(() => document.querySelectorAll(".health-bar-blue")[i].classList.remove('animate'), 700)
    document.querySelectorAll(".health-bar-blue")[i].style.width = (a + "%")

    document.querySelectorAll('.total')[i].innerHTML = (curHealth + "/" + maxHealth)
}
function updateScroll() {
    messageBox.scrollTop = messageBox.scrollHeight
}