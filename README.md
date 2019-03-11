# Server rendered React using babel register and no webpack bundling for the server

## What are we building here?

The end result of this app is a counter that is initially rendered server side and then updated with client side JavaScript.

This represents a minimal example of a server side rendered (SSR) React app. This app is not production ready, it's not the only way to set up SSR, and is meant as an introduction to the concept of SSR React.

There are more robust solutions that make working with SSR code easier, and solve many of the problems that an SSR app would run into. Some frameworks to explore are [NEXT.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.org/).

## Prerequisites

This requires basic understanding of [yarn](https://yarnpkg.com/en/), [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [Babel](https://babeljs.io/).

In this app Webpack (using babel-loader) is used to transform the latest JavaScript in the `client.js` file into a bundle that the `server.js` file includes using `<script src="./assets/app.bundle.js"></script>`. Babel is also used in `index.js` via `require('@babel/register')` to avoid the need of a more complex Webapck setup. `@babel/register` transforms `server.js` to JavaScript that can be understood by Node.js. Both `@babel/register` and the Webpack configuration use the `.babelrc` file to configure babel transformations.

## The Parts

This basic setup of a server side rendered React app includes 4 files. The `client`, the `server`, a `component` that will be rendered on the `server` and then updated by the `client`, and an entry point.

## The Component

A `Counter` component defined in `/src/components/Counter.js`. The `Counter` renders a `h1` tag that shows where the counter is at:

[screensot of the count goes here]

The important parts to understand are:

1. The component has an initial state of `{ count: 0 }`
2. The component renders an `h1` tag with the text `Count: <the-current-count>`
3. Increasing the count doesn't start until _after_ the `client` code runs

The `Counter` component is initially rendered by the `server`. The `client` side JavaScript then attaches itself (hydrates) and updates the state. In other words the server outputs:

```html
...
<h1>Count: 0</h1>
...
```

And after the client side JavaScript has loaded it can update the count every second.

## The Server


## The Client

On a standard client side app (CSA) the `render` method provided by the `react-dom` package is probably being used to render a React element into the specified containe in the DOM. It would look something like this:

```js
import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/Counter";

const app = document.getElementById( "app" );
ReactDOM.render( <Counter />, app );
```

In the SSR context the server has already rendered the `Counter` component. It already exists in the DOM. The `react-dom` package provides the `hydrate` method to "hydrate a container whose HTML contents were rendered by `ReactDOMServer`." Simply put `hydrate` attaches event listeners to existing markup in a container. The only thing that changes from the code above is replacing `render` with `hydrate`:

```js
// @see: client.js
import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/Counter";

const app = document.getElementById( "app" );
ReactDOM.hydrate( <Counter />, app );
```

## The Entry Point

In this setup there is a `index.js` file at the root of the project that `requires('sever.js')` and uses [@babel/register](https://babeljs.io/docs/en/babel-register) to compile files on the fly.

The `index.js` file is pretty simple:

```js
require('@babel/register')
require('./src/server')
```

