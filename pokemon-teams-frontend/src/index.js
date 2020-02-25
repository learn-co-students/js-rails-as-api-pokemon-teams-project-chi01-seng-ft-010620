const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const collectionSpace = document.querySelector('main')

document.addEventListener("DOMContentLoaded", fetchPokeData)

function fetchPokeData() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(pokeData => renderCards(pokeData))
}

function renderCards(json) {
    json.forEach(trainer => {
        let card = document.createElement('div')
        let addButton = document.createElement('button')
        let list = document.createElement('ul')
        let ptag = document.createElement('p')

        card.className = "card"
        card.dataset.id = `${trainer.id}`
        collectionSpace.append(card)

        ptag.innerHTML = trainer.name

        addButton.innerHTML = "Add Pokemon"
        addButton.dataset.trainerId = `${trainer.id}`

        card.append(ptag, addButton, list)

        trainer.pokemons.forEach(pokemon => {
            liTag = document.createElement('li')
            releaseButton = document.createElement('button')

            liTag.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            releaseButton.innerHTML = "Release"
            releaseButton.className = "release"
            releaseButton.dataset.pokemonId = `${pokemon.id}`

            liTag.append(releaseButton)
            list.append(liTag)
        })
    });
    addButtonFunctionality()
}

function addButtonFunctionality() {
    document.body.addEventListener('click', function(event) {
        if (event.target.dataset.pokemonId) {
            deletePokemon(event.target.dataset.pokemonId)
        } else if (event.target.dataset.trainerId &&
            event.target.nextSibling.children.length < 6) {
            createPokemon(event.target.dataset.trainerId)
        }
    })
}
let deleteMethod = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}
function deletePokemon(id) {
    fetch(`http://localhost:3000/pokemons/${id}`, deleteMethod)
    .then(resp => resp.json())
    .then(function(pokeData) {
        document.querySelector(`[data-pokemon-id="${pokeData.id}"]`).parentNode.remove()
    })
}

function createPokemon(id) {
    fetch('http://localhost:3000/pokemons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'trainer_id': `${id}`
        })
    })
    .then(resp => resp.json())
    .then(function(pokeData) {
        liTag = document.createElement('li')
        releaseButton = document.createElement('button')
        list = document.querySelector(`[data-id="${pokeData.trainer_id}"] ul`)

        liTag.innerHTML = `${pokeData.nickname} (${pokeData.species})`
        releaseButton.innerHTML = "Release"
        releaseButton.className = "release"
        releaseButton.dataset.pokemonId = `${pokeData.id}`

        liTag.append(releaseButton)
        list.append(liTag)
    })
}