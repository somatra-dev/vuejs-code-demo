# State Management: Pinia (Official Standard)

This branch demonstrates state management using **Pinia**, the official and recommended state management library for Vue 3, styled with **Tailwind CSS**.

---

## 🏛️ The 4 Pillars

### 1. WHAT is it?
Pinia is the official state management library designed specifically for Vue 3 and the Composition API. It organizes state into modular, isolated stores consisting of **State**, **Getters**, and **Actions** (handling both synchronous and asynchronous operations, completely eliminating the need for Vuex mutations).

### 2. WHY use it?
* **First-Class TypeScript:** Flawless type inference with instant autocompletion without writing complex manual type boilerplate.
* **No Mutations Boilerplate:** Direct synchronous updates or asynchronous API calls live together cleanly inside `actions`.
* **Modular by Design & Tree-Shakeable:** Each store is an independent file. Importing a store only bundles and executes code where it is actually used.
* **DevTools Integration:** Full timeline tracking, direct state editing, action dispatch logs, and time-travel debugging.
* **SSR Safe:** Manages separate store instances per request, preventing cross-request state leakage in SSR (Nuxt 3 / Node).
* **Extensibility:** Built-in hooks and plugin ecosystem (e.g., `pinia-plugin-persistedstate`).

### 3. WHEN to use it?
* **Production Vue 3 Applications:** Medium to large scale web applications with business logic shared across routes.
* **Complex Data Dependencies:** When multiple disconnected components need to access, filter, or mutate shared data.
* **Nuxt 3 / SSR Applications:** Zero configuration needed for hydration and server isolation.
* **Multi-Developer Teams:** Enforcing consistent store structure, predictable debugging, and clean architecture.

### 4. HOW does it work?

#### Implementation (`src/stores/counter.ts`):
```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const history = ref<string[]>([])

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // Actions (synchronous or asynchronous)
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  async function incrementAsync(amount = 5) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    count.value += amount
  }

  return { count, history, doubleCount, isEven, increment, decrement, reset, incrementAsync }
})
```

#### Usage in Component (`src/components/CounterDemo.vue`):
```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()

// Keep reactivity when destructuring state/getters using storeToRefs
const { count, doubleCount, isEven, history } = storeToRefs(counterStore)

// Actions can be destructured directly
const { increment, decrement, reset, incrementAsync } = counterStore
</script>

<template>
  <div>
    <p>Count: {{ count }} (Double: {{ doubleCount }})</p>
    <button @click="increment">+1 Increment</button>
    <button @click="decrement">-1 Decrement</button>
    <button @click="incrementAsync(5)">+5 Async</button>
  </div>
</template>
```

---

## 🚀 How to Run the Demo

```sh
# 1. Install dependencies
pnpm install

# 2. Run dev server
pnpm dev

# 3. Type-check & build
pnpm build
```
