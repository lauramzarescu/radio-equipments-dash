const { app, BrowserWindow } = require("electron");
const path = require("path");

// require('electron-reload')(__dirname, {
//     electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });

// "electron-start": "cross-env NODE_ENV=dev nodemon --exec \"\"electron .\"\"",  FOR NODEMON RELOAD

require("electron-reload");

function createWindow() {
  // Create the browser window.
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: "#FFF",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
      minWidth: 1280,
      minHeight: 960,
    },
  });

  // and load the index.html of the app.
  // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  win.loadURL("http://localhost:3000/");
}
app.on("ready", createWindow);
