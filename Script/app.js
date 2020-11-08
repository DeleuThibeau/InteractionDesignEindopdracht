//#region ===== We gaan met twee API calls werken. De eerste haalt ALLE pokemons op. De tweede haalt de details op per pokemon  //

let loading = true
let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=10"
const pokemonList = document.querySelector('.js-pokemonlist');


async function getAllPokemon_API(url) {

	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.		
    const data = await fetch(url) //next call variabele
            .then(r => r.json())
            .catch((err) => console.error('an error occurred', err))
     
    let resultLijst = data.results
    let next = data.next
    //console.log("the huidige url in de API function is: \n" + nextcall)
    nextcall = next
    console.log(resultLijst)
    //console.log("the next url in de API function is: \n" + nextcall)

    resultLijst.forEach(element =>setTimeout(() => { getDetailsPokemon_API(element.url) }, 100))
 
};

const getDetailsPokemon_API = async (url) => {

    await setTimeout(() => { 
     fetch(url)
        .then(result => {
        let data = result.json().then(object => { 
        
        let powerlevel = ((object.stats[0].base_stat + object.stats[1].base_stat + object.stats[2].base_stat +object.stats[3].base_stat + object.stats[4].base_stat+ object.stats[5].base_stat)/1125)*100

        pokemonList.innerHTML += `
        <div class="o-row o-row--lg o-layout o-layout--justify-center o-layout--align-center">
            <div>
                <img src="${ object.sprites.front_default }" alt="${ object.name }">
                <p class="o-layout o-layout--justify-center">${ object.name }</p>
            </div>
        
            <div class="o-layout--gutter">
                <p>HP: ${ object.stats[0].base_stat }</p>
                <p>Attack: ${ object.stats[1].base_stat }</p>
                <p>Defense: ${ object.stats[2].base_stat }</p>
                </div>
                
            <div class="o-layout--gutter">
                <p>Speciale Attack: ${ object.stats[3].base_stat }</p>
                <p>Special Defense: ${ object.stats[4].base_stat }</p>
                <p>Speed: ${ object.stats[5].base_stat }</p>
            </div>
        </div>

        <div class=" o-row-powerlevel o-layout o-layout--justify-center o-layout--align-center"> 
            <p>Power level is ${ powerlevel.toFixed(2) }% </p>
        </div>
                
    `;});
        console.log(data)

    
    });
     }, 100)


};

//#endregion



document.addEventListener('DOMContentLoaded', function() {

    
});


const animateIn = document.querySelectorAll(".js-animate-in-reset");

observerR = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                
                //console.log("Visible", entry)
                //console.log("De url die wordt gebruikt bij de IntersectionObserver is : \n" + nextcall)
                getAllPokemon_API(nextcall);

        } 
    });
});

animateIn.forEach(x => {
    observerR.observe(x)
})



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





