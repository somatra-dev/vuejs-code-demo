<script setup lang="ts">
import CounterDemo from '../components/CounterDemo.vue'
</script>

<template>
  <div class="space-y-6">
    <div class="text-center max-w-xl mx-auto">
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Home Page
      </h1>
      <p class="text-sm text-slate-400 mt-2">
        Mutate Pinia store state and dispatch actions here, then navigate to the <strong>About</strong> page to see shared state in action.
      </p>
    </div>

    <CounterDemo />
  </div>
</template>
