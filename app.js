const pokemon = {
    sprite: document.getElementById('pokemon-image'),
    name: document.getElementById('pokemon-name'),
    habitat: document.getElementById('pokemon-habitat'),
    types: document.getElementById('pokemon-types'),
    eggGroup: document.getElementById('pokemon-eggGroup'),
    abilities: document.getElementById('pokemon-abilities'),
}

const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonImages= document.getElementById('pokemon-images');


const GetPokemon = async url =>{

    const data = await fetch(url);
    const dataJson = await data.json();
    const {sprites, name, types,abilities} = dataJson;
    //console.log(sprites);
    
    /* types.forEach(element => {
        const {type} = element;
        //console.log(type.name);
        pokemon.types.innerHTML += `<li>${type.name}</li>`;
    });

    
    abilities.forEach(element =>{
        const {ability} = element;
        //console.log(ability.url);
        //pokemon.abilities.innerHTML += `<li>${ability.name}</li>`;
        GetAbilityInfo(ability.url, ability.name);
    });
    //console.log (await types);
    

    pokemon.sprite.src = await dataJson.sprites.front_default;
    pokemon.name.innerHTML = await `Name: ${dataJson.name}`;
    GetSpecie(); */
    return await sprites.front_default;
}


/* const GetSpecie = async ()=>{
    const url = 'https://pokeapi.co/api/v2/pokemon-species/134/';

    const specie = await fetch(url);
    const specieJson = await specie.json();
    pokemon.habitat.innerHTML = await `Habitat: ${specieJson.habitat.name}`;
    pokemon.eggGroup.innerHTML = await `EggGroup: ${specieJson.egg_groups[0].name}`;
    //console.log(specieJson);
} */


const GetAbilityInfo = async (url,abilityName)=>{
    const data= await fetch(url);
    const dataJson = await data.json();
    const{effect_entries} = dataJson;

    let effectsList = '';

    effect_entries.forEach(element=>{
        const {effect, language} = element;

        if (language.name ==='en'){
            //console.log(effect);
            effectsList += `<li>${effect}</li>`;
        }
        //console.log(element);
    });
    //console.log(await effect_entries);

    pokemon.abilities.innerHTML += 
    `<li>
        ${abilityName}
        <div>Effects</div>
        <ul>
            ${effectsList}
        </ul>
        </li>`;
        
}

const Get10Pokemon = async()=>{
    const url = `${baseUrl}/pokemon`
    fetch(url).then(data => data.json()).then (json =>{
        const urlList= json.results.map(element => element.url);
        
        const spriteList = urlList.map(pokemonUrl => GetPokemon(pokemonUrl));
        console.log(spriteList);

        spriteList.forEach(async sprite =>{
            await sprite;
            const currentPokemonImg = document.createElement('img');
            currentPokemonImg.src = await sprite;
            currentPokemonImg.className = 'pokemonImage';
            pokemonImages.appendChild(currentPokemonImg);
            console.log(urlList);
            console.log(sprite);

            currentPokemonImg.onclick = () =>{
                sessionStorage.setItem('urlList', JSON.stringify(urlList));
                sessionStorage.setItem('sprite', currentPokemonImg.src);
                window.location.href ='file:///F:/Documents/programacion-hipermedia/app02-ulsa-2020/pokemon.htm'
            }
        })
    })
        
}


GetPokemon('https://pokeapi.co/api/v2/pokemon/vaporeon');

Get10Pokemon();