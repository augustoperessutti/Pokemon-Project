let API_POKEMON1 = {};
let API_POKEMON2 = {};
let API_POKEMON3 = {};

// Creamos todas las funciones que posteriormente utilizaremos para crear contenido
// dinamicamente. Cada funcion sirve para una etiqueta diferente de HTML.
const createSection = (id) => {
    const section = document.createElement('section');
    section.setAttribute('id', id)
    section.classList.add('form__container');
    return section;
}

const createP = () => {
    const p = document.createElement('p')
    return p;
}

const createLabel = () => {
    const label = document.createElement('label');
    return label;
}

const createButton = () => {
    const button = document.createElement('button');
    return button
}

const createInput = (name) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    return input;
}

const createSpace = () => {
    const br = document.createElement('br');
    return br;
}

const createDiv = () => {
    const div = document.createElement('div');
    return div;
}

const createSpan = () => {
    const span = document.createElement('span');
    return span;
}

const createImg = () => {
    const img = document.createElement('img');
    return img;
}

const createLastWindow = () => { 
    const div = createDiv();
    div.classList.add('last-popup__container')
    div.setAttribute('id', 'popup-container')

    const message = createP();
    message.classList.add('last-popup__main-text');
    message.textContent = "Congratulations! Here you have more information about your Pokémons:";

    const divMessage = createDiv();
    divMessage.classList.add('last-popup__container-flex')

    const divContainerPokemons = createDiv();
    divContainerPokemons.classList.add('last-popup__container-flex')

    const divPokemon = (pokemon) => {
        const container = createDiv();
        container.classList.add('last-popup__pokemon-container');

        const pokemonImg = createImg();
        pokemonImg.classList.add('last-popup__img');
        pokemonImg.src = pokemon.img;
        pokemonImg.alt = pokemon.name;

        const pokemonName = document.createElement('h1');
        pokemonName.classList.add('last-popup__title');
        pokemonName.textContent = pokemon.name;

        const detailsContainer = createDiv();
        detailsContainer.classList.add('last-popup__details-container')

        const detailsTitle = createP();
        detailsTitle.classList.add('last-popup__details-title')
        detailsTitle.innerHTML = "DETAILS:"

        const experience = createSpan();
        experience.classList.add('last-popup__details-list')
        experience.innerHTML = `EXP: ${pokemon.experience}`;

        const attack = createSpan();
        attack.classList.add('last-popup__details-list')
        attack.innerHTML = `ATK: ${pokemon.attack}`;

        const defense = createSpan();
        defense.classList.add('last-popup__details-list')
        defense.innerHTML = `DEF: ${pokemon.defense}`;

        container.appendChild(pokemonImg);
        container.appendChild(pokemonName);
        container.appendChild(detailsContainer);
        detailsContainer.appendChild(detailsTitle);
        detailsContainer.appendChild(experience);
        detailsContainer.appendChild(attack);
        detailsContainer.appendChild(defense);

        return container;
    }

    const closeButton = createButton();
    closeButton.textContent = "CLOSE X";
    closeButton.classList.add('last-popup__close-button');
    closeButton.addEventListener('click', () => {
        const element = document.getElementById('popup-container');
        element.style.display = "none";
    })

    document.body.addEventListener("keypress", (event) => {
        if(event.code === 'Space') {
            const element = document.getElementById('popup-container');
            element.style.display = "none";
        }
    })

    const commentButton = createP();
    commentButton.textContent = "Press SPACE to close."
    commentButton.classList.add('form__comment')

    document.getElementById('body').appendChild(div);
    div.appendChild(divMessage);
    divMessage.appendChild(message);
    div.appendChild(divContainerPokemons);
    divContainerPokemons.appendChild(divPokemon(API_POKEMON1));
    divContainerPokemons.appendChild(divPokemon(API_POKEMON2));
    divContainerPokemons.appendChild(divPokemon(API_POKEMON3));
    div.appendChild(closeButton);
    div.appendChild(commentButton);
}

// Creamos el primer paso (que estara impreso al cargar la página)
const firstStep = () => {
    const firstSection = createSection('step-1')

    const welcomeText = createP();
    welcomeText.textContent = `Hi! Welcome to the Pokemon laboratory...`;

    const askName = createP();
    askName.textContent = "What's your name?";

    const label = createLabel();
    const inputName = createInput('name');
    inputName.classList.add('form__field');
    inputName.setAttribute('autofocus', '');

    const button = createButton();
    button.type = 'submit';
    button.classList.add('button-pokestyle');
    button.textContent = 'Continue';
    // Agregamos un evento al hacer click en el boton generado, el cual ejecutara
    // la funcion secondStep donde proseguiremos con la aplicación
    button.addEventListener("click", () => {
        const name = inputName.value;

        // comprobamos si hay algo escrito en el campo de texto. Si esta
        // vacio, enviamos un mensaje de alerta, si no seguimos con el paso 2
        if (inputName.value.length == 0) {
            alert("You MUST put a name before continue.")
        } else {
            return secondStep(name);
        }
    });

    // Agregamos un evento al presionar la tecla ENTER que nos lleva al mismo resultado
    // que si presionamos el botón de enviar.
    document.body.addEventListener("keypress", (event) => {
        if(event.code === 'Enter') {
            const name = inputName.value;

            //realizamos la misma comprobación que antes.
            if (inputName.value.length == 0) {
                alert("You MUST put a name before continue.")
            } else {
                return secondStep(name);
            }
        }
    });

    const comment = createP();
    comment.textContent = "press ENTER to continue"
    comment.classList.add('form__comment')

    // Maquetamos toda la estructura del primer paso.
    document.getElementById('main').appendChild(firstSection);
    firstSection.appendChild(welcomeText);
    firstSection.appendChild(createSpace());
    firstSection.appendChild(askName);
    firstSection.appendChild(label);
    label.appendChild(inputName);
    firstSection.appendChild(button);
    firstSection.appendChild(comment);
}

const clearMain = () => {
    const main = document.getElementById('main');
    main.innerHTML = '';
}

// Creamos la funcion del segundo paso, donde por parametro recibimos el
// nombre puesto por el usuario en el input del primer paso.
const secondStep = (name) => {
    //limpiamos el main para crear la segunda estructura del segundo paso.
    clearMain();

    // repetimos la misma logica aplicada en el paso 1 para pintar nuestro main.
    const secondSection = createSection('step-2');

    // saludamos al usuario con su nombre transformado a mayusculas.
    const sayingName = createP();
    sayingName.textContent = `Hello ${name.toUpperCase()}!`;

    const timeToMessage = createP();
    timeToMessage.textContent = "It's time to choose your news Pokémons";

    const readyMessage = createP();
    readyMessage.textContent = 'Are you ready?'

    const letsButton = createButton();
    letsButton.type = 'submit';
    letsButton.classList.add('button-pokestyle');
    letsButton.textContent = "Let's go!"

    // creamos el evento CLICK y KEYPRESS correspondientes a este paso
    letsButton.addEventListener("click", () => thirdStep());
    document.body.addEventListener("keypress", (event) => {
        if(event.code === 'Enter') {
            return thirdStep();
        }
    });

    const comment = createP();
    comment.textContent = "press ENTER to continue"
    comment.classList.add('form__comment')

    document.getElementById('main').appendChild(secondSection);
    secondSection.appendChild(sayingName);
    secondSection.appendChild(createSpace());
    secondSection.appendChild(timeToMessage);
    secondSection.appendChild(createSpace());
    secondSection.appendChild(readyMessage);
    secondSection.appendChild(letsButton);
    secondSection.appendChild(comment);
}

// Declaramos el tercer y ultimo paso
const thirdStep = () => {
    // limpiamos el main
    clearMain();

    // al igual que en los pasos anteriores, empezamos a pintar la estructura
    // del nuevo main
    const thirdSection = createSection('step-3');

    const discoverText = createP();
    discoverText.textContent = 'Press the Pokeballs to discover your news Pokémons!';

    const divContainer = createDiv();
    divContainer.classList.add('form__poke-container');

    // creamos una funcion que recibe un ID y una KEY
    const divForPokeballs = (id, key) => {
        // pintaremos un nuevo div con la ID recibida
        const divPokeball = createDiv();
        divPokeball.classList.add('form__pokeballs-small-container');
        divPokeball.setAttribute('id', id);

        // pintamos la imagen de la pokeball cerrada
        const pokeImg = createImg();
        pokeImg.src = 'images/pokeball.png';
        pokeImg.alt = 'Pokeballs';
        pokeImg.classList.add('pokemon-card__img');
        divPokeball.appendChild(pokeImg);

        // creamos el mensaje debajo de la pokeball indicando que letra pulsar
        // para abrir la pokeball (la recibimos en el parametro KEY)
        const pressMessage = createP();
        pressMessage.textContent = `Press ${key} to open`
        pressMessage.classList.add('form__comment');
        divPokeball.appendChild(pressMessage);

        // devolvemos el div completo
        return divPokeball;
    };

    // Maquetamos el tercer paso con las pokeballs cerradas.
    document.getElementById('main').appendChild(thirdSection);
    thirdSection.appendChild(discoverText);
    thirdSection.appendChild(divContainer);
    // aqui se ve como enviamos los parametros a la funcion para tener los 3 divs
    // con diferentes ID y con una key distinta.
    divContainer.appendChild(divForPokeballs('poke1', 'X'));
    divContainer.appendChild(divForPokeballs('poke2', 'C'));
    divContainer.appendChild(divForPokeballs('poke3', 'V'));

    // document.getElementById('main').appendChild();

    let poke1Choosed = false;
    let poke2Choosed = false;
    let poke3Choosed = false;

    let finishCounter = 0;

    // creamos un evento click que cuando se presione la pokeball,
    // se haga un llamado a la API para recibir informacion de un pokemon random
    // y pinte sobre el div correspondiente al ID, el nuevo pokemon.
    // si ya hemos abierto la pokeball, no podremos volver a hacerlo.
    document.getElementById('poke1').addEventListener("click", () => {
        if(!poke1Choosed) {
            getDataFromApi('poke1');
            poke1Choosed = true;
            finishCounter++
            checkFinish(finishCounter);
        } else {
            alert("You CAN'T change your first Pokemon. Love him (:")
        }
    });

    // creamos un evento que pida informacion a la API al igual que el anterior,
    // pero presionando la letra asignada a cada div
    // si ya hemos abierto la pokeball, no podremos volver a hacerlo.
    document.body.addEventListener("keypress", (event) => {
        if(!poke1Choosed) {
            if(event.code === 'KeyX') {
                getDataFromApi('poke1');
                poke1Choosed = true;
                finishCounter++
                checkFinish(finishCounter);
            }
        } else {
            if(event.code === 'KeyX') {
                alert("You CAN'T change your first Pokemon. Love him (:")
            }
        }
    });

    // repetimos el preceso con el id 2
    document.getElementById('poke2').addEventListener("click", () => {
        if(!poke2Choosed) {
            getDataFromApi('poke2');
            poke2Choosed = true;
            finishCounter++
            checkFinish(finishCounter);
        } else {
            alert("You CAN'T change your second Pokemon. Love him (:")
        }
    });

    document.body.addEventListener("keypress", (event) => {
        if(!poke2Choosed) {
            if(event.code === 'KeyC') {
                getDataFromApi('poke2');
                poke2Choosed = true;
                finishCounter++
                checkFinish(finishCounter);
            }
        } else {
            if(event.code === 'KeyC') {
                alert("You CAN'T change your second Pokemon. Love him (:")
            }
        }
    });

    // repetimos el preceso con el id 3
    document.getElementById('poke3').addEventListener("click", () => {
        if(!poke3Choosed) {
            getDataFromApi('poke3');
            poke3Choosed = true;
            finishCounter++
            checkFinish(finishCounter);
        } else {
            alert("You CAN'T change your third Pokemon. Love him (:")
        }
    });

    document.body.addEventListener("keypress", (event) => {
        if(!poke3Choosed) {
            if(event.code === 'KeyV') {
                getDataFromApi('poke3');
                poke3Choosed = true;
                finishCounter++
                checkFinish(finishCounter);
            }
        } else {
            if(event.code === 'KeyV') {
                alert("You CAN'T change your third Pokemon. Love him (:")
            }
        }
    });
}

const checkFinish = (count) => {
    if(count === 3) {
        setTimeout(() => {
            createLastWindow();
        }, 1000)
    }
}

// Creamos una función para obtener un numero random entre 2 parametros (min y max)
const getRandomNumber = (min, max) => {
   return Math.floor(Math.random() * (max - min)) + min;
}

// Creamos una función para recibir información de la API con fetch
const getDataFromApi = (id) => {
    // Iniciamos el fetch con la url de la api obteniendo el ID desde la funcion getRandomNumber
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomNumber(1,151)}`)
        .then(res => res.json())
        .then(data => {
            // Pintamos la respuesta en nuestra pagina
            printPokemonData(id, data);
        })
        .catch(err => console.log(err));
}

// Creamos la funcion donde pintaremos la informacion del pokemon random
const printPokemonData = (id, pokemon) => {
    // checkeamos si el id recibido es igual al id del div1
    if (id === "poke1") {
        // si se cumple, seleccionamos dicho div y lo limpiamos para imprimir la nueva info
        const div = document.getElementById(id);
        div.innerHTML = '';

        // pintamos la imagen con la informacion del pokemon recibida por la api
        const pokeImg = createImg();
        pokeImg.src = pokemon.sprites.front_default;
        pokeImg.alt = pokemon.name;
        pokeImg.classList.add('form__pokeballs-img');
        div.appendChild(pokeImg);

        // lo mismo con el nombre
        const pokeName = createP();
        pokeName.textContent = pokemon.name;
        pokeName.classList.add('pokemon-card__title');
        div.appendChild(pokeName);
        
        // lo mismo con el ID
        const pokeId = createP();
        pokeId.textContent = pokemon.id;
        pokeId.classList.add('pokemon-card__subtitle');
        div.appendChild(pokeId);

        // guardamos toda la informacion del pokemon en una variable global
        // para su posterior uso
        API_POKEMON1 = {
            name: pokemon.name,
            img: pokemon.sprites.other.dream_world.front_default,
            experience: pokemon.base_experience,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[3].base_stat
        };
        console.log(API_POKEMON1)

        // Repetimos todo el proceso con el div 2
    } else if (id === "poke2") {
        const div = document.getElementById(id);
        div.innerHTML = '';

        const pokeImg = createImg();
        pokeImg.src = pokemon.sprites.front_default;
        pokeImg.alt = pokemon.name;
        pokeImg.classList.add('form__pokeballs-img');
        div.appendChild(pokeImg);

        const pokeName = createP();
        pokeName.textContent = pokemon.name;
        pokeName.classList.add('pokemon-card__title');
        div.appendChild(pokeName);
        
        const pokeId = createP();
        pokeId.textContent = pokemon.id;
        pokeId.classList.add('pokemon-card__subtitle');
        div.appendChild(pokeId);

        API_POKEMON2 = {
            name: pokemon.name,
            img: pokemon.sprites.other.dream_world.front_default,
            experience: pokemon.base_experience,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[3].base_stat
        };
        console.log(API_POKEMON2)

        // Repetimos todo el proceso con el div 3
    } else if (id === "poke3") {
        const div = document.getElementById(id);
        div.innerHTML = '';

        const pokeImg = createImg();
        pokeImg.src = pokemon.sprites.front_default;
        pokeImg.alt = pokemon.name;
        pokeImg.classList.add('form__pokeballs-img');
        div.appendChild(pokeImg);

        const pokeName = createP();
        pokeName.textContent = pokemon.name;
        pokeName.classList.add('pokemon-card__title');
        div.appendChild(pokeName);
        
        const pokeId = createP();
        pokeId.textContent = pokemon.id;
        pokeId.classList.add('pokemon-card__subtitle');
        div.appendChild(pokeId);

        API_POKEMON3 = {
            name: pokemon.name,
            img: pokemon.sprites.other.dream_world.front_default,
            experience: pokemon.base_experience,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[3].base_stat
        };
        console.log(API_POKEMON3)
    }
}

// definimos la funcion init, la cual iniciara la funcion del primer paso.
const init = () => {
    firstStep();
};

// declaramos que pasara cuando carguemos la pagina
window.onload = init;
