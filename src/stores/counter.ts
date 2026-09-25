import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref<number>(0)
  const history = ref<string[]>([])

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // Helper
  function recordHistory(action: string) {
    const timestamp = new Date().toLocaleTimeString()
    history.value.unshift(`[${timestamp}] ${action} -> count: ${count.value}`)
    if (history.value.length > 5) {
      history.value.pop()
    }
  }

  // Actions (synchronous and asynchronous updates)
  function increment() {
    count.value++
    recordHistory('Increment (+1)')
  }

  function decrement() {
    count.value--
    recordHistory('Decrement (-1)')
  }

  function reset() {
    count.value = 0
    recordHistory('Reset (0)')
  }

  async function incrementAsync(amount = 5): Promise<void> {
    recordHistory(`Async increment (+${amount}) started...`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    count.value += amount
    recordHistory(`Async increment (+${amount}) resolved`)
  }

  return {
    count,
    history,
    doubleCount,
    isEven,
    increment,
    decrement,
    reset,
    incrementAsync,
  }
})
