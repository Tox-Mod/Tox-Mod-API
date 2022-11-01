const { MessageEmbed } = require('discord.js');
const config = require("../../config.js");
const Infinity = require('infinity-bots');

const webhook = new Infinity.Webhook('ToxicIsBae123')

const voteHook = (fastify, options, done) => {
    
    fastify.post("/v1/hooks/vote", webhook.hookListener(async (vote, req, res) => {

        let client = req.client
        
        let user = client.users.cache.get(vote.userID) || vote.userID

        let voteLog = new MessageEmbed()
          .setTitle('⬆️ UpVote Logs')
          .setColor('#0EFF00')
          .setThumbnail('https://toxmod.xyz/images/ToxModLogo.gif')
          .setDescription(`Somone has voted for me on [Infinity Bot List](https://infinitybotlist.com/bots/631558023109804032/vote)`)
          .addField('User', `${user}`, true)
          .addField('User ID', `${vote.userID}`, true)
          .addField('Username', `${vote.userObj.username}`, true)
          .addField('New Count', `${vote.votes}`, true)
          .addField('Timestamp', `${vote.timestamp}`, true)
          .addField('Vote Type', `${vote.type}`, true)
          .setTimestamp()
          .setFooter('© 2021 Tox Mod', 'https://toxmod.xyz/images/ToxModLogo.gif')
            
        await client.guilds.cache.get(config.guildID).channels.cache.get(config.voteLogs).send({ embeds: [voteLog] }); 
       
    }));

    done()
  };

module.exports = voteHook;
