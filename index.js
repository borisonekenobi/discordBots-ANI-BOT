require('dotenv').config();
const { Client, Intents } = require('discord.js');
const fs = require('fs');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const TOKEN = process.env.TOKEN;

let mostRecent = fs.readFileSync('./mostRecent.txt', 'utf8');
const variables = require('./config.js')
let channel;

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}`);
    channel = bot.channels.cache.get(variables.channelID);
    main().then(r => console.log(r));
});

async function logAll(fileLines) {
    for (let i = 0; i < fileLines.length - 1; i++) {
        console.log(fileLines[i]);
        fs.writeFileSync('mostRecent.txt', fileLines[i], 'utf8');
        await channel.send(fileLines[i]);
    }
}

async function logAfter(fileLines, startPos) {
    for (let i = startPos; i < fileLines.length - 1; i++) {
        console.log(fileLines[i]);
        fs.writeFileSync('mostRecent.txt', fileLines[i], 'utf8');
        await channel.send(fileLines[i]);
    }
}

async function main() {
    let file = fs.readFileSync(variables.filepath, 'utf8');
    let fileLines = file.split('\n');
    if (mostRecent === '') {
        await logAll(fileLines);
    } else {
        for (let i = 0; i < fileLines.length; i++) {
            if (mostRecent === fileLines[i]) {
                await logAfter(fileLines, i + 1);
                break;
            }
        }
    }

    process.exit();
}