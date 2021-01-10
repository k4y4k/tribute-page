import {BaseDemo} from './BaseDemo'
import dragonBones from './vendor/dragonBones/dragonBones'
import {Loader} from 'pixi.js'

/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */

export class HelloDragonBones extends BaseDemo {
  public constructor() {
    super()

    const factory = dragonBones.PixiFactory.factory

    console.log(factory.parseDragonBonesData(this))
    console.log(this)

    factory.parseDragonBonesData(
      Loader.shared.resources[
        'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_ske.json'
      ].data
    )

    factory.parseTextureAtlasData(
      Loader.shared.resources[
        'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.json'
      ].data,
      Loader.shared.resources[
        'assets/dragon/mecha_1002_101d_show/mecha_1002_101d_show_tex.png'
      ].texture
    )

    const armatureDisplay = factory.buildArmatureDisplay(
      'mecha_1002_101d',
      'mecha_1002_101d_show'
    )
    armatureDisplay.animation.play('idle')

    armatureDisplay.x = 0.0
    armatureDisplay.y = 200.0
    this.addChild(armatureDisplay)
  }
}
