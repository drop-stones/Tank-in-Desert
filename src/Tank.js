let R = 44
let MAXHEAT = 100
let DEG2RAD = Math.PI / 180
let WallRightBottom = 960
let new_shell

class Tank{
    constructor(x, y, type){
        this.x = x
        this.y = y
        this.r = R
        this.speed = 1
        this.dx = 0
        this.dy = 0
        this.s_angular_velocity = 1
        this.h_angular_velocity = 1
        this.s_angle = 0
        this.h_angle = 0
        this.heat = 0
        this.type = type
        this.reload = 3000
        this.nextShot = Date.now()
        this.shell_type = 0
        this.del = -1
        this.nextRotate = Date.now()
        loadImage("syatai" + this.type, "res/tank_" + this.type + "_syatai.png")
        loadImage("houdai" + this.type, "res/tank_" + this.type + "_houdai.png")
        loadImage("b_0", "res/bakuhatu_0.png")
        loadImage("b_1", "res/bakuhatu_1.png")
        loadImage("b_2", "res/bakuhatu_2.png")
        loadImage("b_3", "res/bakuhatu_3.png")
        loadImage("b_4", "res/bakuhatu_4.png")
        loadImage("b_5", "res/bakuhatu_5.png")
        loadImage("b_6", "res/bakuhatu_6.png")
        loadImage("b_7", "res/bakuhatu_7.png")
    }

    //Receive keyboard input and change dx, dy and s_angle
    input(){
        if(keyManager.isPressed("KeyW")){
            this.dx = this.speed * Math.cos(this.s_angle * DEG2RAD)
            this.dy = this.speed * Math.sin(this.s_angle * DEG2RAD)
        }
        else if(keyManager.isPressed("KeyS")){
            this.dx = -this.speed * Math.cos(this.s_angle * DEG2RAD)
            this.dy = -this.speed * Math.sin(this.s_angle * DEG2RAD)
        }
        else{
            this.dx = 0
            this.dy = 0
        }
        if(keyManager.isPressed("KeyA")){
            this.s_angle -= this.s_angular_velocity
        }
        if(keyManager.isPressed("KeyD")){
            this.s_angle += this.s_angular_velocity
        }
    }

    //Rotate the turret following the mouse pointer
    rotate(){
        if(this.target - this.h_angle >= 180){
            this.target -= 360
        }
        if(this.h_angle - this.target >= 180){
            this.target += 360
        }
        if(this.h_angle < this.target){
            this.h_angle += this.h_angular_velocity
        }
        if(this.h_angle > this.target){
            this.h_angle -= this.h_angular_velocity
        }
    }

    move(){
        this.x += this.dx
        this.y += this.dy
        if(this.type == "p"){
            gameScene.heat += (Math.abs(this.dx) + Math.abs(this.dy))*2
        }
    }

    onCollisionWall(){
        if((this.x + this.r + this.dx >= WallRightBottom && this.dx > 0) || (this.x - this.r + this.dx <= 0 && this.dx < 0)){
            this.dx = 0;
        }
        if((this.y - this.r + this.dy <= 0 && this.dy < 0) || (this.y + this.r + this.dy >= WallRightBottom && this.dy > 0)){
            this.dy = 0;
        }
    }

    changeShellType(){
        if(keyManager.isJustPressed("KeyQ")){
            this.shell_type = (this.shell_type + 1) % 3
        }
    }

    shoot(){
        if(this.type == "p"){
            if(Date.now() >= this.nextShot && mouseManager.isJustPressed("left")){
                if(this.shell_type > 0){
                    if(gameScene.remaining_shells[this.shell_type - 1] > 0){
                        new_shell = new Shell(this.x, this.y, this.h_angle, this.shell_type)
                        new_shell.init()
                        shells.push(new_shell)
                        this.nextShot = Date.now() + this.reload
                        if(--gameScene.remaining_shells[this.shell_type - 1] == 0){
                            this.shell_type = 0
                        }
                        gameScene.heat += 10
                    }
                }
                else{
                    new_shell = new Shell(this.x, this.y, this.h_angle, this.shell_type)
                    new_shell.init()
                    shells.push(new_shell)
                    this.nextShot = Date.now() + this.reload
                    gameScene.heat += 10
                }
            }
        }
        else if(Date.now() >= this.nextShot && Math.abs(this.target - this.h_angle) <= 1){
            new_shell = new Shell(this.x, this.y, this.h_angle, this.shell_type)
            new_shell.init()
            shells.push(new_shell)
            this.nextShot = Date.now() + this.reload
        }
    }

    onDestroy(){
        if(this.del >= 0){
            this.del++
        }
    }

    onOverheat(){
        if(gameScene.heat >= 1000){
            this.dx = 0
            this.dy = 0
            gameScene.emotion = 3
        }
    }

    onCollisionTanks(){
        tanks.forEach(element => {
            if(element != this && Math.sqrt((element.x + element.dx - this.x - this.dx) ** 2 + (element.y + element.dy - this.y - this.dy) ** 2) <= 89){
                element.dx = 0
                element.dy = 0
                this.dx = 0
                this.dy = 0
            }
        });
    }

    //ある壁と戦車の当たり判定
    tank_object_judge(ox, oy){
      //左辺
      if(P_L_dis(ox, oy, ox, oy+mapchip_h, this.x, this.y) > this.r && P_L_dis(ox, oy, ox, oy + mapchip_h, this.x + this.dx, this.y + this.dy) <= this.r){
        this.dx = 0
        this.dy = 0
      }
      //右辺
      if(P_L_dis(ox + mapchip_w, oy, ox+mapchip_w, oy + mapchip_h, this.x, this.y) > this.r && P_L_dis(ox + mapchip_w, oy, ox + mapchip_w, oy + mapchip_h, this.x+this.dx, this.y+this.dy) <= this.r){
        this.dx = 0
        this.dy = 0
      }
      //上辺
      if(P_L_dis(ox, oy, ox + mapchip_w, oy, this.x, this.y) > this.r && P_L_dis(ox, oy, ox + mapchip_w, oy, this.x + this.dx, this.y + this.dy) <= this.r){
        this.dx = 0
        this.dy = 0
      }
      //下辺
      if(P_L_dis(ox , oy + mapchip_h, ox + mapchip_w, oy + mapchip_h, this.x, this.y) > this.r && P_L_dis(ox, oy + mapchip_h, ox + mapchip_w, oy + mapchip_h, this.x + this.dx, this.y + this.dy) <= this.r){
        this.dx = 0
        this.dy = 0
      }
    }
  
    //全ての壁と戦車の当たり判定
    tank_map_judge(){
      for (let i = 0; i < 7; i++){
        for (let j = 0; j < 7; j++){
          if(gameScene.map.stage[j][i] == 1 || gameScene.map.stage[j][i] == 8){
            this.tank_object_judge(32 + mapchip_w * i, 32 + mapchip_h * j)
          }
        }
      }
    }

    setEnemyTarget(){
        if(Date.now() >= this.nextRotate){
            this.e_target = Math.random() * 359
            this.e_move = Math.random() - 0.5
            this.nextRotate = Date.now() + Math.random() * 2000 + 2000
        }
    }

    rotateEnemy(){
        if(this.e_target - this.s_angle >= 180){
            this.e_target -= 360
        }
        if(this.s_angle - this.e_target >= 180){
            this.e_target += 360
        }
        if(this.s_angle < this.e_target){
            this.s_angle += this.s_angular_velocity
        }
        if(this.s_angle > this.e_target){
            this.s_angle -= this.s_angular_velocity
        }
    }

    setEnemyMove(){
        if(this.e_move >= 0){
            this.dx = this.speed * Math.cos(this.s_angle * DEG2RAD)
            this.dy = this.speed * Math.sin(this.s_angle * DEG2RAD)
        }
        else{
            this.dx = -this.speed * Math.cos(this.s_angle * DEG2RAD)
            this.dy = -this.speed * Math.sin(this.s_angle * DEG2RAD)
        }
    }

    step(){
        if(this.del < 0){
            if(this.type == "p"){
                this.input()
                this.target = Math.atan2(grid.y - this.y, grid.x - this.x) / DEG2RAD
                this.changeShellType()
                this.onOverheat()
            }
            else{
                tanks.forEach(element => {
                    if(element.type == "p"){
                        this.target = Math.atan2(element.y - this.y, element.x - this.x) / DEG2RAD
                    }
                });
                this.setEnemyTarget()
                this.rotateEnemy()
                this.setEnemyMove()
            }
            this.rotate()
            this.onCollisionWall()
            this.onCollisionTanks()
            this.tank_map_judge()
            this.move()
            this.shoot()
        }
        else{
            this.onDestroy()
        }
    }

    draw(){
        drawRotatedImage("syatai" + this.type, this.x, this.y, this.s_angle)
        drawRotatedImage("houdai" + this.type, this.x, this.y, this.h_angle)
        if(0 <= this.del && this.del < 3){
            drawRotatedImage("b_0", this.x, this.y, this.s_angle);
        }else if(3 <= this.del && this.del < 6){
            drawRotatedImage("b_1", this.x, this.y, this.s_angle);
        }else if(6 <= this.del && this.del < 9){
            drawRotatedImage("b_2", this.x, this.y, this.s_angle);
        }else if(9 <= this.del && this.del < 12){
            drawRotatedImage("b_3", this.x, this.y, this.s_angle);
        }else if(12 <= this.del && this.del < 15){
            drawRotatedImage("b_4", this.x, this.y, this.s_angle);
        }else if(15 <= this.del && this.del < 18){
            drawRotatedImage("b_5", this.x, this.y, this.s_angle);
        }else if(18 <= this.del && this.del < 21){
            drawRotatedImage("b_6", this.x, this.y, this.s_angle);
        }else if(21 <= this.del && this.del < 24){
            drawRotatedImage("b_7", this.x, this.y, this.s_angle);
        }
    }
}