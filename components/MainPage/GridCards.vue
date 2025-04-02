<template>
  <div class="container">
    <h5>{{ props.name }}</h5>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  name: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 12px;
  background-color: var(--card-background-color);
  border-radius: 8px;
}
</style>
