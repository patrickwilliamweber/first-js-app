let pokemonRepository = (function() {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/';
    pokemonList = [{ name: "Bulbasaur", height: 7, types: ["grass", "poison"] }, { name: "Oddish", height: 5, types: ["acid", "moonlight"] }, { name: "Charmander", height: 6, types: ["smokescreen", "metal"] }];
    return {
        add: function(pokemon) {
            pokemonList.push(pokemon)
        },
        getAll: function() {
            return pokemonList;
        },
        loadDetails: function loadDetails(item) {
            let url = item.detailsUrl;
            console.log(item);
            return fetch(url).then(function(response) {
                return response.json();
            }).then(function(details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function(e) {
                console.error(e);
            });
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
            button.addEventListener('click', pokemonRepository.modalFlash);

        },
        modalFlash: function() {
            pokemonRepository.loadDetails(pokemon).then(function() {
                console.log(pokemon);
                let height = document.createElement('p');
                let image = document.createElement('div');
                height.innerText = `Height: ${pokemon.height}`;
                image.innerHTML = `<div><img src="${pokemon.imageUrl}" alt="fresh lookin pokemon"></div>`;
                image.classList.add('image');
                height.classList.add('height');
                listItem.appendChild(height);
                listItem.appendChild(image);

            });
        });
},
loadList: function loadList() {
    pokemonList = [];
    return fetch(apiURL).then(function(response) {
        return response.json();
    }).then(function(json) {
        json.results.forEach(function(item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            pokemonRepository.add(pokemon);
        });
    }).catch(function(e) {
        console.error(e);
    })
},


}
})();



pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});