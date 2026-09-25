# State Management: Vuex 4 (Legacy Flux)

This branch demonstrates state management using **Vuex 4**, the legacy state management library for Vue, styled with **Tailwind CSS**.

---

## 🏛️ The 4 Pillars

### 1. WHAT is it?
Vuex is the state management library originally designed for Vue 2 (and updated to Vuex 4 for Vue 3). It strictly enforces a centralized unidirectional **Flux architecture**:
$$\text{Actions (async)} \xrightarrow{\text{commit}} \text{Mutations (sync only)} \xrightarrow{\text{mutate}} \text{State} \rightarrow \text{Getters / Components}$$

### 2. WHY was it used?
* **Guaranteed Predictability:** All state modifications must pass through synchronous `mutations`, ensuring every state change can be recorded and audited in DevTools.
* **Standardized Architecture in Vue 2:** Established consistent conventions for large-scale enterprise applications for many years.
* **Separation of Concerns:** Clear separation between asynchronous side-effects (API requests in `actions`) and state updates (`mutations`).

### 3. WHEN to use it?
* **Maintaining Existing Vue 2 or Early Vue 3 Codebases:** Large applications already heavily coupled to Vuex modules where full migration to Pinia is not currently viable.
* ⚠️ **Not Recommended for New Projects:** Vuex has been officially deprecated in favor of **Pinia** (the official standard for Vue 3).

### 4. HOW does it work?

#### Implementation (`src/store/index.ts`):
```ts
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'

export interface State {
  count: number
  history: string[]
}

export const key: InjectionKey<Store<State>> = Symbol('vuex-store')

export const store = createStore<State>({
  state: () => ({
    count: 0,
    history: [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    isEven: (state) => state.count % 2 === 0,
  },
  mutations: {
    // Synchronous mutation required to alter state
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    },
    RESET(state) {
      state.count = 0
    },
    INCREMENT_BY(state, amount: number) {
      state.count += amount
    },
  },
  actions: {
    // Actions handle business logic and commit mutations
    increment({ commit }) {
      commit('INCREMENT')
    },
    decrement({ commit }) {
      commit('DECREMENT')
    },
    reset({ commit }) {
      commit('RESET')
    },
    async incrementAsync({ commit }, amount = 5) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      commit('INCREMENT_BY', amount)
    },
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
```

#### Usage in Component (`src/components/CounterDemo.vue`):
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()

// State and getters accessed via computed to retain reactivity
const count = computed(() => store.state.count)
const doubleCount = computed(() => store.getters.doubleCount)

// Dispatch actions
function increment() {
  store.dispatch('increment')
}
</script>

<template>
  <div>
    <p>Count: {{ count }} (Double: {{ doubleCount }})</p>
    <button @click="increment">+1 Increment</button>
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
