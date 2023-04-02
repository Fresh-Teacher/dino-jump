/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Borders extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Screenshot_1", "./Borders/costumes/Screenshot_1.png", {
        x: 480,
        y: 360
      }),
      new Costume("Screenshot_2", "./Borders/costumes/Screenshot_2.svg", {
        x: 14,
        y: 10
      })
    ];

    this.sounds = [new Sound("pop", "./Borders/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "begin" }, this.whenIReceiveBegin)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
    this.moveAhead();
    this.size = 101;
  }

  *whenIReceiveBegin() {
    this.visible = true;
  }
}
