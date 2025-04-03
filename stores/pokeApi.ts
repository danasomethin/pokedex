import { type Ref, ref, type ComputedRef, computed } from "vue";
import { defineStore } from "pinia";

export const usePokeApi = defineStore("pokeApi", () => {
  const count: Ref<number> = ref(0);
  const name: Ref<string> = ref("Eduardo");

  const doubleCount: ComputedRef<number> = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return {
    count,
    name,
    doubleCount,
    increment,
  };
});
