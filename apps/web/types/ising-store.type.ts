export type InitModeType = 'random' | 'all-up';

export interface IIsingStoreState {
    network_length: number; // L
    temperature: number; // T
    external_field: number; // h
    exchange_interaction: number; // J
    seed: number;
    initMode: InitModeType;
    speed: number;
    isRunning: boolean;
    stepCount: number;
}

