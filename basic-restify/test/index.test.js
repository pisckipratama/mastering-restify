'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');

const should = chai.should();

chai.use(chaiHTTP);

describe('Test Home Page', function () {
  it('should return json with key "message" and value "Home Page"', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Home Page');
        done();
      });
  });

  it('should add text "foo" and display that text', function (done) {
    chai.request(server)
      .post('/foo')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('data');
        res.body.data.should.equal('foo');
        done();
      });
  });
});
