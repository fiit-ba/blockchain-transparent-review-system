const expect = require('chai').expect;
const request = require('request');

it('Subject type count (9)', function (done) {
    request('http://localhost:8082/api/subject_types', function (error, response, body) {
        const res = JSON.parse(body);
        expect(res.data.length).to.equal(9);
        done();
    });
});
