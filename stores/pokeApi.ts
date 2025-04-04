import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

export const usePokeApi = defineStore("pokeApi", () => {
  const baseUrl: string = `https://pokeapi.co/api/v2/`;

  // Object of Pokemon by ID, and its details.
  const allPokemonDetails: Ref<AllPokemonDetails> = ref(
    {} as AllPokemonDetails
  );

  /*
      API: Get pokemons starting from `offset`
  */
  async function getLatestPokemonList(
    apiUrl: string
  ): Promise<null | PokemonList> {
    try {
      // Retrieve latest pokemon list from URL
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        const statusCode = response.status;
        const errorMessage = await response.text();
        console.error(`getAllPokemon: ${statusCode} - ${errorMessage}`);
        return null;
      }

      const responseData = (await response.json()) as PokemonList;
      return responseData;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /*
      API: Get Pokemon details and update pokemonDetails
  */
  async function getPokemonDetails(id: number, url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        const statusCode = response.status;
        const errorMessage = await response.text();
        console.error(`getPokemonDetails: ${statusCode} - ${errorMessage}`);
        return false;
      }

      const responseData = await response.json();
      allPokemonDetails.value[id] = parsePokemonDetails(responseData);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /*
    Parse for Pokemon details that is only needed
  */
  function parsePokemonDetails(responseData: any): PokemonDetails {
    // Fill pokemonStats.value with responseData.stats using the pokemonStats.name
    let pokemonStats: PokemonStats = {
      hp: {
        name: "hp",
        value: null,
      },
      attack: {
        name: "attack",
        value: null,
      },
      defense: {
        name: "defense",
        value: null,
      },
      spAttack: {
        name: "special-attack",
        value: null,
      },
      spDefense: {
        name: "special-defense",
        value: null,
      },
      speed: {
        name: "speed",
        value: null,
      },
    };

    if (responseData.stats) {
      Object.entries(pokemonStats).forEach(([_, stat]) => {
        const matchingStat = responseData.stats.find(
          (statResponse: PokemonApiStats) =>
            statResponse.stat.name === stat.name
        );

        if (matchingStat) {
          stat.value = matchingStat.base_stat;
        }
      });
    }

    return {
      name: responseData.name ?? ("N/A" as string),
      spriteUrl: responseData.sprites?.front_default ?? ("N/A" as string),
      height: responseData.height ?? ("N/A" as string),
      weight: responseData.weight ?? ("N/A" as string),
      hp: pokemonStats.hp.value ?? null,
      attack: pokemonStats.attack.value ?? null,
      defense: pokemonStats.defense.value ?? null,
      spAttack: pokemonStats.spAttack.value ?? null,
      spDefense: pokemonStats.spDefense.value ?? null,
      speed: pokemonStats.speed.value ?? null,
    };
  }

  return {
    allPokemonDetails,
    getLatestPokemonList,
    getPokemonDetails,
  };
});

/* Pokemon List */
interface PokemonList {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonListResults[];
}

interface PokemonListResults {
  name: string;
  url: string;
}

interface AllPokemonDetails {
  [key: number]: PokemonDetails;
}

interface PokemonDetails {
  name: string;
  spriteUrl: string;

  height: number | null;
  weight: number | null;
  hp: number | null;
  attack: number | null;
  defense: number | null;
  spAttack: number | null;
  spDefense: number | null;
  speed: number | null;
}

interface PokemonStats {
  hp: PokemonStatsValueName;
  attack: PokemonStatsValueName;
  defense: PokemonStatsValueName;
  spAttack: PokemonStatsValueName;
  spDefense: PokemonStatsValueName;
  speed: PokemonStatsValueName;
}

interface PokemonStatsValueName {
  name: string;
  value: null | number;
}

interface PokemonApiStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
