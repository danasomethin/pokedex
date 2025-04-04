<template>
  <header>
    <span class="title">Pokédex</span>
  </header>
  <body>
    <div
      v-if="Object.keys(allPokemonDetails).length === 0"
      class="container-no-items"
    >
      <v-progress-circular indeterminate />
      <h5>Loading...</h5>
    </div>

    <div v-else>
      <h5 class="bold">Search for a Pokémon by name or id number</h5>
      <v-autocomplete
        label="Name or id number"
        :items="items"
        density="compact"
        menu-icon=""
        bg-color="var(--card-background-color)"
        variant="solo"
        hide-details
        flat
        single-line
        class="searchbar"
      >
        <template v-slot:append-inner>
          <v-avatar>
            <img class="searchbar__svg" :src="Logo" />
          </v-avatar>
        </template>
      </v-autocomplete>

      <!-- Populate all Pokemon in cards -->
      <v-row no-gutters>
        <v-col
          v-for="(pokemonDetails, id) in allPokemonDetails"
          :key="id"
          class="card"
          cols="12"
          xxl="2"
          xl="2"
          lg="4"
          md="6"
          sm="6"
        >
          <MainPageGridCards :pokemonDetails="pokemonDetails" />
        </v-col>

        <!-- Load More button -->
        <v-col class="card" cols="12" xxl="2" xl="2" lg="4" md="6" sm="6">
          <MainPageLoadMoreButton
            :retrieveNewPokemonList="retrieveLatestPokemonList"
          />
        </v-col>
      </v-row>
    </div>
  </body>
</template>

<script setup lang="ts">
import { type Ref, ref, watchEffect } from "vue";

import Logo from "../assets/icons/magnifying-glass-solid.svg";

import { usePokeApi } from "@/stores/pokeApi.ts";
import { storeToRefs } from "pinia";

// Call for PokeApi Pinia store
const pokeApi = usePokeApi();
const { allPokemonDetails } = storeToRefs(pokeApi);
const { getLatestPokemonList, getPokemonDetails } = pokeApi;

// List of Pokemon, getAllPokemon() updates this.
const latestPokemonList: Ref<PokemonList | null> = ref(null);

/*
  Returns null or the id of the Pokemon from the URL
*/
const getId = function (url: string): null | number {
  const matches: RegExpMatchArray | null = url.match(new RegExp("/(\\d+)/$"));
  if (matches === null || matches.length < 2) {
    return null;
  }
  const id = matches[1];
  return Number(id);
};

/*
  Watch for updates on latestPokemonList and 
  updates allPokemonDetails residing in pinia accordingly
*/
watchEffect(async () => {
  if (!latestPokemonList.value) {
    return;
  }
  // Update all PokemonDetails object by calling API
  latestPokemonList.value.results.forEach(async (item) => {
    // Get key ready as id
    const id: null | number = getId(item.url);
    if (id === null) {
      return;
    }

    // Retrieve Pokemon details from url, then update allPokemonDetails
    const isSuccess: Promise<boolean> = await getPokemonDetails(id, item.url);
    if (!isSuccess) {
      console.error(`getPokemonDetails failed for id: ${id}`);
    }
  });
});

// TODO: call API to get this
const items: string[] = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];

// Get latest pokemon list
const retrieveLatestPokemonList = async function (): void {
  let apiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  if (latestPokemonList.value !== null) {
    apiUrl = latestPokemonList.value.next;
  }

  latestPokemonList.value = await getLatestPokemonList(apiUrl);
};

await retrieveLatestPokemonList();

interface PokemonList {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonListResults[];
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
</script>

<style scoped lang="scss">
.container-no-items {
  display: flex;
  width: 100%;
  height: 50vh;
  justify-content: center;
  align-items: center;

  h5 {
    margin-left: 12px;
  }
}

.searchbar {
  max-width: 30%;
  min-width: 400px;
  margin-block: 24px;

  &__svg {
    width: 50%;
    height: 50%;
  }

  &:deep(.v-label.v-field-label) {
    font-family: "Lato", "Arial";
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    color: var(--subText-color);
  }
}

.card {
  padding: 12px 13.5px !important;
  width: 100%;
  display: flex;
  border: 1px solid black;
}

@media (max-width: 600px) {
  .searchbar {
    min-width: 100%;

    &:deep(.v-label.v-field-label) {
      font-family: "Lato", "Arial";
      font-size: 16px;
      font-style: normal;
      line-height: normal;
      color: var(--subText-color);
    }
  }
}
</style>
