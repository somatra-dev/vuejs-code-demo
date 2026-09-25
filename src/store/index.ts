import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'

export interface State {
  count: number
  history: string[]
}

export const key: InjectionKey<Store<State>> = Symbol('vuex-store')

export const store = createStore<State>({
  state: () => ({
    count: 0,
    history: [],
  }),
  getters: {
    doubleCount(state): number {
      return state.count * 2
    },
    isEven(state): boolean {
      return state.count % 2 === 0
    },
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    },
    RESET(state) {
      state.count = 0
    },
    INCREMENT_BY(state, amount: number) {
      state.count += amount
    },
    ADD_HISTORY(state, action: string) {
      const timestamp = new Date().toLocaleTimeString()
      state.history.unshift(`[${timestamp}] ${action} -> count: ${state.count}`)
      if (state.history.length > 5) {
        state.history.pop()
      }
    },
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
      commit('ADD_HISTORY', 'Increment (+1)')
    },
    decrement({ commit }) {
      commit('DECREMENT')
      commit('ADD_HISTORY', 'Decrement (-1)')
    },
    reset({ commit }) {
      commit('RESET')
      commit('ADD_HISTORY', 'Reset (0)')
    },
    async incrementAsync({ commit }, amount = 5) {
      commit('ADD_HISTORY', `Async increment (+${amount}) started...`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      commit('INCREMENT_BY', amount)
      commit('ADD_HISTORY', `Async increment (+${amount}) resolved`)
    },
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
