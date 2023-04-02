/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("scd", "./Stage/costumes/scd.svg", { x: 240, y: 180 })
    ];

    this.sounds = [new Sound("μπουμ", "./Stage/sounds/μπουμ.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.vars.score = 52;
    this.vars.dead = 1;
    this.vars.speed = 13;
    this.vars.counter = 31;
    this.vars.turbo = 0;
    this.vars.start = 1;
    this.vars.done = 1;
    this.vars.brightness = 80;
    this.vars.currentMode = "night";
    this.vars.myBestScore = 83;
    this.vars.showHideEffect = 1;
    this.vars.GlobalScore = 5280;
    this.vars.controls = [0, 0];
  }

  *whenGreenFlagClicked() {
    this.vars.score = 0;
    this.vars.currentMode = "night";
    this.vars.brightness = 80;
    this.vars.turbo = 0;
    this.vars.counter = 0;
    this.vars.dead = 0;
    this.restartTimer();
    while (!(this.compare(this.timer, 1) > 0)) {
      this.vars.counter++;
      yield;
    }
    if (this.compare(this.vars.counter, 60) > 0) {
      this.vars.turbo = 1;
      this.vars.start = 0;
    } else {
      this.vars.turbo = 0;
      this.broadcast("ok");
    }
  }

  *convertToDay() {
    if (this.toString(this.vars.currentMode) === "night") {
      for (let i = 0; i < 16; i++) {
        this.vars.brightness -= 5;
        yield;
      }
      this.vars.currentMode = "day";
    }
    yield* this.wait(5);
  }

  *convertToNight() {
    if (this.toString(this.vars.currentMode) === "day") {
      for (let i = 0; i < 16; i++) {
        this.vars.brightness += 5;
        yield;
      }
      this.vars.currentMode = "night";
    }
    yield* this.wait(5);
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.effects.brightness = 0 - this.toNumber(this.vars.brightness);
      yield;
    }
  }

  *whenIReceiveReset() {
    this.vars.currentMode = "night";
    this.vars.brightness = 80;
    this.vars.score = 0;
  }

  *whenGreenFlagClicked3() {
    yield* this.wait(1);
    while (true) {
      if (this.toNumber(this.vars.start) === 1) {
        if (!(this.toNumber(this.vars.dead) === 1)) {
          if (Math.round(this.timer) % 35 === 0) {
            if (!(this.compare(this.timer, 2) < 0)) {
              if (this.toString(this.vars.currentMode) === "day") {
                yield* this.convertToNight();
              } else {
                yield* this.convertToDay();
              }
            }
          }
        }
      }
      yield;
    }
  }
}
