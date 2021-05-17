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
            //getting the ul from html//
            let list = document.querySelector('.pokemon-list');
            //adding list items as 'listItem', they are parents to the buttons, but do not themselves display//
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('button');
            //appending listItem to list and button to listItem as children//
            listItem.appendChild(button);
            list.appendChild(listItem);
            //creating pokemonName as a div, adding hidden and styling classes and the innerText//
            let pokemonName = document.createElement('p');
            pokemonName.classList.add('modal-feature');
            pokemonName.innerText = `${pokemon.name}`;
            //creating height as a div and adding classes for hidden and styling//
            let height = document.createElement('div');
            height.classList.add('hidden');
            height.classList.add('modal-feature');
            //creating image as a div and adding classes for hidden and styling//
            let image = document.createElement('div');
            image.classList.add('hidden');
            image.classList.add('image');
            //creating the modalDiv and appending image, name, height, and hidden and styling classes//
            let modalDiv = document.createElement('div');
            //appending modalDiv to button as a sibling//
            button.after(modalDiv);
            modalDiv.appendChild(image);
            modalDiv.appendChild(pokemonName);
            modalDiv.appendChild(height);
            modalDiv.classList.add('modalDiv');
            modalDiv.classList.add('hidden');
            //getting the overlay from HTML//
            let overlay = document.getElementById('overlay');
            //calling pokemonRepository.showDetails on click,  which console logs the pokemon's name//
            button.addEventListener('click', pokemonRepository.showDetails);
            //defining/calling the function that toggles the visibility of the modal//
            button.addEventListener('click', function() {
                //loadDetails here is bringing in all the necessary information to fill the html elements//
                pokemonRepository.loadDetails(pokemon).then(function() {
                    modalDiv.classList.toggle('hidden');
                    height.innerText = `Height: ${pokemon.height}`;
                    height.classList.toggle('hidden');
                    image.innerHTML = `<div><img src="${pokemon.imageUrl}" alt="pokemon image"></div>`;
                    image.classList.toggle('hidden');
                    overlay.classList.toggle('active');
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