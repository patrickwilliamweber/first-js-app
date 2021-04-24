let pokemonRepository = (function() {
    let pokemonList = [];
    pokemonList = [{ name: "Bulbasaur", height: 7, types: ["grass", "poison"] }, { name: "Oddish", height: 5, types: ["acid", "moonlight"] }, { name: "Charmander", height: 6, types: ["smokescreen", "metal"] }];
    return {
        add: function(pokemon) {
            pokemonList.push(pokemon)
        },
        getAll: function() {
            return pokemonList;
        }
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
    document.write(`<p class="list"> This pokemon is <strong>${element.name}</strong>, they have a height of <strong>${element.height}</strong>.`);
    if (element.height > 6) {
        document.write(" (Whoooaaa this guy's massive!) </p> ")
    }
})