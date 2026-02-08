<script setup lang="ts">
  import ComponentLatticeView from '~/components/ComponentLatticeView.vue';
</script>

<template>
  <div class="flex flex-col h-screen w-full">
    <div
      class="sticky top-0 flex border-b-2 border-foreground/10 bg-card p-4 justify-between items-center text-foreground"
    >
      <div class="flex flex-col">
        <h1 class="font-bold text-xl">Visualisation en temps réel</h1>
        <span class="text-xs italic">Simulation Monte Carlo du modèle Ising 2D</span>
      </div>
      <div
        class="flex items-center gap-2 border-2 border-green-300/10 bg-green-300 px-4 py-1 rounded-md"
      >
        <span class="w-2 h-2 bg-green-600 rounded-full"></span>
        <span class="text-xs">En attente</span>
      </div>
    </div>
    <div class="p-4 justify-center items-center flex gap-4">
      <CommonCard title="Grille de spins" subtitle="Bleu spin +1 | cyan spin -1" class="w-96">
        <template #content>
          <ComponentLatticeView :pixelSize="4" />
        </template>
      </CommonCard>
    </div>
  </div>
</template>
