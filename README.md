# myTest

Esse projeto full stack implementa uma aplicação para cadastro e ativação de usuários.


## Authors

- [@lipejose](https://www.github.com/lipejose)


## Tech Stack

**Client:** Next.JS, TailwindCSS, React Hook Forms, DaisyUI

**Server:** Node, Fastify, Prisma, MySQL

**project*** pnpm, turbo repo, typescript


## Rodando o projeto

Clone o projeto

```bash
  git clone https://github.com/lipejose/my-test
```

Entre no diretorio do projeto

```bash
  cd my-test
```

Instale as dependencias 
Para instalar esse projeto você precisa utilizar o pnpm, caso não tenha instalado é só rodar npm i -g pnpm após isso, rode:

```bash
  pnpm i
```

rode todos o projeto

```bash
pnpm dev
```

Pronto, todos os serviços devem estar Rodando

FRONT -> PORTA -> 3000

BACK -> PORTA -> 4001


## Testes

Para rodar os testes digite no terminal:

```bash
  pnpm run test
```


## Váriaveis de ambiente

Para rodar esse projeto crie um arquivo .env com as seguintes váriaveis configuradas

`DATABASE_URL` url da conexão com banco de dados mysql

`JWT_SECRET` segredo para gerar tokens jwt

`CRYPT_SECRET` segredo para criptografar senhas e criar hash

`SENDGRID_KEY` chave do sendgrid

`SENDGRID_FROM` email cadastrado na conta do sendgrid para envio de emails

`FRONT_URL`url de front para envio correto dos emails

`NODE_ENV` ambiente do node = production/development

`RUNNING_ENV` ambiente em que o serviço está rodando ex: production/staging

`SENTRY_DNS` ambiente em que o serviço está rodando

## API Reference

#### Get an user

```http
  GET /user
```

| Parameter | Type     |
| :-------- | :------- |
| `email` | `string` |
| `username` | `string` |
| `password` | `string` |

#### Post user

```http
  POST /user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Nome completo|
| `username`      | `string` | **Required**. Nome de usuário |
| `password`      | `string` | **Required**. Senha de acesso |
| `email`      | `string` | **Required**. Email |

#### Login user

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Nome de usuário |
| `password`      | `string` | **Required**. Senha de acesso |


#### Active user

```http
  POST /active
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email de usuário |
| `hash`      | `string` | **Required**. hash para ativar usuário |






