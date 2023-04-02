/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Splash extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bg", "./Splash/costumes/bg.svg", {
        x: 253.10011519859995,
        y: 188.8999985
      }),
      new Costume("bg2", "./Splash/costumes/bg2.svg", {
        x: 244.50048499999997,
        y: 185.30562999999998
      }),
      new Costume("Screenshot_4", "./Splash/costumes/Screenshot_4.svg", {
        x: 244.5000000000001,
        y: 185.30526315789476
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "begin" }, this.whenIReceiveBegin)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.goto(0, 0);
    this.visible = true;
  }

  *whenIReceiveBegin() {
    this.visible = false;
  }
}
