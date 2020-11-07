//#region ===== We gaan met twee API calls werken. De eerste haalt ALLE pokemons op. De tweede haalt de details op per pokemon  //

let loading = true
let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=3"
let pokemonObjectLijst = []


const getAllPokemon_API = async (nextcall) => {

	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.		
    const data = await fetch(nextcall) //next call variabele
            .then(r => r.json())
            .catch((err) => console.error('an error occurred', err))
     
    let resultLijst = data.results
    let next = data.next
    //console.log(resultLijst)
    //console.log("the next url is " + next)

    resultLijst.forEach(element => getDetailsPokemon_API(element.url))

    console.log("De lijst met pokemons is: ")
    console.log(pokemonObjectLijst)
    nextcall = next
    //console.log("the next url is " + nextcall)

    //setTimeout(50000)
    //getName_API(nextcall);
     
};

const getDetailsPokemon_API = async (url) => {

	// Met de fetch API proberen we de data op te halen.		
	const data = await fetch(url)
			.then((r) =>r.json())
            .catch((err) => console.error('an error occurred', err))

        const name = data.name
        const id = data.id
        const stats = data.stats
        const sprite = data.sprites.front_default
        const type = data.types

        let object = {"pokemon":[{
            "id": id,
            "name":name,
            "stats":stats,
            "sprite": sprite,
            "type":type
        }]}
        
        pokemonObjectLijst.push(object)


};

//#endregion


document.addEventListener('DOMContentLoaded', function() {

    getAllPokemon_API(nextcall);
    
});



// 1. Variabelen
//     - loading
//     - nextCall -> standaard waarde /pokemon?limit=20

// 2. Functies (init function)
//     - Pokemon API Call
//         -> Object bevat next => nextCall overschrijven met de next waarde uit dit Object
//         -> Loopen door resultaat en de links in doorsturen naar nieuwe Functies

//     -> Pokemon Detail API Call
//         -> URL krijg je mee uit loop van hierboven -> Call Uitvoeren
//             -> Call van pokemon klaar => HTML Objectje (je detail html om een pokemon op je home page te zetten opmaken) en pushen in hoofdDIV