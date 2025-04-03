<template>
  <div class="container" @click="dialogOpened = true">
    <h5>{{ props.pokemonDetails.name }}</h5>

    <v-dialog v-model="dialogOpened" class="dialog">
      <MainPageGridCardInfo :name="props.pokemonDetails.name" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";

interface Props {
  pokemonDetails: PokemonDetails;
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

const props = defineProps<Props>();

const dialogOpened: Ref<boolean> = ref(false);
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 12px;
  background-color: var(--card-background-color);
  border-radius: 8px;
}
.container:hover {
  cursor: pointer;
}

.dialog:deep(.v-overlay__content) {
  display: flex;
  align-items: center;
}
</style>
