const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Models
//with Schema module i will define values and types
//my operation schema
const operation = new Schema({
    x: {type: Number, min: -1000000, max: 1000000, required: true},
    y: {type: Number, min: -1000000, max: 1000000, required: true},
    op: {type: String, validate: {validator: validateOp, message: "Not valid operation."}, required: true},
}, 
//showing times 
{timestamps:true})

let validOps = ['+', '-', '/', '*']
function validateOp(operation) {
    return !!validOps.find(op => op === operation )
}

//when reaching schema i use name as Operation and second parameter is scheme name operation
//creating model
//creating mongoose model named Operation, with operation schema defines structure of the documents.
mongoose.model('Operation', operation);
//module.exports = operation