<template>
  <div class="icon-heart">
    <IconsHeartSolid color="var(--heart-filled-color)" size="15%" />
  </div>

  <div class="container-data">
    <v-img
      :width="4000"
      cover
      :src="props.pokemonDetails.spriteUrl"
      :lazy-src="PokeBall"
      :alt="props.pokemonDetails.name"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>

    <div v-if="props.smallText" class="container-data__text">
      <h5 class="container-data__text__name bold">
        {{ props.pokemonDetails.name }}
      </h5>
      <h5 class="container-data__text__id bold">{{ formattedID() }}</h5>
    </div>

    <div v-else class="container-data__text">
      <h1 class="container-data__text__name bold">
        {{ props.pokemonDetails.name }}
      </h1>
      <h1 class="container-data__text__id bold">{{ formattedID() }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";
import type { PokemonDetails } from "~/types/chosenData";
import PokeBall from "../assets/images/Poke_Ball.webp";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
  smallText: boolean;
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
  @extend .flexbox-column-center;

  img {
    width: 90%;
  }

  &__text {
    @extend .flexbox-column-center;

    &__name {
      text-transform: capitalize;
      text-align: center;
    }
    &__id {
      color: var(--subText-color);
    }
  }
}

.flexbox-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
