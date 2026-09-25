<template>
  <div class="max-w-md mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
      <h1 class="text-xl font-bold text-white tracking-tight">
        Deep Dive: <code class="text-emerald-400 font-mono">watch</code> & <code class="text-emerald-400 font-mono">watchEffect</code>
      </h1>
      <p class="text-xs text-slate-300 leading-relaxed">
        Primitives for executing explicit side effects when reactive state updates.
      </p>

      <div class="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
        <div>
          <h3 class="font-semibold text-emerald-400">1. `watch` (Explicit & Lazy)</h3>
          <p class="text-slate-400 mt-0.5">
            Explicitly tracks specified sources (ref, reactive getter, array). Lazy by default and provides previous and current values.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">2. `watchEffect` (Automatic & Eager)</h3>
          <p class="text-slate-400 mt-0.5">
            Runs immediately and automatically tracks any reactive dependency synchronously read inside the callback.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-emerald-400">3. Async Cleanup (`onCleanup`)</h3>
          <p class="text-slate-400 mt-0.5">
            Allows registering cleanup logic (e.g. aborting an HTTP fetch or clearing timeouts) before the effect re-runs or when the component unmounts.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
