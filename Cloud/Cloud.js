/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloud extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cld1", "./Cloud/costumes/cld1.png", { x: 46, y: 18 })
    ];

    this.sounds = [new Sound("μπουμ", "./Cloud/sounds/μπουμ.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.goto(240, this.random(70, 140));
    this.visible = true;
    while (
      !(
        this.compare(this.x, -239) < 0 ||
        this.toNumber(this.stage.vars.dead) === 1
      )
    ) {
      this.effects.brightness =
        0 - this.toNumber(this.stage.vars.brightness) / 1.5;
      if (this.toNumber(this.stage.vars.start) === 1) {
        this.move(-1);
      }
      yield;
    }
    if (this.toNumber(this.stage.vars.dead) === 1) {
      while (!(this.toNumber(this.stage.vars.dead) === 0)) {
        yield;
      }
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    yield* this.wait(1.1);
    this.createClone();
    while (true) {
      yield* this.wait(this.random(8, 12));
      if (this.toNumber(this.stage.vars.dead) === 0) {
        this.createClone();
      }
      yield;
    }
  }
}
