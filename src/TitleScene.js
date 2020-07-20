
class TitleScene{
  constructor(){
    loadImage("title","res/title.png")
  }

  step(){
    if(keyManager.isJustPressed("Enter")){
      scene=SCENE.StageSelect
    }
  }

  draw(){
    drawImage("title",0,0)
  }
  
}