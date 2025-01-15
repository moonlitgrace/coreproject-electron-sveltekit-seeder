import { app, BrowserWindow } from 'electron';
import path from 'node:path';
const __dirname = import.meta.dirname;

const isDev = !app.isPackaged || (process.env.NODE_ENV == 'development');

const base = isDev ? '../../build' : '../../';

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      // contextIsolation: true,
      // nodeIntegration: true,
      // spellcheck: false,
      // devTools: true,
      // preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // disable resize
  mainWindow.setResizable(false);

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, base, 'index.html'));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
