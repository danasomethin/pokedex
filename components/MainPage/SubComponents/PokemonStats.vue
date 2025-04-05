<template>
  <div :style="{ width: '100% !important' }">
    <h1 class="title-stats">Stats</h1>

    <div v-for="(v, k, i) in statsLabel" :key="i">
      <div class="grid-container">
        <!-- Stat title -->
        <span
          class="grid-container__stat-name"
          :style="{
            'background-color':
              i % 2 === 0 ? 'var(--card-background-color)' : '#f8fafc',
          }"
        >
          <h5 class="bold">{{ v }}</h5>
        </span>

        <!-- Stat value -->
        <span
          class="grid-container__stat-value"
          :style="{
            'background-color':
              i % 2 === 0 ? 'var(--card-background-color)' : '#f8fafc',
          }"
        >
          <h5 class="bold">{{ props.pokemonDetails[k] ?? "N/A" }}</h5>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonDetails, StatsKeys } from "~/types/chosenData";

interface Props {
  pokemonDetails: PokemonDetails;
}

const props = defineProps<Props>();

interface StatsLabel {
  [key in StatsKeys]: string;
}

// keys hold the title of the stats to be displayed.
const statsLabel: StatsLabel = {
  height: "Height",
  weight: "Weight",
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  spAttack: "Special Attack",
  spDefense: "Special Defense",
  speed: "Speed",
};
</script>

<style scoped lang="scss">
.title-stats {
  margin-bottom: 30px;
}

.grid-container {
  display: grid;
  grid-template-rows: minmax(auto, 1fr);
  column-gap: 2%;
  grid-template-columns: 70% 28%;
  grid-template-areas: "stat-name stat-value";
  margin-top: 1%;
  &__stat-name {
    grid-area: stat-name;
    @extend .grid-items-padding;
    border-radius: 8px;
  }
  &__stat-value {
    grid-area: stat-value;
    @extend .grid-items-padding;
    border-radius: 8px;

    display: flex;
    justify-content: end;
  }
}

.grid-items-padding {
  padding: 8px 24px;
}

@media (max-width: 900px) {
  .grid-items-padding {
    padding: 8px 8px;
  }
}

@media (max-width: 600px) {
  .grid-container {
    display: grid;
    grid-template-rows: minmax(auto, 1fr);
    column-gap: 2%;
    grid-template-columns: 60% 38%;
    grid-template-areas: "stat-name stat-value";
    margin-top: 1%;
  }
}
</style>
