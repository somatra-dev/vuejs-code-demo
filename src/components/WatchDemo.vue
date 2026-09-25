<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const query = ref('')
const searchStatus = ref('Idle')
const logs = ref<string[]>([])

function addLog(msg: string) {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${msg}`)
  if (logs.value.length > 5) logs.value.pop()
}

// 1. Explicit watch (lazy by default, provides old & new values)
watch(count, (newVal, oldVal) => {
  addLog(`[watch] count changed: ${oldVal} ➔ ${newVal}`)
})

// 2. watch with async cleanup (simulated fetch with abort)
watch(query, (newQuery, _old, onCleanup) => {
  if (!newQuery.trim()) {
    searchStatus.value = 'Idle'
    return
  }

  let isCancelled = false
  searchStatus.value = `Searching for "${newQuery}"...`

  onCleanup(() => {
    isCancelled = true
    addLog(`[cleanup] Cancelled previous search for "${newQuery}"`)
  })

  setTimeout(() => {
    if (!isCancelled) {
      searchStatus.value = `Results ready for "${newQuery}"`
      addLog(`[api] Completed query for "${newQuery}"`)
    }
  }, 1000)
})

// 3. Automatic watchEffect (eager, automatically tracks dependencies)
watchEffect(() => {
  // Accessing count.value registers it as a dependency automatically
  if (count.value === 10) {
    addLog('[watchEffect] Target reached: count is 10!')
  }
})

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
  query.value = ''
  searchStatus.value = 'Idle'
  logs.value = []
}
</script>

<template>
  <div class="max-w-md mx-auto flex flex-col gap-6">
    <!-- Header -->
    <div class="text-center space-y-1">
      <h2 class="text-2xl font-bold text-white tracking-tight">watch & watchEffect Demo</h2>
      <p class="text-xs text-slate-400">Explicit vs automatic reactive side-effects</p>
    </div>

    <!-- Explicit Watch Section -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Explicit Watch Source</span>
        <code class="font-mono text-emerald-400">watch(count, (newVal, oldVal))</code>
      </div>

      <div class="text-center py-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <span class="text-xs text-slate-400 uppercase tracking-wider block">Watched Value</span>
        <span class="text-5xl font-black text-emerald-400 font-mono mt-1">{{ count }}</span>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          @click="decrement"
        >
          -1
        </button>
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition cursor-pointer"
          @click="increment"
        >
          +1
        </button>
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Async Watcher with onCleanup -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span class="font-semibold text-white">Async Watcher + onCleanup</span>
        <code class="font-mono text-xs text-emerald-400">Abortable</code>
      </div>

      <div class="space-y-2">
        <input
          v-model="query"
          type="text"
          placeholder="Type rapidly to test cancellation..."
          class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <div class="text-xs flex items-center justify-between text-slate-400 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
          <span>Status:</span>
          <span class="font-mono text-emerald-400 font-medium">{{ searchStatus }}</span>
        </div>
      </div>
    </div>

    <!-- Live Event Log -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span class="font-semibold text-slate-300">Side Effect Log</span>
        <span class="text-slate-500 font-mono">Last 5 events</span>
      </div>

      <div v-if="logs.length > 0" class="space-y-1.5">
        <div
          v-for="(log, idx) in logs"
          :key="idx"
          class="font-mono text-xs text-slate-300 bg-slate-950/60 border-l-2 border-emerald-400 px-3 py-1.5 rounded-r"
        >
          {{ log }}
        </div>
      </div>
      <p v-else class="text-xs text-slate-500 italic py-1">
        Change the count or type in the input above to trigger effects.
      </p>
    </div>
  </div>
</template>
