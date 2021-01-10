import {Container, Loader, LoaderResource} from 'pixi.js'
import dragonBones from './vendor/dragonBones/dragonBones'
import {WIDTH, HEIGHT} from './index'

export class Preloader extends Container {
  private _armatureDisplay: dragonBones.PixiArmatureDisplay

  private preloader: Loader

  private allDragonBonesFiles = [
    // for HelloDragonBones
    'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_ske.json',
    'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.json',
    'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.png',
  ]

  private onComplete: Function

  public constructor(onComplete: Function) {
    super()

    this.onComplete = onComplete

    LoaderResource.setExtensionLoadType('dbbin', LoaderResource.LOAD_TYPE.XHR)
    LoaderResource.setExtensionXhrType(
      'dbbin',
      LoaderResource.XHR_RESPONSE_TYPE.BUFFER
    )

    this.preloader = new Loader()
    this.preloader.add([
      'assets/dragon/progress_bar/progress_bar_ske.json',
      'assets/dragon/progress_bar/progress_bar_tex.json',
      'assets/dragon/progress_bar/progress_bar_tex.png',
    ])
    this.preloader.onComplete.once(this.buildPreloader, this)
    this.preloader.load()
  }

  protected buildPreloader(): void {
    console.log('preloader loaded')
    const factory = dragonBones.PixiFactory.factory
    factory.parseDragonBonesData(
      this.preloader.resources[
        'assets/dragon/progress_bar/progress_bar_ske.json'
      ].data
    )
    factory.parseTextureAtlasData(
      this.preloader.resources[
        'assets/dragon/progress_bar/progress_bar_tex.json'
      ].data,
      this.preloader.resources[
        'assets/dragon/progress_bar/progress_bar_tex.png'
      ].texture
    )
    //
    this._armatureDisplay = factory.buildArmatureDisplay('progress_bar')
    this._armatureDisplay.x = 0.0
    this._armatureDisplay.y = 0.0
    this.addChild(this._armatureDisplay)
    // Add animation event listener.
    this._armatureDisplay.animation.gotoAndStopByProgress('idle', 0)
    this._armatureDisplay.x = WIDTH / 2
    this._armatureDisplay.y = HEIGHT / 2

    // Preloader built. Loading real assets...
    console.log('loading assets')
    Loader.shared.add(this.allDragonBonesFiles)
    const detach = Loader.shared.onProgress.add(this.onProgress, this)
    Loader.shared.onComplete.once(() => {
      Loader.shared.onProgress.detach(detach)

      this.onComplete()
    })

    Loader.shared.load()
    this._armatureDisplay.animation.play('idle')
  }

  onProgress(loader: Loader) {
    this._armatureDisplay.animation.gotoAndStopByProgress(
      'idle',
      loader.progress / 100
    )
  }
}
