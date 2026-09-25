# Vue 3 Reactivity: `reactive<T>(obj)` Demo

This branch (`reactive_reactive`) demonstrates Vue 3's deep object reactivity primitive: `reactive()`.

---

## 📌 Core Concept

- **Deep ES6 Proxy:** Returns a deeply reactive proxy of a JavaScript object, array, `Map`, or `Set`.
- **Direct Access:** No `.value` is required when reading or writing properties (`state.count++`).
- **Objects Only:** Primitives cannot be wrapped directly by `reactive()` because proxies only intercept object property operations.

---

## 🚀 How to Run

```sh
# Switch to this branch
git checkout reactive_reactive

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

---

## 💡 Key Patterns Demonstrated

### 1. State Declaration & Mutation
```ts
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: { name: 'Chey Somatra', role: 'Dev' },
  tags: ['Vue 3']
})

state.count++ // No .value needed
state.user.role = 'Tech Lead' // Deep reactivity works
state.tags.push('Reactivity')
```

### 2. Preserving Reactivity with `toRefs`
```ts
import { toRefs } from 'vue'

// ❌ Destructuring breaks reactivity:
// const { count } = state 

// ✅ Preserves reactivity by converting properties to refs:
const { count } = toRefs(state)
```

---

## ⚠️ Common Gotchas

1. **Reassigning the Root Object:** Reassigning `state = reactive(...)` breaks the reactivity link with templates. Always mutate properties in-place.
2. **Direct Destructuring:** Copies primitive values out of the proxy, severing tracking. Use `toRefs()` instead.
