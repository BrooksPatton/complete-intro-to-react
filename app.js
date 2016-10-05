require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Provider } = require('react-redux')
const { store } = require('./js/Store.jsx')
const _ = require('lodash')
const fs = require('fs')
const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const { Routes } = require('./js/client-app.jsx')

const app = express()

app.use('/public', express.static('./public'))

app.use((req, res, next) => {
  match({ routes: Routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) return next(err)
  })
})
