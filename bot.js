const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.queue = new Map();

const foldersPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
             console.log(`[WARN] O comando em ${filePath} não possui um dos atributos requeridos (data ou execute)`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);

if (process.platform == 'win32') {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', async function() {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', async function() {
    const queue = await client.queue.get('854864170965401630');
    if (queue.songs.length > 0) {
        let queueJson = JSON.stringify(queue.songs);
        fs.writeFileSync('fila.json', queueJson);
    }
    process.exit();
});

process.on('uncaughtException', async function() {
    const queue = await client.queue.get('854864170965401630');
    if (queue.songs.length > 0) {
        let queueJson = JSON.stringify(queue.songs);
        fs.writeFileSync('fila.json', queueJson);
    }
    process.exit();
})