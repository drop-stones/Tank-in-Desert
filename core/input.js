const keys = {}
const mouse = {}
for (let i = 0; i < 26; i++) {
  keys[String.fromCharCode(97 + i)] = false
}
for (let i = 0; i < 10; i++) {
  keys[String.fromCharCode(48 + i)] = false
}
keys.space = false
keys.enter = false
keys.shift = false
keys.up = false
keys.down = false
keys.left = false
keys.right = false
mouse.left = false
mouse.right = false
mouse.center = false
mouse.x = 0
mouse.y = 0

// ここでkeyCodeとkeysオブジェクトの対応付けを行なっています
// 対応付けをサボってるので全部のキーはサポートされていません
const KeyDown = e => {
  console.log(e.code)
  keys[e.code]=true
}
const KeyUp = e => {
  keys[e.code]=false
}

// マウスとスマホまわり
const MouseMove = e => {
  mouse.x = e.clientX - 7
  mouse.y = e.clientY - 7
}
const MouseUpDown = e => {
  const data = e.buttons
  mouse.left = ((data & 0x0001) ? true : false)
  mouse.right = ((data & 0x0002) ? true : false)
  mouse.center = ((data & 0x0002) ? true : false)
}
const TapDown = e => {
  mouse.left = true
  let touchObject = e.changedTouches[0]
  mouse.x = touchObject.pageX
  mouse.y = touchObject.pageY
}
const TapUp = _ => {
  mouse.left = false
}
const getMouse = _ => {
  return mouse
}
const getKeys = _ => {
  return keys
}

// キーボード用のイベント
document.addEventListener("keyup", KeyUp)
document.addEventListener("keydown", KeyDown)

if (document.addEventListener) {
  // ここでデバイスがスマホかどうか判定してます
  // スマホだったらtouchイベント、違ったらmouseイベント
  if (window.ontouchstart === undefined) {
    document.addEventListener("mousemove", MouseMove)
    document.addEventListener("mousedown", MouseUpDown)
    document.addEventListener("mouseup", MouseUpDown)
  } else {
    document.addEventListener("touchstart", TapDown)
    document.addEventListener("touchend", TapUp)
  }
}
else if (document.attachEvent) {
  if (window.ontouchstart === undefined) {
    document.attachEvent("mousemove", MouseMove)
    document.attachEvent("mousedown", MouseUpDown)
    document.attachEvent("mouseup", MouseUpDown)
  } else {
    document.attachEvent("touchstart", TapDown)
    document.attachEvent("touchend", TapUp)
  }
}