const fs = require('node:fs')
//The function uses the imported functions existsSync and readFileSync from the fs module to check if the given file name exists in the file system, and if it does, it opens the file, 
//reads its content, converts it to a string, 
//and parses it as JSON. If the file doesn't exist, the function returns a string "File doesn't exist". If there is no argument passed to the function, it returns "Provide 1 argument". If there is an error in parsing JSON, it returns "DIRECTORY".
//It is a utility function for reading files and parsing them as JSON.
//Parsing JSON refers to the process of taking a JSON string and converting it into a JavaScript object so that it can be accessed and manipulated in a more convenient format.
exports.fileProcess = (fileName) => {

    // check for argument
    if (fileName) {

        // check if it exists
        if (fs.existsSync(fileName)) {

            // try opening the file
            try {
               //The JSON.parse() method is then used to parse the contents of the file,
                // which should be in JSON format, into a JavaScript object. This resulting object is then returned by the function.
                return JSON.parse(fs.readFileSync(fileName).toString())

            } catch (e) {
                return "DIRECTORY"
            }
        }
        // if it doesn't exist
        else {
            return "File doesn\'t exist"
        }


    }
    // if there's no argument
    else {
        return "Provide 1 argument"
    }

}

