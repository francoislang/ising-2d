<script setup lang="ts">
  const props = defineProps<{
    modelValue: string;
    leftOption: { value: string; label: string };
    rightOption: { value: string; label: string };
    label?: string;
  }>();

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const isRight = computed(() => props.modelValue === props.rightOption.value);

  const toggle = () => {
    const newValue = isRight.value ? props.leftOption.value : props.rightOption.value;
    emit('update:modelValue', newValue);
  };
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-secondary text-xs">
      {{ label }}
    </label>
    <div class="flex items-center gap-2">
      <span
        class="text-sm cursor-pointer transition-colors"
        :class="!isRight ? 'text-primary font-medium' : 'text-foreground/50'"
        @click="emit('update:modelValue', leftOption.value)"
      >
        {{ leftOption.label }}
      </span>

      <button
        type="button"
        class="relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        :class="isRight ? 'bg-primary' : 'bg-foreground/20'"
        @click="toggle"
      >
        <span
          class="absolute top-1 left-1 w-4 h-4 bg-background rounded-full shadow transition-transform duration-200 ease-in-out"
          :class="isRight ? 'translate-x-6' : 'translate-x-0'"
        />
      </button>

      <span
        class="text-sm cursor-pointer transition-colors"
        :class="isRight ? 'text-primary font-medium' : 'text-foreground/50'"
        @click="emit('update:modelValue', rightOption.value)"
      >
        {{ rightOption.label }}
      </span>
    </div>
  </div>
</template>
