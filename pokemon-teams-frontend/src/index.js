const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let ALLDATA;
let TRAINERS = [];
let POKEMON_HASH = {};

function fetchEverythang() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(data => { fetchBack(data) })
}

function fetchBack(data) {
    ALLDATA = data;
    let trains = []
    data.forEach(entry => {
        trains.push(entry[0]);
    })
    TRAINERS = trains;
    data.forEach(entry => {
        POKEMON_HASH[entry[0].name] = entry[1]
    })
    renderTeams();
}


fetchEverythang();

function renderTeams() {
    let html = "";
    TRAINERS.forEach(trainer => {
        html += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                <ul>
                    ${renderPokemon(trainer.name)}
                
                </ul>
                </div>`
    })
    document.querySelector("main").innerHTML = html;
}

function renderPokemon(trainer_name) {
    let html = "";
    POKEMON_HASH[trainer_name].forEach(pokemon => { html += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>` });
    return html;
}

function addListener() {
    const main = document.querySelector("main");
    main.addEventListener("click", event => {
        if (event.target.innerText === "Add Pokemon") {
            let tname = event.target.parentNode.children[0].innerText
            if (POKEMON_HASH[tname].length < 6) {
                fetch(POKEMONS_URL, postFunc(event.target.dataset.trainerId)).then(resp => resp.json()).then(data => fetchBack(data))
            }
        } else if (event.target.className === "release") {
            poke_id = event.target.dataset.pokemonId
            event.target.parentNode.remove();
            fetch(POKEMONS_URL + `/${poke_id}`, deleteFunc(poke_id))
                .then(resp => resp.json())
                .then(data => { fetchBack(data) })
        }

    })
}

function postFunc(id) {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            trainer_id: id
        })

    }
}

function deleteFunc(id) {
    return {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pokemon_id: id
        })
    }
}

addListener();