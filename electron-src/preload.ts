import { ipcRenderer, contextBridge } from 'electron';

export type IPCChannels = 'toMain' | 'fromMain';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  send: (channel: IPCChannels, data: unknown) => {
    const validChannels = ['toMain'];

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: IPCChannels, func: (...args: any[]) => void) => {
    const validChannels = ['fromMain'];

    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    }
  },
  disconnect: (channel: IPCChannels) => {
    const validChannels = ['fromMain'];

    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
