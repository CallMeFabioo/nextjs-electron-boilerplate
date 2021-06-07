import * as electron from 'electron';
import { IPCChannels } from '../interfaces';
declare global {
  namespace NodeJS {
    interface Global {
      api: {
        send: (channel: IPCChannels, data: any) => void;
        receive: (channel: IPCChannels, func: (...args: any[]) => void) => void;
        disconnect: (channel: IPCChannels) => void;
      };
    }
  }
}
