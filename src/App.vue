<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100">
    <!-- Navbar -->
    <header class="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <!-- Logo & Badge -->
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="font-bold text-lg text-white hover:text-emerald-400 transition-colors">
            Reactivity Showcase
          </RouterLink>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            computed&lt;T&gt;
          </span>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-2">
          <nav class="flex items-center gap-1 text-sm font-medium">
            <RouterLink
              to="/"
              class="px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white"
              active-class="!text-emerald-400 !bg-slate-800"
            >
              Demo
            </RouterLink>
            <RouterLink
              to="/about"
              class="px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white"
              active-class="!text-emerald-400 !bg-slate-800"
            >
              About
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
      Vue 3 + Vite + Tailwind CSS · Reactivity Core Showcase
    </footer>
  </div>
</template>
