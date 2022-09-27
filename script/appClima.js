const APIKEY = '9dcc1818ed8b1b9cf09902249070fb83';
const btn = document.getElementById('buscar');
const inputCiudad = document.getElementById('inputCiudad');
const resultadoTemp = document.getElementById('temperaturaActual');
const resultadoIcono = document.getElementById('icono');
const resultadoZona = document.getElementById('zona');
const resultadoInfo = document.getElementById('temperaturaInfo');
let divZona = '';
let mensaje = '';
let icono = '';
let info = '';


btn.addEventListener('click', event => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&appid=${APIKEY}&units=metric&lang=es`)
    .then(respuesta=>{
        console.log(`Respuesta: ${respuesta}`, respuesta);
        return respuesta.json();
    })

    .then(json=>{
        console.log(json)

        divZona = `<span>${json.name}</span>`;
        resultadoZona.innerHTML = divZona;
        divZona = '';

        mensaje = `<p>${Math.round(json.main.temp)}°</p>`;
        resultadoTemp.innerHTML = mensaje;
        mensaje ='';

        info = `<p>${json.weather[0].description.toUpperCase()}</p>`;
        resultadoInfo.innerHTML = info;
        info ='';
        
    })

    .catch(error=>{console.log(`Ocurrió un error: ${error}`)})

    
});