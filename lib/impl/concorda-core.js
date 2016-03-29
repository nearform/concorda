'use strict'

// external plugins
var SenecaUser = require('seneca-user')
var SenecaMail = require('seneca-mail')

// internal plugins
var ConcordaUser = require('./services/user')
var ConcordaClient = require('./services/client')
var ConcordaGroup = require('./services/group')
var ConcordaEmail = require('./util/email')
var AuthServices = require('./services/auth')

module.exports = function (options) {
  // Set up our seneca plugins
  var seneca = this
  const name = 'concorda-core'

  function init (args, done) {
    // load user
    seneca
      .use(SenecaUser)
      .use(ConcordaUser)
      .use(ConcordaClient)
      .use(ConcordaGroup)
      .use(SenecaMail, options.mail)
      .use(ConcordaEmail)

    seneca.ready(function(){
      seneca
        .use(AuthServices)
    })

    done()
  }

  seneca.add('init: ' + name, init)

  return {
    name: name
  }
}