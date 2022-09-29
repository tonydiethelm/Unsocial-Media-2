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



makeLinks = (request, response, next) => {
    //get requested directory
    const targetDirectory = request.body.targetDirectory;
    //console.log(targetDirectory);

    //get picture names
    const pictureNames = response.locals.mapping.pictures;
    //console.log(pictureNames);

    //create symbolic links
    //fs.symlinkSync( target, path, type )
    for(let pic of pictureNames){
        let target = targetDirectory + slash + pic;
        let destination = path.join(__dirname + '/../webpack/' + pic)
        fs.symlink(target, destination, (error) => {
            //if(error){console.log(error)}
        })
    }

    return next();
}

module.exports = makeLinks