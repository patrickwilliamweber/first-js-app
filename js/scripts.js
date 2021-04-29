let pokemonRepository = (function() {
    let pokemonList = [];
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

    };
})();





// for (i = 0; i < pokemonList.length; i++) {
//     document.write(`<p class="list"> Pokemon number ${i + 1} is <strong>${pokemonList[i].name}</strong>, with a height of <strong>${pokemonList[i].height}</strong>.`);
//     if (pokemonList[i].height > 6) {
//         document.write(" (Whoooaaa this guy's massive!) </p> ")
//     }
// };

//The next line is a test.
//pokemonRepository.add({ name: "King-Pokemon", height: 12 });


pokemonRepository.getAll().forEach(function(element) {
        pokemonRepository.addListItem(element);
    })
    //Below is a test with a pokemon I made up.
    // let newPokemon = {
    //     name: "Faloo (fuh-LOO)",
    //     height: 12
    // }
    // pokemonRepository.addListItem(newPokemon);