'use strict'

const log = require('./lib/log.js')
const Worker = require('./lib/worker.js')

require('dotenv').config()

async function main() {
  const worker = new Worker({
    intervalDuration: (parseInt(process.env.INTERVAL_DURATION) || 5) * 1000,
    discordToken: process.env.DISCORD_TOKEN,
    discordChannelId: process.env.DISCORD_CHANNEL_ID,
    log
  })

  process.once('SIGTERM', worker.stop)
  process.once('SIGINT', worker.stop)

  await worker.start()
}

main()
  .catch(err => {
    process.nextTick(() => {
      throw err
    })
  })
