# Vue 3 Reactivity: `computed<T>(getter)` Demo

This branch (`computed_reactive`) demonstrates Vue 3's cached derived reactivity primitive: `computed()`.

---

## 📌 Core Concept

- **Cached Evaluation:** Only recomputes when tracked reactive dependencies change.
- **Lazy Evaluation:** Only evaluated when read by a template or another watcher/computed.
- **Purity:** Getters must remain pure without side-effects.
- **Writable Computed:** Supports `get` and `set` for seamless two-way binding with `v-model`.

---

## 🚀 How to Run

```sh
# Switch to this branch
git checkout computed_reactive

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

---

## 💡 Key Patterns Demonstrated

### 1. Read-Only Computed (Cached)
```ts
import { ref, computed } from 'vue'

const items = ref([{ price: 100, qty: 2 }])

const total = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})
```

### 2. Writable Computed (get / set)
```ts
const firstName = ref('Chey')
const lastName = ref('Somatra')

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val) => {
    const [first, ...rest] = val.split(' ')
    firstName.value = first || ''
    lastName.value = rest.join(' ')
  }
})
```

---

## ⚠️ Common Gotchas

1. **Side Effects in Computed:** Never trigger async operations or mutate other state inside a computed getter. Use `watch` or `watchEffect` for side effects.
2. **Mutating Read-Only Computed:** Calling `total.value = 50` on a read-only computed produces a console warning. Use writable computed if setters are needed.
