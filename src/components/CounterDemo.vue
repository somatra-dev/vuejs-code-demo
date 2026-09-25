<script setup lang="ts">
import { ref } from 'vue'
import { useCounter } from '../composables/useCounter'

const { count, doubleCount, isEven, history, increment, decrement, reset, incrementAsync } =
  useCounter()

const isLoading = ref(false)

async function handleAsyncIncrement() {
  isLoading.value = true
  try {
    await incrementAsync(5)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto my-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
    <!-- Header Badge -->
    <div class="flex items-center justify-between mb-4">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Composable State
      </span>
      <span class="text-xs text-slate-400 font-mono">0 KB External Overhead</span>
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-bold text-white tracking-tight">Counter Showcase</h2>
    <p class="text-sm text-slate-400 mt-1">
      Powered by Vue 3 Composition API module-scoped <code class="text-emerald-400 font-mono">ref()</code>
    </p>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-3 gap-3 my-6">
      <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
        <span class="block text-xs uppercase tracking-wider text-slate-400 font-medium">Count</span>
        <span class="block text-3xl font-extrabold text-white mt-1 font-mono">{{ count }}</span>
      </div>

      <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
        <span class="block text-xs uppercase tracking-wider text-slate-400 font-medium">Double</span>
        <span class="block text-3xl font-extrabold text-emerald-400 mt-1 font-mono">{{ doubleCount }}</span>
      </div>

      <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center flex flex-col justify-center items-center">
        <span class="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Parity</span>
        <span
          class="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold font-mono tracking-wider"
          :class="isEven ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'"
        >
          {{ isEven ? 'EVEN' : 'ODD' }}
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
      <button
        type="button"
        class="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95 transition-all cursor-pointer"
        @click="decrement"
      >
        -1 Decrement
      </button>

      <button
        type="button"
        class="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
        @click="increment"
      >
        +1 Increment
      </button>

      <button
        type="button"
        :disabled="isLoading"
        class="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        @click="handleAsyncIncrement"
      >
        {{ isLoading ? 'Waiting...' : '+5 Async' }}
      </button>

      <button
        type="button"
        class="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 active:scale-95 transition-all cursor-pointer"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <!-- History Log -->
    <div class="border-t border-slate-800/80 pt-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xs uppercase tracking-wider text-slate-400 font-semibold">Activity Log</h3>
        <span class="text-xs text-slate-400 font-mono">Last 5 actions</span>
      </div>

      <div v-if="history.length > 0" class="space-y-1.5">
        <div
          v-for="(entry, index) in history"
          :key="index"
          class="font-mono text-xs text-slate-300 bg-slate-800/50 border-l-2 border-emerald-400 px-3 py-2 rounded-r-md"
        >
          {{ entry }}
        </div>
      </div>
      <p v-else class="text-xs text-slate-400 italic py-2">
        No actions recorded yet. Click any button above!
      </p>
    </div>
  </div>
</template>
