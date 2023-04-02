/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("qwerwf", "./Ground/costumes/qwerwf.png", { x: 54, y: 0 }),
      new Costume("uiyui", "./Ground/costumes/uiyui.png", { x: 55, y: 0 }),
      new Costume("vher", "./Ground/costumes/vher.png", { x: 52, y: 0 }),
      new Costume("456ryh", "./Ground/costumes/456ryh.png", { x: 53, y: 0 }),
      new Costume("uyj58ik", "./Ground/costumes/uyj58ik.png", { x: 51, y: 0 }),
      new Costume("q3r354", "./Ground/costumes/q3r354.png", { x: 54, y: 0 }),
      new Costume("8ily8", "./Ground/costumes/8ily8.png", { x: 54, y: 8 }),
      new Costume("tryi", "./Ground/costumes/tryi.png", { x: 52, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Ground/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset" },
        this.whenIReceiveReset2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *createLevel() {
    this.goto(-217, -13);
    this.visible = true;
    for (let i = 0; i < 13; i++) {
      this.createClone();
      this.x += 40;
      yield;
    }
    this.visible = false;
  }

  *startAsClone() {
    this.costume = this.random(1, 8);
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        this.effects.brightness =
          this.toNumber(this.stage.vars.brightness) / 1.5;
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          this.x += 0 - this.toNumber(this.stage.vars.speed);
          if (this.compare(this.x, -240) < 0) {
            this.costume = this.random(1, 8);
            this.goto(240, -13);
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          if (this.compare(this.stage.vars.speed, 13) < 0) {
            this.stage.vars.speed = 8 + this.timer / 40;
          } else {
            this.stage.vars.speed = 13;
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          if (this.compare(this.timer, 4) > 0) {
            if (this.compare(this.timer, 25) > 0) {
              if (this.compare(this.random(-2, 2), this.random(-2, 2)) === 0) {
                if (
                  this.compare(
                    this.random(
                      0 -
                        (9 -
                          Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                      9 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                    ),
                    this.random(
                      0 -
                        (9 -
                          Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                      9 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                    )
                  ) === 0
                ) {
                  this.sprites["Birds"].createClone();
                  yield* this.wait(1);
                }
              } else {
                if (
                  this.compare(
                    this.random(
                      0 -
                        (7 -
                          Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                      7 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                    ),
                    this.random(
                      0 -
                        (7 -
                          Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                      7 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                    )
                  ) === 0
                ) {
                  this.sprites["Cactus"].createClone();
                  yield* this.wait(1);
                }
              }
            } else {
              if (
                this.compare(
                  this.random(
                    0 -
                      (11 -
                        Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                    11 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                  ),
                  this.random(
                    0 -
                      (11 -
                        Math.round(this.toNumber(this.stage.vars.speed) / 5)),
                    11 - Math.round(this.toNumber(this.stage.vars.speed) / 5)
                  )
                ) === 0
              ) {
                this.sprites["Cactus"].createClone();
                yield* this.wait(1);
              }
            }
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *whenIReceiveReset2() {
    this.restartTimer();
    yield* this.createLevel();
  }

  *whenGreenFlagClicked3() {
    yield* this.wait(0.1);
    yield* this.createLevel();
  }
}
