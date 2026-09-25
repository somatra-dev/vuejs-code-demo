<script setup lang="ts">
import { ref } from 'vue'

// 1. Primitive State
const count = ref<number>(0)

// 2. Object State
const user = ref({
  name: 'Chey Somatra',
  role: 'Developer',
  score: 10,
})

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

function updateScore() {
  user.value.score += 5
}

function switchUser() {
  user.value = {
    name: 'Alice Cooper',
    role: 'Architect',
    score: 50,
  }
}
</script>

<template>
  <div class="max-w-md mx-auto flex flex-col gap-6">
    <!-- Header -->
    <div class="text-center space-y-1">
      <h2 class="text-2xl font-bold text-white tracking-tight">ref() Demo</h2>
      <p class="text-xs text-slate-400">Reactive wrapper for primitives and objects</p>
    </div>

    <!-- Primitive Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Primitive Value</span>
        <code class="font-mono text-emerald-400">count.value</code>
      </div>

      <div class="text-center py-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <span class="text-5xl font-black text-emerald-400 font-mono">{{ count }}</span>
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

    <!-- Object Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Object State (Deep)</span>
        <code class="font-mono text-emerald-400">user.value</code>
      </div>

      <div class="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 text-sm">
        <div class="flex justify-between">
          <span class="text-slate-400">Name:</span>
          <span class="text-white font-medium">{{ user.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Role:</span>
          <span class="text-emerald-400 font-medium">{{ user.role }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Score:</span>
          <span class="text-amber-400 font-mono font-bold">{{ user.score }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          @click="updateScore"
        >
          +5 Score
        </button>
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          @click="switchUser"
        >
          Switch User
        </button>
      </div>
    </div>
  </div>
</template>
