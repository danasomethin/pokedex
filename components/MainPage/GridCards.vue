<template>
  <div class="container" @click="dialogOpened = true">
    <MainPageSubComponentsPokemonOverview
      :id="props.id"
      :pokemonDetails="props.pokemonDetails"
      :smallText="true"
    />
    <!-- Dialog to open up pokemon info -->
    <v-dialog v-model="dialogOpened" class="dialog">
      <MainPageGridCardInfo
        :id="props.id"
        :pokemonDetails="props.pokemonDetails"
        @closeDialog="dialogOpened = false"
      />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";
import type { PokemonDetails } from "~/types/chosenData";

interface Props {
  id: string;
  pokemonDetails: PokemonDetails;
}

const props = defineProps<Props>();

const dialogOpened: Ref<boolean> = ref(false);
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 12px 5% 24px 5%;
  background-color: var(--card-background-color);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
}

.dialog:deep(.v-overlay__content) {
  display: flex;
  align-items: center;
}
</style>
