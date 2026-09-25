<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
      <h1 class="text-xl font-bold text-white tracking-tight">
        Deep Dive: <code class="text-emerald-400 font-mono">computed&lt;T&gt;(getter)</code>
      </h1>
      <p class="text-xs text-slate-300 leading-relaxed">
        Lazily evaluated, cached reactive reference derived from other reactive dependencies.
      </p>

      <div class="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
        <div>
          <h3 class="font-semibold text-emerald-400">1. Dependency Caching</h3>
          <p class="text-slate-400 mt-0.5">
            Computed properties only re-evaluate when their tracked reactive dependencies change. If the component re-renders due to unrelated state, the cached value is returned immediately.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">2. Getters Must Be Pure</h3>
          <p class="text-slate-400 mt-0.5">
            Never perform side-effects (API calls, state mutations, console logging) inside a computed getter. Use <code class="text-emerald-400 font-mono">watch</code> for side effects.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">3. Writable Computed</h3>
          <p class="text-slate-400 mt-0.5">
            Can accept an object with <code class="text-emerald-400 font-mono">get()</code> and <code class="text-emerald-400 font-mono">set()</code> for two-way bindings with <code class="text-emerald-400 font-mono">v-model</code>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
