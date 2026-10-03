// services/mapService.js
// Responsabilidade: buscar a distância da rota via API de mapas
const axios = require('axios');

async function buscarDistancia(origem, destino) {
    // ======== API REAL (descomente quando tiver sua API KEY) ========
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&key=SUA_API_KEY`;
    // const response = await axios.get(url);
    // const distanciaMetros = response.data.routes[0].legs[0].distance.value;
    // return distanciaMetros / 1000; // converte metros → km
    // ===============================================================

    // Simulação (Mock) para teste sem API KEY:
    const distanciaKm = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
    return distanciaKm;
}

module.exports = { buscarDistancia };
