<script setup lang="ts">
  const props = defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="flex flex-col gap-2 p-4 bg-card rounded-lg">
    <span class="text-xl font-bold text-primary">
      {{ props.title }}
    </span>

    <div>
      <slot name="content" />
    </div>
  </div>
</template>
