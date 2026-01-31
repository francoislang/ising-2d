<script setup lang="ts">
const message: string = 'TailwindCSS is working!';
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Nuxt 3!</h1>
    <p class="text-lg text-green-400">{{ message }}</p>
    <NuxtPage />
  </div>
</template>
