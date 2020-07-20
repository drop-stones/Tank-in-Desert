let tanks = []
let shells = []
let p_exist
let e_exist

class GameScene{
  constructor(){
    this.stage
    this.operator = new Operator()
    this.emotion = 0 //オペレーターの描写の表示
    loadImage("mainui", "res/mainui.png")
  }

  onCollisionShells(){
    for(let i = 0; i < shells.length - 1; i++){
      for(let j = i + 1; j < shells.length; j++){
        if(Math.sqrt((shells[i].x - shells[j].x) ** 2 + (shells[i].y - shells[j].y) ** 2) <= 14){
          shells[i].bound = 0
          shells[j].bound = 0
        }
      }
    }
  }

  onHitTank(){
    for(let shell of shells){
      for(let tank of tanks){
        if(Math.sqrt((shell.x - tank.x) ** 2 + (shell.y - tank.y) ** 2) <= 60 && shell.del < 0){
          shell.bound = 0
          tank.del = 0
        } 
      }
    }
  }

  deleteShell(){
    for(let i in shells){
      if(shells[i].del > 18){
        shells.splice(i, 1)
      }
    }
  }

  deleteTank(){
    for(let i in tanks){
      if(tanks[i].del > 24){
        tanks.splice(i, 1)
        this.emotion = 1
      }
    }
  }

  judge_game(){//gameover,gameclearの判定
    p_exist = false
    e_exist = false
    tanks.forEach(element => {
      if(element.type == "p") p_exist = true
      if(element.type == "e") e_exist = true
    });
    if(p_exist == false){
      this.emotion = 5 //Gameover
    }else if(e_exist == false) this.emotion = 4 //Gameclear

    if(this.emotion == 4 || this.emotion == 5){
      shells = []
      if(keyManager.isJustPressed("Enter")){
        this.emotion = 0
        scene = SCENE.StageSelect
      }
    }
  }

  init(stageNumber){ //ステージセレクト決定時に呼ばれる、ステージ初期化用の関数
    this.heat = 0
    this.remaining_shells = [3, 3]
    switch(stageNumber){
      case 1:
        tanks=[]//配列の初期化
        shells=[]
        this.map = new Map(stageNumber)
        tanks.push(new Tank(100, 100, "p"))
        tanks.push(new Tank(800, 800, "e"))
        this.stage = 1
        break;
      case 2:
        tanks=[]//配列の初期化
        shells=[]
        this.map = new Map(stageNumber)
        tanks.push(new Tank(100, 100, "p"))
        tanks.push(new Tank(800, 800, "e"))
        tanks.push(new Tank(450, 450, "e"))
        this.stage = 2
        break;
      case 3:
        tanks=[]//配列の初期化
        shells=[]
        this.map = new Map(stageNumber)
        tanks.push(new Tank(100, 100, "p"))
        tanks.push(new Tank(850, 850, "e"))
        tanks.push(new Tank(150, 750, "e"))
        tanks.push(new Tank(750, 150, "e"))
        this.stage = 3
        break;
    }
  }

  step(){
    this.deleteShell()
    this.deleteTank()
    shells.forEach(element =>{
      element.step()
    });
    tanks.forEach(element => {
      element.step()
    });
    this.onCollisionShells()
    this.onHitTank()
    if(this.heat > 0){
      this.heat -= 0.7
    }

    this.judge_game()
  }

  draw(){
    drawImage("mainui", 0, 0)
    this.map.draw(this.stage)
    shells.forEach(element => {
      element.draw()
    });
    tanks.forEach(element => {
      element.draw()
    });
    this.operator.draw(this.emotion)
    ctx.font = "30px 'Agency'"
    ctx.fillText("" + this.remaining_shells[0], 1164, 250)
    ctx.fillText("" + this.remaining_shells[1], 1244, 250)
    ctx.fillStyle = "red"
    ctx.fillRect(966, 285 - this.heat * 0.25, 57, this.heat * 0.25)
  }
}