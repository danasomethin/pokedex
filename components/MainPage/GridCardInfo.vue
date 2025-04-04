<template>
  <div class="container">
    <div @click="$emit('closeDialog')" class="container__close-button">
      <img :src="CloseLogo" />
    </div>

    <div class="grid-container">
      <div class="grid-container__overview">
        <MainPageSubComponentsPokemonOverview
          :id="props.id"
          :pokemonDetails="props.pokemonDetails"
          :isSmall="$vuetify.display.width > 970 ? false : true"
        />
      </div>
      <div class="grid-container__stats">
        <h5>{{ props.id }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { PokemonDetails } from "~/types/chosenData";
import CloseLogo from "../assets/icons/xmark-solid.svg";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
}

const props = defineProps<Props>();

// Emit to close dialog
const emit = defineEmits(["closeDialog"]);
</script>

<style scoped lang="scss">
.container {
  @extend .container-extend;
  width: 90% !important;

  &__close-button {
    position: absolute;
    right: 0;
    transform: translate(50%, -50%);

    width: 5%;
    min-width: 40px;
    aspect-ratio: 1;
    border-radius: 100%;
    background-color: var(--button-primary-color);
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--button-primary-hover-color);
    }

    img {
      width: 50%;
    }
  }
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
  position: relative;
}
</style>
