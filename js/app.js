// CARD CREATION
const loader = `<div class="loader-wrapper"><div class="loader-text">Loading...</div><span class="loader"><span class="loader-inner"></span></span></div>`
const searchBoxes = document.querySelectorAll('.search-box')
const messageBox = document.querySelector('.message-box')
const picker = async (i, query) => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + query
    await fetch(url).then(data => data.json())
        .then(jsonObject => {
            return createPokeObject(jsonObject)
        }).then(pokemon => {
            createPoke(i, pokemon)
            checkType()
            createHpBar(pokemon, i)
        })
        .catch(err => console.log(err))
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
        hpValue: jsonObject.stats[0].base_stat * 2,
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
            <div class="sprite">
                <img src=${pokemon.imgFront}>
            </div>
            <div class="type">${pokemon.typesOut}</div>
            <div class="poke-info">
                <div class="stats">
                    <div><img src="img/crossed-swords.png"><p>${pokemon.attack} ${pokemon.attackValue}</p></div>
                    <div><img src="img/checked-shield.png"><p>${pokemon.defense} ${pokemon.defenseValue}</p></div>
                    <div><img src="img/wingfoot.png"><p>${pokemon.speed} ${pokemon.speedValue}</p></div>
                    <div><img src="img/heart-plus.png"><p>${pokemon.hp} ${pokemon.hpValue}</p></div>
                </div>
                <div class="misc">
                    <div class="elements"></div>
                    <div class="elements"></div>
                    <div class="id">${pokemon.id}</div>
                </div>
                
            </div>
        </div>
        <div class="animate-info"></div>
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
        const colour = ['A8b820', '705848', 'a8a878', 'f08030', '7038f8', 'a890f0', 'f8d030', 'ee99ac', 'c03028', '705898', 'a040a0', '78c850', 'e0c068', '98d8d8', 'b8b8d0', 'f85888', 'b8a038', '6890f0']
        for (let i = 0; i < typeArr.length; i++) {
            if (cardType == typeArr[i]) {
                
                let typeTab = `
                    <p class='${typeArr[i]}'>
                        <object id="svg-object" data="svg/${typeArr[i]}.svg" type="image/svg+xml"></object>
                        ${typeArr[i]}
                        <object id="svg-object" data="svg/${typeArr[i]}.svg" type="image/svg+xml">
                    </p>`
                type.parentElement.lastElementChild.children[1].children[0].innerHTML = `<p><object id="svg-object" data="svg/strong.svg" type="image/svg+xml"></object>Strong against</p><p class="${strongAgainst[i]}">${strongAgainst[i]}</p>`
                type.parentElement.lastElementChild.children[1].children[1].innerHTML = `<p><object id="svg-object" data="svg/weak.svg" type="image/svg+xml"></object>Weak against</p><p class="${weakAgainst[i]}">${weakAgainst[i]}</p>`
                type.parentElement.firstElementChild.classList.add(typeArr[i])
                type.classList.add(typeArr[i] + '2')
                type.parentElement.classList.add(typeArr[i] + '2')
                type.parentElement.children[2].style.boxShadow = `inset 0px 0px 40px 8px #${colour[i]}`
                type.parentElement.lastElementChild.style.boxShadow = `inset 0px 0px 40px 8px #${colour[i]}`
                type.innerHTML = typeTab
                break
            }
        }
    })
}
const createHpBar = (pokemon, i) => {
    var health = pokemon.hpValue
    let out = `
        <div class="total">Health: ${health}/${health}</div>
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
        if (document.querySelectorAll('.pick-random').length === 0) document.querySelector('#start').style.display = 'block'
    })
    document.querySelectorAll('.pick-search')[i].addEventListener('click', function () {
        document.querySelectorAll('.pokemon')[i].innerHTML = loader
        const search = searchBoxes[i].value
        const query = search.toLowerCase()
        picker(i, query)
        if (document.querySelectorAll('.pick-search').length === 0) document.querySelector('#start').style.display = 'block'
    })
}
// BATTLE
/* 
    %DEF reduction (max 90%)
*/
document.querySelector("#start").addEventListener('click', function () {
    document.querySelector("#start").style.display = 'none'
    messageBox.innerHTML += `<p class="turn">Battle starts in 3 sec</p>`
    let counter = 0
    let coinFlip = Math.random().toFixed(1)
    document.querySelectorAll('.animate-info')[1].style.left = '-25%'
    const pokeOne = document.querySelectorAll('.card')[0].firstElementChild.textContent.charAt(0).toLocaleUpperCase() + document.querySelectorAll('.card')[0].firstElementChild.textContent.slice(1)
    const pokeTwo = document.querySelectorAll('.card')[1].firstElementChild.textContent.charAt(0).toLocaleUpperCase() + document.querySelectorAll('.card')[1].firstElementChild.textContent.slice(1)
    const pokeOneMaxHealth = parseInt(document.querySelectorAll('.stats')[0].children[3].lastElementChild.innerHTML.substring(3, Math.floor(document.querySelectorAll('.stats')[0].children[3].lastElementChild.innerHTML.length)))
    const pokeTwoMaxHealth = parseInt(document.querySelectorAll('.stats')[1].children[3].lastElementChild.innerHTML.substring(3, Math.floor(document.querySelectorAll('.stats')[1].children[3].lastElementChild.innerHTML.length)))
    let pokeOneCurHealth = pokeOneMaxHealth
    let pokeTwoCurHealth = pokeTwoMaxHealth
    let pokeOneAtt = parseInt(document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[0].firstElementChild.lastElementChild.innerHTML.length))
    let pokeTwoAtt = parseInt(document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.substring(7, document.querySelectorAll('.stats')[1].firstElementChild.lastElementChild.innerHTML.length))
    const pokeOneDef = parseInt(document.querySelectorAll('.stats')[0].children[1].lastElementChild.innerHTML.substring(8, document.querySelectorAll('.stats')[0].children[1].lastElementChild.length))
    const pokeTwoDef = parseInt(document.querySelectorAll('.stats')[1].children[1].lastElementChild.innerHTML.substring(8, document.querySelectorAll('.stats')[1].children[1].lastElementChild.length))
    const pokeOneSpeed = parseInt(document.querySelectorAll('.stats')[0].children[2].lastElementChild.innerHTML.substring(6, document.querySelectorAll('.stats')[0].children[2].lastElementChild.innerHTML.length))
    const pokeTwoSpeed = parseInt(document.querySelectorAll('.stats')[1].children[2].lastElementChild.innerHTML.substring(6, document.querySelectorAll('.stats')[1].children[2].lastElementChild.innerHTML.length))
    const pokeOneElement = document.querySelectorAll('.type')[0].firstElementChild.textContent
    const pokeTwoElement = document.querySelectorAll('.type')[1].firstElementChild.textContent
    const pokeOneStrong = document.querySelectorAll('.elements')[0].firstElementChild.textContent
    const pokeTwoStrong = document.querySelectorAll('.elements')[2].firstElementChild.textContent
    const pokeOneDodge = dodgeCalc(pokeOneSpeed)
    const pokeTwoDodge = dodgeCalc(pokeTwoSpeed)
    let critChance = 5
    // Checking if attacked pokemon's element is weak against attacking pokemon's element
    if (pokeTwoElement == pokeOneStrong) {
        pokeOneAtt += pokeOneAtt * 0.5
        messageBox.innerHTML += `<p class="turn">Poke one deals additional 50% damage because he is strong against poke two</p>`
    }
    if (pokeOneElement == pokeTwoStrong) {
        pokeTwoAtt += pokeTwoAtt * 0.5
        messageBox.innerHTML += `<p class="turn">Poke two deals additional 50% damage because he is strong against poke one</p>`
    }
    const pokeOneReductedDmg = damageReductionCalc(pokeOneAtt, pokeTwoDef)
    const pokeTwoReductedDmg = damageReductionCalc(pokeTwoAtt, pokeOneDef)
    battleStats(pokeOne, pokeOneReductedDmg, pokeOneDef, critChance, pokeOneDodge)
    battleStats(pokeTwo, pokeTwoReductedDmg, pokeTwoDef, critChance, pokeTwoDodge)
    document.querySelector('.click').innerHTML = `<p><object id="svg-object" data="svg/arrow-down.svg" type="image/svg+xml"></object> Battle stats <object id="svg-object" data="svg/arrow-down.svg" type="image/svg+xml"></object></p>`
    document.querySelector('#battle-stats').style.display = 'flex'
    document.querySelector('.click').addEventListener('click', function() {
        console.log(document.querySelector('.pks-stats').classList)
        if (document.querySelector('#battle-stats').classList[0] === 'active') {
            document.querySelector('.click').innerHTML = `<p><object id="svg-object" data="svg/arrow-down.svg" type="image/svg+xml"></object> Battle stats <object id="svg-object" data="svg/arrow-down.svg" type="image/svg+xml"></object></p>`
            document.querySelector('#battle-stats').classList.remove("active");
        } else {
            document.querySelector('#battle-stats').classList.add("active");
            document.querySelector('.click').innerHTML = `<p><object id="svg-object" data="svg/arrow-up.svg" type="image/svg+xml"></object> Battle stats <object id="svg-object" data="svg/arrow-up.svg" type="image/svg+xml"></object></p>`
        }   
      });

    function pokeOneAttack() {
        const i = 1
        let damage = pokeOneAtt
        let dodgeRNG = Math.floor(Math.random() * 100 + 1)
        let critRNG = Math.floor(Math.random() * 100 + 1)
        let additionalInfo = ``

        if (pokeTwoDef > 90) {
            let blockChance = Math.floor((pokeTwoDef - 90) / 3)
            console.log('Poke 2 block chance: ' + blockChance)
            let blockRNG = Math.floor(Math.random() * 100 + 1)
            if (blockRNG <= blockChance) {
                messageBox.innerHTML += `<p><object id="svg-object" data="svg/block.svg" type="image/svg+xml"></object> ${pokeTwo} blocks incomming damage.</p>`
                updateScroll()
                document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/shield-reflect-right.png">`
                showUpInfo(i)
                return
            }
        }
        if (dodgeRNG <= pokeTwoDodge) {
            // Checking if pokemon dodges the attack (Base dodge chance is 5%, dodgeRNG is random number between 1 and 100 and determines dodge success)
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/dodge.svg" type="image/svg+xml"></object> ${pokeTwo} dodges and takes no damage.</p>`
            updateScroll()
            document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/dodging.png">`
            showUpInfo(i)
            return
        }
        // normal battle
        // max 90% dmg reducted (more than 90 gives block chance)
        if (pokeTwoDef >= 90) {
            reduction = 0.9
        }
        if (critRNG <= critChance) {
            damage += damage * 0.5
            additionalInfo += `(+50% crit <object id="svg-object" data="svg/crit.svg" type="image/svg+xml"></object>)`
            document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/bullseye-right.png">`
        } else document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/sword-wound-right.png">`

        // Dmg range 
        damage = damageRange(pokeOneReductedDmg)
        
        document.querySelectorAll('.animate-info')[i].innerHTML += damage
        showUpInfo(i)

        pokeTwoCurHealth = (pokeTwoCurHealth - damage).toFixed(1)
        if (pokeTwoCurHealth <= 0) {
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/sword.svg" type="image/svg+xml"></object> ${pokeTwo} took ${damage} points of damage and died. ${pokeOne} wins! ${additionalInfo} <object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object></p>`
            pokeTwoCurHealth = 0
            updateScroll()
            end()
            document.querySelector('#stop').style.display = 'block'
            document.querySelector('.winner').innerHTML = `<object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object> ${pokeOne} wins! <object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object>`
            document.querySelector('.winner').style.opacity = '100'
        } else {
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/sword.svg" type="image/svg+xml"></object> ${pokeOne} deals ${damage} points of damage ${additionalInfo}</p>`
            updateScroll()
        }
        applyChange(pokeTwoCurHealth, pokeTwoMaxHealth, i)
    }
    const pokeTwoAttack = () => {
        const i = 0
        let damage = pokeTwoAtt
        let dodgeRNG = Math.floor(Math.random() * 100 + 1)
        let critRNG = Math.floor(Math.random() * 100 + 1)
        let additionalInfo = ``

        if (pokeOneDef > 90) {
            let blockChance = Math.floor((pokeOneDef - 90) / 3)
            console.log('Poke 1 block chance: ' + blockChance)
            let blockRNG = Math.floor(Math.random() * 100 + 1)
            if (blockRNG <= blockChance) {
                messageBox.innerHTML += `<p><object id="svg-object" data="svg/block.svg" type="image/svg+xml"></object> ${pokeOne} blocks incomming damage.</p>`
                updateScroll()
                document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/shield-reflect-left.png">`
                showUpInfo(i)
                return
            }
        }
        if (dodgeRNG <= pokeOneDodge) {
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/dodge.svg" type="image/svg+xml"></object> ${pokeOne} dodges and takes no damage.</p>`
            updateScroll()
            document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/dodging.png">`
            showUpInfo(i)
            return
        }

        if (pokeOneDef >= 90) {
            reduction = 0.9
        }
        if (critRNG <= critChance) {
            damage += damage * 0.5
            additionalInfo += `(+50% crit <object id="svg-object" data="svg/crit.svg" type="image/svg+xml"></object>)`
            document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/bullseye-left.png">`
        } else document.querySelectorAll('.animate-info')[i].innerHTML = `<img src="img/sword-wound-left.png">`

        damage = damageRange(pokeTwoReductedDmg)

        document.querySelectorAll('.animate-info')[i].innerHTML += damage
        showUpInfo(i)

        pokeOneCurHealth = (pokeOneCurHealth - damage).toFixed(1)
        if (pokeOneCurHealth <= 0) {
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/sword.svg" type="image/svg+xml"></object> ${pokeOne} took ${damage} points of damage and died. ${pokeTwo} wins! ${additionalInfo} <object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object></p>`
            pokeOneCurHealth = 0
            updateScroll()
            end()
            document.querySelector('#stop').style.display = 'block'
            document.querySelector('.winner').innerHTML = `<object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object> ${pokeTwo} wins! <object id="svg-object" data="svg/cup.svg" type="image/svg+xml"></object>`
            document.querySelector('.winner').style.opacity = '100'
        } else {
            messageBox.innerHTML += `<p><object id="svg-object" data="svg/sword.svg" type="image/svg+xml"></object> ${pokeTwo} deals ${damage} points of damage ${additionalInfo}</p>`
            updateScroll()
        }
        applyChange(pokeOneCurHealth, pokeOneMaxHealth, i)
    }
    async function turn() {
        counter++
        messageBox.innerHTML += `<p class="turn">Turn ${counter}</p>`
        function animate(i) {
            setTimeout(() => {
                const elem = document.querySelectorAll('.animate-info')[i]
                let opacity = elem.style.opacity
                function lessVisible() {
                    if (opacity <= 0) clearInterval(y)
                    opacity -= 0.05
                    elem.style.opacity = opacity
                }
                const y = setInterval(lessVisible, 25)
            }, 800)
        }
        async function firstPokeAttack() {
            if (pokeOneCurHealth > 0) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(pokeOneAttack())
                    }, 1500)
                })
                let i = 1
                animate(i)
            }
        }
        async function secondPokeAttack() {
            if (pokeTwoCurHealth > 0) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(pokeTwoAttack())
                    }, 1500)
                })
                let i = 0
                animate(i)
            }
        }
        if (pokeOneSpeed === pokeTwoSpeed) {
            if (coinFlip <= 0.5) {
                await firstPokeAttack()
                await secondPokeAttack()
            } else {
                await secondPokeAttack()
                await firstPokeAttack()
            }
        }
        if (pokeOneSpeed > pokeTwoSpeed) {
            await firstPokeAttack()
            await secondPokeAttack()
        }
        if (pokeTwoSpeed > pokeOneSpeed) {
            await secondPokeAttack()
            await firstPokeAttack()
        }
    }
    interval = setInterval(turn, 3100)
    function end() {
        clearInterval(interval)
    }
    document.querySelector("#stop").addEventListener('click', function () { 
        location.reload()
    })
})

function applyChange(curHealth, maxHealth, i) {
    let a = curHealth * (100 / maxHealth)
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

    document.querySelectorAll('.total')[i].innerHTML = ("Health: " + curHealth + "/" + maxHealth)
}
function updateScroll() {
    messageBox.scrollTop = messageBox.scrollHeight
}
function showUpInfo(i) {
    let elem = document.querySelectorAll('.animate-info')[i]
    let x = 0
    function moreVisible() {
        if (x >= 1) clearInterval(t)
        x += 0.05
        elem.style.opacity = x
    }
    var t = setInterval(moreVisible, 25)
}
function damageRange(damage) {
    let min = (damage * 0.8).toFixed(1)
    let max = (damage * 1.2).toFixed(1)
    console.log(min + ' ' + max)
    let calc = (Math.random() * (Number(max) - Number(min)) + Number(min)).toFixed(1)
    return calc
}
function dodgeCalc(pokeSpeed) {
    // For every 5 points of speed above 50, pokemon get +1% to dodge chance
    if (pokeSpeed > 50) {
        dodgeChance = Math.floor((pokeSpeed - 50) / 5) + 5
    } else {
        dodgeChance = 5 // Base dodge chance
    }
    return dodgeChance
}
function damageReductionCalc(damage, reduction) {
    if (reduction > 90) {
        reduction = 0.9
    } else {
        reduction = reduction * 0.01
    }
    damage = ((1 - reduction) * damage).toFixed(1)
    return damage
}
function battleStats(pokemon, damage, defense, critChance, dodgeChance) {
    let defenseInfo = ''
    let blockChance = 0;
    if (defense > 90) {
        let max = 90
        defenseInfo = `${max}% (${defense})`
        blockChance = Math.floor((defense - max) / 3)
    } else {
        defenseInfo = `${defense}%`
    }
    const stats = {
        name: pokemon,
        dmg: damage,
        def: defenseInfo,
        crit: critChance,
        dodge: dodgeChance,
        block: blockChance
    }
    document.querySelector('.pks-stats').innerHTML += 
        `
        <div>
            <h2>${stats.name}</h2>
            <p><object id="svg-object" data="svg/dmg.svg" type="image/svg+xml"></object> Damage: ${(stats.dmg * 0.8).toFixed(1)} - ${(stats.dmg * 1.2).toFixed(1)}</p>
            <p><object id="svg-object" data="svg/shield.svg" type="image/svg+xml"></object> Defense: ${stats.def}</p>
            <p><object id="svg-object" data="svg/crit.svg" type="image/svg+xml"></object> Critical: ${stats.crit}%</p>
            <p><object id="svg-object" data="svg/dodge.svg" type="image/svg+xml"></object> Dodge: ${stats.dodge}%</p>
            <p><object id="svg-object" data="svg/block.svg" type="image/svg+xml"></object> Block: ${stats.block}%</p>
        </div>
        `
}