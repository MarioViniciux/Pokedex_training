const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__ID');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnNext = document.querySelector('.btn__next');
const btnPrev = document.querySelector('.btn__prev');
let sPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIAnwser = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIAnwser.status == 200) {
        const data = await APIAnwser.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display= 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        sPokemon = data.id
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if (sPokemon > 1) {
        sPokemon -= 1;
        renderPokemon(sPokemon)
    }
});

btnNext.addEventListener('click', () => {
    sPokemon += 1;
    renderPokemon(sPokemon)
});

renderPokemon(sPokemon)
