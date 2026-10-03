// services/vehicleData.js
// Responsabilidade: fornecer dados dos veículos (futuramente, via API)
const axios = require('axios');

async function obterDadosVeiculos() {
    // ======== API REAL (descomente quando tiver sua API no ar) ========
     const response = await axios.get('https://sua-api.com/consumo-veiculos.json');
     return response.data;
    // =================================================================

    // Dados mock para teste:
    /*return {
        eletrico: {
            nome: "Carro Elétrico (Ex: BYD Dolphin)",
            consumo_kwh_por_km: 0.15, // Gasta 0.15 kWh a cada km
            preco_kwh: 0.90           // Preço do kWh em R$
        },
        combustao: {
            nome: "Carro a Combustão (Ex: Chevrolet Onix)",
            km_por_litro: 13.5,       // Faz 13.5 km com 1 litro
            preco_litro: 5.80         // Preço do litro da gasolina em R$
        }
    };*/
}

module.exports = { obterDadosVeiculos };
