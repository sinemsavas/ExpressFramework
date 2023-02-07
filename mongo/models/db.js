//adding mongoose
const mongoose = require('mongoose');

//MY DATABASE URI
let dbURI = 'mongodb+srv://localhost:1234@sinem.piko7ep.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);

// Connect to the database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).catch((err) => {
    console.log(err);
    console.log('error connecting to the database');
    process.exit();
});

//Event listeners for the Mongoose connection object that log state messages
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}.`);
});

mongoose.connection.on('error', error => {
    console.log('Mongoose connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose not connected.');
});


// Close connection to the database
const safeExit = (message, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose closed the connection via '${message}'.`);
        callback();
    });
};


// Nodemon restart
//close the connection and log a message 
process.once('SIGUSR2', () => {
    safeExit('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});


// Exit application
process.on('SIGINT', () => {
    safeExit('Exit application', () => {
        process.exit(0);
    });
});

//import the operations.js
require('./operations');
