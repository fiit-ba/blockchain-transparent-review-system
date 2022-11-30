const expect = require('chai').expect;
const request = require('request');

it('Initial route content', function (done) {
    request('http://localhost:8082', function (error, response, body) {
        expect(JSON.parse(body).message).to.equal(
            "Welcome to the ReviewChain!");
        done();
    });
});
