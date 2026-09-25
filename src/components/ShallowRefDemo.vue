<script setup lang="ts">
import { shallowRef, triggerRef, ref } from 'vue'

interface HeavyPayload {
  counter: number
  metadata: {
    status: string
    updatedAt: string
  }
}

// 1. Shallow Ref (nested properties are NOT reactive)
const data = shallowRef<HeavyPayload>({
  counter: 0,
  metadata: {
    status: 'Initial',
    updatedAt: new Date().toLocaleTimeString(),
  },
})

// Normal ref used only to show message in UI
const lastAction = ref<string>('Ready')

// ❌ Nested mutation (silent: does NOT update DOM)
function mutateNestedSilently() {
  data.value.counter++
  data.value.metadata.status = 'Mutated in memory'
  data.value.metadata.updatedAt = new Date().toLocaleTimeString()
  lastAction.value = `Mutated internally: counter is now ${data.value.counter} (DOM will not update!)`
}

// ⚡ Force DOM update via triggerRef
function forceTrigger() {
  triggerRef(data)
  lastAction.value = 'Called triggerRef(data) -> DOM updated!'
}

// ✅ Whole value replacement (triggers update)
function replaceEntireObject() {
  data.value = {
    counter: data.value.counter + 5,
    metadata: {
      status: 'Replaced .value',
      updatedAt: new Date().toLocaleTimeString(),
    },
  }
  lastAction.value = 'Reassigned data.value entirely -> DOM updated!'
}

function reset() {
  data.value = {
    counter: 0,
    metadata: {
      status: 'Initial',
      updatedAt: new Date().toLocaleTimeString(),
    },
  }
  lastAction.value = 'Reset state'
}
</script>

<template>
  <div class="max-w-md mx-auto flex flex-col gap-6">
    <!-- Header -->
    <div class="text-center space-y-1">
      <h2 class="text-2xl font-bold text-white tracking-tight">shallowRef() Demo</h2>
      <p class="text-xs text-slate-400">Tracks .value replacement only; nested properties are not proxied</p>
    </div>

    <!-- Shallow State Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
      <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Rendered State in DOM</span>
        <code class="font-mono text-emerald-400">data.value</code>
      </div>

      <div class="text-center py-4 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <span class="text-xs text-slate-400 uppercase tracking-wider block">DOM Counter</span>
        <span class="text-5xl font-black text-emerald-400 font-mono mt-1">{{ data.counter }}</span>
      </div>

      <!-- State details -->
      <div class="space-y-2 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 text-xs">
        <div class="flex justify-between">
          <span class="text-slate-400">Status:</span>
          <span class="text-white font-medium">{{ data.metadata.status }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Updated:</span>
          <span class="text-slate-300 font-mono">{{ data.metadata.updatedAt }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3">
        <button
          type="button"
          class="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition cursor-pointer"
          @click="mutateNestedSilently"
        >
          1. Mutate Nested (data.value.counter++) ➔ No DOM Update
        </button>

        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="py-2.5 px-3 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition cursor-pointer"
            @click="forceTrigger"
          >
            2. triggerRef(data)
          </button>
          <button
            type="button"
            class="py-2.5 px-3 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition cursor-pointer"
            @click="replaceEntireObject"
          >
            3. Replace .value (+5)
          </button>
        </div>

        <button
          type="button"
          class="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 transition cursor-pointer"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Status Callout -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg text-xs space-y-1">
      <span class="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Action Result</span>
      <p class="font-mono text-emerald-400">{{ lastAction }}</p>
    </div>
  </div>
</template>
