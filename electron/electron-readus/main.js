'use strinct';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { crashReporter } = require('electron');
const { dialog } = require('electron');


let Menu = electron.Menu;

//crashReporter.start(); // companyName is a required option to crashReporter.start

var mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin')
        app.quit();
});

function openWindow(baseDir) {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', () => {
    Menu.setApplicationMenu(menu);
    openWindow(process.cwd());

});

var template = [{
    label: 'ReadUs',
    submenu: [{
        label: 'Quit',
        accelarator: 'Command+Q',
        click: function() { app.quit(); }
    }]
}, {
    label: 'File',
    submenu: [{
        label: 'Open',
        accelerator: 'Command+O',
        click: function() {
            // cannot find
            dialog.showOpenDialog({ properties: ['openDirectory'] }, function(baseDir) {
                if (baseDir && baseDir[0]) {
                    openWindow(baseDir[0]);
                }
            });
        }
    }]
}, {
    label: 'View',
    submenu: [{
            label: 'Reload',
            accelarator: 'Command+R',
            click: function() {
                BrowserWindow.getFocusedWindow().reload();
            }
        },
        {
            label: 'Toggle DevTools',
            accelarator: 'Alt+Command+I',
            click: function() {
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        }
    ]

}];

var menu = Menu.buildFromTemplate(template);