export interface Device {
  deviceId: string;
  label: string;
  kind: string;
}

export interface Msg {
  from: string;
  role: string;
  message: string;
}

export interface ConnectionError {
  code: number | string;
  message: string;
  stack?: string;
}
