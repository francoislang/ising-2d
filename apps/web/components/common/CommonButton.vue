<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient';
      size?: 'xs' | 'sm' | 'md' | 'lg';
      disabled?: boolean;
      label?: string;
      onClick: () => void;
    }>(),
    {
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
  );

  const variantClasses = {
    primary: 'bg-primary text-background hover:bg-primary/80',
    secondary: 'bg-secondary text-background hover:bg-secondary/80',
    ghost: 'bg-background text-foreground hover:bg-foreground/10 border-2 border-foreground/10',
    danger: 'bg-red-500 text-background hover:bg-red-600',
    gradient: 'bg-gradient-to-r from-primary to-tertiary text-background hover:opacity-90',
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs gap-0.5',
    sm: 'px-2 py-1 text-sm gap-1',
    md: 'px-3 py-1.5 text-base gap-1.5',
    lg: 'px-4 py-2 text-lg gap-2',
  };
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses[variant], sizeClasses[size]]"
    :disabled="disabled"
    @click="props.onClick()"
  >
    <slot name="icon" />
    <span>{{ props.label }}</span>
  </button>
</template>
