//the IIFE//
let pokemonRepository = (function() {
    //defining pokemon list as an empty array//
    let pokemonList = [];
    //the api//
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/';
    //the return object, with a collection of functions each stored as the value of a key value pair//
    return {
        //pushes a pokemon to the array, is called in the loadList function//
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
            //appending children: (as parents:)List => listItem => button//
            listItem.appendChild(button);
            list.appendChild(listItem);
            button.innerText = pokemon.name;
            button.classList.add('button');
            //creating pokemonName as a div, adding hidden and styling classes and the innerText//
            let pokemonName = document.createElement('p');
            pokemonName.id = pokemon.name;
            pokemonName.classList.add('modal-feature');
            pokemonName.innerText = `${pokemon.name}`;
            //creating height as a div and adding classes for styling//
            let height = document.createElement('div');
            height.classList.add('modal-feature');
            //creating image as a div and adding classes for styling//
            let image = document.createElement('div');
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
            let closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.innerHTML = "&times;";
            modalDiv.appendChild(closeButton);
            //getting the overlay from HTML//
            let overlay = document.getElementById('overlay');

            function closeModal() {
                modalDiv.classList.add('hidden');
                overlay.classList.remove('active');
            }
            document.querySelector('body').addEventListener('keydown', function(e) {
                if (e.keycode === 27)
                    closeModal();
            })
            closeButton.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            //calling pokemonRepository.showDetails on click,  which console logs the pokemon's name//
            button.addEventListener('click', pokemonRepository.showDetails);
            //defining/calling the function that toggles the visibility of the modal//
            button.addEventListener('click', function() {
                //loadDetails here is bringing in all the necessary information to fill the html elements//
                pokemonRepository.loadDetails(pokemon).then(function() {
                    document.querySelectorAll('.modalDiv:not(.hidden)').forEach(function(modal) {
                        let pokemonName = modal.children.namedItem(pokemon.name);
                        if (!pokemonName)
                            modal.classList.add('hidden');
                    });
                    modalDiv.classList.toggle('hidden');
                    height.innerText = `Height: ${pokemon.height}`;
                    image.innerHTML = `<div><img src="${pokemon.imageUrl}" alt="pokemon image"></div>`;
                    console.log(modalDiv.classList);
                    if (!modalDiv.classList.contains('hidden'))
                        overlay.classList.add('active');
                    else
                        overlay.classList.remove('active');

                });

            });
        },
        //gets the pokemon list from the API//
        loadList: function loadList() {
            pokemonList = [];
            //the fetch promise, with a callback function taking the parameter 'response'//
            return fetch(apiURL).then(function(response) {
                //json => javascript (i think)?? This generates another promise, which is why .then is used again//
                return response.json();
                //now a function that takes the javascript//
            }).then(function(json) {
                //on each, now javascript, returned object, run this function//
                json.results.forEach(function(item) {
                    //defining a pokemon as an object I am now making, which has the name and image inside it//
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    //pushing this item to the pokemonList array//
                    pokemonRepository.add(pokemon);
                });
                //catch function//
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


//This is the whole thing without the pokemon respository prepended to the function names//

// loadList().then(function() {
//     getAll().forEach(function(pokemon) {
//         addListItem(pokemon)
//     })
// })