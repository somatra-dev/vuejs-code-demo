<script setup lang="ts">
import ManualPostCrud from '../components/ManualPostCrud.vue'
</script>

<template>
  <div class="space-y-8">
    <!-- Hero / Introduction -->
    <div class="text-center max-w-2xl mx-auto space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span>● Direct Fetch API</span>
        <span class="text-slate-500">|</span>
        <span>JSONPlaceholder CRUD</span>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Manual Data Fetching
      </h1>
      <p class="text-sm text-slate-400 leading-relaxed">
        Demonstrates raw component-level HTTP operations with native <code class="text-emerald-400">window.fetch()</code>,
        handling <code class="text-emerald-400">response.ok</code>, AbortController request cancellation, and local reactive state sync.
      </p>
    </div>

    <!-- Interactive CRUD Component -->
    <ManualPostCrud />
  </div>
</template>
