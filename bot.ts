import {IntentsBitField, Partials} from "discord.js";
import {Client} from "discordx";
import logger from './config/logger.js';

export const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent,
    ],
    silent: true,
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.once("ready", async () => {
    await bot.initApplicationCommands();
    logger.info(`Logged in as ${bot.user?.tag}`);
});

bot.on("interactionCreate", async (interaction) => {
    await bot.executeInteraction(interaction);
});
