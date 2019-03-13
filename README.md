# Server rendered React using babel register and no webpack bundling for the server

## What are we building here?

The end result of this app is a counter that is initially rendered server-side and then updated with client-side JavaScript.

The goal is to minimize the parts needed to get the app up and running. Webpack is used to compile the client-side React code. Server-side code is compiled on the fly with babel register. To run the app first start a webpack watch process with `yarn start` and then start the node server with `yarn server`.

This represents a minimal example of a server-side rendered (SSR) React app. This app is not production ready, it's not the only way to set up SSR, and is meant as an introduction to the concept of SSR React.

There are more robust solutions that make working with SSR code easier, and solve many of the problems that an SSR app would run into. Some frameworks to explore are [NEXT.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.org/).

## Prerequisites

This requires basic understanding of [yarn](https://yarnpkg.com/en/), [node](https://nodejs.org/en/), [Webpack](https://webpack.js.org/), [React](https://reactjs.org/), and [Babel](https://babeljs.io/). This app also uses [Express.js](https://expressjs.com/) to start a server and server-side render the app with node.js.

In this app Webpack (using babel-loader) is used to transform the latest JavaScript in the `client.js` file into a bundle that the `server.js` file includes using `<script src="./assets/app.bundle.js"></script>`. Babel is also used in `index.js` via `require('@babel/register')` to avoid the need of a more complex Webapck setup. `@babel/register` transforms `server.js` to JavaScript that can be understood by Node.js. Both `@babel/register` and the Webpack configuration use the `.babelrc` file to configure babel transformations.

@TODO: link to the repo to see the finished product

## The Parts

This basic setup of a server-side rendered React app includes 4 files. The `client`, the `server`, a `component` that will be rendered on the `server` and then updated by the `client`, and an entry point. We will also need a `webpack.config.js` file to compile the `client` code.

## The Component

A `Counter` component defined in `/src/components/Counter.js`. The `Counter` renders a `h1` tag that shows where the counter is at.

```js
import React, { Component } from 'react'

class Counter extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.count()
  }

  count = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    })

    setTimeout(this.count, 1000)
  }

  render() {
    return <h1>Count: {this.state.count}</h1>
  }
}

export default Counter
```

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

After the client-side JavaScript has loaded it can update the count every second.

## The Server

[Express](https://expressjs.com/) is a fast way to get a Node.js app running. The server's job is to take the `Counter` component, convert it to html, and render it for the client-side code to take over control. Here is all the code needed to set up the server with comments.

```js
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Counter from './components/Counter'

/**
 * Create an express app
 */
const app = express()

/**
 * Set the location of the static assets (ie the js bundle generated by webapck)
 */
app.use(express.static(path.resolve(__dirname, '../public')))

/**
 * Create a route that matches any path entered on the url bar
 */
app.get('/*', (req, res) => {
  /**
   * Convert JSX code to a HTML string that can be rendered server-side with
   * `renderToString` a method provided by ReactDOMServer
   *
   * This sets up the app so that calling ReactDOM.hydrate() will preserve the
   * rendered HTML and only attach event handlers. In this app this is done in
   * `client.js`
   * (https://reactjs.org/docs/react-dom-server.html#rendertostring)
   */
  const jsx = <Counter />
  const reactDom = renderToString(jsx)

  /**
   * Set the app's response to 200 OK (https://httpstatuses.com/200)
   * Tells the browser this is a html text page and then returns the template
   * complete with the HTML string created from JSX React code created above
   */
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(reactDom))
})

/**
 * Tells the app to listen on port 3000 allowing access to the app on
 * localhost:3000
 */
app.listen(3000)

/**
 * An HTML String template to be rendered by the Node.js server. This function
 * takes a single argument: The HTML string created by passing JSX to
 * `renderToString`. And returns an HTML string that the Node.js server displays
 * on localhost:3000
 */
function htmlTemplate(reactDom) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script src="./assets/app.bundle.js"></script>
        </body>
        </html>
    `
}
```

The most important things to note are that `renderToString` converts the component to an HTML string, we are only outputting html, and `<script src="./assets/app.bundle.js"></script>` is a webpack bundle of the compiled `client.js` code.

## The Client

On a standard client-side app (CSA) the `render` method provided by the `react-dom` package is probably being used to render a React element into the specified container in the DOM. It would look something like this:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'

const app = document.getElementById( 'app' )
ReactDOM.render( <Counter />, app )
```

In the SSR context the server has already rendered the `Counter` component. It already exists in the DOM. The `react-dom` package provides the `hydrate` method to "hydrate a container whose HTML contents were rendered by `ReactDOMServer`." Simply put `hydrate` attaches event listeners to existing markup in a container. The only thing that changes from the code above is replacing `render` with `hydrate`:

```js
import React from 'react'
import { hydrate } from 'react-dom'
import Counter from './components/Counter'

const app = document.getElementById('app')
// Use hydrate instead of render to attach event listeners to existing markup
hydrate(<Counter />, app)
```

## The Entry Point

The `index.js` file at the root of the project `requires('sever.js')` and uses [@babel/register](https://babeljs.io/docs/en/babel-register) to compile files on the fly.

The `index.js` file is small:

```js
require('@babel/register')
require('./src/server')
```

`@babel/register` does the magic of converting the `server` js into something node.js can process and output. In this example we are only doing this to avoid any more complicated webpack configuration. You probably wouldn't do this in a real project, this is just a fast way to get this set up for the sake of demonstration.

## Compiling `client.js`

The entry point will take care of compiling server-side code, but what about our client-side code?

Earlier in the `server.js` code I pointed out this line:

```
<script src="./assets/app.bundle.js"></script>
```

This adds script tag references the cient-side code, however we can't just load the `client.js`. First it needs to be compiled to something the browser can understand. The webpack configuration file below takes the `client.js` file and converts it to the `app.bundle.js` file the app will use.

```js
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // Sets process.env.NODE_ENV by configuring DefinePlugin
  mode: 'development',
  // gives a name to your bundle { name: .... }
  entry: {
    app: './src/client.js'
  },
  // source mapping style https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-module-eval-source-map',
  // determines the name and place for your output bundles
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    // deletes the public folder for fresh builds
    new CleanWebpackPlugin(['public'])
  ],
  // sets rules for processing different files being 'imported'
  // (or loaded) into js files
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            // uses .babelrc as config
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

As mentioned in the comments in this file a `.babelrc` file is needed. It looks likes this:

```json
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

@TODO: links to all those and brief explenations

## Running the app

After putting together all these parts our folder structure will looks something like this:

```
/src
-- client.js
-- server.js
-- /components
---- counter.js
.babelrc
index.js
package.json
webpack.config.js
```

The project dependencies are these (the best way to get these is to clone the repo @TODO: instructions on cloning the REPO):

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
  "webpack": "^4.27.1",
  "webpack-cli": "^3.1.2",
  "webpack-node-externals": "^1.7.2"
}
```

Assuming the above structure and that all the packages have been installed we can create two scripts to run our app (in `package.json`):

```json
"scripts": {
  "start": "webpack",
  "server": "node index.js"
}
```

Then in a terminal run `yarn start` and then `yarn server`. The first script will compile the `client.js` code and create the `public` folder containing `assets/app.bundle.js`. The second script will start the `node.js` server. Navigate to `localhost:3000` (this is where we told our `server.js` to start the server) and you should see the counter.

