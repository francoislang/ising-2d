import type { InitModeType } from '~/types/isingStore.type';

// main thread -> worker
enum ProtocoleVersionConstant {
  v1 = 'v1',
}

enum MessageConstant {
  INIT = 'init',
}

export interface IInitMessage {
  type: MessageConstant.INIT;
  payload: {
    network_length: number;
    temperature: number;
    external_field: number;
    exchange_interaction: number;
    seed: number;
    initMode: InitModeType;
  };
  version: ProtocoleVersionConstant.v1;
}
