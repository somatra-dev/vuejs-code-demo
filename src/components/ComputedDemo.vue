<script setup lang="ts">
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

// 1. Data source
const items = ref<CartItem[]>([
  { id: 1, name: 'Mechanical Keyboard', price: 120, qty: 1 },
  { id: 2, name: 'Ergonomic Mouse', price: 60, qty: 2 },
])

// 2. Computed (Cached derivation)
let computedRuns = 0
const total = computed(() => {
  computedRuns++
  return items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const totalItems = computed(() => {
  return items.value.reduce((sum, item) => sum + item.qty, 0)
})

// Unrelated state to show caching behavior
const unrelatedCounter = ref(0)

// 3. Writable Computed
const firstName = ref('Chey')
const lastName = ref('Somatra')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`.trim()
  },
  set(val: string) {
    const parts = val.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts.slice(1).join(' ')
  },
})

function decrementQty(item: CartItem) {
  if (item.qty > 1) {
    item.qty--
  }
}

function incrementQty(item: CartItem) {
  item.qty++
}

function addItem() {
  items.value.push({
    id: Date.now(),
    name: 'USB-C Cable',
    price: 15,
    qty: 1,
  })
}

function resetItems() {
  items.value = [
    { id: 1, name: 'Mechanical Keyboard', price: 120, qty: 1 },
    { id: 2, name: 'Ergonomic Mouse', price: 60, qty: 2 },
  ]
}
</script>

<template>
  <div class="max-w-md mx-auto flex flex-col gap-6">
    <!-- Header -->
    <div class="text-center space-y-1">
      <h2 class="text-2xl font-bold text-white tracking-tight">computed() Demo</h2>
      <p class="text-xs text-slate-400">Cached, lazily evaluated reactive derivations</p>
    </div>

    <!-- Derived Cart Calculation -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Derived Cart State</span>
        <span class="font-mono text-emerald-400">{{ totalItems }} items</span>
      </div>

      <div class="text-center py-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <span class="text-xs text-slate-400 uppercase tracking-wider block">Computed Total</span>
        <span class="text-5xl font-black text-emerald-400 font-mono mt-1">${{ total }}</span>
      </div>

      <!-- Item list -->
      <div class="space-y-2">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/80 text-xs"
        >
          <div>
            <span class="text-white font-medium block">{{ item.name }}</span>
            <span class="text-slate-400 font-mono">${{ item.price }} each</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button
              type="button"
              class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
              @click="decrementQty(item)"
            >
              -
            </button>
            <span class="w-6 text-center font-mono font-bold text-white">{{ item.qty }}</span>
            <button
              type="button"
              class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
              @click="incrementQty(item)"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition cursor-pointer"
          @click="addItem"
        >
          + Add Item
        </button>
        <button
          type="button"
          class="py-2 px-3 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          @click="resetItems"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Caching & Evaluation Metric -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span class="font-semibold text-emerald-400">Dependency Caching</span>
        <code class="font-mono text-xs text-slate-500">Evaluations: {{ computedRuns }}</code>
      </div>
      <p class="text-xs text-slate-400">
        Re-rendering unrelated state does <span class="text-emerald-400 font-semibold">NOT</span> re-evaluate computed properties.
      </p>
      <div class="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800">
        <span class="text-xs text-slate-300 font-mono">Unrelated Count: {{ unrelatedCounter }}</span>
        <button
          type="button"
          class="py-1 px-3 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          @click="unrelatedCounter++"
        >
          Trigger Re-render
        </button>
      </div>
    </div>

    <!-- Writable Computed Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span class="font-semibold text-white">Writable Computed (get / set)</span>
        <code class="font-mono text-emerald-400">v-model</code>
      </div>

      <div class="space-y-2 text-xs">
        <div>
          <label class="text-slate-400 block mb-1">Full Name (Bound to Writable Computed):</label>
          <input
            v-model="fullName"
            type="text"
            class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 pt-1 text-slate-400 font-mono">
          <div>First: <span class="text-white">{{ firstName }}</span></div>
          <div>Last: <span class="text-white">{{ lastName }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
