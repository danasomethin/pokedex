<template>
  <div class="container">
    <span class="button" @click="props.retrieveNewPokemonList">
      <h5>Load more</h5>
    </span>
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
