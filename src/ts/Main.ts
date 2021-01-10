import {Container} from 'pixi.js'
import {Preloader} from './Preloader'
import {HelloDragonBones} from './HelloDragonBones'

export class Main extends Container {
  private readonly preloader: Preloader
  private currentDemo: Container
  constructor() {
    super()
    this.preloader = new Preloader(this.onAssetsLoaded.bind(this))
    this.addChild(this.preloader)
  }

  // we only have the one animation for now
  private onAssetsLoaded() {
    this.removeChild(this.preloader)
    this.preloader.destroy({children: true})

    this.currentDemo = new HelloDragonBones()
    this.addChild(this.currentDemo)
  }
}
