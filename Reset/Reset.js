/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Reset extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ενδυμασία1", "./Reset/costumes/ενδυμασία1.png", {
        x: 30,
        y: 29
      })
    ];

    this.sounds = [
      new Sound("jump and start", "./Reset/sounds/jump and start.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, -50);
    while (true) {
      this.effects.brightness = this.toNumber(this.stage.vars.brightness) / 1.5;
      if (this.toNumber(this.stage.vars.start) === 1) {
        if (this.toNumber(this.stage.vars.dead) === 0) {
          this.visible = false;
        } else {
          this.visible = true;
          if (this.keyPressed("any")) {
            if (this.toNumber(this.stage.vars.dead) === 1) {
              this.broadcast("reset");
              this.stage.vars.dead = 0;
            }
            yield* this.wait(0);
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.dead) === 1) {
        if (
          this.mouse.down &&
          this.compare(
            Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y),
            25
          ) < 0
        ) {
          this.broadcast("reset");
          this.stage.vars.dead = 0;
          yield* this.startSound("jump and start");
          while (!!this.mouse.down) {
            yield;
          }
        }
      }
      yield;
    }
  }
}
