/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GameOver extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ενδυμασία1", "./GameOver/costumes/ενδυμασία1.png", {
        x: 182,
        y: 10
      })
    ];

    this.sounds = [new Sound("μπουμ", "./GameOver/sounds/μπουμ.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 56);
    while (true) {
      this.effects.brightness = this.toNumber(this.stage.vars.brightness);
      if (this.toNumber(this.stage.vars.dead) === 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
      yield;
    }
  }
}
