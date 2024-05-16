const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARN] O comando em ${filePath} não possui um dos atributos requeridos (data ou execute)`);
        }
    }
}

const rest = new REST().setToken(token);

(async() => {
    try {
        console.log(`Recarregando ${commands.length} comandos`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`${commands.length} comandos recarregados com sucesso!`);
    } catch (error) {
        console.error(error);
    }
})();