<script setup lang="ts">
  import { useIsingStore } from '~/stores/ising.store';

  const props = defineProps<{
    pixelSize: number;
  }>();

  const isingStore = useIsingStore();

  const canvasRef = ref<HTMLCanvasElement | null>(null);
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="props.pixelSize * isingStore.network_length"
    :height="props.pixelSize * isingStore.network_length"
  />
</template>
