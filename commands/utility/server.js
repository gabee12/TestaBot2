const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Infos do Servidor'),
    async execute(interaction) {
        await interaction.reply(`Nome do servidor: ${interaction.guild.name}\nNúmero de Membros: ${interaction.guild.memberCount}\nNúmero Máximo de Membros: ${interaction.guild.maximumMembers}`);
    },
};