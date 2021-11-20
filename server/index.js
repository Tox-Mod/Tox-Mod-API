const mongoose = require("mongoose");
const { MessageEmbed } = require('discord.js');
const config = require("../config.js");

module.exports = async (client) => {
    const { port } = require("../config");
    const fastify = require('fastify')({ logger: true });

    const dbOptions = {
        family: 4,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
    }

    await mongoose.connect(config.mongoose, dbOptions);

    console.log(`Mongoose is Successfully connected at: ${config.mongoose}`)

    fastify.register(require('fastify-swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'fastify-api' },
        },
    });

    const routes = [
        "../routes/v1/landingPage",
        "../routes/v1/versionCheck",
        "../routes/v1/getUser",
        "../routes/v1/getCase"
    ]
    routes.map(route => {
        fastify.register(require(route));
    })

    fastify.addHook('preHandler', (req, reply, done) => {
        req.client = client
        done()
      });
      
    const start = async () => {

        try {

            await fastify.listen(port, '0.0.0.0');

            console.log(`Listening to the Server on Port: ${port}, ${client.user.username} is Loaded.`);

            let startLog = new MessageEmbed()
            .setTitle('API: Startup Successful')
            .setColor('#0EFF00')
            .setThumbnail('https://toxmod.xyz/images/ToxModLogo.gif')
            .setDescription('The API is Online and Ready!')
            .addField('Domain', `${config.domain}`, true)
            .addField('Mongo', `${config.mongoose}`, true)
            .addField('PORT', `${config.port}`, true)
            .setTimestamp()
            .setFooter('© 2021 Tox Mod', 'https://toxmod.xyz/images/ToxModLogo.gif')
            
            await client.guilds.cache.get(config.guildID).channels.cache.get(config.logsID).send({ embeds: [startLog] }); 

        } catch (error) {

            fastify.log.error(error);

            let errorLog = new MessageEmbed()
              .setTitle('500 - Internal Server Error')
              .setColor('RED')
              .setThumbnail('https://toxmod.xyz/images/ToxModLogo.gif')
              .setDescription('Woah, Something went wrong with the API')
              .addField('Error', `${error}`)
              .setTimestamp()
              .setFooter('© 2021 Tox Mod', 'https://toxmod.xyz/images/ToxModLogo.gif')

              await client.guilds.cache.get(config.guildID).channels.cache.get(config.logsID).send({ embeds: [errorLog] });
              
            process.exit(1);
        }
    }
    start();
};
