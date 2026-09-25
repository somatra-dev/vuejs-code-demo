<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'

interface AppState {
  count: number
  user: {
    name: string
    role: string
  }
  tags: string[]
}

// Deeply reactive state via ES6 Proxy
const state = reactive<AppState>({
  count: 0,
  user: {
    name: 'Chey Somatra',
    role: 'Frontend Dev',
  },
  tags: ['Vue 3', 'Reactivity'],
})

// Safe destructuring using toRefs
const { count: countRef } = toRefs(state)

// Normal variable demonstrating broken destructuring
let brokenCount = state.count
const lastBrokenRead = ref<number>(brokenCount)

function increment() {
  state.count++ // No .value needed!
}

function decrement() {
  state.count--
}

function reset() {
  state.count = 0
  state.user.role = 'Frontend Dev'
  state.tags = ['Vue 3', 'Reactivity']
}

function switchRole() {
  const roles = ['Frontend Dev', 'Fullstack Dev', 'Tech Lead', 'Staff Engineer']
  const next = roles[(roles.indexOf(state.user.role) + 1) % roles.length]
  state.user.role = next
}

function addTag() {
  const newTags = ['Proxy', 'TypeScript', 'Composition', 'FineGrained']
  const available = newTags.filter((t) => !state.tags.includes(t))
  if (available.length > 0) {
    state.tags.push(available[0])
  }
}

function readBrokenCount() {
  // Reading the destructured primitive variable shows it did not update
  lastBrokenRead.value = brokenCount
}
</script>

<template>
  <div class="max-w-md mx-auto flex flex-col gap-6">
    <!-- Header -->
    <div class="text-center space-y-1">
      <h2 class="text-2xl font-bold text-white tracking-tight">reactive() Demo</h2>
      <p class="text-xs text-slate-400">Deep ES6 Proxy reactivity for objects (no .value needed)</p>
    </div>

    <!-- State Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Reactive Object</span>
        <code class="font-mono text-emerald-400">state.count</code>
      </div>

      <div class="text-center py-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <span class="text-5xl font-black text-emerald-400 font-mono">{{ state.count }}</span>
      </div>

      <!-- Action buttons -->
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

      <!-- Nested Object & Array -->
      <div class="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 text-sm">
        <div class="flex justify-between">
          <span class="text-slate-400">User:</span>
          <span class="text-white font-medium">{{ state.user.name }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Role:</span>
          <span class="text-emerald-400 font-medium">{{ state.user.role }}</span>
        </div>
        <div class="pt-2 border-t border-slate-800/80 space-y-1">
          <span class="text-slate-400 text-xs block">Tags (Array):</span>
          <div class="flex flex-wrap gap-1.5 mt-1">
            <span
              v-for="tag in state.tags"
              :key="tag"
              class="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          @click="switchRole"
        >
          Switch Role
        </button>
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          @click="addTag"
        >
          + Add Tag
        </button>
      </div>
    </div>

    <!-- Destructuring Gotcha Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span class="font-semibold text-amber-400">Destructuring Trap</span>
        <code class="font-mono text-xs text-slate-500">toRefs vs let { count }</code>
      </div>

      <div class="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <div class="flex justify-between">
          <span>Safe (via <code class="text-emerald-400">toRefs</code>):</span>
          <span class="font-mono font-bold text-emerald-400">{{ countRef }} (Live)</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Direct Destructure:</span>
          <span class="font-mono text-rose-400">{{ lastBrokenRead }} (Frozen)</span>
        </div>
      </div>

      <button
        type="button"
        class="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
        @click="readBrokenCount"
      >
        Inspect Direct Destructured Variable
      </button>
    </div>
  </div>
</template>
