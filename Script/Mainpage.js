document.addEventListener('DOMContentLoaded', function() {
    showType();
});

let filterType =""

//#region ===== API & pokemon HTML //

let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=10"
const pokemonList = document.querySelector('.js-pokemonlist');

async function getAllPokemon_API(url) {
    // Eerst bouwen we onze url op
    url = nextcall;
	// Met de fetch API proberen we de data op te halen.		
    const data = await fetch(url) //next call variabele
            .then(r => r.json())
            .catch((err) => console.error('an error occurred', err))
    let resultLijst = data.results
    let next = data.next
    //console.log("the huidige url in de API function is: \n" + nextcall)
    nextcall = next
    //console.log(resultLijst)
    //console.log("the next url in de API function is: \n" + nextcall)

    resultLijst.forEach(element =>setTimeout(() => { getDetailsPokemon_API(element.url) }, 500))
 
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
        <div class="c-app-pokemon">
        
        <div class="c-pokemon">
            <img class="c-sprite-pokemon" src="${object.sprites.front_default}" alt="${object.name}">
            <div class="c-pokemon-name">${object.name}</div>
        </div>
            
        <div class="c-stats-1">

            <div class="c-stat-bar-margin-bottom">
                <p>Attack: <b>${object.stats[1].base_stat}</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[1].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="c-stat-bar-margin-bottom">
                <p>Defense: <b>${object.stats[2].base_stat }</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[2].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="c-stat-bar-margin-bottom">
                <p>HP: <b>${object.stats[0].base_stat }</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[0].base_stat}%/255*100)"></div>
                </div>
            </div>
        </div>

        <div class="c-stats-2">

            <div class="c-stat-bar-margin-bottom">
                <p>Speciale Attack: <b>${object.stats[3].base_stat }</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[3].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="c-stat-bar-margin-bottom">
                <p>Speciale Defense: <b>${object.stats[4].base_stat }</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[4].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="c-stat-bar-margin-bottom">
                <p>Speed: <b>${object.stats[5].base_stat }</b></p>
                <div class="progress_bar_color bar_radius">
                    <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[5].base_stat}%/255*100)"></div>
                </div>
            </div>
        </div>


        <div class="c-powerlevel"> 
            <div class="c-powerlevel-text">Power level: <b>${ powerlevel.toFixed(2) }%</b></div>
            <div class=" progress_bar_powerlevel bar_radius_powerlevel">
                <div class="progress_bar_percentage_color_powerlevel bar_radius_powerlevel" style="width:calc(${powerlevel.toFixed(2)}%"></div>
            </div>
        </div>
    </div>`;

        if(object.id == 893){
            var element = document.getElementById("id_loader");
            element.classList.add("o-hide")
        }
    });
});
}, 500)};

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

//#region ===== Sidebar  //

document.getElementById("hamburger-icon").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "30%";
});

document.getElementById("id_closebtn").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "0%";
});

//#endregion

//#region ===== Filter  //


const showType = () => {




    document.getElementById("water").addEventListener("click", async function(){
        console.log(`Er werd op water geklikt`)

        let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=10"
        const pokemonList = document.querySelector('.js-pokemonlist');
        filterType = "water"
        // Eerst bouwen we onze url op
        url = nextcall;
        // Met de fetch API proberen we de data op te halen.		
        const data = await fetch(url) //next call variabele
                .then(r => r.json())
                .catch((err) => console.error('an error occurred', err))
        
        let resultLijst = data.results
        let next = data.next

        //console.log("the huidige url in de API function is: \n" + nextcall)
        nextcall = next
        //console.log("the next url in de API function is: \n" + nextcall)

        resultLijst.forEach(element =>setTimeout(() => { getDetailsPokemon_API(element.url) }, 100))
        


        const getDetailsPokemon_API = async (url) => {

            await setTimeout(() => { 
            fetch(url)
                .then(result => {
                let data = result.json().then(object => { 
                 //console.log(object)
                // console.log(object.types[0].type.name)
                // console.log(object.types[1].type.name)
                let powerlevel = ((object.stats[0].base_stat + object.stats[1].base_stat + object.stats[2].base_stat +object.stats[3].base_stat + object.stats[4].base_stat+ object.stats[5].base_stat)/1125)*100;
                //console.log(object.types)
                //console.log(element)
                
                console.log(filterType)
                if(filterType == object.types[0].type.name){
                    pokemonList.innerHTML = `
                    <div class="c-app-pokemon">
                    
                    <div class="c-pokemon">
                        <img class="c-sprite-pokemon" src="${object.sprites.front_default}" alt="${object.name}">
                        <div class="c-pokemon-name">${object.name}</div>
                    </div>
                        
                    <div class="c-stats-1">
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>Attack: <b>${object.stats[1].base_stat}</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[1].base_stat}%/255*100)"></div>
                            </div>
                        </div>
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>Defense: <b>${object.stats[2].base_stat }</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[2].base_stat}%/255*100)"></div>
                            </div>
                        </div>
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>HP: <b>${object.stats[0].base_stat }</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[0].base_stat}%/255*100)"></div>
                            </div>
                        </div>
                    </div>
            
                    <div class="c-stats-2">
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>Speciale Attack: <b>${object.stats[3].base_stat }</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[3].base_stat}%/255*100)"></div>
                            </div>
                        </div>
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>Speciale Defense: <b>${object.stats[4].base_stat }</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[4].base_stat}%/255*100)"></div>
                            </div>
                        </div>
            
                        <div class="c-stat-bar-margin-bottom">
                            <p>Speed: <b>${object.stats[5].base_stat }</b></p>
                            <div class="progress_bar_color bar_radius">
                                <div class="progress_bar_percentage_color bar_radius" style="width:calc(${object.stats[5].base_stat}%/255*100)"></div>
                            </div>
                        </div>
                    </div>
            
            
                    <div class="c-powerlevel"> 
                        <div class="c-powerlevel-text">Power level: <b>${ powerlevel.toFixed(2) }%</b></div>
                        <div class=" progress_bar_powerlevel bar_radius_powerlevel">
                            <div class="progress_bar_percentage_color_powerlevel bar_radius_powerlevel" style="width:calc(${powerlevel.toFixed(2)}%"></div>
                        </div>
                    </div>
                </div>`;
            }
                
            });
                //console.log(data)
            
            });
            }, 100)


        };

    })
};

// const filter_type = function(){
//     const div = document.querySelector(".overlay-content");
//     //console.log(div)
//     var list = Array.prototype.slice.call(div.children)
//     //console.log(list)
//     var typeList = []

//     for(i = 0 ; i < 32; i++)
//     {
//         if(i%2 == 1){
//             //console.log(list[i].id);
//             typeList.push(list[i].id)
//         }
//     }

//     //console.log(typeList)
//     //list.forEach(element => console.log(element.id))

//     typeList.forEach(showType);
// };

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





