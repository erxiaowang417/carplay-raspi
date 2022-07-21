# carplay-raspi

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>目录</summary>
  <ol>
    <li>
      <a href="#项目基础 ">项目基础 </a>
    </li>
    <li>
      <a href="#项目来源">项目来源</a>
      <ul>
        <li><a href="#源码仓库">源码仓库</a></li>
      </ul>
    </li>
    <li><a href="#使用方法">使用方法</a></li>
    <li><a href="#下载对应版本">下载版本</a></li>
    <li><a href="#特别感谢">特别感谢</a></li>
  </ol>
</details>


<img src="https://github.com/erxiaowang417/carplay-raspi/blob/main/png/home.png" width="600"  alt="home">
<img src="https://github.com/erxiaowang417/carplay-raspi/blob/main/png/raspi-1.png" width="600"  alt="bord">
<img src="https://github.com/erxiaowang417/carplay-raspi/blob/main/png/raspi-2.png" width="600"  alt="bord">
<img src="https://github.com/erxiaowang417/carplay-raspi/blob/main/png/doge.png" width="600"  alt="doge">

## 项目基础 
* [react](https://react.docschina.org/)
用于构建用户界面的 JavaScript 库
* [JavaScript]
* [elctron](https://www.electronjs.org/zh/docs/latest/)
Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。


## 项目来源 [Rhys Morgan](https://github.com/rhysmorgan134)大佬 
作者联系方式 - Rhys Morgan - rhysm134@gmail.com

### 源码仓库
* react [elctron](https://github.com/rhysmorgan134/react-carplay)
### 环境配置
官方网址 https://nodejs.org/zh-cn/download/
tar 解压

    ln -s （/usr/software/nodejs）/bin/npm   /usr/local/bin/ 
    ln -s （/usr/software/nodejs）/bin/node   /usr/local/bin/
    （/usr/software/nodejs）解压目录
    
目录

    -electron
      -main.js
      -preload.js
      -Settings.js

- react [node-carplay](https://github.com/rhysmorgan134/node-CarPlay)

目录

    -AudioParse.js
    -Carplay.js
    -DongleHandler.js
    -MessageHandler.js
    -Microphone.js
    -VideoParse.js
    -VideoParseWS.js

- react [react-js-carplay](https://github.com/rhysmorgan134/react-js-carplay)

目录

    -src
      
## 下载对应版本

Download correct package from [releases](https://github.com/erxiaowang417/carplay-raspi/releases)

## 使用方法

* ```chmod +x {AppImage}```
* ```sudo ./{AppImage} --no-sandbox```

## npm packages
* [raspberry-info](https://www.npmjs.com/package/raspberry-info)  从 Raspberry 获取信息的模块。GPU 温度和 CPU 温度、序列号、IP 等信息（仅限 Linux）

## 特别感谢


* [@rhysmorgan134]( https://github.com/rhysmorgan134)
* [@electric-monk](https://github.com/electric-monk/pycarplay)「Autobox”加密狗的 Python Carplay 库」
* (https://github.com/node-usb/node-usb) 「用于与 USB 设备通信的 Node.JS 库」
* (https://github.com/phoboslab/jsmpeg) 「JSMpeg 是一个用 JavaScript 编写的视频播放器」
