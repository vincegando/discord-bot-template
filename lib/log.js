'use strict'

const pino = require('pino')

module.exports = pino({
  name: 'discord-bot',
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
    }
  },
  formatters: {
    level: (label) => {
      return {level: label}
    }
  }
}, pino.destination(2))
