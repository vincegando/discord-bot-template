# Discord Bot Template

A bot template for Discord written in Node.js. The template consists of boilerplate code to build on top of with custom logic to power your bot's functionality.

## Instructions

After cloning the repo, modify the environment variables with your desired interval duration, Discord bot token, and Discord channel ID. For local development, use the `.env` file. For running the bot via docker-compose, use the `docker-compose.yml` file.

Next, install the project's dependencies. Make sure you're in the project's base directory.
```bash
npm install
```

After you've set your local environment variables, start the bot locally.
```bash
npm start
```

## Extending Functionality
To extend the template's current functionality, build on top of the `Worker` class with custom interval checks so Discord messages are sent once the conditions you're monitoring for are met. You'll also customize the content and layout of the Discord MessageEmbed messages according to your bot's needs.
