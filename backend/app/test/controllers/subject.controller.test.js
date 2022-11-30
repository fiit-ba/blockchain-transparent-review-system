const expect = require('chai').expect;
const request = require('request');

it('Subject count (397)', function (done) {
    request('http://localhost:8082/api/subjects', function (error, response, body) {
        const res = JSON.parse(body);
        expect(res.data.length).to.equal(397);
        done();
    });
});
