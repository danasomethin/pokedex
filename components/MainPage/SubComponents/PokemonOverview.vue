<template>
  <div class="icon-heart">
    <IconsHeartSolid color="var(--heart-filled-color)" size="15%" />
  </div>

  <div v-if="props.isSmall" class="container-data">
    <img :src="props.pokemonDetails.spriteUrl" />

    <h5 class="container-data__name bold">{{ props.pokemonDetails.name }}</h5>
    <h5 class="container-data__id bold">{{ formattedID() }}</h5>
  </div>

  <div v-else class="container-data">
    <img :src="props.pokemonDetails.spriteUrl" />

    <h1 class="container-data__name bold">{{ props.pokemonDetails.name }}</h1>
    <h1 class="container-data__id bold">{{ formattedID() }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";
import type { PokemonDetails } from "~/types/chosenData";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
  isSmall: boolean;
}

const props = defineProps<Props>();

const formattedID = function (): string {
  let s = `000${props.id}`;
  return s.substr(s.length - 4);
};
</script>

<style scoped lang="scss">
.icon-heart {
  width: 100%;
  display: flex;
  justify-content: end;
}

.container-data {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 90%;
  }

  &__name {
    text-transform: capitalize;
  }

  &__id {
    color: var(--subText-color);
  }
}
</style>
