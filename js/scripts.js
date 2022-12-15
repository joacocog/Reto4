
let allSections = document.getElementsByTagName('section');

// Home
let home = document.getElementById('home');
let gameForm = document.querySelector('#gameForm');
let name1 = document.getElementById('player-1');
let name2 = document.getElementById('player-2');
let btnJugar = document.getElementById('jugarBtn');
// Partidas guardadas
let partidasAnt = document.getElementById('partidas-anteriores');
let guardadas = document.getElementById('guardadas');


// charge
let charge = document.getElementById('charge');

// cartas
let salir = document.getElementById('salir');
let cartas = document.getElementById('cartas');
let carouselCartas = document.getElementById('carousel-cartas');
// modal
let modal = document.getElementById('staticBackdrop');
let tirarNuevo = document.getElementById('tirar');
let btnResults = document.getElementById('ver-resultados');

// Resultados
let resultsPage = document.getElementById('results');


// game vars

let match = '';
let saveGames = [];
let tempCards = [];
let positionPart = 0;
let guardada = false;


btnResults.addEventListener("click", function(){
    mostrarSeccion(resultsPage);
    resultScreen();

    
    let save = document.getElementById('save');

    save.addEventListener('click', function(){

        partidasAnt.classList.remove('d-none');
        guardarPartida();
        gameForm.reset();
        limpiar(resultsPage);
        imprimirAnt();
        mostrarSeccion(home);
    })

    let salirMatch = document.getElementById('salir-match');

    salirMatch.addEventListener('click', function(){
        gameForm.reset();
        limpiar(resultsPage);
        mostrarSeccion(home);
    })
})

tirarNuevo.addEventListener("click", function(){
    iniciarJuego();
})


salir.addEventListener('click', function(){
    gameForm.reset();
    mostrarSeccion(home);
})

btnJugar.addEventListener("click", function(){
    validarForm();
});




// Funciones

let carouselAnt = ()=>{
    
    
    randomCards1.forEach( (card, index) => {

        if(index == 0) active = 'active'
        else active = ''

        carouselCartas.innerHTML +=
        `<div class= "carousel-item ${active}">
            <div class="info-player-container">
                <h2>${name1.value}</h2>
                <h3>Carta ${(index + 1)}/3</h3>
            </div>
            <div class= "card-container">
                <img src="${card.img}" class="d-block w-carta" alt="${card.nombre}" />
            </div>
            <p>${card.descripcion}</p>
        </div>`

    })

    randomCards2.forEach( (card, index) => {

        carouselCartas.innerHTML +=
        `<div class= "carousel-item">
            <div class="info-player-container">
                <h2>${name2.value}</h2>
                <h3>Carta ${(index + 1)}/3</h3>
            </div>
            <div class= "card-container">
                <img src="${card.img}" class="d-block w-carta" alt="${card.nombre}" />
            </div>
            <p>${card.descripcion}</p>
        </div>`

    })
}


let imprimirAnt = ()=>{

    guardadas.innerHTML += `
    <li>
        <h4>${saveGames.player1} y ${saveGames.player2}</h4>
        <h4>${saveGames.match}</h4>
        <button class="ver-mas" id="ver-mas">+</button>
    </li>
    `;

}

let guardarPartida = ()=>{
    
    let player1 = name1.value;
    let player2 = name2.value;

    guardada = true;


    saveGames = {player1, player2,randomCards, match, guardada}
}

let resultScreen = () => {
    score1 = randomCards1[0].id + randomCards1[1].id + randomCards1[2].id

    score2 = randomCards2[0].id + randomCards2[1].id + randomCards2[2].id

    if(score1 > score2){
      match = 'Hay match'
    }else{
      match = 'no hay Match'
    }

    resultsPage.innerHTML += `
    <div class="results-container">
        <div class="player">
            <div class="name">
                <h3>${name1.value}</h3>
            </div>
            <div class="card-results">
                <div class="circle">
                    <img src="${randomCards1[0].img}" alt="${randomCards1[0].nombre}">
                </div>
                <div class="circle">
                    <img src="${randomCards1[1].img}" alt="${randomCards1[1].nombre}">
                </div>
                <div class="circle">
                    <img src="${randomCards1[2].img}" alt="${randomCards1[2].nombre}">
                </div>
            </div>
        </div>
        <div class="player">
            <div class="name">
                <h3>${name2.value}</h3>
            </div>
            <div class="card-results">
                <div class="circle">
                    <img src="${randomCards2[0].img}" alt="${randomCards2[0].nombre}">
                </div>
                <div class="circle">
                    <img src="${randomCards2[1].img}" alt="${randomCards2[1].nombre}">
                </div>
                <div class="circle">
                    <img src="${randomCards2[2].img}" alt="${randomCards2[2].nombre}">
                </div>
            </div>
        </div>
        <div class="match">
            <h4>El resultado es</h4>
            <h3>${match}</h3>
        </div>
        <div class="match-keypad">
            <button id="save">Save</button>
            <button id="salir-match">Quit</button>
        </div>
    </div>
    `

}

const limpiar = (seccion) => {
    seccion.innerHTML = '';
}

const iniciarJuego = () =>{

    limpiar(carouselCartas);
    
    mostrarSeccion(cartas);

    randomCards1 = getMultipleRandom(cards, 3);
    randomCards2 = getMultipleRandom(cards, 3);

    randomCards = [randomCards1, randomCards2];

    randomCards1.forEach( (card, index) => {

        if(index == 0) active = 'active'
        else active = ''

        carouselCartas.innerHTML +=
        `<div class= "carousel-item ${active}">
            <div class="info-player-container">
                <h2>${name1.value}</h2>
                <h3>Carta ${(index + 1)}/3</h3>
            </div>
            <div class= "card-container">
                <img src="${card.img}" class="d-block w-carta" alt="${card.nombre}" />
            </div>
            <p>${card.descripcion}</p>
        </div>`

    })

    randomCards2.forEach( (card, index) => {

        carouselCartas.innerHTML +=
        `<div class= "carousel-item">
            <div class="info-player-container">
                <h2>${name2.value}</h2>
                <h3>Carta ${(index + 1)}/3</h3>
            </div>
            <div class= "card-container">
                <img src="${card.img}" class="d-block w-carta" alt="${card.nombre}" />
            </div>
            <p>${card.descripcion}</p>
        </div>`

    })
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
}

function validarForm(){
    if(name1.value == '' || name2.value == ''){
        alert('Tenes que completar todos los campos')
    }else{
        mostrarSeccion(charge);
        setTimeout(iniciarJuego, 3000);
    }
}


function mostrarSeccion(seccion){

    for(i = 0; i < allSections.length; i++){
        allSections[i].className += " d-none";
    }
    seccion.classList.remove('d-none');
}



mostrarSeccion(home);

