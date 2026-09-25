# Vue 3 Reactivity: `watch` & `watchEffect` Demo

This branch (`watch_reactive`) demonstrates reactive side-effect handling using `watch()` and `watchEffect()`.

---

## 📌 Core Concept

- **`watch` (Explicit & Lazy):** Explicitly watches dependencies, runs only when they change, and provides `(newValue, oldValue)`.
- **`watchEffect` (Automatic & Eager):** Runs immediately, automatically tracks any reactive state read during execution.
- **Async Cleanup (`onCleanup`):** Cancels in-flight requests or tears down subscriptions when reactive sources change rapidly.

---

## 🚀 How to Run

```sh
# Switch to this branch
git checkout watch_reactive

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

---

## 💡 Key Patterns Demonstrated

### 1. Explicit Watcher
```ts
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})
```

### 2. Async Cancellation with `onCleanup`
```ts
watch(query, (newQuery, _old, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  fetch(`/api/search?q=${newQuery}`, { signal: controller.signal })
})
```

### 3. Automatic Tracking with `watchEffect`
```ts
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log(`Current count: ${count.value}`)
})
```
