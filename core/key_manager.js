let keyPre = {}
let keyNow = {}
let keyNext = {}


class KeyManager {
  constructor() {
    this.keyPre = {}
    this.keyNow = {}
    this.keyNext = {}
  }

  // キーの状態を更新する
  // 定期的に呼び出す必要がある
  update() {
    this.keyPre = Object.assign({}, this.keyNow)
    this.keyNow = Object.assign({}, this.keyNext)
    this.keyNext = Object.assign({}, getKeys())
  }

  // keyが押されたらtrueを返す
  isPressed(key) {
    return this.keyNow[key]
  }

  // keyを押して離したらtrueを返す
  isJustPressed(key) {
    return !this.keyPre[key] && this.keyNow[key]
  }

  // keyを離したらtrueを返す
  isJustReleased(key) {
    return this.keyPre[key] && !this.keyNow[key]
  }
}