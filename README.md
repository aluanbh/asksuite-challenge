# Projeto de Scraping com Node.js e Puppeteer

Este projeto é um exemplo de como utilizar o Node.js e o Puppeteer para fazer scraping de informações em websites.

## Funcionalidades

- Realizar busca por acomodações em um website de viagens
- Extrair informações como nome, descrição, preço e imagem dos quartos disponíveis
- Tratar erros comuns que podem ocorrer durante o scraping, como timeout e falta de resultados

## Como usar

1. Clone o repositório em sua máquina local
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` na raiz do projeto com a variável `ENDPOINT` apontando para o website de viagens que deseja fazer a busca. Se a porta em questão 8080 já estiver em uso, alterar no arquivo .env a variável `PORT`
4. Execute o projeto com `npm start`
5. Faça uma requisição POST para `http://localhost:8080/search` passando as datas de checkin e checkout no corpo da requisição

Exemplo de requisição:

```bash
POST http://localhost:8080/search
Content-Type: application/json

{
  "checkin": "2023-05-01",
  "checkout": "2023-05-05"
}
```

Exemplo de resposta bem-sucedida:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "name": "Quarto Deluxe",
    "description": "Com vista para o mar, este quarto possui ar-condicionado, TV de tela plana e frigobar.",
    "price": "R$ 1.200,00",
    "image": "https://www.example.com/images/room-deluxe.jpg"
  },
  {
    "name": "Suíte Presidencial",
    "description": "Com vista panorâmica para a cidade, esta suíte dispõe de banheira de hidromassagem e sala de estar separada.",
    "price": "R$ 2.500,00",
    "image": "https://www.example.com/images/suite-presidential.jpg"
  }
]
```

Exemplo de resposta com erro:

```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "A página não respondeu dentro do tempo limite"
}
```

## Tecnologias utilizadas
* Node.js
* Express
* Puppeteer
* Cheerio