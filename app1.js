// No use of any template system
const express = require('express'),//express library
    logger = require('morgan');//morgan library
const app = express();
const path = require("path");//path library
const rf = require('./moduleReadFile.js')//rf assigned value that returns from moduleReadFile function

var x = 1;
var y = 2;
var sum = x+y;


// Determining the contents of the middleware stack
app.use(logger('dev'));// Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

//adding models to app.js with require
require("./mongo/models/db");
require("./mongo/controllers/operations");
const {create, returnAllOperations} = require("./mongo/controllers/operations");


// Route definitions
app.get('/', function (req, res) {  //The first route
    res.send('<h1>Hello World!</h1>'+x+' + '+y+' = '+sum); // Send a response to the browser
});


// Route definitions
app.get('/json/:name', (req, res) => {
    try {
        let ops = ""
        rf.fileProcess(req.params.name).operations.forEach(op => {
            switch (op.op) {
                case '+':
                    op.result = op.x + op.y
                    break

                case '-':
                    op.result = op.x - op.y
                    break


                case '*':
                    op.result = op.x * op.y
                    break

                case '/':
                    op.result = op.x / op.y
                    break
            }
            ops += `<tr><td>${op.x}</td><td>${op.op}</td><td>${op.y}</td><td>${op.result}</td></tr>`

        })
       
        let html = `<h1>operations</h1><table><tr><th>x</th><th>operation</th><th>y</th><th>result</th></tr>${ops}</table>`
        res.send(html)

        //it sets the HTTP status code of the response to 404, which means 'Not Found' and sends an HTML message to the client indicating that "No Operations available".
    } catch (e) {
        res.status(404).send('<h1>No Operations available</h1>')
    }

})

app.get('/results', async (req, res) => {
    let operations = await returnAllOperations(req, res)

    try {
        let ops = ""
        operations.forEach(op => {
            switch (op.op) {
                case '+':
                    op.result = op.x + op.y
                    break

                case '-':
                    op.result = op.x - op.y
                    break


                case '*':
                    op.result = op.x * op.y
                    break

                case '/':
                    op.result = op.x / op.y
                    break
            }

            ops += `<tr><td>${op.x}</td><td>${op.op}</td><td>${op.y}</td><td>${op.result}</td></tr>`
        })
        let html = `<h1>Operations!</h1><table><tr><th>X</th><th>Operation</th><th>Y</th><th>Result</th></tr>${ops}</table>`

        res.send(html)
    } catch (e) {
        res.status(404).send('<h1>No Operations available</h1>')
    }
})

//defining a route '/calculate/:operation/:x/:y' that listens to GET requests, when a request is made on this route, the create(req, res) function will be executed.
app.get('/calculate/:operation/:x/:y', (req, res) => {
    create(req, res)
})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});