<script setup lang="ts">
// Concept summary view for Manual Fetching
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Manual Fetch Architecture
      </h1>
      <p class="text-sm text-slate-400">
        Deep dive into how raw component-level data fetching behaves in Vue 3.
      </p>
    </div>

    <!-- 4 Pillars Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <span>🏛️</span>
          <span>1. WHAT IS IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Executing browser-native <code class="text-emerald-400">fetch()</code> promises directly inside component functions or lifecycle hooks (<code class="text-slate-400">onMounted</code>), manually binding results to reactive <code class="text-slate-400">ref()</code> variables.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <span>💡</span>
          <span>2. WHY USE IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Zero external abstractions or libraries. Maximum control over request options, raw streaming, manual abortion with <code class="text-emerald-400">AbortController</code>, and understanding exact browser HTTP mechanics.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <span>🎯</span>
          <span>3. WHEN TO USE IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Quick prototypes, one-off specialized endpoints, or small utilities where introducing a state management or composable layer adds unnecessary ceremony.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <span>⚠️</span>
          <span>4. KEY PITFALLS</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          High boilerplate: every component repeats <code class="text-rose-400">isLoading</code>, <code class="text-rose-400">error</code>, and cancellation logic. Native fetch also does not reject on HTTP 4xx/5xx errors unless <code class="text-rose-400">response.ok</code> is checked!
        </p>
      </div>
    </div>

    <!-- Code Blueprint Comparison Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 class="text-sm font-bold text-slate-200">
        Essential Manual Fetch Pattern
      </h3>
      <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed"><code>const posts = ref&lt;Post[]&gt;([])
const isLoading = ref(false)
const error = ref&lt;string | null&gt;(null)
let controller: AbortController | null = null

async function loadData() {
  controller?.abort()
  controller = new AbortController()
  isLoading.value = true
  error.value = null

  try {
    const res = await fetch('/api/posts', { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    posts.value = await res.json()
  } catch (err: any) {
    if (err.name !== 'AbortError') error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onUnmounted(() => controller?.abort())</code></pre>
    </div>
  </div>
</template>
