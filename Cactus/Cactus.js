/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cactus extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Cactus/costumes/01.png", { x: 76, y: 81 }),
      new Costume("02", "./Cactus/costumes/02.png", { x: 22, y: 81 }),
      new Costume("03", "./Cactus/costumes/03.png", { x: 48, y: 79 }),
      new Costume("04", "./Cactus/costumes/04.png", { x: 42, y: 49 })
    ];

    this.sounds = [new Sound("μπουμ", "./Cactus/sounds/μπουμ.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *startAsClone() {
    this.goto(250, -15);
    this.costume = this.random(1, 4);
    this.visible = true;
    while (
      !(
        this.compare(this.x, -235) < 0 ||
        this.toNumber(this.stage.vars.dead) === 1
      )
    ) {
      this.move(0 - this.toNumber(this.stage.vars.speed));
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

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      this.effects.brightness = this.toNumber(this.stage.vars.brightness) / 1.5;
      yield;
    }
  }
}
