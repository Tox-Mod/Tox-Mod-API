const { MessageEmbed } = require('discord.js');
const config = require("../config.js");
const Infinity = require('infinity-bots');

const webhook = new Infinity.Webhook('ToxicIsBae123')

const voteHook = (fastify, options, done) => {
    
    fastify.post("/hooks/vote", webhook.hookListener(async (vote, req, res) => {

        res.header("authorization", "ToxicIsBae123");

        let client = req.client

        let voteLog = new MessageEmbed()
          .setTitle('⬆️ Vote Logs')
          .setColor('#0EFF00')
          .setThumbnail('https://toxmod.xyz/images/ToxModLogo.gif')
          .setDescription(`<@!${vote.user}> has gave me a Upvote on Infinity`)
          .setTimestamp()
          .setFooter('© 2021 Tox Mod', 'https://toxmod.xyz/images/ToxModLogo.gif')
            
        await client.guilds.cache.get(config.guildID).channels.cache.get(config.logsID).send({ embeds: [voteLog] }); 
       
    }));

    done()
  };

module.exports = voteHook;
