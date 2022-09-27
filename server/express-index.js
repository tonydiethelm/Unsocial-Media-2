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
const settingsFile= path.join(__dirname, '../settings.html');  
const mainFile = path.join(__dirname, '../dist/react-index.html');




//test response for initial functionality. 
app.get('/test', (request, response) => {
  response.status(200).send('Testing Testing, express is functioning.')
});

//handle requests for base app created by react and bundled by html webpack plugin. 
app.get('/', (request, response) => {
  response.status(200).sendFile(mainFile)
});

//handle requests for settings page
app.get('/settings', (request, response) => {
  response.status(200).sendFile(settingsFile)
});

//handle wrong URIs
app.use('*', (request, response) => {
  response.status(404).send('Sorry, we don\'t have that here.')
});

//handle errors

//Call the HTTP server 
app.listen(port, () => {
  console.log('Server listening on port: ' + port);
 });