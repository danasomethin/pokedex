<template>
  <div class="container">
    <div class="grid-container">
      <div class="grid-container__overview">
        <MainPageSubComponentsPokemonOverview
          :id="props.id"
          :pokemonDetails="props.pokemonDetails"
          :isSmall="false"
        />
      </div>
      <div class="grid-container__stats">
        <h5>{{ props.id }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { PokemonDetails } from "~/types/chosenData";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.container {
  @extend .container-extend;
  width: 90% !important;
}

.grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 40% 60%;
  grid-template-areas: "overview stats";
  width: 100% !important;

  &__overview {
    grid-area: overview;
    padding: 16px 16px 10% 16px;
    background-color: var(--card-background-color);
    border-radius: 8px;
  }
  &__stats {
    grid-area: stats;
  }
}

@media (max-width: 600px) {
  .container {
    width: 60% !important;
  }
  .grid-container {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 100% 100%;
    grid-template-areas: "overview" "stats";
    width: 100% !important;
  }
}

.container-extend {
  background-color: var(--heart-empty-color) !important;
  border-radius: 8px;
  padding: 0 !important;
}
</style>
