"use strict"

// 全てのファイルで共通して使う(使える)インスタンスをここで宣言する
let keyManager
let mouseManager
let grid = {}

let SCENE={
  Title:1,
  StageSelect:2,
  Game:3,
  Gameover:4
}
let scene

let titleScene
let selectScene
let gameScene
let gameoverScene

//定数はここに宣言

const mapchip_w=128
const mapchip_h=128

// index.htmlが読み込まれたときにまずこれが実行される
const init = _ => {
  keyManager = new KeyManager()
  mouseManager = new MouseManager()

  // ここでアセット(画像)を読み込む
  titleScene = new TitleScene()
  selectScene = new StageSelectScene()
  gameScene = new GameScene()
  gameoverScene = new GameoverScene()

  scene = SCENE.Title

  thentime = Date.now()
  window.requestAnimationFrame(animate)
}

const fpsInterval = 1000/60
let nowtime,thentime,elapsed

const animate = () =>{
  window.requestAnimationFrame(animate)
  nowtime = Date.now()
  elapsed = nowtime - thentime

  if(elapsed > fpsInterval){
    step()
    thentime = nowtime - (elapsed % fpsInterval);
  }
}

const step = _ => {//計算パート
  keyManager.update()
  mouseManager.update()
  grid = mouseManager.getNowMouse()
  // ここに計算パートを書く

  if(scene==SCENE.Title){
    titleScene.step()
  }else if(scene == SCENE.StageSelect){
    selectScene.step()
  }else if(scene== SCENE.Game){
    gameScene.step()
  }else if(scene == SCENE.Gameover){
    gameoverScene.step()
  }else{

  }

  draw()
}

const draw = _ => {//描画パート
  ctx.fillStyle = "black"
  ctx.clearRect(0, 0, 1280, 960)

  if(scene==SCENE.Title){
    titleScene.draw()
  }else if(scene== SCENE.StageSelect){
    selectScene.draw()
  }else if(scene== SCENE.Game){
    gameScene.draw()
  }else if(scene == SCENE.Gameover){
    gameoverScene.draw()
  }else{

  }
}