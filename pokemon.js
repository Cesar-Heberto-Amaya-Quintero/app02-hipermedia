const urlList = JSON.parse(sessionStorage.getItem('urlList'));
const sprite = sessionStorage.getItem('sprite');

const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonType = document.getElementById('pokemon-types');
const abilitiesPokemon = document.getElementById('pokemon-abilities');

const GetPokemon =()=>{
    const spriteName = sprite.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/','');
    const spriteNumber = spriteName.replace ('.png','');
    console.log(sprite);
    
    urlList.forEach(element => {
        let pokemonNumber = element.replace('https://pokeapi.co/api/v2/pokemon/','');
        pokemonNumber= pokemonNumber.replace('/', '');
        if (pokemonNumber == spriteNumber)
        {
            showPokemon(element);
            pokemonImage.innerHTML = `<img src="${sprite}"  alt="Pokemon">`;
            
        }
    });

}

const showPokemon = async url =>{
    fetch(url).then(data => data.json()).then(json=>{
        console.log(json.types);        //Conseguimos el nombre del pokemon
        const pokemonShowName= json.name;
        console.log(pokemonShowName);
        pokemonName.innerHTML = pokemonShowName;

       const pokemonTypes =  json.types;
       pokemonTypes.forEach(type=>{         //Obtenemos los types del pokemon
           const typeName= type.type.name;
           pokemonType.innerHTML += `<li> ${typeName} </li>`;
           console.log(typeName);
       })
       
       const pokemonAbilities = json.abilities;
       pokemonAbilities.forEach(ability =>{         //Mostramos las habilidades del pokemon
        const abilityName = ability.ability.name;
        abilitiesPokemon.innerHTML += `<li> ${abilityName} </li>`;
        console.log(abilityName);
       })
    })

}

GetPokemon();