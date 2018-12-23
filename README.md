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

## The Component

In this example there is a `Counter` component defined in `/src/components/Counter.js`. The `Counter` renders a `h1` tag that shows where the counter is at:

[screensot of the count goes here]

The important parts to understand are that:

1. The component has an initial state of `{ count: 0 }`
2. The component renders an `h1` tag with the text `Count: <the current count>`
3. Increasing the count doesn't start until _after_ the component did mount

The reasons for using this `Counter` component for this example is that it can be initially rendered by the server and then the client side JavaScript can attach itself and update the state. In other words the server can output:

```html
...
<h1>Count: 0</h1>
...
```

And after JavaScript has loaded it can update the `0` every second.

## The Client



## The Server

## The Entry Point

In this setup there is a `index.js` file at the root of the project that `requires('sever.js')` and uses [@babel/register](https://babeljs.io/docs/en/babel-register) to compile files on the fly.

The `index.js` file is pretty simple:

```js
require('@babel/register')
require('./src/server')
```

