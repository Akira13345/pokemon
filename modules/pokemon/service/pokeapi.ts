import axios from 'axios';
import type { Pokemon, PokemonSpecies, PokemonInfo } from '../interface/pokedex.js';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonInfo(pokemonName: string): Promise<PokemonInfo> {
    const pokemonResponse = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${pokemonName.toLowerCase()}`);
    const pokemon = pokemonResponse.data;

    const speciesResponse = await axios.get<PokemonSpecies>(pokemon.species.url);
    const species = speciesResponse.data;

    return formatPokemonInfo(pokemon, species);
}

function formatPokemonInfo(pokemon: Pokemon, species: PokemonSpecies): PokemonInfo {
    return {
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        species: pokemon.species.name,
        abilities: pokemon.abilities.map(a => a.ability.name),
        color: species.color.name,
        captureRate: species.capture_rate,
        habitat: species.habitat ? species.habitat.name : 'Inconnu',
        types: pokemon.types.map(t => t.type.name),
        eggGroups: species.egg_groups.map(eg => eg.name),
        imageUrl: pokemon.sprites.front_default || '',
        stats: {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
        }
    };
}
