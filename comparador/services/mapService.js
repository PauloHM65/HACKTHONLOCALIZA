// services/mapService.js
// Responsabilidade: buscar a distância da rota via API pública e gratuita
const axios = require('axios');

async function buscarDistancia(origem, destino) {
    try {
        // 1. Configuração exigida pelo Nominatim (User-Agent) para evitar bloqueio
        const config = {
            headers: {
                'User-Agent': 'MeuAppDeEstudos/1.0' // Opcional: coloque seu e-mail aqui
            }
        };

        // 2. Buscar coordenadas da Origem
        // Usamos encodeURIComponent para lidar com espaços e acentos no nome da cidade
        const urlOrigem = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(origem)}&format=json`;
        const responseOrigem = await axios.get(urlOrigem, config);

        // 3. Buscar coordenadas do Destino
        const urlDestino = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destino)}&format=json`;
        const responseDestino = await axios.get(urlDestino, config);

        // Verifica se a API encontrou os locais
        if (responseOrigem.data.length === 0 || responseDestino.data.length === 0) {
            throw new Error("Não foi possível encontrar as coordenadas para os locais informados.");
        }

        // 4. Extrair Longitude e Latitude
        // Pegamos o primeiro resultado do array [0]
        const lonOrigem = responseOrigem.data[0].lon;
        const latOrigem = responseOrigem.data[0].lat;
        
        const lonDestino = responseDestino.data[0].lon;
        const latDestino = responseDestino.data[0].lat;

        // 5. Calcular a rota no OSRM usando as coordenadas (ATENÇÃO: O OSRM exige Longitude,Latitude)
        const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${lonOrigem},${latOrigem};${lonDestino},${latDestino}?overview=false`;
        
        const responseRota = await axios.get(urlOSRM);

        // O OSRM retorna a distância diretamente em metros dentro de routes[0].distance
        const distanciaMetros = responseRota.data.routes[0].distance;
        
        return distanciaMetros / 1000; // converte metros → km

    } catch (error) {
        console.error("Erro na API de mapas:", error.message);
        
        // Simulação (Mock) como fallback em caso de erro nas APIs públicas:
        const distanciaKm = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
        return distanciaKm;
    }
}

module.exports = { buscarDistancia };