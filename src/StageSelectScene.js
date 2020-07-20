
const stageSize=3

class StageSelectScene{
  constructor(){
    this.nowSelected=1
    this.haba = 248
    this.stage_x = 60
    this.stage1_y = 200
    loadImage("stage", "res/stage.png")    
    loadImage("yajirushi", "res/yajirushi.png")
  }

  step(){
    if(keyManager.isJustPressed("ArrowUp")){
      this.nowSelected--;
      if(this.nowSelected < 1)this.nowSelected=1
    }
    if(keyManager.isJustPressed("ArrowDown")){
      this.nowSelected++;
      if(this.nowSelected > stageSize)this.nowSelected=stageSize
    }
    if(keyManager.isJustPressed("Enter")){
      gameScene.init(this.nowSelected)
      scene=SCENE.Game
    }
  }

  draw(){
    drawImage("stage", 0, 0)
    if(this.nowSelected == 1){
      drawImage("yajirushi", this.stage_x, this.stage1_y)
    }else if(this.nowSelected == 2){
      drawImage("yajirushi", this.stage_x, this.stage1_y + this.haba)
    }else if(this.nowSelected == 3){
      drawImage("yajirushi", this.stage_x, this.stage1_y + this.haba * 2)
    }
  }
}