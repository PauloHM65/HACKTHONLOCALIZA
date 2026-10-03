# ⚡ Comparador EV vs ⛽ Combustão

Aplicação web que compara o custo de viagem entre um carro elétrico e um a combustão, dado um ponto de partida e um destino.

## Estrutura do Projeto

```
comparador/
├── src/server.js              # Servidor Express (porta 3000)
├── src/routes/
│   ├── apiRoutes.js           # Rotas da API
│   └── pageRoutes.js          # Rotas das páginas
├── src/services/
│   ├── mapService.js          # Integração com API de mapas (distância)
│   └── vehicleData.js         # Dados dos veículos (consumo, preços)
├── businessRules.js           # Regras de cálculo e orquestração
├── src/public/
│   ├── eletric.html           # Home Localiza Assinatura (protótipo)
│   ├── css/
│   │   ├── eletric.css        # Estilos da página Localiza
│   │   └── index.css          # Estilos do comparador
│   ├── js/
│   │   ├── eletric.js         # Carrossel e menu responsivo
│   │   └── app.js             # Lógica do comparador
│   └── index.html             # Interface do comparador
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
npm start
```

O terminal vai mostrar:

```
🚀 Servidor rodando em http://localhost:3000
```

Abra [http://localhost:3000](http://localhost:3000) para o comparador ou [http://localhost:3000/eletric.html](http://localhost:3000/eletric.html) para a Home Localiza Assinatura.

Também é possível acessar a Home pelo caminho `/eletric`. O CTA “Conheça os elétricos” aponta para `/eletricos`; enquanto a Central de descobertas não estiver implementada, essa rota retorna HTTP 501.

## Como usar

1. Preencha o **Ponto de Partida** (ex: São Paulo, SP)
2. Preencha o **Destino** (ex: Rio de Janeiro, RJ)
3. Clique em **Comparar Consumo**
4. Veja o resultado com custo de cada tipo de veículo e quem vence

> **Nota:** Atualmente a distância é simulada (mock). Para usar distâncias reais, configure o serviço de mapas em `src/services/mapService.js`.

## Tecnologias

- **Backend:** Node.js + Express 5
- **Frontend:** HTML, CSS e JavaScript puro
- **HTTP Client:** Axios (para futuras integrações com APIs externas)
