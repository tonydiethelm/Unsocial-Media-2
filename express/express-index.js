/* What this needs to do:
  I need to serve my react app.
    Need to get requested folder
    Need to build elements based on that folder
  I need to serve a settings page. 
  I need to handle wrong URIs
  I need to handle errors
  Actually call the HTTP server. This should be last. 

*/

//setup stuff
//path setup
const path = require('node:path');

//express setup
const express = require('express');
const app = express();
const port = 3000;
    //Caution! We are inside server dir here. Set pathnames accordingly.
const webpackDirectory = path.join(__dirname, '../webpack');
const settingsFile= path.join(__dirname, '../settings.html');  
const mainFile = path.join(__dirname, '../webpack/HWPP-index.html');



//My little tester middleware for seeing where we're at. 
const holler = (request, response, next) => {
  console.log('Holler! We\'re in the mapMyDirectory router!');
  return next();
}


//static serve the webpack Directory.
app.use(express.static(webpackDirectory))

//test response for initial functionality. 
app.get('/test', 
  //holler,
  (request, response) => {
    response.status(200).send('Testing Testing, express is functioning. Is nodemon? Yes. ')
});

//handle requests for base app created by react and bundled by html webpack plugin. 
//this isn't served here and doesn't work. It never goes through this, because it's served off the 
//webdev server on 8080. Can't proxy back, or it won't get the react stuff. Annoying... 
//So, will have to build up app in base react, and handle requests as params/queries off a separate URI. 
// app.get('/', 
//   holler,
//   (request, response) => {
//     response.status(200).sendFile(mainFile)
// });

//handle requests for settings page
app.get('/directory', 
  holler,
  (request, response) => {
    response.status(200).send(req.locals.mapping)
});

//handle requests for settings page
app.get('/settings', 
  //holler,
  (request, response) => {
    response.status(200).sendFile(settingsFile)
});

//handle wrong URIs
app.use('*', 
  //holler,
  (request, response) => {
    response.status(404).send('Sorry, we don\'t have that here.')
});

//handle errors

//Call the HTTP server 
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
 });