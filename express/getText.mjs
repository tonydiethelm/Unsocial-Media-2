/*
What I need...
I need a middleware to...
    make a symbolic link from the pictures in the target directory to the webpack folder. 
*/



//setup stuff
//I'm just going to make the function here... I should modularize it! 
import fs from 'node:fs';
import path from 'node:path'
const slash = '/';




const getText = async (request, response, next) => {
  console.log('getting text ready');
    //get requested directory
    const targetDirectory = request.body.targetDirectory;

    //get the text from response.locals.mapping.text
    const allTheTexts = response.locals.mapping.text;
    //console.log(allTheTexts);

    //change text names to text
    //fs.readFile(target)  is async. How am I going to loop over an async function? Use await for response. 
    for(let index = 0; index < allTheTexts.length; index++){
        let target = targetDirectory + slash + allTheTexts[index];
        //console.log('The target is... ', target);
        
        await fs.readFile(target, 'utf8', (error, text) => {
            if(error){console.log(error)}
            if(text){response.locals.mapping.text[index] = text}
            //console.log('This should be full of text... ', response.locals.mapping.text[index]);
            // if (index = )
        });
        
    }
    console.log('end of getText');
    return next();
};

export default getText;