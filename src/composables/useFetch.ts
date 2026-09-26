import {
  ref,
  watchEffect,
  toValue,
  onScopeDispose,
  type Ref,
  type MaybeRefOrGetter,
} from 'vue'

export interface UseFetchOptions extends RequestInit {
  /** If false, will not automatically trigger on initialization */
  immediate?: boolean
}

export interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  execute: () => Promise<void>
  abort: () => void
}

/**
 * Adaptable, reusable HTTP fetch composable
 * Accepts static string URLs, Ref<string>, or getter functions (() => string).
 */
export function useFetch<T = unknown>(
  urlOrGetter: MaybeRefOrGetter<string>,
  options: UseFetchOptions = {},
): UseFetchReturn<T> {
  const { immediate = true, ...fetchOptions } = options

  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  let controller: AbortController | null = null

  const abort = () => {
    if (controller) {
      controller.abort()
      controller = null
    }
  }

  const execute = async () => {
    // Abort previous in-flight request
    abort()

    const url = toValue(urlOrGetter)
    if (!url) return

    controller = new AbortController()
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`)
      }

      data.value = (await response.json()) as T
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return // Cancelled intentionally
      }
      error.value = err instanceof Error ? err.message : 'Unknown fetch error'
    } finally {
      isLoading.value = false
    }
  }

  // Reactive auto-fetcher if immediate is true
  if (immediate) {
    watchEffect((onCleanup) => {
      onCleanup(() => abort())
      execute()
    })
  }

  // Cleanup on component unmount / scope dispose
  onScopeDispose(() => abort())

  return {
    data,
    error,
    isLoading,
    execute,
    abort,
  }
}
