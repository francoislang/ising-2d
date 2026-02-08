<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import CommonInputRange from '~/components/common/CommonInputRange.vue';
  import CommonButton from '~/components/common/CommonButton.vue';
  import { Atom, Play, Pause, RotateCcw, StepForward } from 'lucide-vue-next';

  const isingStore = useIsingStore();
  const {
    network_length,
    temperature,
    external_field,
    exchange_interaction,
    speed,
    seed,
    initMode,
  } = storeToRefs(isingStore);
</script>

<template>
  <div class="flex flex-col h-screen w-72 px-4 bg-card">
    <div class="flex border-b-2 gap-2 items-center border-primary p-4">
      <div class="p-4 bg-background rounded-xl">
        <Atom class="h-6 w-6 text-primary" />
      </div>
      <div class="flex flex-col gap-1">
        <h1 class="text-primary">Ising 2D model</h1>
        <span class="text-secondary text-xs italic">Monte Carlo simulation</span>
      </div>
    </div>
    <div class="flex flex-col py-2">
      <CommonInputRange
        v-model="network_length"
        label="Taille de la grille"
        :min="8"
        :max="256"
        :step="8"
        size="sm"
      />

      <CommonInputRange
        v-model="temperature"
        label="Température"
        :min="0"
        :max="300"
        :step="8"
        size="sm"
      />

      <CommonInputRange
        v-model="external_field"
        label="Champ magnétique externe"
        :min="0"
        :max="100"
        :step="8"
        size="sm"
      />

      <CommonInputRange
        v-model="exchange_interaction"
        label="Constante de couplage"
        :min="1"
        :max="2"
        :step="0.01"
        size="sm"
      />

      <CommonInputRange
        v-model="speed"
        label="Vitesse de simulation"
        :min="0"
        :max="100"
        :step="1"
        size="sm"
      />

      <CommonInputRange v-model="seed" label="Seed" :min="0" :max="10000" :step="1" size="sm" />
    </div>

    <CommonToggleSwitch
      v-model="initMode"
      :left-option="{ value: 'random', label: 'Random' }"
      :right-option="{ value: 'all-up', label: 'All up' }"
      label="Initialisation"
      class="py-2"
    />

    <div class="flex flex-col gap-2">
      <CommonButton label="Start" variant="gradient" :on-click="() => isingStore.start(true)">
        <template #icon>
          <Play class="w-4 h-4 text-background fill-current" />
        </template>
      </CommonButton>

      <CommonButton label="Stop" variant="secondary" :on-click="() => isingStore.stop(true)">
        <template #icon>
          <Pause class="w-4 h-4 text-background fill-current" />
        </template>
      </CommonButton>

      <div class="flex justify-around gap-2">
        <CommonButton
          label="Step"
          variant="ghost"
          class="w-full"
          :on-click="() => isingStore.step(1)"
        >
          <template #icon>
            <StepForward class="w-4 h-4 text-foreground" />
          </template>
        </CommonButton>
        <CommonButton
          label="Reset"
          variant="ghost"
          class="w-full"
          :on-click="() => isingStore.reset()"
        >
          <template #icon>
            <RotateCcw class="w-4 h-4 text-foreground" />
          </template>
        </CommonButton>
      </div>
    </div>
  </div>
</template>
