<script lang="ts" setup>
  const isingStore = useIsingStore();
</script>

<template>
  <div>
    <div>
      <label for="">Taille du réseau (L): {{isingStore.network_length*isingStore.network_length}}</label>
      <input type="range" min="64" max="128">
    </div>
  </div>
</template>
