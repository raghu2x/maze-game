import { defineStore } from 'pinia';

export const useMazestore = defineStore('maze', {
  state: () => ({
    isPaused: false,
    isPlayerAlive: false,
    score: 100,
  }),
  getters: {
    isNotPaused: (state) => !state.isPaused,
    isPlayerDead: (state) => !state.isPlayerAlive,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
