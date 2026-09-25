<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
      <h1 class="text-xl font-bold text-white tracking-tight">
        Deep Dive: <code class="text-emerald-400 font-mono">reactive&lt;T&gt;(obj)</code>
      </h1>
      <p class="text-xs text-slate-300 leading-relaxed">
        Returns a deeply reactive ES6 Proxy of a JavaScript object, array, Map, or Set.
      </p>

      <div class="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
        <div>
          <h3 class="font-semibold text-emerald-400">1. No `.value` Needed</h3>
          <p class="text-slate-400 mt-0.5">
            Since it returns a direct proxy of the object, you read and mutate properties directly: <code class="text-emerald-400 font-mono">state.count++</code>.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">2. Objects Only</h3>
          <p class="text-slate-400 mt-0.5">
            ES6 Proxies only intercept property access on objects. Passing primitives (<code class="text-slate-400 font-mono">reactive(0)</code>) will not work.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">3. Destructuring Pitfall</h3>
          <p class="text-slate-400 mt-0.5">
            Destructuring properties directly copies primitive values and severs reactivity. Use <code class="text-emerald-400 font-mono">toRefs(state)</code> or <code class="text-emerald-400 font-mono">toRef(state, 'key')</code> to keep reactive connections.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
