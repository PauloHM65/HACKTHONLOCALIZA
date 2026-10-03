// businessRules.js
// Responsabilidade: orquestrar os serviços e aplicar as regras de cálculo
const { buscarDistancia } = require('./services/mapService');
const { obterDadosVeiculos } = require('./services/vehicleData');

/**
 * Calcula a comparação de custo entre veículo elétrico e a combustão.
 * Regra de negócio pura — recebe distância e dados, retorna comparação.
 */
function calcularComparacao(distanciaKm, dadosVeiculos) {
    // Cálculo Elétrico
    const kwhNecessarios = distanciaKm * dadosVeiculos.eletrico.consumo_kwh_por_km;
    const custoEletrico = kwhNecessarios * dadosVeiculos.eletrico.preco_kwh;

    // Cálculo Combustão
    const litrosNecessarios = distanciaKm / dadosVeiculos.combustao.km_por_litro;
    const custoCombustao = litrosNecessarios * dadosVeiculos.combustao.preco_litro;

    const diferenca = Math.abs(custoCombustao - custoEletrico);
    const vencedor = custoEletrico < custoCombustao ? 'Elétrico' : 'Combustão';

    return {
        eletrico: {
            veiculo: dadosVeiculos.eletrico.nome,
            energiaGasta: `${kwhNecessarios.toFixed(2)} kWh`,
            custoTotal: custoEletrico.toFixed(2)
        },
        combustao: {
            veiculo: dadosVeiculos.combustao.nome,
            combustivelGasto: `${litrosNecessarios.toFixed(2)} Litros`,
            custoTotal: custoCombustao.toFixed(2)
        },
        analise: {
            diferenca: diferenca.toFixed(2),
            maisBarato: vencedor
        }
    };
}

/**
 * Orquestra: busca distância + dados de veículos → calcula comparação.
 */
async function processarRotaEConsumo(origem, destino) {
    const distanciaKm = await buscarDistancia(origem, destino);
    const dadosVeiculos = await obterDadosVeiculos();
    const comparacao = calcularComparacao(distanciaKm, dadosVeiculos);

    return {
        rota: { origem, destino, distanciaKm: distanciaKm.toFixed(2) },
        comparacao
    };
}

module.exports = { processarRotaEConsumo, calcularComparacao };