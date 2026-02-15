import { MessageConstant, StatusConstant, type StatusConstantType } from '~/types/protocol.type';

let status: StatusConstantType;
let stepPerTick: number = 1000;
const snapShotMaxHz: number = 30; // représente la fréquence d'affichage de la grille
const intervalSnapshot: number = 1000 / snapShotMaxHz; // représente l'intervalle d'envoi du snapshot
let lastSnapshot: number = 0;
let stepCount: number = 0; // compte le temps Monte Carlo

function tick() {
  if (status !== StatusConstant.RUNNING) return;
  for (let i = 0; i < stepPerTick; i++) {
    stepCount++;
  }

  const now = performance.now();
  if (now - lastSnapshot >= intervalSnapshot) {
    self.postMessage({
      type: MessageConstant.SNAPSHOT,
      payload: {
        grid: new Int8Array([0]),
      },
    });
    self.postMessage({
      type: MessageConstant.METRICS,
      payload: {
        energy: 0,
        magnetization: 0,
        stepCount,
      },
    });
    lastSnapshot = now;
  }

  setTimeout(tick, 0);
}

self.onmessage = (event: MessageEvent) => {
  if (event.data.type === MessageConstant.START) {
    if (status === StatusConstant.RUNNING) return;
    status = StatusConstant.RUNNING;
    tick();
    self.postMessage({
      type: MessageConstant.STATUS,
      payload: {
        status,
      },
    });
  }
  if (event.data.type === MessageConstant.PAUSE) {
    if (status === StatusConstant.PAUSED) return;
    status = StatusConstant.PAUSED;
    self.postMessage({
      type: MessageConstant.STATUS,
      payload: {
        status,
      },
    });
  }
};
