
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pegaswap-sdk.cjs.production.min.js')
} else {
  module.exports = require('./pegaswap-sdk.cjs.development.js')
}
