<template>
  <div class="container" @click="dialogOpened = true">
    <div class="container__icon-heart">
      <IconsHeartSolid color="var(--heart-filled-color)" size="24px" />
    </div>

    <div class="container-data">
      <img :src="props.pokemonDetails.spriteUrl" />
      <h5 class="container-data__name bold">{{ props.pokemonDetails.name }}</h5>
      <h5 class="container-data__id bold">{{ formattedID() }}</h5>
    </div>

    <!-- Dialog to open up pokemon info -->
    <v-dialog v-model="dialogOpened" class="dialog">
      <MainPageGridCardInfo :name="props.pokemonDetails.name" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
}

const props = defineProps<Props>();

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

const dialogOpened: Ref<boolean> = ref(false);

const formattedID = function (): string {
  let s = `000${props.id}`;
  return s.substr(s.length - 4);
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 12px 12px 24px 12px;
  background-color: var(--card-background-color);
  border-radius: 8px;

  &__icon-heart {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  &:hover {
    cursor: pointer;
  }
}

.container-data {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50%;
  }

  &__name {
    text-transform: capitalize;
  }

  &__id {
    color: var(--subText-color);
  }
}

.dialog:deep(.v-overlay__content) {
  display: flex;
  align-items: center;
}
</style>
