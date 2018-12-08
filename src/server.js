import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import Layout from './components/Layout'

const app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/*', (req, res) => {
  const jsx = <Layout />
  const reactDom = renderToString(jsx)

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(reactDom))
})

app.listen(3000)

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
            <!-- <script src="./assets/app.bundle.js"></script> -->
        </body>
        </html>
    `
}
