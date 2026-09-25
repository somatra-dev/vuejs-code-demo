# State Management: Composable Pattern

This branch demonstrates state management using native Vue 3 **Composables** (`ref`, `reactive`, `computed`), styled with **Tailwind CSS**.

---

## 🏛️ The 4 Pillars

### 1. WHAT is it?
Composables utilize Vue 3's built-in Reactivity API. By defining reactive primitives (`ref`, `reactive`) at module scope (outside of an exported function), the state becomes a **module-level singleton** shared across all components that invoke the composable function.

### 2. WHY use it?
* **Zero Overhead (0 KB):** Built directly into Vue core runtime. No extra dependencies or libraries needed.
* **Idiomatic Composition API:** Reuses the exact same syntax, mental model, and functions used inside `.vue` components.
* **First-Class TypeScript:** Native type inference for all state properties, computed values, and action parameters.
* **No Boilerplate:** Direct mutation or clean helper functions without requiring actions, mutations, or dispatch wrappers.

### 3. WHEN to use it?
* **Local & Feature State:** Modals, toast/notification systems, theme toggles, multi-step wizards.
* **Reusable Packages & Component Libraries:** Distributing shared state without imposing external store dependencies on consumers.
* **Small to Medium SPAs:** Simple applications where a full-blown store library introduces unnecessary complexity.
* ⚠️ **Caution in SSR:** Module-level singletons can lead to cross-request state pollution in Server-Side Rendering (Nuxt / Node) unless properly scoped using Nuxt's `useState()` or Vue's `provide`/`inject`.

### 4. HOW does it work?

#### Implementation (`src/composables/useCounter.ts`):
```ts
import { ref, computed } from 'vue'

// Module-level singleton state
const count = ref<number>(0)
const history = ref<string[]>([])

export function useCounter() {
  // Computed getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // Actions
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
}
```

#### Usage in Component (`src/components/CounterDemo.vue`):
```vue
<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, doubleCount, isEven, increment, decrement, reset, incrementAsync } = useCounter()
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
