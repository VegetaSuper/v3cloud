const config = require('./config')

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  },
  log: {
    warn (message) {
      console.log('warn:::' + message)
    },
    error (message) {
      console.log('error:::' + message)
    },
    deprecate (message) {
      console.log('deprecate:::' + message)
    },
    debug (message) {
      console.log('debug:::' + message)
    },
  }
})

module.exports = { mysql: knex }