<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
      <h1 class="text-xl font-bold text-white tracking-tight">
        Deep Dive: <code class="text-emerald-400 font-mono">shallowRef&lt;T&gt;(val)</code>
      </h1>
      <p class="text-xs text-slate-300 leading-relaxed">
        Performance-optimized ref that only tracks `.value` reassignment without proxying nested properties.
      </p>

      <div class="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
        <div>
          <h3 class="font-semibold text-emerald-400">1. Shallow Reactivity</h3>
          <p class="text-slate-400 mt-0.5">
            Mutating nested properties (<code class="text-slate-400 font-mono">data.value.count++</code>) does not trigger reactivity or DOM updates because the inner object is raw and not wrapped in an ES6 Proxy.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">2. External Class Instances</h3>
          <p class="text-slate-400 mt-0.5">
            Ideal for storing 3rd-party library instances (Three.js objects, Chart.js instances, Mapbox) that break when wrapped in an ES6 Proxy.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">3. Explicit Triggering</h3>
          <p class="text-slate-400 mt-0.5">
            You can manually trigger updates using <code class="text-emerald-400 font-mono">triggerRef(data)</code> or by replacing <code class="text-emerald-400 font-mono">data.value = &#123; ... &#125;</code>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
