# Server rendered react using babel register and no webpack bundling for the server

```json
"dependencies": {
  "express": "^4.16.4",
  "path": "^0.12.7",
  "react": "^16.6.3",
  "react-dom": "^16.6.3"
},
"devDependencies": {
  "@babel/core": "^7.2.0",
  "@babel/plugin-proposal-class-properties": "^7.2.1",
  "@babel/preset-env": "^7.2.0",
  "@babel/preset-react": "^7.0.0",
  "@babel/register": "^7.0.0",
  "babel-loader": "^8.0.4",
  "clean-webpack-plugin": "^1.0.0",
  "nodemon": "^1.18.7",
  "webpack": "^4.27.1",
  "webpack-cli": "^3.1.2",
  "webpack-node-externals": "^1.7.2"
}
```

## Prerequisites

This requires understanding what `yarn` and `npm` are. It also requires a basic understanding of [Webpack](https://webpack.js.org/) and of [React](https://reactjs.org/). For a more in depth look at a ssr webpack setup read: [How to configure Webpack for ssr React?](#TODO-WRITE-WEBPACK-SETUP-README)

## The Parts

## The Components

## The Client

## The Server

## The Entry Point

In this setup there is a `index.js` file at the root of the project that `requires` another files (`sever.js`) and uses [@babel/register](https://babeljs.io/docs/en/babel-register) to compile files on the fly.

The `index.js` file is pretty simple and looks like this:

```js
require('@babel/register')
require('./src/server')
```

Developers want to write code with the latest javascript features, however node.js doesn't understand all these new features. Developers may also want to use things like typescript or JSX which are a node.js server also does not understand. Babel translates these features (all code required from `server.js`) into code that the node.js server can understand through `@babel/register`.
