<template>
  <header>
    <span class="title title-margin">Pokédex</span>
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
      <!-- Searchbar -->
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
            <img class="searchbar__svg" :src="SearchLogo" />
          </v-avatar>
        </template>
      </v-autocomplete>

      <!-- Populate all Pokemon in cards, placed on a grid -->
      <v-row no-gutters>
        <v-col
          v-for="(pokemonDetails, id) in allPokemonDetails"
          :key="id"
          class="card"
          cols="12"
          xxl="1"
          xl="2"
          lg="2"
          md="3"
          sm="4"
        >
          <MainPageGridCard :id="id" :pokemonDetails="pokemonDetails" />
        </v-col>

        <!-- Load More button -->
        <v-col class="card" cols="12" xxl="1" xl="2" lg="2" md="3" sm="4">
          <MainPageLoadMoreButton
            :retrieveNewPokemonList="retrieveLatestPokemonList"
            :isLoading="isLoadingLoadMore"
          />
        </v-col>
      </v-row>
    </div>
  </body>
</template>

<script setup lang="ts">
import { type Ref, ref, watchEffect } from "vue";
import type { PokemonDetails } from "~/types/chosenData";
import type { PokeApiPokemonList } from "~/types/pokeApi";
import { usePokeApi } from "@/stores/pokeApi.ts";
import { storeToRefs } from "pinia";
import SearchLogo from "../assets/icons/magnifying-glass-solid.svg";

// Call for PokeApi Pinia store
const pokeApi = usePokeApi();
const { allPokemonDetails } = storeToRefs(pokeApi);
const { getLatestPokemonList, getPokemonDetails } = pokeApi;

const latestPokemonList: Ref<PokeApiPokemonList | null> = ref(null); // List of Pokemon on the front page, getAllPokemon() updates this.
const isLoadingLoadMore: Ref<boolean> = ref(false); // Loader for Load More button

/*
  Get the front page latest pokemon by updating latestPokemonList
  Triggers the Loader for Load More button
*/
const retrieveLatestPokemonList = async function (): void {
  isLoadingLoadMore.value = true;

  let apiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  if (latestPokemonList.value !== null) {
    apiUrl = latestPokemonList.value.next;
  }

  try {
    latestPokemonList.value = await getLatestPokemonList(apiUrl);
  } catch (error) {
    console.error(`Error retrieving Pokemon list: ${error}`);
  } finally {
    isLoadingLoadMore.value = false;
  }
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

/*
  Returns null or the id (as a number) of the Pokemon from the URL
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
  TODO: call API to get items for searchbar
*/
const items: string[] = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
  "Liverpool",
  "Manchester",
];

// Retrieves the first 10 Pokemon
await retrieveLatestPokemonList();
</script>

<style scoped lang="scss">
.title-margin {
  margin-block: 24px;
}

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
