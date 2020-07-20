//ゲームスタート時 0
//敵を倒した時 1
//弾切れ 2
//ヒートゲージ満タン 3
//ステージクリア 4
//ゲームオーバー　5

class Operator{
    constructor(){
        this.ox = 895//オペレーターの座標
        this.oy = 296
        this.wx = 945//ウィンドウの座標
        this.wy = 802
        this.gx = 32
        this.gy = 465
        loadImage("character", "res/character.png")
        loadImage("character_happy", "res/character_happy.png")
        loadImage("character_sad", "res/character_sad.png")
        loadImage("window_0", "res/window_0.png")
        loadImage("window_1", "res/window_1.png")
        loadImage("window_2", "res/window_2.png")
        loadImage("window_3", "res/window_3.png")
        loadImage("window_4", "res/window_4.png")
        loadImage("gameover", "res/gameover.png")
        loadImage("stageclear", "res/stageclear.png")
    }

    draw(number){
        if(number == 0){
            drawImage("character",this.ox, this.oy)
            drawImage("window_0", this.wx, this.wy)
        }else if(number == 1){
            drawImage("character",this.ox, this.oy)
            drawImage("window_1", this.wx, this.wy)
        }else if(number == 2){
            drawImage("character_sad",this.ox, this.oy)
            drawImage("window_2", this.wx, this.wy)
        }else if(number == 3){
            drawImage("character_sad",this.ox, this.oy)
            drawImage("window_3", this.wx, this.wy)
        }else if(number == 4){
            drawImage("character_happy",this.ox, this.oy)
            drawImage("window_4", this.wx, this.wy)
            drawImage("stageclear", this.gx, this.gy)
        }else if(number == 5){
            drawImage("character_sad",this.ox, this.oy)
            drawImage("gameover", this.gx, this.gy)
        }
    }
}