import { ref, computed } from 'vue'

// State declared outside function scope acts as a singleton shared across all callers
const count = ref<number>(0)
const history = ref<string[]>([])

export function useCounter() {
  // Getters (computed properties derived from state)
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // Actions (synchronous and asynchronous state updates)
  function recordHistory(action: string) {
    const timestamp = new Date().toLocaleTimeString()
    history.value.unshift(`[${timestamp}] ${action} -> count: ${count.value}`)
    if (history.value.length > 5) {
      history.value.pop()
    }
  }

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
}
