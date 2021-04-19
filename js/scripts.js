let pokemonList = [];
pokemonList = [{ name: "Bulbasaur", height: 7, types: ["grass", "poison"] }, { name: "Oddish", height: 5, types: ["acid", "moonlight"] }, { name: "Charmander", height: 6, types: ["smokescreen", "metal"] }];

for (i = 0; i < pokemonList.length; i++) {
    document.write(`<p class="list"> Pokemon number ${i + 1} is <strong>${pokemonList[i].name}</strong>, with a height of <strong>${pokemonList[i].height}</strong>.`);
    if (pokemonList[i].height > 6) {
        document.write(" (Whoooaaa this guy's massive!) </p> ")
    }
};