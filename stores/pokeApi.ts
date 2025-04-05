import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import type { PokemonDetails } from "~/types/chosenData";
import type { PokeApiPokemonList, PokeApiStats } from "~/types/pokeApi";

export const usePokeApi = defineStore("pokeApi", () => {
  // const baseUrl: string = `https://pokeapi.co/api/v2/`;

  // Object of Pokemon by ID, and its details.
  const allPokemonDetails: Ref<AllPokemonDetails> = ref(
    {} as AllPokemonDetails
  );

  /*
      API: Get Pokemons starting from API link
      Link format -- https://pokeapi.co/api/v2/pokemon?limit=10&offset=0
  */
  async function getLatestPokemonList(
    apiUrl: string
  ): Promise<null | PokeApiPokemonList> {
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

      const responseData = (await response.json()) as PokeApiPokemonList;
      return responseData;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /*
      API: Get Pokemon details and updates the allPokemonDetails
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
    // Fill pokemonStats with responseData.stats using the pokemonStats.name
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
          (statResponse: PokeApiStats) => statResponse.stat.name === stat.name
        );

        if (matchingStat) {
          stat.value = matchingStat.base_stat;
        }
      });
    }

    return {
      name: responseData.name ?? ("N/A" as string),
      spriteUrl: responseData.sprites?.front_default ?? null,
      height: responseData.height ?? null,
      weight: responseData.weight ?? null,
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

/* All Pokemon IDs along with their details */
interface AllPokemonDetails {
  [key: number]: PokemonDetails;
}

/*
  Pokemon stats where the name is given and the value needs to be updated
*/
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
