/*Since webpack bundles everything and creates a simple browser-readable code, 
all packages, presets and plugins you will install need to be configured in webpack.
https://webpack.js.org/configuration/
*/

//HTMLWebPackPlugin stuff. 
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/react-index.html",   //file it will use as a template to build...
  filename: "./react-index.html"        //this file here. 
});

module.exports = {
  //various configurations for webpack. 
  entry: "./src/react-index.js",      //application starts running and webpack starts bundling here. 
  output: {
    path: path.join(__dirname, 'dist'), //target directory for all output files. 
    filename: "[name].js",              //What is this? A default. :D Puts files by name in dir specified above.
  },
  plugins: [htmlPlugin],                //rules for HTML Web Pack Plugin. Defined above. 
  module: {                             //configuration for the various modules. 
    rules:[
      {//babel loader rules. Test for js and jsx, don't do node modules, use babel-loader.
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};