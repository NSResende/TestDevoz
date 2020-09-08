const app =  require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;
const userSchema = require('./schema')

//Inicio dos testes
describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});

//testes da aplicação
describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario raupp', function (done) {
        chai.request(app)
        .post('/users')
        .send({"nome": "raupp", "email": "jose.raupp@devoz.com.br", "idade": 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    
    it('o usuario naoExiste não existe no sistema', function() {
        setTimeout(function(done) {
            chai.request(app)
                .get('/users:naoExiste')
                .end(function(err, res) {
                    (done, function() {
                        expect(res.error.text).to.be.equal('Not Found');
                        expect(res.error).to.have.status(404);
                        expect(res.body).to.be.jsonSchema(userSchema);
                        done();
                    })
                }, 100)
        })
    });

    it('o usuario raupp existe e é valido', function() {
        setTimeout(function(done) {
            chai.request(app)
                .get('/users:raupp')
                .end(function(err, res) {
                    (done, function() {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.jsonSchema(userSchema);
                        done();
                    })
            }, 100)
        })
    });


    it('deveria excluir o usuario raupp', function () {
        setTimeout(function(done) {
            chai.request(app)
            .delete('/users:raupp')
            .end(function (err, res) {
                (done, function() {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.jsonSchema(userSchema);
                    done();
                })
        }, 100)
    })
});

    it('o usuario raupp não deve existir mais no sistema', function() {
        setTimeout(function(done) {
            chai.request(app)
                .get('/users:raupp')
                .end(function(err, res) {
                    (done, function() {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.jsonSchema(userSchema);
                        done();
                    })
                }, 100)
        })
    });

    it('deveria ser uma lista com pelomenos 5 usuarios', function() {
        setTimeout(function(done) {
            chai.request(app)
                .get('/users')
                .end(function(err, res) {
                    (done, function() {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.total).to.be.at.least(5);
                        done();
                    })
            }, 100)
        })
    });

// alterar o usuario
    it('deveria alterar os dados do usuario raupp', function(){
        setTimeout(function(done){
            chai.request(app)
                .put('users')
                .send({"nome": "raupp1", "email": "jose.raupp@devoz.com.br1", "idade": 351})
                .end(done, function (err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.jsonSchema(userSchema);
                    done();
                })
        }, 100)
    })



});
.

