import type {MessageActionRowComponentBuilder} from "discord.js";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from "discord.js";
import type {PokemonInfo} from '../interface/pokedex.js';

const colorMapping: { [key: string]: `#${string}` } = {
    black: "#000000",
    blue: "#0000FF",
    brown: "#8B4513",
    gray: "#808080",
    green: "#008000",
    pink: "#FFC0CB",
    purple: "#800080",
    red: "#FF0000",
    white: "#FFFFFF",
    yellow: "#FFFF00"
};

export function createPokemonEmbed(pokemonInfo: PokemonInfo): EmbedBuilder {
    const color = colorMapping[pokemonInfo.color] || "#FFFFFF";

    return new EmbedBuilder()
        .setTitle(`${pokemonInfo.name}`)
        .setColor(color)
        .addFields(
            {
                name: "\`📰\` About",
                value: `**Abilities:** ${pokemonInfo.abilities.join(", ")}
                **Color:** ${pokemonInfo.color}
                **Capture Rate:** ${pokemonInfo.captureRate}
                **Habitat:** ${pokemonInfo.habitat}
                **Types:** ${pokemonInfo.types.join(", ")}`,
                inline: false
            },
            {
                name: "\`🐣\` Breeding",
                value: `**Egg Groups:** ${pokemonInfo.eggGroups.join(", ")}`,
                inline: false
            }
        )
        .setThumbnail(pokemonInfo.imageUrl)
        .setTimestamp();
}

export function createErrorEmbed(errorMessage: string): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("Error")
        .setDescription(errorMessage)
        .setColor("#FF0000")
        .setTimestamp();
}

export function createPokemonButton() {
    const moreInfoButton = new ButtonBuilder()
        .setLabel("Base Stats")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("base_stats");

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(moreInfoButton);

    return row;
}

export function createStatsEmbed(pokemonInfo: PokemonInfo): EmbedBuilder {
    const stats = [
        { name: 'HP', value: pokemonInfo.stats.hp },
        { name: 'Attack', value: pokemonInfo.stats.attack },
        { name: 'Defense', value: pokemonInfo.stats.defense },
        { name: 'Special Attack', value: pokemonInfo.stats.specialAttack },
        { name: 'Special Defense', value: pokemonInfo.stats.specialDefense },
        { name: 'Speed', value: pokemonInfo.stats.speed },
    ];

    const maxStat = Math.max(...stats.map(stat => stat.value));

    const fields = stats.map(stat => ({
        name: `**${stat.name}**`,
        value: progressBar(stat.value, maxStat),
        inline: false
    }));

    return new EmbedBuilder()
        .setTitle(`${pokemonInfo.name}'s Base Stats`)
        .setColor(colorMapping[pokemonInfo.color] || 0xFFFFFF)
        .addFields(fields)
        .setFooter({ text: 'Values shown are base stats' })
        .setTimestamp();
}

function progressBar(value: number, maxValue: number): string {
    const maxBars = 20;
    const filledBars = Math.round((value / maxValue) * maxBars);
    const emptyBars = maxBars - filledBars;

    const filled = '█'.repeat(filledBars);
    const empty = '░'.repeat(emptyBars);

    //const percentage = Math.round((value / maxValue) * 100);

    return `${filled}${empty} ${value.toString().padStart(3)}`;

}
