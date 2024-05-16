const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Adiciona uma música a fila')
        .addStringOption(option =>
            option.setName('musica')
                .setDescription('Música a ser adicionada')
                .setRequired(true)
        ),
    async execute(interaction) {
        
    },
};