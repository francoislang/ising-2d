<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: number;
      min?: number;
      max?: number;
      step?: number;
      label?: string;
      place?: string;
      size?: string;
    }>(),
    {
      place: 'top',
      size: 'xs',
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

  const placeTitleClass = computed(() => {
    switch (props.place) {
      case 'top':
        return 'flex flex-col';
      case 'bottom':
        return 'flex flex-col-reverse';
      case 'left':
        return 'flex flex-row';
      case 'right':
        return 'flex flex-row-reverse';
    }
  });

  const sizeConfig = computed(() => {
    switch (props.size) {
      case 'xs':
        return {
          text: 'text-xs',
          track: 'h-1',
          handle: 'w-3 h-3',
          valueOffset: '-top-4',
          container: 'h-6',
          minWidth: 'min-w-16',
        };
      case 'sm':
        return {
          text: 'text-sm',
          track: 'h-1.5',
          handle: 'w-4 h-4',
          valueOffset: '-top-5',
          container: 'h-7',
          minWidth: 'min-w-24',
        };
      case 'md':
        return {
          text: 'text-base',
          track: 'h-2',
          handle: 'w-5 h-5',
          valueOffset: '-top-6',
          container: 'h-8',
          minWidth: 'min-w-32',
        };
      case 'lg':
        return {
          text: 'text-lg',
          track: 'h-3',
          handle: 'w-6 h-6',
          valueOffset: '-top-7',
          container: 'h-10',
          minWidth: 'min-w-40',
        };
      default:
        return {
          text: 'text-base',
          track: 'h-2',
          handle: 'w-5 h-5',
          valueOffset: '-top-6',
          container: 'h-8',
          minWidth: 'min-w-32',
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
  <div class="w-full flex gap-4 items-center justify-between" :class="[placeTitleClass]">
    <label
      v-if="label"
      class="text-gray-700 block shrink-0 whitespace-nowrap"
      :class="sizeConfig.text"
    >
      {{ label }}
    </label>
    <div
      ref="sliderContainer"
      class="relative flex-1 flex items-center cursor-pointer select-none touch-none"
      :class="[sizeConfig.container, sizeConfig.minWidth]"
      @mousedown.prevent="handleMouseDown"
    >
      <div class="w-full bg-purple-100 rounded-full" :class="sizeConfig.track" />
      <div
        class="absolute top-1/2 -translate-y-1/2 left-0 bg-purple-400 rounded-l-full"
        :class="sizeConfig.track"
        :style="{ width: percentage + '%' }"
      />

      <!-- Valeur affichée au-dessus du curseur -->
      <div
        class="absolute -translate-x-1/2 text-gray-700 font-medium"
        :class="[sizeConfig.text, sizeConfig.valueOffset]"
        :style="{ left: percentage + '%' }"
      >
        {{ modelValue }}
      </div>

      <!-- Curseur -->
      <div
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full"
        :class="sizeConfig.handle"
        :style="{ left: percentage + '%' }"
      />
    </div>
  </div>
</template>
