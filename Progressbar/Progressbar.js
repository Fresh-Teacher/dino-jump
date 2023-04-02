/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Progressbar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Progressbar/costumes/costume1.png", {
        x: 24,
        y: 8
      })
    ];

    this.sounds = [new Sound("pop", "./Progressbar/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "begin" }, this.whenIReceiveBegin),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "ok" }, this.whenIReceiveOk)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.done = 0;
    this.stage.vars.start = 0;
    this.goto(-234, -174);
    for (let i = 0; i < 24; i++) {
      this.createClone();
      this.x += 20;
      yield;
    }
    this.stage.vars.done = 1;
  }

  *whenIReceiveBegin() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.visible = true;
    this.moveAhead();
    while (true) {
      if (this.toNumber(this.stage.vars.turbo) === 1) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveOk() {
    while (!(this.toNumber(this.stage.vars.done) === 1)) {
      yield;
    }
    this.stage.vars.start = 1;
    this.broadcast("begin");
  }
}
