# Data Fetching: Manual Fetch API

This branch demonstrates raw HTTP operations and full **CRUD** for JSONPlaceholder posts using the browser's native **Fetch API** (`window.fetch`) in **Vue 3 (Composition API)**, styled with **Tailwind CSS**.

---

## 🏛️ The 4 Pillars

### 1. WHAT is it?
Manual data fetching means invoking `window.fetch()` directly inside component methods, event handlers, or lifecycle hooks (`onMounted`), binding the asynchronous results directly to component-level reactive primitives (`ref`, `reactive`).

### 2. WHY use it?
* **Zero Abstractions (0 KB):** Uses pure browser standards without external dependencies or heavy wrapper layers.
* **Granular Control:** Direct configuration of headers, HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), caching policies, and signal cancellation via `AbortController`.
* **Great for Learning & Prototyping:** Makes the underlying browser network lifecycle clear and explicit before introducing abstraction layers.

### 3. WHEN to use it?
* **Quick prototypes & single-page experiments:** When setting up composables or store layers is unnecessary overhead.
* **One-off specialized requests:** Specialized endpoints like file streaming or manual upload endpoints with unique headers.
* ⚠️ **Trade-off in Production:** Leads to repetitive boilerplate (`isLoading`, `error`, `try/catch/finally`, `AbortController`) across multiple components. For production apps, use the **Composable Pattern** (see the [`composable_fetching_data`](https://github.com/somatra-dev/vuejs-code-demo/tree/composable_fetching_data) branch).

### 4. HOW does it work?

#### Key Fetch API Mechanics & Gotchas:
1. **Manual `response.ok` Check:** Native `fetch()` does **not** reject promises on HTTP `404` or `500` errors. You must explicitly verify `if (!response.ok) throw new Error(...)`.
2. **Cancellation with `AbortController`:** Requests should be aborted if a component unmounts (`onUnmounted`) or when a previous query is superseded to prevent race conditions.
3. **Local State Synchronization:** When testing against mocked REST APIs like JSONPlaceholder, local state mutations simulate immediate CRUD updates in the UI.

#### CRUD Code Blueprints:

```ts
import { ref, onMounted, onUnmounted } from 'vue'

const posts = ref([])
const isLoading = ref(false)
const error = ref(null)
let controller: AbortController | null = null

// 1. READ (GET)
async function fetchPosts() {
  controller?.abort()
  controller = new AbortController()
  isLoading.value = true
  error.value = null

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      signal: controller.signal
    })
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    posts.value = await res.json()
  } catch (err: any) {
    if (err.name !== 'AbortError') error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// 2. CREATE (POST)
async function createPost(newPostData: { title: string; body: string; userId: number }) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPostData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  if (!res.ok) throw new Error('Create failed')
  const created = await res.json()
  posts.value.unshift(created) // Sync UI
}

// 3. UPDATE (PUT)
async function updatePost(id: number, updatedData: { title: string; body: string; userId: number }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  if (!res.ok) throw new Error('Update failed')
  const updated = await res.json()
  const idx = posts.value.findIndex(p => p.id === id)
  if (idx !== -1) posts.value[idx] = updated
}

// 4. DELETE (DELETE)
async function deletePost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Delete failed')
  posts.value = posts.value.filter(p => p.id !== id)
}

onMounted(fetchPosts)
onUnmounted(() => controller?.abort())
```

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
