require('dotenv').config();
const Discord = require('discord.js');
let bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    bot.user.setActivity('Star Wars')
        .then(r => console.log(r));
    console.info(`Logged in as ${bot.user.tag}`);
    bot.channels.cache.get('738439111412809730').send(':green_circle: Bot has started.');
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    try {
        let type = interaction.type;
        let guildID = interaction.guild_id;
        let guild = bot.guilds.cache.get(guildID);
        let authorID = interaction.member.user.id;
        let author = guild.members.cache.get(authorID);
        let name = interaction.data.name;
        let content = 'An error occurred and a response could not be generated';
        console.log('Interaction type ' + type + ' used by ' + authorID + ' in guild ' + guildID + ' in channel ' + interaction.channel_id);
        //console.log(interaction);

        switch (type) {
            case 1:
                console.log('type == 1');
                console.log(interaction);
                break;

            case 2: //slash command


            case 3: //button

        }

        const createAPIMessage = async(interaction, content) => {
            const { data, files } = await Discord.APIMessage.create(
                bot.channels.resolve(interaction.channel_id),
                content
            )
                .resolveData()
                .resolveFiles()
            return { ...data, files }
        }

        const reply = async (interaction, response) => {
            let data = {
                content: response
            }

            if (typeof response === 'object') {
                data = await createAPIMessage(interaction, response)
            }

            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data
                }
            })
        };
        await reply(interaction, content)

    } catch (err) {

    }
});

bot.on('guildMemberAdd', member => {
    try {

    } catch (err) {

    }
});

bot.on('message', msg => {
    try {

    } catch (err) {

    }
});

const types = require('./types.js')

bot.on('messageUpdate', (oldMessage, newMessage) => {
    try {

    } catch (err) {

    }
});

bot.on("messageDelete", (deleteMessage) => {
    try {

    } catch (err) {

    }
});

bot.on('guildMemberRemove', member => {
    try {

    } catch (err) {

    }
});