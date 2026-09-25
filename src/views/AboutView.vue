<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h1 class="text-2xl font-bold text-white tracking-tight">
        Deep Dive: <code class="text-emerald-400 font-mono">ref&lt;T&gt;(val)</code>
      </h1>
      <p class="text-sm text-slate-300 leading-relaxed">
        The fundamental building block of Vue 3 Composition API. It wraps any value in a reactive container.
      </p>

      <div class="space-y-4 pt-4 border-t border-slate-800 text-sm text-slate-300">
        <div>
          <h3 class="font-semibold text-emerald-400">1. Why Primitives Need a Box</h3>
          <p class="text-slate-400 text-xs mt-1">
            JavaScript variables holding primitives (like numbers or strings) only hold the raw value. When passed around, they are copied by value. By returning an object with a <code class="text-emerald-400 font-mono">.value</code> getter and setter, Vue can track when that value is accessed and trigger effects when it is modified.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">2. Template Auto-Unwrapping</h3>
          <p class="text-slate-400 text-xs mt-1">
            When a <code class="text-emerald-400 font-mono">ref</code> is exposed as a top-level property in the template, Vue's template compiler automatically unwraps the <code class="text-emerald-400 font-mono">.value</code>. You can write <code class="text-emerald-400 font-mono">&#123;&#123; count &#125;&#125;</code> instead of <code class="text-emerald-400 font-mono">&#123;&#123; count.value &#125;&#125;</code>.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">3. Objects Inside `ref()`</h3>
          <p class="text-slate-400 text-xs mt-1">
            Passing an object or array to <code class="text-emerald-400 font-mono">ref()</code> automatically turns the nested object into a deep reactive proxy via <code class="text-emerald-400 font-mono">reactive()</code>. You can replace the entire object using <code class="text-emerald-400 font-mono">state.value = newObj</code> without losing reactivity.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
