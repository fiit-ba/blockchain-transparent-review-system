const expect = require('chai').expect;
const request = require('request');

it('Study level count (5)', function (done) {
    request('http://localhost:8082/api/study_levels', function (error, response, body) {
        const res = JSON.parse(body);
        expect(res.data.length).to.equal(5);
        done();
    });
});
