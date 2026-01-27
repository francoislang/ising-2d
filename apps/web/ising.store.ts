import { defineStore } from 'pinia';
import {IIsingStoreState, InitModeType} from "./types/ising-store.type";

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
  }),
  getters: {
    // Define your getters here
    // For example:
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    // Define your actions here
    // For example:
    // increment() {
    //   this.count++;
    // },
    // async fetchData() {
    //   // const response = await fetch('your-api-endpoint');
    //   // this.data = await response.json();
    // },
      initMode (mode: InitModeType) {
          console.log('mode choisi', mode)
      },
    start (run: boolean) {
        console.log('start', run)
    },
    stop (run: boolean) {
        console.log('stop', run)
    },
    reset (data: Partial<IIsingStoreState>) {
        console.log('reset', data)
    },
    step (number: number) {
        console.log('step', number)
    },
    updateState (data: Partial<IIsingStoreState>) {
        console.log('updateState', data)
    }


  },
});
