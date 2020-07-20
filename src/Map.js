class Map{
  constructor(stagename){
    
    if(stagename==1){
      this.stage=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,2,1,8,1,0,0],[0,4,7,1,8,0,0],[0,2,8,1,1,0,0],[0,4,5,5,6,0,0],[0,0,0,0,0,0,0]]
    }
    if(stagename==2){
      this.stage=[[0,2,1,1,1,0,0],[0,3,1,7,1,0,0],[0,3,1,4,6,0,0],[0,4,6,0,0,0,0],[0,0,0,2,8,0,0],[0,2,8,3,8,0,0],[0,3,8,8,8,0,0]]
    }
    if(stagename==3){
      this.stage=[[0,0,0,0,0,0,0],[0,2,8,2,8,0,0],[2,8,6,3,8,8,0],[4,6,0,4,5,6,0],[2,1,1,0,2,1,0],[4,7,1,2,1,6,0],[0,4,6,4,6,0,0]]
    }

    //戦車の半径
    this.tank_r=30
    //ステージの左上の角の座標
    this.stage_std_x=32
    this.stage_std_y=32
    //ステージの範囲
    this.border_x=mapchip_w*7
    this.border_y=mapchip_h*7
    //マップチップの読み込み
    loadImage("jimen","res/map_jimen.png")
    loadImage("syougai","res/map_syougai.png")
    loadImage("syougai_1","res/map_syougai_1.png")
    loadImage("jimen_nw","res/map_jimen_nw.png")
    loadImage("jimen_w","res/map_jimen_w.png")
    loadImage("jimen_sw","res/map_jimen_sw.png")
    loadImage("jimen_s","res/map_jimen_s.png")
    loadImage("jimen_se","res/map_jimen_se.png")
    loadImage("jimen_ne","res/map_jimen_ne.png")
  }
  
  //stage名からマップを作画する
  draw(){
    for (let i = 0; i < 7; i++){
      for (let j = 0; j < 7; j++){
        if(this.stage[j][i]==0){
          drawImage("jimen",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==1){
          drawImage("syougai",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==2){
          drawImage("jimen_nw",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==3){
          drawImage("jimen_w",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==4){
          drawImage("jimen_sw",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==5){
          drawImage("jimen_s",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==6){
          drawImage("jimen_se",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==7){
          drawImage("jimen_ne",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
        else if(this.stage[j][i]==8){
          drawImage("syougai_1",this.stage_std_x + mapchip_w*i,this.stage_std_y + mapchip_h*j);
        }
      }
    }
  }
}