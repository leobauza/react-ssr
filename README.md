# Server rendered React using babel register and no webpack bundling for the server

This is a companion repo for a blog post on the [viget.com blog](https://www.viget.com/articles/). [That same blog post exists in this repo](https://github.com/leobauza/react-ssr/blob/react-ssr-wo-webpack/BLOGPOST.md).

> This project assume node is already installed. There is an .nvmrc file that with the specific version of node used to develop this project. If you are using [nvm](https://github.com/creationix/nvm) to manage node version you can run `nvm use` to use the current version if it is already installed, or `nvm install` to install it and then run `nvm use` to use it.

To run this project, in a terminal, clone the repo and change directrories into the projects directory:

```
git clone git@github.com:leobauza/react-ssr.git && cd react-ssr
```

Then install dependencies with [yarn](https://yarnpkg.com/en/):

```
yarn
```

or

```
yarn install
```

Compile the client-side code with:

```
yarn start
```

And then start the node server with

```
yarn server
```

If the browser doesn't automatically open to `localhost:3000` navigate to `localhost:3000`.
