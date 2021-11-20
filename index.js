const { Client } = require("discord.js");
const client = new Client({ 
    disableEveryone: true, 
    disabledEvents: ["TYPING_START"],
    intents: 32767 
});
const mongoose = require("mongoose");
const config = require("./config")
let Fastify = require("./server/index");

client.on("ready", () => {
    Fastify(client);
});

client.login(config.token)