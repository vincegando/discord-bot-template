'use strict'

const { Client, MessageEmbed } = require('discord.js')

// Main Worker class for bot
module.exports = class Worker {
  constructor(opts) {
    this.intervalDuration = opts.intervalDuration
    this.interval = null

    this.client = null
    this.discordToken = opts.discordToken
    this.discordChannelId = opts.discordChannelId
    this.channel = null
    this.log = opts.log
  }

  // Initialize Discord and channel connections
  // Begin calling `run()` method on an interval
  async start() {
    this.log.info('Starting Discord Bot...')

    try {
      await this.startDiscord()
      await this.connectToChannel()
    } catch (err) {
      this.log.error(err, 'Error connecting to Discord channel')
      return
    }

    this.interval = setInterval(async () => {
      await this.run()
    }, this.intervalDuration)
  }

  // Main bot logic
  // Evaluate conditions and determine whether to send a message
  async run() {
    this.log.info('Running worker...')

    const conditionsMet = true
    if (conditionsMet) {
      try {
        await this.channel.send({
          embeds: [
            this.createMessageEmbed({
              message: 'Example Message!'
            })
          ]
        })
        this.log.info('Message sent')
      } catch (err) {
        this.log.error(err, 'Error sending message to channel')
        return
      }
    }
  }

  // Initialize Discord client
  async startDiscord() {
    this.client = new Client({ intents: [] })
    return new Promise((resolve) => {
      this.client.on('ready', () => {
        this.log.info({
          tag: this.client.user.tag,
          username: this.client.user.username
        }, `Logged in to Discord as ${this.client.user.tag}`)


        resolve()
      })

      this.client.login(this.discordToken)
    })
  }

  // Connect to a specific channel
  async connectToChannel() {
    this.channel = await this.client.channels.fetch(this.discordChannelId)
  }

  // Build the MessageEmbed object to be sent by the bot
  createMessageEmbed(event) {

    const embed = new MessageEmbed()
    embed.setColor('BLUE')
    embed.setTitle('Example Title')
    embed.setDescription(event.message)
    embed.setURL('https://discord.com')
    embed.addField('Example', 'Hello', false)
    embed.setImage('https://1000logos.net/wp-content/uploads/2021/06/Discord-logo.png')

    return embed
  }

  // Shutdown the bot instance
  stop() {
    clearInterval(this.interval)
    process.exit()
  }
}
