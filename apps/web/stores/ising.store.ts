import { defineStore } from 'pinia';
import type { IIsingStoreState, InitModeType } from '~/types/isingStore.type';

export const useIsingStore = defineStore('ising', {
  state: (): IIsingStoreState => ({
    network_length: 64,
    temperature: 0,
    external_field: 0,
    exchange_interaction: 1,
    seed: 0,
    initMode: 'random',
    speed: 0,
    isRunning: false,
    stepCount: 0,
    energy: 0,
    magnetization: 0,
  }),
  getters: {
    // Define your getters here
    // For example:
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    setInitMode(mode: InitModeType) {
      this.initMode = mode;
      console.log('mode choisi', mode);
    },
    reset() {
      console.log('reset');
    },
    step(number: number) {
      console.log('step', number);
    },
    updateState(data: Partial<IIsingStoreState>) {
      Object.assign(this, data);
    },
  },
});
