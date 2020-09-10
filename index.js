const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'icon.ico',
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Quit app when closed
  win.on('closed', function () {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert munu
  Menu.setApplicationMenu(mainMenu);
}

app.whenReady().then(createWindow);

// Handle clear H1 Tag
function NewWindow() {
  console.log(`Create a New Window`);
  let addWindow = new BrowserWindow({
    width: 500,
    height: 500,
    title: 'New Window',
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'New.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  // Handle garbage collection
  addWindow.on('close', function () {
    addWindow = null;
  });
}

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Window',
        accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
        click() {
          NewWindow();
        },
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

// If mac, add empty object to menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add dev tools, if not in prod
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: 'reload',
      },
    ],
  });
}
