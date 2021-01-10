import {Container, Sprite, Text} from 'pixi.js'
import {WIDTH, HEIGHT} from './index'
import dragonBones from './vendor/dragonBones/dragonBones'

export abstract class BaseDemo extends Container {
  protected readonly _resources: string[] = []

  public constructor() {
    super()
    dragonBones.PixiFactory.factory.clear()

    this.x = this.stageWidth * 0.5
    this.y = this.stageHeight * 0.5
  }

  public get stageWidth(): number {
    return WIDTH
  }

  public get stageHeight(): number {
    return HEIGHT
  }
}
