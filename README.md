# Vue 3 State Management Showcase

A hands-on code comparison exploring the three primary state management approaches in Vue: **Composables**, **Pinia**, and **Vuex 4**, all built with **Vue 3**, **Vite**, and styled with **Tailwind CSS v4**.

---

## 🌿 Demo Branches

Each state management type has its own isolated, fully functional implementation on a dedicated branch suffixed by `_state_management`:

| Branch Name | Approach | Overhead | TypeScript | DevTools | SSR Ready |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [`composable_state_management`](https://github.com/somatra-dev/vuejs-code-demo/tree/composable_state_management) | Native Composition API (`ref`, `computed`) | **0 KB** | First-class | Component-only | Requires manual scoping |
| [`pinia_state_management`](https://github.com/somatra-dev/vuejs-code-demo/tree/pinia_state_management) | Pinia Setup Store (Official Standard) | **~1.5 KB** | First-class (automatic) | Full time-travel | Yes (built-in hydration) |
| [`vuex_state_management`](https://github.com/somatra-dev/vuejs-code-demo/tree/vuex_state_management) | Vuex 4 Centralized Flux Store | **~10 KB** | Requires custom typing | Full time-travel | Yes |

---

## 🏛️ The 4 Pillars Comparison

| Pillar | Composables | Pinia (Official Standard) | Vuex 4 (Legacy) |
| :--- | :--- | :--- | :--- |
| **WHAT** | Native Vue 3 reactivity functions (`ref`, `computed`) exported at module scope. | Official modular state management library designed specifically for Vue 3. | Legacy centralized Flux store originally designed for Vue 2 (adapted for Vue 3). |
| **WHY** | Zero dependencies (0 KB), maximum flexibility, intuitive syntax. | Auto type inference, eliminates mutation boilerplate, modular code-splitting, DevTools support. | Strict predictability by enforcing that synchronous mutations must alter state. |
| **WHEN** | Local/scoped state, UI components, reusable libraries, small-to-medium SPAs. | Medium-to-large production apps, cross-route business state, SSR/Nuxt apps, teams. | Legacy maintenance of older codebases (not recommended for new projects). |
| **HOW** | Return reactive variables & mutator functions from custom hook functions. | Define stores with `defineStore()` using Setup Store or Option Store syntax. | `createStore()` with distinct `mutations`, `actions`, and `commit`/`dispatch`. |

---

## 🚀 How to Checkout and Run Each Demo

### 1. Composable Demo
```sh
git checkout composable_state_management
pnpm install
pnpm dev
```

### 2. Pinia Demo
```sh
git checkout pinia_state_management
pnpm install
pnpm dev
```

### 3. Vuex 4 Demo
```sh
git checkout vuex_state_management
pnpm install
pnpm dev
```

---

## 🛠️ Project Setup

```sh
# Install dependencies
pnpm install

# Start Vite dev server
pnpm dev

# Type-check and build for production
pnpm build
```
