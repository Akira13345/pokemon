import {ButtonComponent, Discord} from "discordx";
import type {ButtonInteraction} from "discord.js";
import {getPokemonInfo} from "../service/pokeapi.js";
import {createStatsEmbed} from "../helper/ui_components.js";

@Discord()
export class Base_stats {
    @ButtonComponent({ id: "base_stats" })
    async handle(interaction: ButtonInteraction): Promise<void> {
        const pokemonName = interaction.message.embeds[0]?.title?.toLowerCase();

        if (!pokemonName) {
            await interaction.reply({
                content: "Unable to retrieve Pokémon name. Please try again.",
                ephemeral: true,
            });
            return;
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            const pokemonInfo = await getPokemonInfo(pokemonName);
            const statsEmbed = createStatsEmbed(pokemonInfo);

            await interaction.editReply({ embeds: [statsEmbed] });
        } catch (error) {
            console.error(`Error retrieving stats for ${pokemonName}:`, error);
            await interaction.editReply({
                content: `Could not retrieve stats for Pokémon "${pokemonName}". Please try again later.`,
            });
        }
    }
}
