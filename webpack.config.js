try{process.env.WEBPACK_ENV.length}
catch(e){console.log('no env set'); process.exit(2);}
var LiveReloadPlugin = require('webpack-livereload-plugin');
var env = process.env.WEBPACK_ENV;

// var loader = {
//     test: /\.js$/,
//     loader: ['babel'],
//     exclude: ['node_modules']
// }

this.dev = {
    entry: ['./src/index.js'],
    output: {
        path: './dist/',
        filename: 'computeStyles.js'
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    module: {
    loaders:[
      {
        test: /\.js?$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      }
    ],
  }
};

this.test = {
    entry: ['./test/index.js'],
    output: {
        path: './test/build',
        filename: 'testBundle.js'
    },
    module: {
    loaders:[
      {
        test: /\.js?$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      }
    ]
  }
};


if(!this[env]){console.log('WEBPACK_ENV not recognized');process.exit(2)}
module.exports = this[env];