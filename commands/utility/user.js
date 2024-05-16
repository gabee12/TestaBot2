const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Infos do Usuário'),
    async execute(interaction) {
        await interaction.reply(`Comando executado por ${interaction.user.username}, que entrou no servidor no dia ${interaction.member.joinedAt}.`);
    },
};