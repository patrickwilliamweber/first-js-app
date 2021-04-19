let pokemonList = [];
pokemonList = [{ name: "bulbasaur", height: 7, types: ["grass", "poison"] }, { name: "oddish", height: 5, types: ["acid", "moonlight"] }, { name: "charmander", height: 6, types: ["smokescreen", "metal"] }];

for (i = 0; i < pokemonList.length; i++) {
    document.write(`Pokemon number ${i + 1} is ${pokemonList[i].name}`)
}