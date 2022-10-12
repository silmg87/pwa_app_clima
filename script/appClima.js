const APIKEY = '9dcc1818ed8b1b9cf09902249070fb83';
const btn = document.getElementById('buscar');
const inputCiudad = document.getElementById('inputCiudad');
const APIKEYMAPA = 'hE3wpAzogyZc3rgzoZJCGCFXQ8TLgF9k';
let recuperar_localStorage;
let recuperarMapa_localStorage;


// FUNCION DOM DEL CLIMA
let divClima = document.createElement('div');
divClima.id = 'clima';

const resultadoClima = (json) => {
    divClima.innerHTML = '';
    divClima.className = 'clima rounded p-3';

    let divZona = document.createElement('div');
    divZona.id = 'zona';
    let pZona = document.createElement('p');
    divZona.append(pZona);
    pZona.innerHTML = json.name;
    
    let divImg = document.createElement('div');
    divImg.id = 'icono';

    for (let i of iconos) {
        let icon = json.weather[0].icon;
        if (icon === i.id) {
            divImg.innerHTML = `<img src="${i.imagen}" alt="${i.alt}"/>`;
        } 
    }

    let divTempActual = document.createElement('div');
    divTempActual.id = 'temperaturaActual';
    let pTempActual = document.createElement('p');
    divTempActual.append(pTempActual);
    pTempActual.innerHTML = `${Math.round(json.main.temp)}°`;

    let divDescripcion = document.createElement('div');
    divDescripcion.id = 'descripcion';
    let pDescripcion = document.createElement('p');
    divDescripcion.append(pDescripcion);

    for (let i of iconos) {
        let icon = json.weather[0].icon;
        if (icon === i.id) {
            pDescripcion.innerHTML = i.descripcion;
        } 
    }

    let divInfo = document.createElement('div');
    divInfo.id = 'info';
    let ulInfo = document.createElement('ul');
    divInfo.append(ulInfo);

    let liMax = document.createElement('li');
    liMax.innerHTML = `<span>Temperatura Máxima</span> <span>${Math.round(json.main.temp_max)}°</span>`;

    let liMin = document.createElement('li');
    liMin.innerHTML = `<span>Temperatura Mínima</span> <span>${Math.round(json.main.temp_min)}°</span>`;

    let liSt = document.createElement('li');
    liSt.innerHTML = `<span>Sensación Térmica</span> <span>${Math.round(json.main.feels_like)}°</span>`;

    let liPa = document.createElement('li');
    liPa.innerHTML = `<span>Presión Atmoférica</span> <span>${Math.round(json.main.pressure)} hPa</span>`;

    let liVv = document.createElement('li');
    liVv.innerHTML = `<span>Velocidad del Viento</span> <span>${Math.round(json.wind.speed)} km/h</span>`;

    ulInfo.append(liMax, liMin, liHum, liSt, liPa, liVv);
    divInfo.append(ulInfo);

    divClima.append(divZona, divImg, divTempActual, divDescripcion, divInfo);
    let section = document.querySelector('section');
    section.append(divClima);
}


// FUNCION BUSQUEDA DE MAPA
let latitud;
let longitud;

const resultadoMapa = () => {
    fetch(`https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=${APIKEYMAPA}&zoom=7&center=${`${longitud},${latitud}`}&width=300&height=300&view=AR&language=es-ES`)

            .then(response=>{
                let divMapa = document.createElement('div');
                let imgMapa = document.createElement('img');

                imgMapa.className = 'rounded';
                imgMapa.id = 'mapa';
                imgMapa.src = response.url;

                divMapa.append(imgMapa);
                divClima.append(divMapa);

                recuperarMapa_localStorage = localStorage.setItem("mapa", JSON.stringify(imgMapa.src));
            });
}           


// EVENTO CLICK "BUSCAR"
btn.addEventListener('click', event => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&appid=${APIKEY}&units=metric&lang=es`)
    .then(response=>{
        console.log(`Respuesta: ${response}`, response);
        return response.json();
    })

    .then(json=>{
        console.log(json)

        resultadoClima(json);

        latitud = json.coord.lat;
        
        longitud = json.coord.lon;

        console.log(latitud, longitud);
        resultadoMapa(longitud, latitud);
        
        recuperar_localStorage = localStorage.setItem("busqueda", JSON.stringify(json));
    })

    .catch(error=>{console.log(`Ocurrió un error: ${error}`)})

    
});