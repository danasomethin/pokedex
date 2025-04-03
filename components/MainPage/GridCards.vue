<template>
  <div class="container" @click="dialogOpened = true">
    <h5>{{ props.name }}</h5>

    <v-dialog v-model="dialogOpened" class="dialog">
      <MainPageGridCardInfo :name="props.name" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type Ref, ref } from "vue";

interface Props {
  name: string;
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
