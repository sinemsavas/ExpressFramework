// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
const rf = require("./moduleReadFile.js");
var app = express();
var x = 1;
var y = 2;
var sum = x+y;

// Configuring the application
//using views pug with render method
//The path.join method is used to ensure that the correct path is used, even if the application is running on a different operating system.
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev')); // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory


//adding models to app.js with require
require("./mongo/models/db");
require("./mongo/controllers/operations");
const {create, returnAllOperations} = require("./mongo/controllers/operations");

// Route definitions
app.get('/', function (req, res) {   // The first route

    res.render('index', { x: x, y: y, sum: sum, pretty:true });
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});

app.get('/json/:name', (req, res) => {
    let ops = {}//array
    try {
        ops = rf.fileProcess(req.params.name).operations.map(op => {
            switch (op.op) {
                case '+':
                    op.result = op.x + op.y
                    return op

                case '-':
                    op.result = op.x - op.y
                    return op


                case '*':
                    op.result = op.x * op.y
                    return op

                case '/':
                    op.result = op.x / op.y
                    return op
            }
        })
    }
    finally {
        res.render('table', {operations: ops})
    }
})


app.get('/results', async (req, res) => {
    //await is waiting for promise to resolve and it returns. it allows code to execute async.
    // await is waits for the promise returned by the returnalloperations and the resolved value is stored in the operations variable.
    let operations = await returnAllOperations(req, res)
    try {
        operations.map(op => {
            switch (op.op) {
                case '+':
                    op.result = op.x + op.y
                    return op

                case '-':
                    op.result = op.x - op.y
                    return op


                case '*':
                    op.result = op.x * op.y
                    return op

                case '/':
                    op.result = op.x / op.y
                    return op
            }
        })

    } finally {
        res.render('table', {operations: operations})
    }
})

app.get('/calculate/:operation/:x/:y', (req, res) => {
    create(req, res)
})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
