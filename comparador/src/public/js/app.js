async function calcularRota() {
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;

    if (!origem || !destino) {
        alert("Por favor, preencha o ponto de partida e o destino!");
        return;
    }

    try {
        // Chamando nosso backend
        const response = await fetch(`/api/comparar-consumo?origem=${encodeURIComponent(origem)}&destino=${encodeURIComponent(destino)}`);
        const data = await response.json();

        if(data.error) {
            alert("Erro: " + data.error);
            return;
        }

        // Preenchendo o HTML com a resposta da nossa Regra de Negócio
        document.getElementById('distancia').innerText = data.rota.distanciaKm;
        
        // Dados do Elétrico
        document.getElementById('el-nome').innerText = data.comparacao.eletrico.veiculo;
        document.getElementById('el-gasto').innerText = `Consumo: ${data.comparacao.eletrico.energiaGasta}`;
        document.getElementById('el-custo').innerText = data.comparacao.eletrico.custoTotal;

        // Dados da Combustão
        document.getElementById('comb-nome').innerText = data.comparacao.combustao.veiculo;
        document.getElementById('comb-gasto').innerText = `Consumo: ${data.comparacao.combustao.combustivelGasto}`;
        document.getElementById('comb-custo').innerText = data.comparacao.combustao.custoTotal;

        // Conclusão
        document.getElementById('vencedor').innerText = data.comparacao.analise.maisBarato;
        document.getElementById('diferenca').innerText = data.comparacao.analise.diferenca;

        // Mostrar os resultados na tela
        document.getElementById('resultado').classList.remove('hidden');

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Falha ao conectar com o servidor.");
    }
}