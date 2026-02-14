<script setup lang="ts">
  import { useIsingStore } from '~/stores/ising.store';

  const props = defineProps<{
    pixelSize: number;
  }>();

  const isingStore = useIsingStore();

  const canvasRef = ref<HTMLCanvasElement | null>(null);

  watch(
    () => isingStore.network_length,
    () => {
      nextTick(() => drawGrid());
    },
    { immediate: true },
  );

  const drawGrid = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < isingStore.network_length; i++) {
      for (let j = 0; j < isingStore.network_length; j++) {
        // Primary (Blue) for Spin Up, Secondary (Red) for Spin Down
        ctx.fillStyle = (i + j) % 2 === 0 ? '#2563eb' : '#dc2626';

        ctx.fillRect(i * props.pixelSize, j * props.pixelSize, props.pixelSize, props.pixelSize);
      }
    }
  };
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="props.pixelSize * isingStore.network_length"
    :height="props.pixelSize * isingStore.network_length"
  />
</template>
