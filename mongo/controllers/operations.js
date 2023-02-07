const mongoose = require('mongoose');
const Operation = mongoose.model('Operation');//creating my model


// Return all operations
//function use find method of the operation object that model from mongodb database.
//method called empty object as an argument, that function will retrieve all documents in the Operation collection.
exports.returnAllOperations = (req, res) => {
    return Operation.find({})
}

//creates new op in the mongodb database
exports.create = (req, res) => {

    if(req.params.operation === 'sum')
        req.params.operation = '+'

    if(req.params.operation === 'sub')
        req.params.operation = '-'

    if(req.params.operation === 'mul')
        req.params.operation = '*'

    if(req.params.operation === 'div')
        req.params.operation = '/'

    // takes operations from req.params, and uses them to create new operation.
    const newOperation = new Operation({
        x: req.params.x,
        y: req.params.y,
        op: req.params.operation,
    });
    
    //new operation is saved to the database using save method of the newOperation
    newOperation
        .save(newOperation)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "New operation cannot created, ERROR!"
            });
        });
};






















// Delete operation with requested ID
//deleting an operation from mongodb database by giving id



exports.delete = (req, res) => {
    Operation.findByIdAndDelete(req.params.id)
        .then(async operation => {

            if (!operation) {
                return res.status(404).send({message: `No income with selected ID!`});
            }

            // Update account balance
            res.send({message: "Operation deleted!"});

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while deleting the income!"
            });
        });
        
};