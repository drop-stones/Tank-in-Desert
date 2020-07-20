class Shell{
    constructor(x, y, angle, snum){ //砲台の初期位置と角度、また砲弾の種類を引数にとる      
        this.x = x + Math.cos(Math.PI/180*angle)*80;
        this.y = y + Math.sin(Math.PI/180*angle)*80;;
        this.snum = snum;
        this.angle = angle;
        this.bound = 1;//残りのバウンド数
        this.del = -1;//del変数がtrueの場合,main.jsで定義したshell配列から消す(配列上の番号が大きい順に見ていく)
        this.Wallright = 928;
        this.Wallleft = 32;
        this.Wallup = 32;
        this.Walldown = 928;
        this.Shell_W = 10;
        this.Shell_H = 5;
        this.tyakudan_W = 64;
        this.tyakudan_H = 64;
        this.dx;
        this.dy;
        loadImage("bullet", "res/bullet.png");
        loadImage("bullet_b", "res/bullet_b.png")
        loadImage("bullet_r", "res/bullet_r.png")
        loadImage("t_0", "res/tyakudan_0.png");
        loadImage("t_1", "res/tyakudan_1.png");
        loadImage("t_2", "res/tyakudan_2.png");
        loadImage("t_3", "res/tyakudan_3.png");
    }

    //32*32から始まって,戦車が動くところは896*896の正方形
    //弾16*8

    init(){
        if(this.snum == 0){//砲弾の種類によって速度やバウンド回数を分ける
            this.dx = Math.cos(Math.PI/180*this.angle)*7;
            this.dy = Math.sin(Math.PI/180*this.angle)*7;
            this.bound = 1;
        }
        if(this.snum == 1){//跳ね返る回数が多い砲弾
            this.dx = Math.cos(Math.PI/180*this.angle)*7;
            this.dy = Math.sin(Math.PI/180*this.angle)*7;
            this.bound = 5;
        }
        if(this.snum == 2){//弾速が速い砲弾
            this.dx = Math.cos(Math.PI/180*this.angle)*12;
            this.dy = Math.sin(Math.PI/180*this.angle)*12;
            this.bound = 2;
        }
    }
    
    step(){
        //ここに衝突時の処理を書く
        this.hit_wall();
        this.shell_map_judge();

        if(this.bound <= 0){
            this.del++;
            this.dx = 0;
            this.dy = 0;
        }

        if(this.del >= 0){
            this.del++;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    draw(){//delの値によって爆発モーション表示して、砲弾の種類によって表示する画像を分ける,角度に応じて画像を回転させる
        if(0 <= this.del && this.del < 3){
            drawRotatedImage("t_0", this.x, this.y, this.angle);
        }else if(3 <= this.del && this.del <  6){
            drawRotatedImage("t_1", this.x, this.y, this.angle);
        }else if(6 <= this.del && this.del < 9){
            drawRotatedImage("t_2", this.x, this.y, this.angle);
        }else if(9 <= this.del && this.del <= 18){
            drawRotatedImage("t_3", this.x, this.y, this.angle);
        }else if(this.snum == 0){
            drawRotatedImage("bullet", this.x, this.y, this.angle);
        }else if(this.snum == 1){
            drawRotatedImage("bullet_b", this.x, this.y, this.angle);
        }else if(this.snum == 2){
            drawRotatedImage("bullet_r", this.x, this.y, this.angle);
        }
    }

    hit_wall(){//壁との衝突判定と処理
        if(this.x >= this.Wallright || this.x <= this.Wallleft){//Wallrightは右の壁の位置,Wallleftは左の壁の位置
            this.dx = -this.dx;
            this.angle = 180 - this.angle;//弾を回転させる
            this.bound--;
        }

        if(this.y <= this.Wallup || this.y >= this.Walldown){//Wallupは上の壁の位置,Walldownは下の壁の位置
            this.dy = -this.dy;
            this.angle = -this.angle;//弾を回転させる
            this.bound--;
        }
    }

     //直線と線分が交わるかの判定
     l_l_pos(xa,ya,xb,yb,xp,yp,xq,yq){
      if(xp==xq){
        if(xa!=xb){ 
          if((xa <= xp&&xp <= xb)||(xb <= xp&&xp <=xa)){
            this.yl=(((Math.abs(xb-xp))*ya+(Math.abs(xa-xp))*yb)/(Math.abs(xb-xa)))
            if(yp <= this.yl&&this.yl <=yq){
              return true
            }
          }
        }
      }
      if(yp==yq){
        if(ya!=yb){
          if((ya <= yp&&yp <=yb)||(yb <= yp&&yp <= ya)){
            this.xl=(((Math.abs(yb-yp))*xa+(Math.abs(ya-yp))*xb)/(Math.abs(yb-ya)))
            if(xp <= this.xl&&this.xl <=xq){
              return true
            }
          }
        }
      }
    }

    //ある障害物と弾の当たり判定
    shell_object_judge(ox,oy){
      let x_collision=false
      let y_collision=false
      let x_dis
      let y_dis

      //左辺
      if(this.l_l_pos(this.x,this.y,this.x+this.dx,this.y+this.dy,ox,oy,ox,oy+mapchip_h)){
        x_collision=true
        x_dis=P_L_dis(ox,oy,ox,oy+mapchip_h,this.x,this.y)
      }
      //右辺
      if(this.l_l_pos(this.x,this.y,this.x+this.dx,this.y+this.dy,ox+mapchip_w,oy,ox+mapchip_w,oy+mapchip_h)){
        x_collision=true
        x_dis=Math.min(x_dis,P_L_dis(ox+mapchip_w,oy,ox+mapchip_w,oy+mapchip_h,this.x,this.y))
      }
      //上辺
      if(this.l_l_pos(this.x,this.y,this.x+this.dx,this.y+this.dy,ox,oy,ox+mapchip_w,oy)){
        y_collision=true
        y_dis=P_L_dis(ox,oy,ox+mapchip_w,oy,this.x,this.y)
      }
      //下辺
      if(this.l_l_pos(this.x,this.y,this.x+this.dx,this.y+this.dy,ox,oy+mapchip_h,ox+mapchip_w,oy+mapchip_h)){
        y_collision=true
        y_dis=Math.min(y_dis,P_L_dis(ox,oy+mapchip_h,ox+mapchip_w,oy+mapchip_h,this.x,this.y))
      }
    
      if(x_collision&&y_collision){
        if(x_dis < y_dis){
          this.dx=-this.dx
          this.angle = 180 -this.angle
          this.bound--
        }else{
          this.dy=-this.dy
          this.angle = -this.angle
          this.bound--
        }
      }else if(x_collision){
        this.dx=-this.dx
        this.angle = 180 -this.angle
        this.bound--
      }else if(y_collision){
        this.dy=-this.dy
        this.angle = -this.angle
        this.bound--
      }
    }

    //全ての障害物と弾の当たり判定
    shell_map_judge(){
      for (let i = 0; i < 7; i++){
        for (let j = 0; j < 7; j++){
          if(gameScene.map.stage[j][i]==1||gameScene.map.stage[j][i]==8){
            this.shell_object_judge(32 + mapchip_w*i,32 + mapchip_h*j)

          }
        }
      }
    }

}