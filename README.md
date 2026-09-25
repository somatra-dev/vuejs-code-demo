# Vue 3 Reactivity: `shallowRef<T>(val)` Demo

This branch (`shallow_ref_reactive`) demonstrates Vue 3's shallow reactivity primitive: `shallowRef()`.

---

## 📌 Core Concept

- **Shallow Tracking:** Only tracks `.value` reassignment.
- **No Deep Proxying:** Nested properties remain raw and unproxied, improving performance for massive datasets.
- **3rd-Party Instances:** Prevents breakage when storing complex class instances (e.g. Monaco Editor, Three.js scenes, Leaflet/Mapbox) that fail when proxied.
- **Manual Trigger:** Force DOM updates using `triggerRef(ref)`.

---

## 🚀 How to Run

```sh
# Switch to this branch
git checkout shallow_ref_reactive

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

---

## 💡 Key Patterns Demonstrated

### 1. Nested Mutation (Does NOT update DOM)
```ts
import { shallowRef } from 'vue'

const data = shallowRef({ count: 0 })

// ❌ In-memory update only; does NOT trigger reactivity
data.value.count++
```

### 2. Manual Trigger via `triggerRef`
```ts
import { triggerRef } from 'vue'

data.value.count++
triggerRef(data) // ✅ Forces DOM update
```

### 3. Replacing `.value` Entirely (Recommended)
```ts
// ✅ Triggers DOM update immediately
data.value = { count: data.value.count + 1 }
```
