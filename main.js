const { BrowserWindow, app } = require("electron")
const path = require("path")

require("electron-reloader")(module);

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        frame: false,
        titleBarStyle: "hiddenInset",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "renderer.js"),
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();
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
