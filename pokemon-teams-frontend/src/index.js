const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const body = document.querySelector('main');

loadTrainers();

////create new pokemon///
body.addEventListener('click', PokemonHandler);

function PokemonHandler(event) {
  if (event.target.innerHTML === 'Add Pokemon') {
    const trainer = event.target.parentNode.dataset.id;

    if (event.target.parentElement.children[2].childElementCount < 7) {
      fetch('http://localhost:3000/pokemons', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Aceept: 'application/json'
        },
        body: JSON.stringify({
          trainer: `${trainer}`
        })
      })
        .then(resp => resp.json())
        //.then(data => console.log('NEW POKEMON',data))
        .then(data => renderNewPokemons(data, event));
    }
  }
  if (event.target.innerHTML === 'Release') {
      //debugger
    console.log("You've released a pokemon!");
    
    const pokemonToBeDeleted = event.target.dataset.pokemonId
    fetch(`http://localhost:3000/pokemons/${pokemonToBeDeleted}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
   // .then(data => console.log(data))
   .then(data => {
    event.target.parentElement.remove()
   })
  }
}

function renderNewPokemons(data, event) {
  const ul = event.target.parentElement.children[2];
  const newLine = `<li>${data.species}(${data.nickname}) <button class="release" data-pokemon-id= "${data.id}">Release</button></li>`;
  ul.innerHTML += newLine;
}



//loadTrainers///
function loadTrainers() {
  fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    //.then(data =>
    .then(function(data) {
      renderTrainer(data);
      console.log(data);
    });
}

function renderTrainer(data) {
  data.forEach(trainer => {
    const pokemonCard = `<div class="card" data-id="${trainer.id}"><p>${
      trainer.name
    }</p>
        <button data-trainer-id="${
          trainer.id
        }">Add Pokemon</button> <ul>${renderPokemons(trainer.pokemons)} </ul>
        </div>`;
    body.innerHTML += pokemonCard;
  });
}

function renderPokemons(pokemons) {
  let returnString = '';
  pokemons.forEach(pokemon => {
    returnString += `<li>${pokemon.species}(${pokemon.nickname}) <button class="release" data-pokemon-id= "${pokemon.id}">Release</button></li>`;
    //console.log (returnString)
  });
  return returnString;
}
