const randomButtons = document.querySelectorAll('.pick')

const randomPicker = () => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + (Math.floor(Math.random() * 807) + 1);
    console.log(url)
    fetch(url).then(data => data.json())
        .then(jsonObject => {
            console.log(jsonObject)
        })
}

Array.from(randomButtons).forEach(button => {
    button.addEventListener('click', randomPicker)
})