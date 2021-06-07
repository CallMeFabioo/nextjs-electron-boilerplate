import { join } from 'path';
import { pathToFileURL } from 'url';
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow;

const createWindow = async () => {
  await prepareNext('./renderer');

  win = new BrowserWindow({
    width: 1440,
    height: 768,
    webPreferences: {
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: join(app.getAppPath(), 'main', 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : pathToFileURL(join(__dirname, '../renderer/out/index.html')).href;

  win.loadURL(url);
};

// Prepare the renderer once the app is ready
app.on('ready', createWindow);

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('toMain', (_event: IpcMainEvent, message: any[]) => {
  console.log({ message });
  setTimeout(() => win.webContents.send('fromMain', 'hi from electron'), 500);
});
