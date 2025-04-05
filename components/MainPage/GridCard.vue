<template>
  <div class="container" @click="dialogOpened = true">
    <MainPageSubComponentsPokemonOverview
      :id="props.id"
      :pokemonDetails="props.pokemonDetails"
      :textH1="false"
      :textH5="true"
    />
    <!-- Dialog to open up pokemon info -->
    <v-dialog
      v-model="dialogOpened"
      max-width="1400"
      :persistent="$vuetify.display.width <= 600 ? true : false"
      class="dialog"
    >
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
}

.dialog:deep(.v-overlay__content) {
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
