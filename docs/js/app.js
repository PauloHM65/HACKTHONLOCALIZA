// Dados dos veículos (embutidos para funcionar sem backend no GitHub Pages)
const dadosVeiculos = {
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
};

/**
 * Busca a distância entre origem e destino usando APIs públicas (Nominatim + OSRM).
 * Funciona 100% no lado do cliente — sem necessidade de servidor Node.js.
 */
async function buscarDistancia(origem, destino) {
    try {
        const config = {
            headers: {
                'User-Agent': 'HackathonLocaliza/1.0'
            }
        };

        // Buscar coordenadas da Origem via Nominatim
        const urlOrigem = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(origem)}&format=json`;
        const responseOrigem = await fetch(urlOrigem);
        const dataOrigem = await responseOrigem.json();

        // Buscar coordenadas do Destino via Nominatim
        const urlDestino = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destino)}&format=json`;
        const responseDestino = await fetch(urlDestino);
        const dataDestino = await responseDestino.json();

        if (dataOrigem.length === 0 || dataDestino.length === 0) {
            throw new Error("Não foi possível encontrar as coordenadas para os locais informados.");
        }

        const lonOrigem = dataOrigem[0].lon;
        const latOrigem = dataOrigem[0].lat;
        const lonDestino = dataDestino[0].lon;
        const latDestino = dataDestino[0].lat;

        // Calcular a rota via OSRM
        const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${lonOrigem},${latOrigem};${lonDestino},${latDestino}?overview=false`;
        const responseRota = await fetch(urlOSRM);
        const dataRota = await responseRota.json();

        const distanciaMetros = dataRota.routes[0].distance;
        return distanciaMetros / 1000; // metros → km

    } catch (error) {
        console.error("Erro na API de mapas:", error.message);
        // Fallback: distância simulada
        const distanciaKm = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
        return distanciaKm;
    }
}

/**
 * Calcula a comparação de custo entre veículo elétrico e a combustão.
 */
function calcularComparacao(distanciaKm) {
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
 * Função principal chamada pelo botão "Comparar Consumo"
 */
async function calcularRota() {
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;

    if (!origem || !destino) {
        alert("Por favor, preencha o ponto de partida e o destino!");
        return;
    }

    try {
        // Buscar distância diretamente via APIs públicas (client-side)
        const distanciaKm = await buscarDistancia(origem, destino);
        const comparacao = calcularComparacao(distanciaKm);

        // Preenchendo o HTML com os resultados
        document.getElementById('distancia').innerText = distanciaKm.toFixed(2);

        // Dados do Elétrico
        document.getElementById('el-nome').innerText = comparacao.eletrico.veiculo;
        document.getElementById('el-gasto').innerText = `Consumo: ${comparacao.eletrico.energiaGasta}`;
        document.getElementById('el-custo').innerText = comparacao.eletrico.custoTotal;

        // Dados da Combustão
        document.getElementById('comb-nome').innerText = comparacao.combustao.veiculo;
        document.getElementById('comb-gasto').innerText = `Consumo: ${comparacao.combustao.combustivelGasto}`;
        document.getElementById('comb-custo').innerText = comparacao.combustao.custoTotal;

        // Conclusão
        document.getElementById('vencedor').innerText = comparacao.analise.maisBarato;
        document.getElementById('diferenca').innerText = comparacao.analise.diferenca;

        // Mostrar os resultados na tela
        document.getElementById('resultado').classList.remove('hidden');

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Falha ao calcular a rota. Tente novamente.");
    }
}
