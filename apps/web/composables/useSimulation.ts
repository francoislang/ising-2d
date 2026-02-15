import { MessageConstant, StatusConstant } from '~/types/protocol.type';

export function useSimulation() {
  // permet de savoir si on est côté client
  if (import.meta.client) {
    const worker = new Worker(new URL('../workers/sim.worker.ts', import.meta.url), {
      type: 'module',
    });

    const isingStore = useIsingStore();

    function start() {
      worker.postMessage({
        type: MessageConstant.START,
      });
    }

    function pause() {
      worker.postMessage({
        type: MessageConstant.PAUSE,
      });
    }

    worker.onmessage = (event: MessageEvent) => {
      if (event.data.type === MessageConstant.STATUS) {
        if (event.data.payload.status === StatusConstant.RUNNING) isingStore.isRunning = true;
        else isingStore.isRunning = false;
      }

      if (event.data.type === MessageConstant.SNAPSHOT) {
      }

      if (event.data.type === MessageConstant.METRICS) {
        const { energy, magnetization, stepCount } = event.data.payload;
        isingStore.updateState({
          energy,
          magnetization,
          stepCount,
        });
      }
    };

    return {
      start,
      pause,
    };
  } else {
    return {
      start: () => {},
      pause: () => {},
    };
  }
}
