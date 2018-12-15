# Server rendered react using babel register and no webpack bundling for the server

First, here is every package we are including and what they do to get our SSR React app running.

### express:

Node.js web framework used to write the simple app that runs on the server. (https://expressjs.com/)

### path:

A node utility for working with file paths. (https://nodejs.org/api/path.html)

### react:

A framework used to build UIs. (https://reactjs.org/)

### react-dom:

Connects React to the DOM and is used on the client side. (https://www.npmjs.com/package/react-dom)

### @babel/core:

Used to convert the latest and greatest javascript code to something a Node.js server or older browsers can understand. This package is used under the hood by `babel-loader` within webpack and by `@babel/register` in `index.js` and is never directly used in this setup (https://babeljs.io/docs/en/next/babel-core.html)

### @babel/plugin-proposal-class-properties:

This package allows for the use of static class properties (https://www.npmjs.com/package/@babel/plugin-proposal-class-properties) ie, the ability to write something like this:

```js
class MyClass extends React.Component {
  state = {
    state: 'is',
    a: 'static',
    property: 'yay'
  }

  ...
}
```

This is arguably an unnecesary package but this is a nicer way of writing classes. Alternatively one could omit static class properties and achieve the same results.

### @babel/preset-env:

This is the preset that `@babel/core` uses to transform the latest JavaScript to a target environment or environments. In our case the targets are older browsers (that support ES5) and a Node.js server (https://babeljs.io/docs/en/babel-preset-env)

### @babel/preset-react:

This is the preset that `@babel/core` uses to transform our React code (ie JSX) to our target environments (mentioned above.) (https://babeljs.io/docs/en/babel-preset-react)

### @babel/register:

This is used on the entry point (`index.js`) to transform code that is being `required()` without having to use webpack to bundle and transform the code (https://babeljs.io/docs/en/babel-register)

### babel-loader:

A webpack loader that will use our babel configurations (set in `.babelrc`) to transform the JavaScript files using the latest JavaScript to JavaScript that can be understood by older browsers (https://www.npmjs.com/package/babel-loader)

### clean-webpack-plugin:

A webpack plugin that deletes everything in our public folder before building new bundles. This is done so the folder doesn't grown indefinitely. (https://github.com/johnagan/clean-webpack-plugin)

### nodemon:

This will run our Node.js server and monitor for changes we make while developing and restart the server when those changes are made (https://nodemon.io/)

### webpack:

Webpack manages our build pipeline. In this project it is taking the code in the `client.js` file and using the `babel-loader` to convert it into code older browsers can understand. (https://webpack.js.org/)

### webpack-cli:

This is webapack's command line interface tool. In this project is used by the `yarn start` script to watch files for changes and re-bundle files. (https://webpack.js.org/api/cli/)

## Prerequisites

This requires understanding what `yarn` and `npm` are. It also requires a basic understanding of [Webpack](https://webpack.js.org/) and of [React](https://reactjs.org/). For a more in depth look at a ssr webpack setup read: [How to configure Webpack for ssr React?](#TODO-WRITE-WEBPACK-SETUP-README)

<!-- @TODO something about why webpack and babel are needed here -->

## The Parts

The most basic setup of a server side rendered React app includes 4 files that will be explained further below. They are the `client`, the `server`, a `component` that you want to render on the `server` and the `client`, and finally an entry point.



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
