//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router
const Koa = require('koa');
const Router = require('koa-router');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('koa-bodyparser');


const app = new Koa();
app.use(bodyParser());

const router = new Router();

const PORT = process.env.PORT || 3000,

importRoutes = require('./controllers/controllers');
app.use(importRoutes.routes());

const server = app.listen(`${PORT}`);
module.exports = server;