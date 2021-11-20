const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const { WebhookClient, MessageEmbed } = require('discord.js');

const config = require('../config');

const webhookClient = new WebhookClient(config.webhook_id, config.webhook_url);

const chalk = require('chalk');


const myFormat = printf(({ level, message, label, timestamp }) => {

  let webhook_embed = new MessageEmbed()
      .setTitle("Tox Mod - Logger")
      .setThumbnail('https://devmod.xyz/DevilModNew.png')
      .setColor("RANDOM")
      .setDescription(`${message}`)
      .addField('Label:', `[${label}]`, true)
      .addField('Level:', `[${level}]`, true)
      .setTimestamp()
      .setFooter("© Copyright 2021 - 2022 - Tox Mod")

  webhookClient.send({
    username: "Tox Mod - API",
    avatarURL: "https://toxmod.xyz//images/ToxModLogo.png",
    embeds: [webhook_embed],
  }).catch(() => {});

  return `${timestamp} [${level}] [${chalk.cyan(label)}] ${message}`;
});

const myCustomLevels = {
  levels: { 
    error: 0, 
    warn: 1, 
    info: 2, 
    http: 3,
    verbose: 4, 
    debug: 5, 
    silly: 6 
  }
};

const logs = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './assets/logs/ToxMod.log' }),
  ],
});

module.exports = logs;