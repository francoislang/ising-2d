<script setup lang="ts">
  const props = defineProps<{
    title?: string;
    subtitle?: string;
  }>();
</script>

<template>
  <div class="flex flex-col gap-2 p-4 bg-card rounded-lg">
    <span class="text-xl font-bold text-foreground">
      {{ props.title }}
    </span>
    <span class="text-xs text-foreground italic">
      {{ props.subtitle }}
    </span>
    <slot name="content" />
  </div>
</template>
