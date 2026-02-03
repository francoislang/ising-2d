<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue';

  const props = defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: number];
  }>();

  const min = computed(() => props.min ?? 0);
  const max = computed(() => props.max ?? 100);
  const step = computed(() => props.step ?? 1);

  const isDragging = ref(false);
  const sliderContainer = ref<HTMLElement | null>(null);

  const percentage = computed(() => {
    return ((props.modelValue - min.value) / (max.value - min.value)) * 100;
  });

  const updateSlider = (event: MouseEvent) => {
    if (!sliderContainer.value) return;

    const rect = sliderContainer.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;

    let percent = (x / width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    let value = min.value + (percent / 100) * (max.value - min.value);

    value = Math.round(value / step.value) * step.value;
    value = Math.max(min.value, Math.min(max.value, value));

    emit('update:modelValue', value);
  };

  const handleMouseDown = (event: MouseEvent) => {
    isDragging.value = true;
    updateSlider(event);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.value) {
      updateSlider(event);
    }
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  });
</script>

<template>
  <div class="w-full max-w-sm">
    <label class="text-gray-700">
      {{ label }}
    </label>
    <div
      ref="sliderContainer"
      class="relative w-full h-8 flex items-center cursor-pointer select-none touch-none"
      @mousedown.prevent="handleMouseDown"
    >
      <div class="w-full h-2 bg-purple-100 rounded-full" />
      <div
        class="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-purple-400 rounded-l-full"
        :style="{ width: percentage + '%' }"
      />

      <div
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
        :style="{ left: percentage + '%' }"
      >
        <div class="bg-gray-900 w-1 h-full rounded-full" />
      </div>
    </div>
  </div>
</template>
