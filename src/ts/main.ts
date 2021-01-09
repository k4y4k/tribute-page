import * as PIXI from 'pixi.js'

const htmlContainer = document.getElementById('pixi-container') as HTMLElement

// the following taken from one of the pixi demos lol

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  resizeTo: htmlContainer,
})

htmlContainer.appendChild(app.view)

// create a new Sprite from an image path
const bunny = PIXI.Sprite.from('../img/header.png')

// center the sprite's anchor point
bunny.anchor.set(0.5)

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2
bunny.y = app.screen.height / 2

app.stage.addChild(bunny)

// recentre sprite on window resize
// TODO: add throttling or risk melting my devices
window.onresize = () => {
  console.log('window resized')
  bunny.x = app.screen.width / 2
  bunny.y = app.screen.height / 2
}
