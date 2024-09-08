export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
}

export interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string | null;
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    name: string;
    species: {
        name: string;
        url: string;
    };
    abilities: PokemonAbility[];
    types: PokemonType[];
    sprites: PokemonSprites;
    stats: PokemonStat[];
}

export interface PokemonSpecies {
    color: {
        name: string;
    };
    capture_rate: number;
    habitat: {
        name: string;
    } | null;
    egg_groups: {
        name: string;
        url: string;
    }[];
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface PokemonInfo {
    name: string;
    species: string;
    abilities: string[];
    color: string;
    captureRate: number;
    habitat: string;
    types: string[];
    eggGroups: string[];
    imageUrl: string;
    stats: PokemonStats;
}
