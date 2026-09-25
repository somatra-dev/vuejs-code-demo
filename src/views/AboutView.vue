<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, doubleCount, isEven, history, increment, reset } = useCounter()
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">About Page</h1>
      <p class="text-sm text-slate-400 mt-2">
        This page consumes the <strong>same</strong> composable singleton instance. Notice the state
        persists as you navigate back and forth.
      </p>
    </div>

    <!-- Live Shared State Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">

      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <span class="text-xs text-slate-400 font-medium uppercase">Count</span>
          <span class="block text-2xl font-bold font-mono text-white mt-1">{{ count }}</span>
        </div>
        <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
          <span class="text-xs text-slate-400 font-medium uppercase">Double</span>
          <span class="block text-2xl font-bold font-mono text-emerald-400 mt-1">{{
            doubleCount
          }}</span>
        </div>
        <div
          class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col justify-center items-center"
        >
          <span class="text-xs text-slate-400 font-medium uppercase mb-1">Parity</span>
          <span
            class="px-2 py-0.5 rounded text-xs font-bold font-mono"
            :class="isEven ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'"
          >
            {{ isEven ? 'EVEN' : 'ODD' }}
          </span>
        </div>
      </div>

      <!-- Mutate from About page -->
      <div class="flex gap-3 pt-2">
        <button
          type="button"
          class="flex-1 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
          @click="increment"
        >
          +1 Increment from About Page
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer active:scale-95"
          @click="reset"
        >
          Reset
        </button>
      </div>

      <!-- Recent Log -->
      <div v-if="history.length > 0" class="border-t border-slate-800 pt-3">
        <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
          Shared Action History
        </span>
        <div class="space-y-1">
          <div
            v-for="(item, idx) in history.slice(0, 3)"
            :key="idx"
            class="text-xs font-mono text-slate-300 bg-slate-800/40 px-3 py-1.5 rounded border-l-2 border-emerald-400"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
