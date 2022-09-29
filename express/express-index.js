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
let pictureDirectory = '/home/tony/Public'
const settingsFile= path.join(__dirname, '../settings.html');  
const mainFile = path.join(__dirname, '../webpack/HWPP-index.html');
//automagically destring incoming JSON
app.use(express.json());
//require my middleware
const mapMyDirectory = require('./mapMyDirectory.js')
const makeLinks = require('./makeLinks.js')




//My little tester middleware for seeing where we're at. 
const holler = (request, response, next) => {
  
  console.log('\n \nHoller! We\'re in the mapMyDirectory router!');
  console.log('request body is...', request.body)
  console.log('response locals is...', response.locals)
  console.log('\n\n')
  return next();
}




//static serve the webpack Directory. Might repurpose to send picture assets. 
//app.use(express.static(webpackDirectory))
app.use(express.static(pictureDirectory))

//test response for initial functionality. 
app.get('/test', 
  //holler,
  (request, response) => {
    response.status(200).send('Testing Testing, express is functioning. Is nodemon? Yes. ')
});

//handle requests for base app created by react and bundled by html webpack plugin. 
//this isn't served here and doesn't work. It never goes through this, because it's served off the 
//webdev server on 8080. Can't proxy back, or it won't get the react stuff. Annoying... 
//So, will have to build up app in base react, and handle requests off a separate URI. 
// app.get('/', 
//   holler,
//   (request, response) => {
//     response.status(200).sendFile(mainFile)
// });

//handle requests for settings page
app.post('/directory', 
  holler,
  mapMyDirectory,
  makeLinks,
  (request, response) => {
    response.status(200).send(response.locals.mapping)
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
    response.status(404).json('Sorry, we don\'t have that here.')
});

//handle errors

//Call the HTTP server 
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
 });