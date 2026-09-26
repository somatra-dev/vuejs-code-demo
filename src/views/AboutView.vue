<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '../composables/useFetch'
import type { User } from '../types/post'

// Demonstrate reuse of the generic useFetch composable
const currentUserId = ref<number>(1)

// Adaptable getter: auto-refetches when currentUserId changes!
const {
  data: user,
  isLoading: isUserLoading,
  error: userError,
} = useFetch<User>(() => `https://jsonplaceholder.typicode.com/users/${currentUserId.value}`)
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Composable Fetch Architecture
      </h1>
      <p class="text-sm text-slate-400">
        How composables encapsulate stateful network logic, eliminate boilerplate, and achieve peak reusability.
      </p>
    </div>

    <!-- Live Demonstration: Generic useFetch() Composable -->
    <div class="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          <h2 class="text-sm font-bold text-white uppercase tracking-wider">
            Live Reusability Showcase: Generic <code>useFetch&lt;T&gt;()</code>
          </h2>
        </div>
        <span class="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          Reactive Getter URL
        </span>
      </div>

      <p class="text-xs text-slate-400">
        This card uses our generic <code class="text-indigo-300">useFetch&lt;User&gt;(() =&gt; `/users/${currentUserId}`)</code>.
        Notice that changing the user ID automatically aborts any in-flight request and refetches the new user without any watcher code in this component!
      </p>

      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-300 font-medium">Select User ID:</span>
        <div class="flex items-center gap-1.5">
          <button
            v-for="id in [1, 2, 3, 4, 5]"
            :key="id"
            @click="currentUserId = id"
            class="px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer"
            :class="
              currentUserId === id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            "
          >
            #{{ id }}
          </button>
        </div>
      </div>

      <!-- User Card Result -->
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80 min-h-[100px] flex items-center justify-center">
        <div v-if="isUserLoading" class="flex items-center gap-2 text-xs text-indigo-400">
          <div class="w-4 h-4 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
          <span>Loading user profile...</span>
        </div>

        <div v-else-if="userError" class="text-xs text-rose-400">
          {{ userError }}
        </div>

        <div v-else-if="user" class="w-full space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-white">{{ user.name }} (@{{ user.username }})</h4>
            <span class="text-xs font-mono text-emerald-400">{{ user.email }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
            <div>📞 {{ user.phone }}</div>
            <div>🌐 {{ user.website }}</div>
            <div class="col-span-2 text-slate-500">🏢 {{ user.company.name }} — "{{ user.company.catchPhrase }}"</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Pillars Comparison Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <span>🏛️</span>
          <span>1. WHAT IS IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Functions leveraging Vue 3's Composition API (<code class="text-indigo-400">ref</code>, <code class="text-indigo-400">watchEffect</code>, <code class="text-indigo-400">onScopeDispose</code>) to encapsulate and manage stateful network calls, cancellation, and caching.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <span>💡</span>
          <span>2. WHY USE IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Eliminates boilerplate across views, guarantees consistent loading/error models, prevents memory leaks via automatic <code class="text-emerald-400">onScopeDispose</code> abortion, and decouples UI from network transport.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <span>🎯</span>
          <span>3. WHEN TO USE IT?</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          The standard approach for modern Vue 3 production applications. Recommended for shared features, domain entity CRUD, and design systems.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
        <div class="flex items-center gap-2 text-sky-400 font-bold text-sm">
          <span>⚙️</span>
          <span>4. ADAPTABLE INPUTS</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          Accepting <code class="text-sky-300">MaybeRefOrGetter&lt;string&gt;</code> normalized with <code class="text-sky-300">toValue()</code> allows consumers to pass static strings, refs, or getters with automatic reactive refetching.
        </p>
      </div>
    </div>

    <!-- Code Blueprint Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 class="text-sm font-bold text-slate-200">
        How Composables Shrink Component Code
      </h3>
      <pre v-pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed"><code>// In Component:
&lt;script setup lang="ts"&gt;
import { usePosts } from '@/composables/usePosts'

// All reactivity, error states, and methods come in one clean hook!
const { posts, isLoading, error, createPost, deletePost } = usePosts()
&lt;/script&gt;

&lt;template&gt;
  &lt;div v-if="isLoading"&gt;Loading...&lt;/div&gt;
  &lt;ul v-else&gt;
    &lt;li v-for="post in posts" :key="post.id"&gt;
      {{ post.title }}
      &lt;button @click="deletePost(post.id)"&gt;Delete&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
    </div>
  </div>
</template>
