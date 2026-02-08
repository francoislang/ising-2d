<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import InputRange from '~/components/common/input-range.vue';
  import { Atom } from 'lucide-vue-next';

  const isingStore = useIsingStore();
  const { network_length, temperature, external_field, exchange_interaction, speed, seed } =
    storeToRefs(isingStore);
</script>

<template>
  <div class="flex flex-col h-screen w-72 p-4 bg-card">
    <div class="flex border-b-2 gap-2 items-center border-primary p-4">
      <Atom class="h-6 w-6 text-primary" />
      <div class="flex flex-col gap-1">
        <h1 class="text-primary">Ising 2D model</h1>
        <span class="text-secondary text-xs italic">Monte Carlo simulation</span>
      </div>
    </div>
    <div class="flex flex-col gap-4 py-2">
      <InputRange
        v-model="network_length"
        label="Taille de la grille"
        :min="8"
        :max="256"
        :step="8"
        size="sm"
      />

      <InputRange
        v-model="temperature"
        label="Température"
        :min="0"
        :max="300"
        :step="8"
        size="sm"
      />

      <InputRange
        v-model="external_field"
        label="Champ magnétique externe"
        :min="0"
        :max="100"
        :step="8"
        size="sm"
      />

      <InputRange
        v-model="exchange_interaction"
        label="Constante de couplage"
        :min="1"
        :max="2"
        :step="0.01"
        size="sm"
      />

      <InputRange
        v-model="speed"
        label="Vitesse de simulation"
        :min="0"
        :max="100"
        :step="1"
        size="sm"
      />

      <InputRange v-model="seed" label="Seed" :min="0" :max="10000" :step="1" size="sm" />
    </div>
  </div>
</template>
