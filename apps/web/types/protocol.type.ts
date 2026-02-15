import type { InitModeType } from '~/types/isingStore.type';

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
  READY = 'ready',
  STATUS = 'status',
  SNAPSHOT = 'snapshot',
  METRICS = 'metrics',
  ERROR = 'error',
}

type StatusConstantType = 'idle' | 'running' | 'paused';

interface IInitPayload {
  network_length: number;
  temperature: number;
  external_field: number;
  exchange_interaction: number;
  seed: number;
  initMode: InitModeType;
}

// main thread -> worker

/** Initialise le Worker avec les paramètres de simulation et la version du protocole. */
export interface IInitMessage {
  type: MessageConstant.INIT;
  payload: IInitPayload;
  version: ProtocoleVersionConstant.V1;
}

/** Met à jour les paramètres physiques (T, h) en cours de simulation. */
export interface ISetParamsMessage {
  type: MessageConstant.SETPARAMS;
  payload: {
    temperature: number;
    external_field: number;
  };
}

/** Lance la boucle de simulation continue. */
export interface IStartMessage {
  type: MessageConstant.START;
}

/** Suspend la boucle de simulation. */
export interface IPauseMessage {
  type: MessageConstant.PAUSE;
}

/** Détruit la grille courante et en recrée une avec les paramètres fournis. */
export interface IResetMessage {
  type: MessageConstant.RESET;
  payload: IInitPayload;
}

/** Exécute un nombre précis de steps manuellement (mode pas-à-pas). */
export interface IStepMessage {
  type: MessageConstant.STEP;
  payload: {
    steps: number;
  };
}

/** Définit la fréquence d'envoi des snapshots (tous les N steps). */
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

// worker -> main thread

/** Le Worker a chargé le WASM et est prêt à recevoir des commandes. */
export interface IReadyMessage {
  type: MessageConstant.READY;
}

/** Informe le Main thread de l'état courant de la simulation. */
export interface IStatusMessage {
  type: MessageConstant.STATUS;
  payload: {
    status: StatusConstantType;
  };
}

/** Transmet la grille de spins courante au Main thread pour affichage. */
export interface ISnapshotMessage {
  type: MessageConstant.SNAPSHOT;
  payload: {
    grid: Int8Array;
  };
}

/** Transmet les observables instantanées E(t) et M(t) avec le step courant. */
export interface IMetricsMessage {
  type: MessageConstant.METRICS;
  payload: {
    energy: number;
    magnetization: number;
    stepCount: number; // représente le temps sur l'axe des abscisses
  };
}

/** Signale une erreur survenue dans le Worker. */
export interface IErrorMessage {
  type: MessageConstant.ERROR;
  payload: {
    error: string;
  };
}

export type WorkerToMainMessage =
  | IReadyMessage
  | IStatusMessage
  | ISnapshotMessage
  | IMetricsMessage
  | IErrorMessage;
