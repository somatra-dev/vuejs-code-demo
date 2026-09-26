<script setup lang="ts">
import ComposablePostCrud from '../components/ComposablePostCrud.vue'
</script>

<template>
  <div class="space-y-8">
    <!-- Hero / Introduction -->
    <div class="text-center max-w-2xl mx-auto space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <span>● Composable Pattern</span>
        <span class="text-slate-500">|</span>
        <span>usePosts() & useFetch()</span>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Composable Data Fetching
      </h1>
      <p class="text-sm text-slate-400 leading-relaxed">
        Demonstrates modern Vue 3 clean architecture: isolating asynchronous HTTP operations and reactive state
        inside <code class="text-indigo-400">usePosts()</code> and <code class="text-indigo-400">useFetch()</code> composables,
        keeping UI components lean, declarative, and 100% testable.
      </p>
    </div>

    <!-- Interactive CRUD Component -->
    <ComposablePostCrud />
  </div>
</template>
