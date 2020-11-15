document.addEventListener('DOMContentLoaded', function() {
    filter();
});

//#region ===== API & pokemon HTML //

let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=3"
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
        //console.log(object.types)
        //console.log(object.types[0].type.name)
        //console.log(object.types[1].type.name)
        let powerlevel = ((object.stats[0].base_stat + object.stats[1].base_stat + object.stats[2].base_stat +object.stats[3].base_stat + object.stats[4].base_stat+ object.stats[5].base_stat)/1125)*100

        pokemonList.innerHTML += `
        <div class="c-pokemon">
            <div class="o-row o-row--lg o-layout o-layout--justify-center o-layout--align-center">
                <div>
                    <img src="${object.sprites.front_default }" alt="${ object.name }">
                    <p class="o-layout o-layout--justify-center">${ object.name }</p>
                </div>
                
                <div class="o-layout--gutter">
                    <p>
                        <div>HP: ${object.stats[0].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[0].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                    <p>
                        <div>Attack: ${object.stats[1].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[1].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                    <p>
                        <div>Defense: ${object.stats[2].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[2].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                </div>
                    
                <div class="o-layout--gutter">
                    <p>
                        <div>Speciale Attack: ${object.stats[3].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[3].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                    <p>
                        <div>Speciale Defense: ${object.stats[4].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[4].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                    <p>
                        <div>Speed: ${object.stats[5].base_stat }</div>
                        <div class="progress_bar_color bar_radius">
                            <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[5].base_stat}%/255*100)"></div>
                        </div>
                    </p>
                </div>
            </div>

            <div class=" o-row-powerlevel o-layout o-layout--justify-center o-layout--align-center"> 
                <p>Power level is ${ powerlevel.toFixed(2) }%</p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${powerlevel.toFixed(2)}%"></div>
                </div>
            </div>
        </div>
                
    `;});
    //console.log(data)

    
    });
     }, 100)


};

//#endregion

//#region ===== Sidebar  //

document.getElementById("hamburger-icon").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "20%";
})

document.getElementById("id_closebtn").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "0%";
})


//#endregion

//#region ===== Autoscroll  //
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

//#endregion

//#region ===== Filter  //


const showType = function(element){
    document.getElementById(`${element.id}`).addEventListener("click",function(){
        console.log(`Er werd op ${element.id} geklikt`)
    })
};

const filter = function(){
    const div = document.querySelector(".overlay-content");
    var list = Array.prototype.slice.call(div.children)

    list.forEach(showType);
}


//#endregion





















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





