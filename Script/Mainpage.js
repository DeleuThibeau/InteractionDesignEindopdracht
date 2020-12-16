// #region ==== Global Variables //

let filterType ="showAll";
let html_PokemonList;
let nextcall ="https://pokeapi.co/api/v2/pokemon?limit=10"

// #endregion

// #region ===== API & pokemon HTML //

const getAllPokemon_API = async (url) => {
    // Eerst bouwen we onze url op
    url = nextcall;
	// Met de fetch API proberen we de data op te halen.		
    const data = await fetch(url) //next call variabele
            .then(r => r.json())
            .catch((err) => console.error('an error occurred', err))

    let resultLijst = data.results
    let next = data.next

    nextcall = next
    //console.log(resultLijst);
    //console.log("filter type in de volgende call is " + filterType)

    if(filterType == "showAll")
    {
        console.log("ALL")
        resultLijst.forEach(element =>setTimeout(() => { getDetailsPokemon_API(element.url) }, 500))
    }

    else
    {
        console.log("FILTER")
        resultLijst.forEach(element =>setTimeout(() => { getDetailsFilteredPokemon_API(element.url) }, 500))
    }
};


const getDetailsPokemon_API = async (url) => {
    await setTimeout(() => { 
        fetch(url)
        .then(result => {
            result.json().then(object => { 
            //console.log(object.types[0].type.name)
            //console.log(object.types[1].type.name)
            let powerlevel = ((object.stats[0].base_stat + object.stats[1].base_stat + object.stats[2].base_stat +object.stats[3].base_stat + object.stats[4].base_stat+ object.stats[5].base_stat)/1125)*100
            
            html_PokemonList.innerHTML += createPokemonHtml(object,powerlevel)
            
            if(object.id == 893)
            {
                var element = document.getElementById("id_loader");
                element.classList.add("o-hide")
                }
            });
        });
    },500)
};


const getDetailsFilteredPokemon_API = async (url) => {

    await setTimeout(() => { 
        fetch(url)
            .then(result => {
            result.json().then(object => { 

                let powerlevel = ((object.stats[0].base_stat + object.stats[1].base_stat + object.stats[2].base_stat +object.stats[3].base_stat + object.stats[4].base_stat+ object.stats[5].base_stat)/1125)*100;

                let listFilteredPokemon = "";
                if(filterType == object.types[0].type.name)
                { 
                    listFilteredPokemon += createPokemonHtml(object, powerlevel);
                }

                html_PokemonList.innerHTML += listFilteredPokemon;

            });  
        });
    }, 100)
};


// #endregion

// #region ===== Filter  //

const ShowFilterType = (element) => {

    document.getElementById(element).addEventListener("click", async function()
    {
        document.getElementById("myNav").style.width = "0%";
        //console.log(`Er werd op ${element} geklikt`)
        filterType = element;
        //console.log(filterType)
        html_PokemonList.innerHTML =""

        nextcall ="https://pokeapi.co/api/v2/pokemon?limit=250"
        
    })
};


const FilterSelector = function()
{

    const div = document.querySelector(".overlay-content");

    var list = Array.prototype.slice.call(div.children)

    var typeList = []

    for(i = 0 ; i < 34; i++)
    {
        if(i%2 == 1){
            typeList.push(list[i].id)
        }
    }
    typeList.forEach(ShowFilterType);
};

// #endregion

// #region ==== HTML filled with API values //

const createPokemonHtml = function(object, powerlevel){
    const htmlObj = `
    <div class="c-app-pokemon">
    
        <div class="c-pokemon">
            <img class="c-sprite-pokemon" src="${object.sprites.front_default}" alt="${object.name}">
            <div class="c-pokemon-name">${object.name}</div>
        </div>
            
        <div class="c-stats-1 u-stats-fz">

            <div class="u-stat-bar-margin-bottom">
                <p>Attack: <b>${object.stats[1].base_stat}</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[1].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="u-stat-bar-margin-bottom">
                <p>Defense: <b>${object.stats[2].base_stat }</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[2].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="u-stat-bar-margin-bottom">
                <p>HP: <b>${object.stats[0].base_stat }</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[0].base_stat}%/255*100)"></div>
                </div>
            </div>
        </div>

        <div class="c-stats-2 u-stats-fz">

            <div class="u-stat-bar-margin-bottom">
                <p>Speciale Attack: <b>${object.stats[3].base_stat }</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[3].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="u-stat-bar-margin-bottom">
                <p>Speciale Defense: <b>${object.stats[4].base_stat }</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[4].base_stat}%/255*100)"></div>
                </div>
            </div>

            <div class="u-stat-bar-margin-bottom">
                <p>Speed: <b>${object.stats[5].base_stat }</b></p>
                <div class="u-progress_bar_color u-bar_radius">
                    <div class="u-progress_bar_percentage_color u-bar_radius" style="width:calc(${object.stats[5].base_stat}%/255*100)"></div>
                </div>
            </div>
        </div>


        <div class="c-powerlevel"> 
            <div class="c-powerlevel-text">Power level: <b>${ powerlevel.toFixed(2) }%</b></div>
            <div class=" c-progress_bar_powerlevel u-bar_radius_powerlevel">
                <div class="progress_bar_percentage_color_powerlevel u-bar_radius_powerlevel" style="width:calc(${powerlevel.toFixed(2)}%"></div>
            </div>
        </div>
    </div>`;
    return htmlObj;
};


// #endregion

// #region ==== DOM //
document.addEventListener('DOMContentLoaded', function() {

    // #region ===== Sidebar  //

    document.getElementById("js-button-open").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "30%";
    });

    document.getElementById("js-button-close").addEventListener("click",function(){
    document.getElementById("myNav").style.width = "0%";
    });
    // #endregion

    // #region ===== Autoscroll  //
    const animateIn = document.querySelectorAll(".js-animate-in-reset");

    observerR = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                    getAllPokemon_API(nextcall);
            } 
        });
    });

    animateIn.forEach(x => {
        observerR.observe(x)
    })

    // #endregion



    html_PokemonList = document.querySelector('.js-pokemonlist');
    FilterSelector();
    
});
// #endregion
