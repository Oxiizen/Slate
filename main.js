const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

require("electron-reloader")(module); // Electron-reloader module is handy for dynamic changes. Might crash while JS changes

// Create the Intro window
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        frame: false, // Remove default title bar
        titleBarStyle: "hiddenInset", // Using custom title bar
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, "renderer.js") // renderer.js controls the changes in UI
            
        }
    });

    ipcMain.on('window-action', (event, action) => {
        if (action === 'minimize') {
          mainWindow.minimize();
        } else if (action === 'restore') {
          if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
          } else {
            mainWindow.maximize();
          }
        } else if (action === 'close') {
          mainWindow.close();
        }
      });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools(); // Only in developer mode ; Should remove in beta and public
};

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('minimize-window', () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });


