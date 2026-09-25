# Vue 3 Reactivity: `ref<T>(val)` Demo

This branch (`ref_reactive`) demonstrates Vue 3's foundational reactivity primitive: `ref()`.

---

## 📌 Core Concept

- **Wraps Any Value:** Primitives (`number`, `string`, `boolean`, etc.) or complex objects.
- **The Box Model:** Returns a reactive container object: `{ value: T }`.
- **Script vs Template:** Access via `.value` in `<script>`, but automatically unwrapped (no `.value` needed) in top-level `<template>`.
- **Deep Reactivity for Objects:** When an object or array is passed, Vue internally converts it with `reactive()`. Replacing `.value` entirely (`user.value = newObj`) preserves reactivity.

---

## 🚀 How to Run

```sh
# Switch to this branch
git checkout ref_reactive

# Install dependencies (if not already installed)
pnpm install

# Start development server
pnpm dev
```

---

## 💡 Key Patterns Demonstrated

### 1. Primitive State
```ts
import { ref } from 'vue'

const count = ref<number>(0)
count.value++ // Requires .value in script
```

### 2. Deep Object Reactivity
```ts
const user = ref({ name: 'Alice', score: 10 })

// In-place mutation
user.value.score++

// Full object replacement
user.value = { name: 'Bob', score: 20 }
```

---

## ⚠️ Common Gotchas

1. **Forgetting `.value` in script:** `count = 5` reassigns the local variable and breaks reactivity. Always use `count.value = 5`.
2. **Template Unwrapping Limit:** Only top-level refs unwrap automatically in templates. Nested refs inside plain objects require `.value` in templates.
