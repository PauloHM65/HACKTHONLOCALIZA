# ⚡ Comparador EV vs ⛽ Combustão

Aplicação web que compara o custo de viagem entre um carro elétrico e um a combustão, dado um ponto de partida e um destino.

## Estrutura do Projeto

```
comparador/
├── server.js                  # Servidor Express (porta 3000)
├── businessRules.js           # Regras de cálculo e orquestração
├── services/
│   ├── mapService.js          # Integração com API de mapas (distância)
│   └── vehicleData.js         # Dados dos veículos (consumo, preços)
├── public/
│   ├── index.html             # Interface do usuário
│   ├── index.css              # Estilos
│   └── app.js                 # Lógica do frontend
└── package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- npm (já vem com o Node.js)

## Como rodar

```bash
# 1. Entre na pasta do projeto
cd comparador

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
node server.js
```

O terminal vai mostrar:

```
🚀 Servidor rodando em http://localhost:3000
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Como usar

1. Preencha o **Ponto de Partida** (ex: São Paulo, SP)
2. Preencha o **Destino** (ex: Rio de Janeiro, RJ)
3. Clique em **Comparar Consumo**
4. Veja o resultado com custo de cada tipo de veículo e quem vence

> **Nota:** Atualmente a distância é simulada (mock). Para usar distâncias reais, configure sua API Key do Google Maps em `services/mapService.js`.

## Tecnologias

- **Backend:** Node.js + Express 5
- **Frontend:** HTML, CSS e JavaScript puro
- **HTTP Client:** Axios (para futuras integrações com APIs externas)
