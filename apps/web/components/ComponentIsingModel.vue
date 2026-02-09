<script setup lang="ts">
  import ComponentLatticeView from '~/components/ComponentLatticeView.vue';
  import CommonCard from '~/components/common/CommonCard.vue';
  import CommonGraphPanel from '~/components/common/CommonGraphPanel.vue';

  const time = ref(0);
  const arrayTime = ref<number[]>([]);
  const arrayEnergy = ref<number[]>([]);
  const arrayAimantation = ref<number[]>([]);

  let intervalId: ReturnType<typeof setInterval> | null = null;

  const calcul = (t: number) => {
    const energy = t * t + t + 1;

    const aimantation = 4 * t * t * t + 3 * t * t + 2 * t + 1;

    arrayTime.value.push(t);
    arrayEnergy.value.push(energy);
    arrayAimantation.value.push(aimantation);
  };

  onMounted(() => {
    intervalId = setInterval(() => {
      time.value++;
    }, 1000);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  watch(time, (newTime) => calcul(newTime), { immediate: true });
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
    <div class="flex flex-col gap-8 p-4 justify-center items-center">
      <div class="flex w-full justify-around items-center">
        <CommonCard title="Énergie du système">
          <template #content>
            <CommonGraphPanel
              :x-axis="arrayTime"
              :y-axis="arrayEnergy"
              label="Énergie du système"
              curve-color="#0891b2"
              :width="400"
              :height="400"
            />
          </template>
        </CommonCard>

        <CommonCard title="Aimantation">
          <template #content>
            <CommonGraphPanel
              :x-axis="arrayTime"
              :y-axis="arrayAimantation"
              label="Aimantation"
              curve-color="#0891b2"
              :width="400"
              :height="400"
            />
          </template>
        </CommonCard>
      </div>
      <CommonCard title="Grille de spins" subtitle="Bleu spin +1 | cyan spin -1" class="w-96">
        <template #content>
          <ComponentLatticeView :pixelSize="4" />
        </template>
      </CommonCard>
    </div>
  </div>
</template>
