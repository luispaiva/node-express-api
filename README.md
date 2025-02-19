# API Rest em Node com Express e SQLite

Este projeto é uma API Restful desenvolvida em Node como linguagem de programação. O framework Express foi utilizado para a construção do servidor com o banco de dados SQLite.

## Instalação

1. Certifique-se de ter o Node instalado em sua máquina.
2. Clone este repositório.
3. Instale as dependências
```bash
npm install
```

Para iniciar o servidor, execute o seguinte comando:

```bash
node server
```
ou
```bash 
node --watch server
```

A API será iniciada e estará acessível em `http://localhost:3000`.

## Endpoints

### Listar todos os livros

- Método: `GET`
- Rota: `/books`
- Descrição: Retorna uma lista com todos os livros cadastrados.

### Listar um único livro

- Método: `GET`
- Rota: `/books/:id`
- Descrição: Retorna os detalhes de um único livro com base no ID fornecido.

### Salvar um livro

- Método: `POST`
- Rota: `/books`
- Descrição: Salva um novo livro no banco de dados.
- Parâmetros do corpo da requisição:
  - `title` (string): Título do livro.
  - `author` (string): Autor do livro.
  - `description` (string): Descrição do livro.

### Atualizar um livro

- Método: `PUT`
- Rota: `/books/:id`
- Descrição: Atualiza os detalhes de um único livro com base no ID fornecido.

### Deletar um livro

- Método: `DELETE`
- Rota: `/books/:id`
- Descrição: Deleta um livro do banco de dados com base no ID fornecido.

## Estrutura de Pastas
```
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

**Desenvolvido por [Luis Paiva](https://github.com/luispaiva)**
