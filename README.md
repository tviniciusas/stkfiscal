# Como rodar o projeto stkfiscal localmente

Para rodar o projeto localmente você irá necessitar das seguintes tecnologias e dependências.

- Node
- Sequelize-cli
- Nodemon

## Instalação

Após clonar o projeto. Deve-se criar um arquivo chamado: `src/config/database.js`
Caso já exista, basta apenas editar.

Exemplo de arquivo `database.js` caso não esteja criado.

```npm
module.exports = {
    host:"localhost",
    dialect:"mysql",
    username: "root",
    password: "1234",
    database: "istock",
    timezone: "-03:00",
    define: {
        timestamps: true,
        underscored: true,
    }
}
```

Em seguida, criar o banco de dados `istock` no mysql e rodar o comando a seguir para criar as tabelas através das migrations.

```npm
npx sequelize db:migrate
```

Após isso, basta rodar os comandos a seguir para que o projeto rode localmente.

```npm
npm install
npm start
```

