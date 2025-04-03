<template>
  <div class="container">
    <h5>{{ props.name }}</h5>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.container {
  width: 80% !important;
  background-color: var(--card-background-color) !important;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>
