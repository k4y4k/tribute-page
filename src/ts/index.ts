import {settings, Application, PRECISION} from 'pixi.js'
import {Main} from './Main'

// Two constants to represent the ideal size of the game
export const WIDTH = 1024
export const HEIGHT = 1024

settings.STRICT_TEXTURE_CACHE = true // Forces you to load you stuff before using it
settings.PRECISION_FRAGMENT = PRECISION.HIGH // It says that this makes iOS looks better
settings.ANISOTROPIC_LEVEL = 16

const app = new Application({
  // forceCanvas: true,
  backgroundColor: 0xbada55,
  width: WIDTH,
  height: HEIGHT,
  resolution: window.devicePixelRatio ?? 1,
  autoDensity: true,
  autoStart: true,
  antialias: true,
  clearBeforeRender: true,
  resizeTo: document.getElementById('pixi-container'), // liquid rescale
})

document.getElementById('pixi-container').style.background = '#2d2d2d'
document.getElementById('pixi-container').appendChild(app.view)

app.stage.addChild(new Main())

// Add some events to handle resizing correctly
document.body.onload = () => {
  window.onresize = () => {
    // Guess the size of the window
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth ?? 0
    )
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight ?? 0
    )

    // If our renderer isn't set to resize, we do CSS magic to keep our game centered. Black bars will cover the rest
    if (!app.resizeTo) {
      const scale = Math.min(w / WIDTH, h / HEIGHT)
      app.view.style.width = Math.floor(scale * WIDTH) + 'px'
      app.view.style.height = Math.floor(scale * HEIGHT) + 'px'
      app.view.style.marginLeft = app.view.style.marginRight =
        (w - Math.floor(scale * WIDTH)) / 2 + 'px'
      app.view.style.marginTop = app.view.style.marginBottom =
        (h - Math.floor(scale * HEIGHT)) / 2 + 'px'
    }

    // emit a resize event, maybe somebody needs to change its position or size depending on the screen size
    app.stage.emit('resize', w, h)
  }
  window.onresize(null)
}

// Export our app object so we can access the stage and the ticker
export {app as App}
