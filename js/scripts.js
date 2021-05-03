let pokemonRepository = (function() {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    pokemonList = [{ name: "Bulbasaur", height: 7, types: ["grass", "poison"] }, { name: "Oddish", height: 5, types: ["acid", "moonlight"] }, { name: "Charmander", height: 6, types: ["smokescreen", "metal"] }];
    return {
        add: function(pokemon) {
            pokemonList.push(pokemon)
        },
        getAll: function() {
            return pokemonList;
        },

        showDetails: function(event) {
            console.log(event.target.innerText);
        },

        addListItem: function(pokemon) {
            let list = document.querySelector('.pokemon-list');
            list.classList.add('list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('button');
            listItem.appendChild(button);
            list.appendChild(listItem);
            button.addEventListener('click', pokemonRepository.showDetails);
        },
        loadList: function loadList() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function(e) {
                console.error(e);
            })
        },
        loadDetails: function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function(e) {
                console.error(e);
            });
        },

    }
})();





// for (i = 0; i < pokemonList.length; i++) {
//     document.write(`<p class="list"> Pokemon number ${i + 1} is <strong>${pokemonList[i].name}</strong>, with a height of <strong>${pokemonList[i].height}</strong>.`);
//     if (pokemonList[i].height > 6) {
//         document.write(" (Whoooaaa this guy's massive!) </p> ")
//     }
// };

//The next line is a test.
//pokemonRepository.add({ name: "King-Pokemon", height: 12 });

pokemonRepository.loadList().then(function() {
            // Now the data is loaded!
            pokemonRepository.getAll().forEach(function(pokemon) {
                    pokemonRepository.addListItem(pokemon);

                    // pokemonRepository.getAll().forEach(function(element) {
                    //         pokemonRepository.addListItem(element);
                })
                //Below is a test with a pokemon I made up.
                // let newPokemon = {
                //     name: "Faloo (fuh-LOO)",
                //     height: 12
                // }
                // pokemonRepository.addListItem(newPokemon);