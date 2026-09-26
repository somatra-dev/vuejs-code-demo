# Data Fetching: Composable Pattern

This branch demonstrates modern, library-grade data fetching and full **CRUD** for JSONPlaceholder posts using **Vue 3 Composables** (`usePosts` & `useFetch`), styled with **Tailwind CSS**.

---

## 🏛️ The 4 Pillars

### 1. WHAT is it?
Composables in Vue 3 encapsulate and reuse **stateful asynchronous logic**. Instead of writing repetitive `fetch()`, `isLoading`, `error`, and `AbortController` statements in every component, logic is abstracted into dedicated functions (`usePosts()`, `useFetch()`) that return reactive references.

### 2. WHY use it?
* **Zero Component Clutter:** Components focus purely on template rendering and user interaction.
* **Peak Reusability:** Share the exact same API logic, types, and mutation methods across dozens of views.
* **Adaptable Inputs (`MaybeRefOrGetter`):** Pass static strings, `ref`s, or dynamic getter functions (`() => url`) to trigger automatic, reactive refetching.
* **Safe Cancellation & Memory Leak Protection:** Request signals are automatically aborted via `onScopeDispose()` when the consuming component unmounts.
* **Testability:** Business logic and network handling can be unit tested independently of component DOM structures.

### 3. WHEN to use it?
* **Production Vue 3 Applications:** The standard, recommended architectural approach for handling HTTP requests in the Composition API.
* **Entity & Domain Management:** Feature-based composables like `usePosts()`, `useAuth()`, or `useCart()`.
* **Cross-Component Reusability:** Shared search inputs, modals, and detail drawers accessing common data endpoints.

### 4. HOW does it work?

#### 1. Generic Adaptable Composable (`src/composables/useFetch.ts`):
```ts
import { ref, watchEffect, toValue, onScopeDispose, type MaybeRefOrGetter } from 'vue'

export function useFetch<T>(urlOrGetter: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  let controller: AbortController | null = null

  const execute = async () => {
    controller?.abort()
    const url = toValue(urlOrGetter)
    if (!url) return

    controller = new AbortController()
    isLoading.value = true
    error.value = null

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
    } catch (err: any) {
      if (err.name !== 'AbortError') error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  watchEffect((onCleanup) => {
    onCleanup(() => controller?.abort())
    execute()
  })

  onScopeDispose(() => controller?.abort())

  return { data, error, isLoading, execute }
}
```

#### 2. Domain CRUD Composable (`src/composables/usePosts.ts`):
```ts
import { ref, onScopeDispose } from 'vue'
import type { Post, PostInput } from '../types/post'

export function usePosts() {
  const posts = ref<Post[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPosts(limit = 8) {
    isLoading.value = true
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      if (!res.ok) throw new Error('Fetch failed')
      posts.value = await res.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function createPost(input: PostInput) { /* ... */ }
  async function updatePost(id: number, input: PostInput) { /* ... */ }
  async function deletePost(id: number) { /* ... */ }

  return { posts, isLoading, error, fetchPosts, createPost, updatePost, deletePost }
}
```

#### 3. Declarative Component Usage (`src/components/ComposablePostCrud.vue`):
```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { usePosts } from '@/composables/usePosts'

// Clean destructuring without losing reactivity!
const { posts, isLoading, error, fetchPosts, createPost, deletePost } = usePosts()

onMounted(() => fetchPosts())
</script>

<template>
  <div v-if="isLoading">Loading posts...</div>
  <div v-else-if="error">{{ error }}</div>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">
      {{ post.title }}
      <button @click="deletePost(post.id)">Delete</button>
    </li>
  </ul>
</template>
```

---

## ⚖️ Manual Fetch vs Composable Pattern Comparison

| Feature | Manual Component Fetch | Composable Pattern (`usePosts`) |
| :--- | :--- | :--- |
| **Boilerplate** | High (repeated in every view) | Low (centralized in one function) |
| **Reusability** | Low (locked inside component) | High (usable in components, stores, routes) |
| **Separation of Concerns** | Mixed (UI + networking together) | Clean (UI template separated from API) |
| **Cancellation Handling** | Must write `AbortController` manually | Handled automatically with `onScopeDispose` |
| **Reactive Parameters** | Complex manual `watch()` logic | Native with `MaybeRefOrGetter` and `toValue()` |

---

## 🚀 How to Run the Demo

```sh
# 1. Install dependencies
pnpm install

# 2. Run Vite dev server
pnpm dev

# 3. Type-check & build
pnpm build
```
