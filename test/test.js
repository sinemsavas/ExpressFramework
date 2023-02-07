//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require("supertest");

const assert = require('assert');
const chai = require('chai');
const {response} = require("express");
chai.use(require('chai-json'));

// This agent refers to PORT where program is runninng.
const server = supertest.agent("http://localhost:3000");


// UNIT test begin
describe('GET /', function () {
    it('respond with html', function (done) {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

//The endpoint return 'operations.json' which contains an object with an array of mathematical operations. 
describe('GET /json/:name', function () {
    it('Is a json file', function () {
        chai.expect('operations.json').to.be.a.jsonFile().and.to.be.jsonObj({//chai.expect function is testing the returned content type is html and it contains an object with the given properties.
            //The .to.be.a.jsonFile() assertion checks whether the 'operations.json' file is a valid JSON file.
            //The .and.to.be.jsonObj() assertion checks whether the 'operations.json' file is a valid JSON object.
            "operations" : [
                {
                    "x" : 3,
                    "y" : 2,
                    "op" : "+"
                },
                {
                    "x" : 3,
                    "y" : 2,
                    "op" : "-"
                },
                {
                    "x" : 3,
                    "y" : 2,
                    "op" : "*"
                },
                {
                    "x" : 3,
                    "y" : 2,
                    "op" : "/"
                }
            ]
        })
    });

    //The 'supertest' test — whether the generated HTML document contains the correct calculation results arithmetic
    //{"operations":[{"x":3,"y":2,"op":"+"},{"x":3,"y":2,"op":"-"},{"x":3,"y":2,"op":"*"},{"x":3,"y":2,"op":"/"}]}
    it('OP + ', function (done) {
        server
            .get('/json/operations.json')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[4][0], '5');
            })
            .end(done)
    });
    it('OP - ', function (done) {
        server
            .get('/json/operations.json')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[8][0], '1');
            })
            .end(done)
    });
    it('OP * ', function (done) {
        server
            .get('/json/operations.json')
            .expect('Content-Type', /html/)
            .expect((response) => {
                //response.text is split into an array of strings using the '<td>' as the separator. 
                let text = response.text.split('<td>')
                assert.equal(text[12][0], '6');
            })
            .end(done)
    });
    it('OP / ', function (done) {
        server
            .get('/json/operations.json')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                //The text[16].slice(0, 3) is taking the 17th element of the text array, and then getting the first 3 characters of that element.
                assert.equal(text[16].slice(0, 3), '1.5');
            })
            .end(done)
    });
    
});

//Testing calculation of 3 sum 2/Checking GET endpoint
describe('GET Calculate', function () {
    it('Add 3 and 2', function (done) {
        server
            .get('/calculate/sum/3/2')//send to the server
            .expect('Content-Type', /json/)//return this as JSON
            .end(done)
    });
})


describe('GET Results', function () {
    it('OP + ', function (done) {
        server
            .get('/results')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[4][0], '4');
            })
            .end(done)
    });
    it('OP - ', function (done) {
        server
            .get('/results')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[8][0], '0');
            })
            .end(done)
    });
    it('OP * ', function (done) {
        server
            .get('/results')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[12][0], '4');
            })
            .end(done)
    });
    it('OP / ', function (done) {
        server
            .get('/results')
            .expect('Content-Type', /html/)
            .expect((response) => {
                let text = response.text.split('<td>')
                assert.equal(text[16][0], '1');
            })
            .end(done)
    });
});

