/* eslint-disable no-underscore-dangle */
const http = require('http');
const chai = require('chai');
const express = require('express');
const chaiHttp = require('chai-http');
const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const expressRoutesRegistrar = require('express-routes-registrar');
const db = require('../mongodb');
const { usersRoutes } = require('../routes');
const { usersController } = require('../controllers');
const { Users } = require('../models');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users Routes', () => {
  const PORT = 3000;
  const URL = `http://localhost:${PORT}`;
  const app = express();
  app.use(express.json());
  const server = http.createServer(app);
  const registrar = expressRoutesRegistrar(app);

  before((done) => {
    db.connect()
      .then(() => server.listen(PORT))
      .then(() => registrar.registerRoutesJson(
        usersRoutes,
        usersController
      ))
      .then(() => done());
  });
  before((done) => {
    Users.deleteMany({})
      .then(() => done());
  });
  after((done) => server.close(done));

  describe('Create /users', () => {
    it('save a new user (name, type)', () => (
      chai
        .request(URL)
        .post('/users')
        .send({ name: 'LOL', type: 'employee' })
        .then(({ body, statusCode }) => {
          expect(body).to.be.an('object');
          expect(statusCode).to.be.equal(OK);
        })
    ));
    it('error to save a new user without parameters', () => (
      chai
        .request(URL)
        .post('/users')
        .send({ })
        .then(({ statusCode, body: { message: { _message } } }) => {
          expect(_message).to.be.equal('User validation failed');
          expect(statusCode).to.be.equal(INTERNAL_SERVER_ERROR);
        })
    ));
  });

  describe('Read /users', () => {
    it('should return json as listo of users', () => (
      chai
        .request(URL)
        .get('/users')
        .then(({ body, statusCode }) => {
          expect(body).to.be.an('array');
          expect(statusCode).to.be.equal(OK);
        })
    ));
  });
  describe('Read /users/:id', () => {
    it('should return an user by id', () => (
      Users.findOne()
        .then((data) => data._id)
        .then((id) => chai
          .request(URL)
          .get(`/users/${id}`))
        .then(({ body, statusCode }) => {
          expect(body).to.be.an('object');
          expect(statusCode).to.be.equal(OK);
        })
    ));
    it('should return 404 when id is not found', () => (
      chai
        .request(URL)
        .get('/users/123')
        .then(({ statusCode }) => {
          expect(statusCode).to.be.equal(NOT_FOUND);
        })
    ));
  });
  describe('Update /users/:id', () => {
    it('should update an user by id', () => (
      Users.findOne()
        .then((data) => data._id)
        .then((id) => chai
          .request(URL)
          .put(`/users/${id}`)
          .send({ name: 'Katrina' }))
        .then(({ statusCode }) => {
          expect(statusCode).to.be.equal(OK);
        })
    ));
    it('should return 404 when id is not found', () => (
      chai
        .request(URL)
        .put('/users/123')
        .then(({ statusCode }) => {
          expect(statusCode).to.be.equal(NOT_FOUND);
        })
    ));
  });
  describe('Delete /users/:id', () => {
    it('should delete an user by id', () => (
      Users.findOne()
        .then((data) => data._id)
        .then((id) => chai
          .request(URL)
          .delete(`/users/${id}`))
        .then(({ statusCode }) => {
          expect(statusCode).to.be.equal(OK);
        })
    ));
    it('should return 404 when id is not found', () => (
      chai
        .request(URL)
        .delete('/users/123')
        .then(({ statusCode }) => {
          expect(statusCode).to.be.equal(NOT_FOUND);
        })
    ));
  });
});
