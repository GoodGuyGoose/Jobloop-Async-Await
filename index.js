// // async await

// -------------------------------------------
// FUNCTION DECLARATION
// -------------------------------------------
// async function hello() { return "Hello" }

// -------------------------------------------
// FUNCTION EXPRESSION
// -------------------------------------------
// let hello = async () =>  { return "Hello" }


// -------------------------------------------
// LOG THE RESULT OF THE PROMISE
// -------------------------------------------

// hello()
//  .then(res => console.log(res))

// // OR

// hello().then(console.log)

// -------------------------------------------
// AWAIT -- THE POWER OF async functions
// ------------------------------------------- 

//  async function helloAgain() {
//      let string = await hello()
//      console.log(string)
//  }

// helloAgain()

// -------------------------------------------
// AWAIT -- ANOTHER EXAMPLE
// ------------------------------------------- 
// async function f() {
    
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve("done!"), 1000)
//     });

//     let result = await promise; // wait until the promise resolves (*)

//     console.log(result); // "done!"
//   }
  
// f();


// console.log('this run right away')
// here we see the function is literally suspended until our promise is reolved/rejected


// -------------------------------------------
// AWAIT -- STRINGING TOGETHER awaits
// ------------------------------------------- 

//  async function stringFetches() {
//      let response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//      let data = await response.json()
//      console.log(data)
//  }

//  stringFetches()

// -------------------------------------------
// AWAIT -- PREVENTING CONCURRENCY IN OUR CODE
// ------------------------------------------- 

// async function timeout(ms) {
//     return new Promise(resolve => setTimeout(() => resolve('data fetched'), ms));
// }

// const fetchingALot = async () => {

//     const firstFetch = await timeout(2000)
//     console.log(firstFetch)

//     const secondFetch = await timeout(2000)
//     console.log(secondFetch)
// }

// fetchingALot()

// -------------------------------------------
// HERE WE SEE HOW THE FIRST PROMISE PREVENTS THE SECOND PROMISE FROM RUNNING BECAUSE
// IT IS WAITING FOR THE FIRST FETCH TO FINISH RESOLVING.  WE USE Promise.all() TO 
// WORK AROUND THIS.
// WE ONLY NEED TO AWAIT THE SECOND VALUE IF IT IS DEPENDANT ON THE FIRST.
// NOTE: check out utils module for promisifying something
// ------------------------------------------- 
// async function timeout(ms) {
//     return new Promise(resolve => setTimeout(() => resolve('data fetched'), ms));
// }

// const fetchTimedResponse = async () => {
//     let fetch = await timeout(2000)
//     return fetch
// }


// const fetchingConcurrently = async () => {
//     console.time('fetch')
    
//     const firstFetch = fetchTimedResponse()
//     const secondFetch = fetchTimedResponse()
    
//     const allRes = await Promise.all([firstFetch, secondFetch, firstFetch, firstFetch])
//     console.log(allRes)
//     console.timeEnd('fetch')
// }

// fetchingConcurrently()

// -------------------------------------------
// THIS LETS USE FETCH ALL PROMISES CONCURRENTLY AND STORE THE VALUES IN THE INDEX
// OF THE ARRAY.  
// ------------------------------------------- 

// const img = document.querySelector('img')

// async function pokeFetch() {
//     let response = await fetch('https://pokeapi.co/api/v2/pokemon/mankey');
//     let pokemon = await response.json();
//     img.src = pokemon.sprites.back_default
// }

// pokeFetch()
//     .catch(console.log)

// ------------------------------------------- 
// PROMISE ALL
// ------------------------------------------- 

// async function fetchPokeList() {

//     console.time('firstFetch')
//     console.time('firstRender')
//     console.time('secondFetch')
    
//     // Poke grid for all rendered content to be attached to 
//     const pokeGrid = document.querySelector(".poke-grid")

//     // Fetch inital array of pokemon with limit & error check
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
//     if (!response.ok) { console.error(`HTTP error! status: ${response.status}`)}
//     const pokemon = await response.json();

//     // Fetch array or result with Promise.all to Prevent concurrency
//     const allFetches = pokemon.results.map(poke => fetch(poke.url))
//     const allFetchResults = await Promise.all(allFetches)
//     const allPokemonData =  await Promise.all(allFetchResults.map(pokeResponse => pokeResponse.json()))
//     console.log(allPokemonData)

//     console.timeEnd('firstFetch')

//         // render PokeCard
//         allPokemonData.forEach(pokemon => {
//             // Card div
//             const pokeCard = document.createElement('div')
//             pokeCard.id = pokemon.id
//             pokeCard.classList.add('poke-card')
            
//             // Pokemon Img
//             const img = document.createElement('img')
//             img.src = pokemon.sprites.front_default
            
//             // Card text
//             const pokeInfoContainer = document.createElement('div')
//             pokeInfoContainer.classList.add('poke-info-container')
//             const pokeId = document.createElement('h2')
//             pokeId.textContent = pokemon.id
//             const pokeName = document.createElement('h2')
//             pokeName.textContent = pokemon.name 
            
//             // Append all 
//             pokeInfoContainer.append(pokeId, pokeName)
//             pokeCard.append(img, pokeInfoContainer)
//             pokeGrid.append(pokeCard)

            
//         })

//         console.timeEnd('firstRender')

//         // Add event listener for mouseover
    
//         let targetCard = null
//         const greyFilter = document.querySelector('#grey-filter')
//         greyFilter.style.height = body.clientHeight + 'px'
        
//         pokeGrid.addEventListener('mouseover', e => {
//             if(e.target === pokeGrid) {return}
//             targetCard = e.target
//             if(targetCard.classList.contains('poke-card')) {
//                 targetCard.classList.add('target-card')
                
//                 greyFilter.classList.add('grey-filter-active')
                
//                 if(targetCard.querySelector('.poke-description')) {return}
                
                
//                 const description = document.createElement('p')
//                 description.textContent = allSpeciesData[targetCard.id - 1]['flavor_text_entries'][0]['flavor_text']
//                 targetCard.append(description)
//                 description.classList.add('poke-description')
//             }
//         })
        
//         pokeGrid.addEventListener('mouseleave', e => {
//             if(!targetCard.querySelector('.poke-description')) {return}
//             targetCard.querySelector('.poke-description').remove()
//             targetCard.classList.remove('target-card')
//             greyFilter.classList.remove('grey-filter-active')
//         })    
        
//         const speciesResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=151');
//         if (!response.ok) { console.error(`HTTP error! status: ${response.status}`)}
//         const pokemonSpecies = await speciesResponse.json();

//         const allSpeciesFetches = pokemonSpecies.results.map(poke => fetch(poke.url))
//         const allSpeciesFetchResults = await Promise.all(allSpeciesFetches)
//         const allSpeciesData =  await Promise.all(allSpeciesFetchResults.map(poke => poke.json()))
//         console.log(allSpeciesData)
//         console.timeEnd('secondFetch')




// }

// fetchPokeList()
