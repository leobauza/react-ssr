# Server rendered react using babel register and no webpack bundling for the server

## What are we building here?

The end result of this app is a counter that is initially rendered server side and then updated with client side JavaScript.

This represents a minimal example of a server side rendered (SSR) React app. This app is not production ready, it's not the only way to set up SSR, and is solely meant as an introduction to the concept of SSR React.

There are more robust solutions that make working with SSR code easier, and solve many of the problems that an SSR app would run into. Some frameworks to explore are [NEXT.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.org/).

## Prerequisites

This requires understanding what [yarn](https://yarnpkg.com/en/) is. It also requires a basic understanding of [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [Babel](https://babeljs.io/).

In this app Webpack (using babel-loader) is used to transform the latest JavaScript in the `client.js` file into a bundle that the `server.js` file includes using `<script src="./assets/app.bundle.js"></script>`. Babel is also used in `index.js` via `require('@babel/register')` to avoid the need of a more complex Webapck setup. `@babel/register` transforms `server.js` to JavaScript that can be understood by Node.js. Both `@babel/register` and the Webpack configuration use the `.babelrc` file to configure babel transformations.

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
