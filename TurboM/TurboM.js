/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TurboM extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("warning", "./TurboM/costumes/warning.svg", { x: 138, y: 44 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-103, -130);
    while (true) {
      if (this.toNumber(this.stage.vars.turbo) === 1) {
        this.moveAhead();
        this.visible = true;
      } else {
        this.visible = false;
        return;
      }
      yield;
    }
  }
}
