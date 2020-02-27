// defined variables
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const teamCardContainer = document.querySelector("main")

// functions
const fetchPokeTeamData = () => {
    fetch(TRAINERS_URL)
        .then( resp => resp.json() )
        .then( pokeData => renderTeamData(pokeData) )
        .catch( err => console.log(err) )
}

const renderTeamData = (pokeData) => {
    pokeData.forEach(pokeTeam => {
        let pokeString = `<div class="card" data-id="${pokeTeam.id}"><p>${pokeTeam.name}</p>
        <button data-trainer-id="${pokeTeam.id}">Add Pokemon</button>
        <ul>
            ${renderPokemons(pokeTeam.pokemons)}
        </ul>
      </div>`
      teamCardContainer.innerHTML += pokeString
    }) 
}

const renderPokemons = (pokemonArray) => {
    let returnString = ""
    pokemonArray.forEach(pokemon => {
        let pokeString = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
        returnString += pokeString
    })
    return returnString
}

const handleButtonClick = (event) => {
    if (event.target.innerText === "Release") {
        releasePokemon(event)
    }
    if (event.target.innerText === "Add Pokemon") {
        addNewPokemon(event)
    }
}

const addNewPokemon = (event) => {
    fetch(POKEMONS_URL, createPostObj)
        .then( resp = resp.json() )
        .then( newPokemon => console.log(newPokemon))
        .catch( err => console.log(err) )
}

const createPostObj = (trainerId) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainerId: trainerId
        })
    }
}

function releasePokemon(event){
    const pokeId = event.target.dataset.pokemonId
    const reqObj = {
        method: "DELETE"
    }
    fetch(POKEMONS_URL/`${pokeId}`, reqObj)
    .then( resp => resp.json() )
    .then( pokemon => {event.target.parentNode.remove() })
}

// event.target.dataset.trainerId


// eventListeners
teamCardContainer.addEventListener('click', handleButtonClick)

// invoked functions
fetchPokeTeamData()




// alt code

// function renderTeamData(pokeData){
//     pokeData.forEach(function(trainer){
//         renderTrainer(trainer)
//     })
// }

// function renderTrainer(trainer){
//     const main = document.querySelector("main")
//     const cardDiv = document.createElement("div")
//     cardDiv.className = "card"
//     cardDiv.dataset.id = trainer.id

//     const nameP = document.createElement("p")
//     nameP.innerHTML = trainer.name

//     cardDiv.append(nameP)
//     main.append(cardDiv)

// function createButtonListener(){
//     teamCardContainer.addEventListener("click", function(e){
//         if(e.target.className === "add") {
//             addNewPokemon(e)
//         }
//     })
// }

// function addNewPokemon(e){
//     const formData = {
//         trainerId =  e.target.dataset.trainerId
//     }
// }

// const reqObj = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     },
//     body: JSON.stringify({
//         trainerId: trainerId
//     })
// }
//     fetch(POKEMONS_URL, reqObj)
//         .then( resp = resp.json() )
//         .then( newPokemon => {
//             const uList = e.target.nextSibling
//         })
//         .catch( err => console.log(err) )

// function releasePokemon(e){
//     const pokeId = e.target.dataset.pokemonId
//     const reqObj = {
//         method: "DELETE"
//     }
//     fetch(POKEMONS_URL/`${pokeId}`, reqObj)
//     .then( resp => resp.json() )
//     .then( data => {
//         e.target.parentNode.remove() })
// }