<template>
  <div class="icon-heart" @click.stop="toggleFavourite(props.id)">
    <IconsHeartSolid
      :color="
        isPokemonInFavourites(props.id)
          ? 'var(--heart-filled-color)'
          : 'var(--heart-empty-color)'
      "
      size="15%"
    />
  </div>

  <div class="container-data">
    <v-img
      :width="4000"
      :src="props.pokemonDetails.spriteUrl"
      :lazy-src="PokeBall"
      :alt="props.pokemonDetails.name"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate />
        </div>
      </template>
    </v-img>

    <div v-if="props.textH5" class="container-data__text">
      <h5 class="container-data__text__name bold">
        {{ props.pokemonDetails.name }}
      </h5>
      <h5 class="container-data__text__id bold">{{ formattedID() }}</h5>
    </div>

    <div v-else-if="props.textH1" class="container-data__text">
      <h1 class="container-data__text__name bold">
        {{ props.pokemonDetails.name }}
      </h1>
      <h1 class="container-data__text__id bold">{{ formattedID() }}</h1>
    </div>

    <div v-else class="container-data__text">
      <span class="container-data__text__name title">
        {{ props.pokemonDetails.name }}
      </span>
      <span class="container-data__text__id title">{{ formattedID() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";
import { useUserData } from "@/stores/userData.ts";
import type { PokemonDetails } from "~/types/chosenData";
import PokeBall from "../assets/images/Poke_Ball.webp";

// Call for UserData Pinia store
const userData = useUserData();
const { isPokemonInFavourites, toggleFavourite } = userData;

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
  textH1: boolean;
  textH5: boolean;
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
  &:hover {
    cursor: pointer;
  }
}

.container-data {
  @extend .flexbox-column-center;
  height: 90%;
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
