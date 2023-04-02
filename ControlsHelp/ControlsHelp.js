/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ControlsHelp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./ControlsHelp/costumes/1.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("2", "./ControlsHelp/costumes/2.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("3", "./ControlsHelp/costumes/3.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("4", "./ControlsHelp/costumes/4.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("5", "./ControlsHelp/costumes/5.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("6", "./ControlsHelp/costumes/6.svg", {
        x: 234.0625,
        y: 174
      }),
      new Costume("7", "./ControlsHelp/costumes/7.svg", { x: 234.0625, y: 174 })
    ];

    this.sounds = [new Sound("pop", "./ControlsHelp/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    yield* this.wait(1.1);
    this.visible = true;
    for (let i = 0; i < 15; i++) {
      this.costumeNumber++;
      yield* this.wait(0.1);
      yield;
    }
    this.visible = false;
  }
}
