// Interface from https://pokeapi.co/api/v2/pokemon?limit=10&offset=0
export interface PokeApiPokemonList {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonListResults[];
}

interface PokemonListResults {
  name: string;
  url: string;
}

/*
  Stats API type
  stats array item Interface from https://pokeapi.co/api/v2/pokemon/1
*/
export interface PokeApiStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
