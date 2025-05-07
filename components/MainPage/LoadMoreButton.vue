<template>
  <div class="container">
    <span
      v-if="props.isLoading === false"
      class="button"
      @click="props.retrieveNewPokemonList"
    >
      <h5 class="bold">Load more</h5>
    </span>

    <span v-else class="button">
      <h5>Loading...</h5>
      <v-progress-circular indeterminate class="button__loader" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  retrieveNewPokemonList: () => void;
  isLoading: boolean;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.container {
  @extend .center;
  width: 100%;
}

.button {
  @extend .center;

  width: 100%;
  height: 56px;
  background-color: var(--button-primary-color);
  border-radius: 8px;
  padding: 12px;

  &__loader {
    margin-left: 4px;
  }

  &:hover {
    background-color: var(--button-primary-hover-color);
    cursor: pointer;
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
