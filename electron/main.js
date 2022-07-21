//源码来源 [Rhys Morgan](https://github.com/rhysmorgan134)大佬 
const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const { Readable } = require('stream');
const isDev = require('electron-is-dev');
const Settings = require('./SettingsStore')
const WebSocket = require('ws');
const mp4Reader = new Readable({
    read(size) {
    }
});
console.log("Get userData from local config",app.getPath('userData'))
const settings = new Settings()
const Carplay = require('./modules/Carplay')
const keys = require('./bindings.json')
let buffers = []
const raspiInfo = require('./modules/raspberry-info');



let wss;
wss = new WebSocket.Server({ port: 3001 , perMessageDeflate: false});

wss.on('connection', function connection(ws) {
    console.log('Socket connected. sending data...');
    const wsstream = WebSocket.createWebSocketStream(ws);
    mp4Reader.on('data', (data) => {
        ws.send(data)
    })

    ws.on('error', function error(error) {
        console.log('WebSocket error');
    });
    ws.on('close', function close(msg) {
        console.log('WebSocket close');
    });
});


let mainWindow;

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});




/************function****************/ 
let msg={Cpu_t:45.5,Gpu_t:45.5,Ram_useage:30.5};
raspiInfo.getGPUTemperature(false).then(output =>{
    msg.Gpu_t=parseFloat(output).toFixed(1)
    console.log( msg.Gpu_t)
    });
raspiInfo.getCPUTemperature(false).then(output => {
    msg.Cpu_t= parseFloat(output).toFixed(1)
    console.log( msg.Cpu_t)
    });


raspiInfo.getCPUTemperature(false).then(output => {
        msg.Cpu_t= parseFloat(output).toFixed(1)
        console.log( msg.Cpu_t)
    });

    

async function boardInfo(){
    let out;
    await raspiInfo.getRaspiInfo().then(output => {
        out=output    
    });
    msg.Ram_useage=out.MemoryUsage
    msg.Cpu_t=out.CPU
    msg.Gpu_t=out.GPU
}
boardInfo();
async function Info(){
    // await getCurrentTime()
    // qui set  6 16:50:57 -03 2018 @ host
    //gpu
    // await getGPUTemp() 
    //     // 39.7°C
    // //cpu
    // await getCPUTemp()
    //     // 40.2°C
    // //all memory
    // // await getMemory()   
    //     // 764720 kB
    // // Get memory usage
    // await getMUsage()  
    await boardInfo()
}


async function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    globalShortcut.register('f5', function () {
        console.log('f5 is pressed')
        mainWindow.webContents.openDevTools()
    })
    if(isDev || !(settings.store.get('kiosk'))) {
        mainWindow = new BrowserWindow({
            width: settings.store.get('width'),
            height: settings.store.get('height'),
	    kiosk: true, 
            frame: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: false
            }
        });
    } else {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 480,
            kiosk: true, 
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: false
            }
        });
    }

    mainWindow.loadURL(startUrl);
    console.log("url::::",startUrl,"\n\n\n");
    let size = mainWindow.getSize()
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    
    const config = {
        dpi: settings.store.get('dpi'),
        nightMode: 0,
        hand: settings.store.get('lhd'),
        boxName: 'nodePlay',
        width: size[0],
        height: size[1],
        fps: settings.store.get('fps'),
    }
    console.log("spawning carplay", config)
    const carplay = new Carplay(config, mp4Reader)

    carplay.on('status', (data) => {
        if(data.status) {
            mainWindow.webContents.send('plugged')
        } else {
            mainWindow.webContents.send('unplugged')
        }
        console.log("data received", data)
    })

    carplay.on('quit', () => {
        mainWindow.webContents.send('quitReq')
    })

    carplay.on('dogeInfo', (data) => {
      mainWindow.webContents.send('DogeOnInfo',data)
    })
    ipcMain.on('reqReload', (event) => {
        app.relaunch()
        app.quit()
    })
    ipcMain.on('click', (event, data) => {
        carplay.sendTouch(data.type, data.x, data.y)
    })
    ipcMain.on('miniwindow', (event, data) => {
            mainWindow.minimize()       
    })

    ipcMain.on('raspiINFO', (event) => {

            Info();

            mainWindow.webContents.send('allRaspiInfo',msg)
    })
    ipcMain.on('raspiboard', (event) => {
        raspiInfo.getBoardInfo().then(output => {
            mainWindow.webContents.send('allboardInfo',output)
        }); 
    })


    ipcMain.on("fpsReq", (event) => {
        event.returnValue = settings.store.get('fps')
    })

    ipcMain.on('getSettings', () => {
        mainWindow.webContents.send('allSettings', settings.store.store)
    })

    ipcMain.on('settingsUpdate', (event, {type, value}) => {
        console.log("updating settings", type, value)
        settings.store.set(type, value)
        mainWindow.webContents.send('allSettings', settings.store.store)
    })

    ipcMain.on('reqQuit', (event) => {
        app.quit()
    })
    for (const [key, value] of Object.entries(keys)) {
        
        if(isDev) {
            return
        }
        globalShortcut.register(key, function () {
            carplay.sendKey(value)
	    if(value==="selectDown"){
	        setTimeout(()=>{
		   carplay.sendKey("selectUp")
		}, 200)
	    }
        })
    }
    console.log("craete window ok \n\n\n");
}
