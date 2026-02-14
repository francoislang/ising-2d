<script setup lang="ts">
  import uPlot, { type AlignedData } from 'uPlot';
  import 'uplot/dist/uPlot.min.css';

  const props = defineProps<{
    xAxis: number[];
    yAxis: number[];
    label: string;
    curveColor: string;
    width: number;
    height: number;
  }>();

  const data = ref<AlignedData>([props.xAxis, props.yAxis]);

  const containerRef = ref<HTMLElement | null>(null);

  const options = {
    width: props.width,
    height: props.height,
    series: [{}, { label: props.label, stroke: props.curveColor }],
  };

  let chart: uPlot;

  watch(
    () => [props.xAxis, props.yAxis],
    () => {
      data.value = [props.xAxis, props.yAxis];
      chart.setData(data.value);
    },
    { deep: true },
  );

  onMounted(() => {
    if (containerRef.value) {
      chart = new uPlot(options, data.value, containerRef.value);
    }
  });

  onUnmounted(() => {
    chart.destroy();
  });
</script>

<template>
  <div ref="containerRef"></div>
</template>
