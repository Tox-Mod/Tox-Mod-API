const { MessageEmbed } = require('discord.js');
const config = require("../../config.js");
const Infinity = require('infinity-bots');

const webhook = new Infinity.Webhook('ToxicIsBae123')

const voteHook = (fastify, options, done) => {
    
    fastify.post("/v1/hooks/vote", webhook.hookListener(async (vote, req, res) => {

        let client = req.client

        let voteLog = new MessageEmbed()
          .setTitle('⬆️ UpVote Logs')
          .setColor('#0EFF00')
          .setThumbnail('https://toxmod.xyz/images/ToxModLogo.gif')
          .setDescription(`<@!${vote.userID}> has gave me a Upvote on Infinity`)
          .setTimestamp()
          .setFooter('© 2021 Tox Mod', 'https://toxmod.xyz/images/ToxModLogo.gif')
            
        await client.guilds.cache.get(config.guildID).channels.cache.get(config.voteLogs).send({ embeds: [voteLog] }); 
       
    }));

    done()
  };

module.exports = voteHook;
