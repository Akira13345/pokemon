import type {CommandInteraction} from "discord.js";
import {ApplicationCommandOptionType} from "discord.js";
import {Discord, Slash, SlashOption} from "discordx";
import {getPokemonInfo} from '../service/pokeapi.js';
import {createErrorEmbed, createPokemonButton, createPokemonEmbed} from '../helper/ui_components.js';

@Discord()
export class PokedexCommand {
    @Slash({ description: "Get information about a Pokémon", name: "pokedex" })
    async pokedex(
        @SlashOption({
            description: "The name of the Pokemon",
            name: "pokemon",
            required: true,
            type: ApplicationCommandOptionType.String,
        })
        pokemonName: string,
        interaction: CommandInteraction,
    ): Promise<void> {
        await interaction.deferReply();

        try {
            const pokemonInfo = await getPokemonInfo(pokemonName);
            const embed = createPokemonEmbed(pokemonInfo);
            const buttonRow = createPokemonButton();

            await interaction.editReply({
                embeds: [embed],
                components: [buttonRow],
            });
        } catch (error) {
            const errorEmbed = createErrorEmbed(`Could not retrieve information for Pokémon "${pokemonName}". Please ensure the name is correct.`);
            await interaction.editReply({
                embeds: [errorEmbed],
            });
        }
    }
}
