<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: number;
      min?: number;
      max?: number;
      step?: number;
      label?: string;
      size?: 'xs' | 'sm' | 'md' | 'lg';
      criticalValue?: string;
    }>(),
    {
      size: 'sm',
    },
  );

  const isDragging = ref(false);
  const sliderContainer = ref<HTMLElement | null>(null);

  const min = computed(() => props.min ?? 0);
  const max = computed(() => props.max ?? 100);
  const step = computed(() => props.step ?? 1);

  const percentage = computed(() => {
    return ((props.modelValue - min.value) / (max.value - min.value)) * 100;
  });

  const sizeConfig = computed(() => {
    switch (props.size) {
      case 'xs':
        return {
          text: 'text-xs',
          track: 'h-1',
          handle: 'w-0.5 h-4',
          valueOffset: '-top-2',
          container: 'h-6',
        };
      case 'sm':
        return {
          text: 'text-sm',
          track: 'h-1.5',
          handle: 'w-0.5 h-5',
          valueOffset: '-top-3',
          container: 'h-7',
        };
      case 'md':
        return {
          text: 'text-base',
          track: 'h-2',
          handle: 'w-1 h-6',
          valueOffset: '-top-4',
          container: 'h-8',
        };
      case 'lg':
        return {
          text: 'text-lg',
          track: 'h-3',
          handle: 'w-1 h-8',
          valueOffset: '-top-5',
          container: 'h-10',
        };
      default:
        return {
          text: 'text-base',
          track: 'h-2',
          handle: 'w-1 h-6',
          valueOffset: '-top-6',
          container: 'h-8',
        };
    }
  });

  const emit = defineEmits<{
    'update:modelValue': [value: number];
  }>();

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

    // Corriger les erreurs de précision flottante
    const decimals = (step.value.toString().split('.')[1] || '').length;
    value = Number(value.toFixed(decimals));

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
  <div class="w-full flex flex-col gap-1">
    <label v-if="props.label" class="text-secondary text-xs pb-1">
      {{ props.label }}
    </label>
    <div
      ref="sliderContainer"
      class="relative w-full flex items-center cursor-pointer select-none touch-none"
      :class="sizeConfig.container"
      @mousedown.prevent="handleMouseDown"
    >
      <div class="w-full bg-primary/10 rounded-full" :class="sizeConfig.track" />
      <div
        class="absolute top-1/2 -translate-y-1/2 left-0 bg-primary rounded-l-full"
        :class="sizeConfig.track"
        :style="{ width: percentage + '%' }"
      />

      <!-- Curseur -->
      <div
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground rounded-sm"
        :class="sizeConfig.handle"
        :style="{ left: percentage + '%' }"
      />
    </div>
    <div class="flex justify-between text-xs items-center text-secondary mt-1">
      <span>{{ props.min }}</span>
      <span class="px-4 py-2 bg-background rounded-full">
        {{ props.modelValue }}
      </span>
      <span>{{ props.max }}</span>
    </div>
    <div v-if="props.criticalValue">{{ props.criticalValue }}</div>
  </div>
</template>
