const searchBtn = document.getElementById('search-button')

const api_url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"

const cleanPokemonNameId = (name) =>{
    return name.toLowerCase();
}

const parseData = (data) =>{
    // getting all required elements
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const pokemonWeight = document.getElementById('weight');
    const pokemonHeight = document.getElementById('height');
    const pokemonType = document.getElementById('types');
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    
    // parsing the required data
    const { base_experience, height, id, name, order, sprites, stats, types, weight } = data;

    const statsObj = {}
    stats.forEach(element => {
        statsObj[element.stat.name] = element.base_stat
    });
    
    const {front_default} = sprites;
    
    types.forEach(element => {
        const newSpan = document.createElement('span')
        newSpan.textContent = element.type.name.toUpperCase();
        newSpan.id="type";
        pokemonType.appendChild(newSpan);
    });

    // Adding in all the stats
    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = "#".concat(id);
    pokemonWeight.textContent = weight;
    pokemonHeight.textContent = height;
    hp.textContent = statsObj.hp;
    attack.textContent = statsObj.attack;
    defense.textContent = statsObj.defense;
    specialAttack.textContent = statsObj["special-attack"];
    specialDefense.textContent = statsObj["special-defense"];
    speed.textContent = statsObj.speed;

    putPic(front_default)
}

const putPic = (url) =>{
    const newImg = document.createElement('img');
    newImg.src = url;
    newImg.alt = "sprite";
    newImg.id = "sprite";

    const speed = document.getElementById('speed');
    speed.appendChild(newImg);
}

const fetchData = async() =>{
    try {
        const types = document.getElementById('types');
        const typesList = document.querySelectorAll('#type');
        for(const span of typesList){
            types.removeChild(span);
        }

        const searchInput = cleanPokemonNameId(document.getElementById('search-input').value);

        const res = await fetch(api_url.concat(searchInput));
        const data = await res.json();
        parseData(data)
    } catch (error) {
        console.log(error)
        alert("Pokémon not found")
    }
}

searchBtn.addEventListener("click",fetchData)
