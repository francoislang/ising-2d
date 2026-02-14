import type { InitModeType } from '~/types/isingStore.type';

// main thread -> worker
enum ProtocoleVersionConstant {
  V1 = 'v1',
}

enum MessageConstant {
  INIT = 'init',
  SETPARAMS = 'setParams',
  START = 'start',
  PAUSE = 'pause',
  RESET = 'reset',
  STEP = 'step',
  SETSNAPSHOTRATE = 'setSnapshotRate',
}

interface IInitPayload {
  network_length: number;
  temperature: number;
  external_field: number;
  exchange_interaction: number;
  seed: number;
  initMode: InitModeType;
}

export interface IInitMessage {
  type: MessageConstant.INIT;
  payload: IInitPayload;
  version: ProtocoleVersionConstant.V1;
}

export interface ISetParamsMessage {
  type: MessageConstant.SETPARAMS;
  payload: {
    temperature: number;
    external_field: number;
  };
}

export interface IStartMessage {
  type: MessageConstant.START;
}

export interface IPauseMessage {
  type: MessageConstant.PAUSE;
}

export interface IResetMessage {
  type: MessageConstant.RESET;
  payload: IInitPayload;
}

export interface IStepMessage {
  type: MessageConstant.STEP;
  payload: {
    steps: number;
  };
}

export interface ISetSnapshotRateMessage {
  type: MessageConstant.SETSNAPSHOTRATE;
  payload: {
    rate: number;
  };
}

export type MainToWorkerMessage =
  | IInitMessage
  | ISetParamsMessage
  | IStartMessage
  | IPauseMessage
  | IResetMessage
  | IStepMessage
  | ISetSnapshotRateMessage;
