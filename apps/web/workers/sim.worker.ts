import { MessageConstant, StatusConstant, type StatusConstantType } from '~/types/protocol.type';

let status: StatusConstantType;

self.onmessage = (event: MessageEvent) => {
  if (event.data.type === MessageConstant.START) {
    if (status === StatusConstant.RUNNING) return;
    status = StatusConstant.RUNNING;
    self.postMessage({
      type: MessageConstant.STATUS,
      payload: {
        status,
      },
    });
  } else if (event.data.type === MessageConstant.PAUSE) {
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
