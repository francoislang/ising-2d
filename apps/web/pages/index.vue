<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import InputRange from '~/components/common/input-range.vue';

  const isingStore = useIsingStore();
  const { network_length } = storeToRefs(isingStore);
</script>

<template>
  <div>
    <div>
      <InputRange v-model="network_length" :min="8" :max="256" :step="8" label="Taille réseau" />
    </div>
  </div>
</template>
