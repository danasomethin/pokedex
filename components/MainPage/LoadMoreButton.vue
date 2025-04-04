<template>
  <div class="container" @click="props.retrieveNewPokemonList">
    <h5>Load more</h5>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  retrieveNewPokemonList: () => void;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  background-color: var(--button-primary-color);
  border-radius: 8px;
  padding: 12px;

  h5 {
    text-align: center;
  }

  :hover {
    background-color: var(--button-primary-hover-color);
    cursor: pointer;
  }
}
</style>
