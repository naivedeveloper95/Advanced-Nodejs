jest.setTimeout(30000)

require('../models/User')

const mongoose = require('mongoose')
const keys = require('../config/keys')

let localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => {
      return store[key] || null
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
