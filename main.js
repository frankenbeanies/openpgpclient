const {app, BrowserWindow} = require('electron');
const path = require("path");
const url = require("url");

let win;

function createWindow(){
  //create browsertools adn load index.html
  win = new BrowserWindow({width: 1366, height: 768});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //open dev tools
  //win.webContents.openDevTools();

  //onwindowclosed()
  win.on('closed', () =>{
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () =>{
  if(process.platform !== "darwin"){
    app.quit();
  }
});

app.on("activate", () =>{
  if(win === null){
    createWindow();
  }
});