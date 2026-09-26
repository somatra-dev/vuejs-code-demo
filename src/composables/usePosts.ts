import { ref, onScopeDispose } from 'vue'
import type { Post, PostInput, Comment, ApiLog } from '../types/post'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

/**
 * Domain-specific CRUD composable for JSONPlaceholder Posts
 * Encapsulates stateful network logic, error handling, and reactive mutations.
 */
export function usePosts() {
  const posts = ref<Post[]>([])
  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)
  const deletingId = ref<number | null>(null)
  const error = ref<string | null>(null)
  const notification = ref<string | null>(null)

  // Details & Comments
  const activePost = ref<Post | null>(null)
  const comments = ref<Comment[]>([])
  const isLoadingComments = ref<boolean>(false)

  // Audit Logs
  const logs = ref<ApiLog[]>([])

  // Network controllers
  let fetchController: AbortController | null = null
  let detailController: AbortController | null = null

  function notify(msg: string) {
    notification.value = msg
    setTimeout(() => {
      if (notification.value === msg) {
        notification.value = null
      }
    }, 4000)
  }

  function addLog(method: ApiLog['method'], url: string, status?: number, durationMs?: number, isError = false) {
    logs.value.unshift({
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      method,
      url,
      status,
      durationMs,
      isError,
    })
    if (logs.value.length > 5) logs.value.pop()
  }

  // 1. GET ALL
  async function fetchPosts(limit = 8) {
    if (fetchController) fetchController.abort()
    fetchController = new AbortController()

    isLoading.value = true
    error.value = null
    const targetUrl = `${BASE_URL}?_limit=${limit}`
    const start = performance.now()

    try {
      const res = await fetch(targetUrl, { signal: fetchController.signal })
      const duration = Math.round(performance.now() - start)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to load posts`)
      }

      posts.value = await res.json()
      addLog('GET', targetUrl, res.status, duration)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Error fetching posts'
      error.value = msg
      addLog('GET', targetUrl, 0, Math.round(performance.now() - start), true)
    } finally {
      isLoading.value = false
    }
  }

  // 2. GET DETAILS & COMMENTS
  async function viewPost(post: Post) {
    activePost.value = post
    comments.value = []
    isLoadingComments.value = true

    if (detailController) detailController.abort()
    detailController = new AbortController()

    const commentsUrl = `${BASE_URL}/${post.id}/comments`
    const start = performance.now()

    try {
      const res = await fetch(commentsUrl, { signal: detailController.signal })
      const duration = Math.round(performance.now() - start)

      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load comments`)

      comments.value = await res.json()
      addLog('GET', commentsUrl, res.status, duration)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      console.error(err)
    } finally {
      isLoadingComments.value = false
    }
  }

  // 3. CREATE (POST)
  async function createPost(input: PostInput) {
    isSubmitting.value = true
    error.value = null
    const start = performance.now()

    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const duration = Math.round(performance.now() - start)

      if (!res.ok) throw new Error(`HTTP ${res.status}: Create failed`)

      const created: Post = await res.json()
      // Local sync
      posts.value.unshift({
        ...created,
        id: posts.value.length ? Math.max(...posts.value.map((p) => p.id)) + 1 : 101,
      })

      notify('Post created via Composable!')
      addLog('POST', BASE_URL, res.status, duration)
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create post'
      error.value = msg
      addLog('POST', BASE_URL, 0, Math.round(performance.now() - start), true)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  // 4. UPDATE (PUT)
  async function updatePost(id: number, input: PostInput) {
    isSubmitting.value = true
    error.value = null
    const targetUrl = `${BASE_URL}/${id}`
    const start = performance.now()

    try {
      const res = await fetch(targetUrl, {
        method: 'PUT',
        body: JSON.stringify({ id, ...input }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const duration = Math.round(performance.now() - start)

      if (!res.ok) throw new Error(`HTTP ${res.status}: Update failed`)

      const updated: Post = await res.json()
      const idx = posts.value.findIndex((p) => p.id === id)
      if (idx !== -1) {
        posts.value[idx] = { ...posts.value[idx], ...updated }
      }

      notify(`Post #${id} updated successfully!`)
      addLog('PUT', targetUrl, res.status, duration)
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update post'
      error.value = msg
      addLog('PUT', targetUrl, 0, Math.round(performance.now() - start), true)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  // 5. DELETE (DELETE)
  async function deletePost(id: number) {
    if (!confirm(`Delete post #${id}?`)) return false

    deletingId.value = id
    error.value = null
    const targetUrl = `${BASE_URL}/${id}`
    const start = performance.now()

    try {
      const res = await fetch(targetUrl, { method: 'DELETE' })
      const duration = Math.round(performance.now() - start)

      if (!res.ok) throw new Error(`HTTP ${res.status}: Delete failed`)

      posts.value = posts.value.filter((p) => p.id !== id)
      notify(`Post #${id} deleted via Composable!`)
      addLog('DELETE', targetUrl, res.status, duration)
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete post'
      error.value = msg
      addLog('DELETE', targetUrl, 0, Math.round(performance.now() - start), true)
      return false
    } finally {
      deletingId.value = null
    }
  }

  function clearActivePost() {
    activePost.value = null
    comments.value = []
  }

  // Automatic cleanup when component unmounts
  onScopeDispose(() => {
    if (fetchController) fetchController.abort()
    if (detailController) detailController.abort()
  })

  return {
    // Reactive State
    posts,
    isLoading,
    isSubmitting,
    deletingId,
    error,
    notification,
    activePost,
    comments,
    isLoadingComments,
    logs,

    // Methods
    fetchPosts,
    viewPost,
    createPost,
    updatePost,
    deletePost,
    clearActivePost,
  }
}
