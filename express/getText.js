/*
What I need...
I need a middleware to...
    make a symbolic link from the pictures in the target directory to the webpack folder. 
*/



//setup stuff
//I'm just going to make the function here... I should modularize it! 
const fs = require('fs');
const slash = '/';
const path = require('node:path');



getText = async (request, response, next) => {
    //get requested directory
    const targetDirectory = request.body.targetDirectory;

    //get the text from response.locals.mapping.text
    const allTheTexts = response.locals.mapping.text;

    //change text names to text
    //fs.readFile(target)  is async. How am I going to loop over an async function? Use await for response. 
    for(let individualText of allTheTexts){
        let target = targetDirectory + slash + individualText;
        
        await fs.readFile(target, (error, text) => {
            if(error){console.log(error)}
            if(text){individualText = text}
        });
        console.log(individualText);
        }
    return next();
};

module.exports = getText;