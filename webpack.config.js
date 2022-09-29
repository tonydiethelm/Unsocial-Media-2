/*Since webpack bundles everything and creates a simple browser-readable code, 
all packages, presets and plugins you will install need to be configured in webpack.
https://webpack.js.org/configuration/
*/

//HTMLWebPackPlugin stuff. 
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./react/react-index.html",   //file it will use as a template to build...
  //filename: "./HWPP-index.html"           //this file here.   Commented out, works
});

module.exports = {
  //various configurations for webpack. 
  entry: "./react/react-index.js",        //application starts running and webpack starts bundling here. 
  output: {
    path: path.join(__dirname, 'webpack'), //target directory for all output files. 
    filename: "bundle.js",                 //Puts files by name in dir specified above.
    publicPath: '/',                      //Where you uploaded your bundled files. Relative to filename above?
  },
  //mode: 'development',                    //Shouldn't need this, I'm calling "--mode development" in the package.json dev script.
  devServer: {                            //Need to configure the dev server to serve up front end stuff. 
    host: 'localhost',
    port: 8080,
    //match the output path.              Why?
    static: {
      directory: path.join(__dirname, 'webpack'),
      publicPath: '/',
    },
    //hot: true,                                     //I'm calling this in the package.json script. Not needed here. 
    headers: {'Tony Diethelm': 'Was Here. :D'},      //This is added to all headers. Fun! 
    proxy: {
      //I need to set up the proxy server for the front end stuff to 
      //make proper get/post requests to the back end. 
      '/settings': {target: 'http://localhost:3000/', secure: false,},
      '/test': {target: 'http://localhost:3000/', secure: false,},
      '/directory': {target: 'http://localhost:3000/', secure: false,},
      //'/': {target: 'http:localhost:3000/', secure: false,},   //Future? I'm going to need middleware to handle options/parameters. 
    }

  },
  plugins: [htmlPlugin],                //rules for HTML Web Pack Plugin. Defined above. 
  module: {                             //configuration for the various modules. 
    rules:[
      {//babel loader rules. Test for js and jsx, don't do node modules, use babel-loader.
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};