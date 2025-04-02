<template>
  <span class="title">Pokédex</span>
  <h5 class="bold subtitle">Search for a Pokémon by name or id number</h5>
  <v-autocomplete
    label="Name or id number"
    :items="items"
    density="compact"
    menu-icon=""
    bg-color="var(--card-background-color)"
    variant="solo"
    hide-details
    flat
    single-line
    class="searchbar"
  >
    <template v-slot:append-inner>
      <v-avatar>
        <img class="searchbar__svg" :src="Logo" />
      </v-avatar>
    </template>
  </v-autocomplete>

  <v-row no-gutters>
    <v-col
      v-for="(value, i) in items"
      :key="i"
      class="card-desktop"
      cols="12"
      xxl="2"
      xl="2"
      lg="4"
      md="6"
      sm="6"
    >
      {{ i }}
      <MainPageGridCards :name="value" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import Logo from "../assets/icons/magnifying-glass-solid.svg";

// TODO: call API to get this
const items: string[] = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];
</script>

<style scoped lang="scss">
.subtitle {
  margin-bottom: 24px;
}

.searchbar {
  max-width: 30%;
  min-width: 400px;

  &__svg {
    width: 50%;
    height: 50%;
  }
}

.card-desktop {
  padding: 12px 13.5px !important;
  width: 100%;
}

@media (max-width: 600px) {
  .searchbar {
    min-width: 100%;
  }
}

.searchbar :deep(.v-label.v-field-label) {
  font-family: "Lato", "Arial";
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  color: var(--subText-color);
}
</style>
