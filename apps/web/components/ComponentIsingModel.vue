<script setup lang="ts">
  import ComponentLatticeView from '~/components/ComponentLatticeView.vue';
</script>

<template>
  <div class="flex flex-col h-screen w-full">
    <div class="sticky top-0 flex border-b-2 border-foreground/10 bg-card p-4">
      <div class="flex flex-col">
        <h1 class="text-foreground font-bold text-xl">Visualisation en temps réel</h1>
        <span class="text-foreground text-xs italic">
          Simulation Monte Carlo du modèle Ising 2D
        </span>
      </div>
      <div>
        <span></span>
      </div>
    </div>
    <ComponentLatticeView :pixelSize="4" />
  </div>
</template>
