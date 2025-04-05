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
*/
export interface PokeApiStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
