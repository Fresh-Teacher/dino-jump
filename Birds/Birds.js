/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Birds extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("s3", "./Birds/costumes/s3.png", { x: 33, y: 25 }),
      new Costume("s2", "./Birds/costumes/s2.png", { x: 33, y: 37 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.goto(250, this.random(0, 100));
    this.visible = true;
    while (
      !(
        this.compare(this.x, -239) < 0 ||
        this.toNumber(this.stage.vars.dead) === 1
      )
    ) {
      this.move(0 - (this.toNumber(this.stage.vars.speed) + 2));
      if (this.touching(this.sprites["Dino"].andClones())) {
        this.stage.vars.dead = 1;
        this.broadcast("hit");
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

  *startAsClone2() {
    while (true) {
      this.effects.brightness = this.toNumber(this.stage.vars.brightness) / 1.5;
      if (this.toNumber(this.stage.vars.dead) === 0) {
        yield* this.wait(0.1);
        this.costumeNumber++;
      }
      yield;
    }
  }
}
