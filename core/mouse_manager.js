let mousePre = {}
let mouseNow = {}
let mouseNext = {}

class MouseManager {
  constructor() {
    this.mousePre = {}
    this.mouseNow = {}
    this.mouseNext = {}
  }

  // マウスポインタの状態を更新する
  // 定期的に呼び出す必要がある
  update() {
    this.mousePre = Object.assign({}, this.mouseNow)
    this.mouseNow = Object.assign({}, this.mouseNext)
    this.mouseNext = Object.assign({}, getMouse())
  }

  isPressed(key) {
    return this.mouseNow[key]
  }

  // クリックして離したらtrueを返す(基本これを使うことを推奨)
  // keyはクリックの種類(右・左・中央)
  isJustPressed(key) {
    return !this.mousePre[key] && this.mouseNow[key]
  }

  isJustReleased(key) {
    return this.mousePre[key] && !this.mouseNow[key]
  }

  // マウスの今の位置を取得する
  getNowMouse() {
    return this.mouseNow
  }
}