/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dino extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("run1", "./Dino/costumes/run1.png", { x: 32, y: 84 }),
      new Costume("run2", "./Dino/costumes/run2.png", { x: 32, y: 84 }),
      new Costume("jump", "./Dino/costumes/jump.png", { x: 32, y: 84 }),
      new Costume("lost", "./Dino/costumes/lost.png", { x: 32, y: 84 }),
      new Costume("duck.run1", "./Dino/costumes/duck.run1.png", {
        x: 38,
        y: 52
      }),
      new Costume("duck.run2", "./Dino/costumes/duck.run2.png", {
        x: 38,
        y: 52
      })
    ];

    this.sounds = [
      new Sound("hit", "./Dino/sounds/hit.wav"),
      new Sound("jump and start", "./Dino/sounds/jump and start.wav"),
      new Sound("100 score", "./Dino/sounds/100 score.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.BROADCAST, { name: "hit" }, this.whenIReceiveHit),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.BROADCAST, { name: "+100" }, this.whenIReceive100),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.BROADCAST, { name: "+100" }, this.whenIReceive101),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked6)
    ];

    this.vars.speedY = -17;
  }

  *whenGreenFlagClicked() {
    this.goto(-187, -20);
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        this.effects.brightness =
          this.toNumber(this.stage.vars.brightness) / 1.5;
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          this.y += this.toNumber(this.vars.speedY);
          if (this.compare(this.y, -19) < 0) {
            this.y = -20;
          } else {
            if (this.toNumber(this.itemOf(this.stage.vars.controls, 1)) === 1) {
              this.vars.speedY -= 6;
            } else {
              this.vars.speedY -= 2;
            }
          }
          if (this.toNumber(this.itemOf(this.stage.vars.controls, 0)) === 1) {
            this.vars.speedY = 15;
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.y = -20;
    this.vars.speedY = 0;
  }

  *whenIReceiveHit() {
    yield* this.startSound("hit");
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          if (this.toNumber(this.itemOf(this.stage.vars.controls, 0)) === 1) {
            yield* this.startSound("jump and start");
            while (
              !(this.toNumber(this.itemOf(this.stage.vars.controls, 0)) === 0)
            ) {
              yield;
            }
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.toNumber(this.stage.vars.start) === 1) {
        if (!(this.toNumber(this.stage.vars.dead) === 1)) {
          if (this.compare(this.y, -19) < 0) {
            if (this.toNumber(this.itemOf(this.stage.vars.controls, 1)) === 1) {
              yield* this.wait(0.05);
              this.costume = "duck.run2";
              if (
                this.toNumber(this.itemOf(this.stage.vars.controls, 1)) === 1
              ) {
                yield* this.wait(0.05);
                this.costume = "duck.run1";
              }
            } else {
              yield* this.wait(0.05);
              this.costume = "run1";
              if (
                this.toNumber(this.itemOf(this.stage.vars.controls, 1)) === 0
              ) {
                yield* this.wait(0.05);
                this.costume = "run2";
              }
            }
          } else {
            this.costume = "jump";
          }
        } else {
          this.costume = "lost";
        }
      }
      yield;
    }
  }

  *whenIReceive100() {
    if (this.toNumber(this.stage.vars.start) === 1) {
      yield* this.startSound("100 score");
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      if (
        this.toNumber(this.stage.vars.start) === 1 &&
        !(this.toNumber(this.stage.vars.dead) === 1)
      ) {
        yield* this.wait(0.05);
        this.stage.vars.score++;
      }
      yield;
    }
  }

  *whenIReceive101() {
    for (let i = 0; i < 5; i++) {
      this.stage.vars.showHideEffect = 0;
      yield* this.wait(0.2);
      this.stage.vars.showHideEffect = 1;
      yield* this.wait(0.2);
      yield;
    }
  }

  *whenGreenFlagClicked5() {
    this.stage.vars.controls = [];
    this.stage.vars.controls.push(0);
    this.stage.vars.controls.push(0);
    while (true) {
      if (
        this.compare(this.y, -19) < 0 &&
        (this.keyPressed("space") ||
          this.keyPressed("up arrow") ||
          (this.mouse.down && this.compare(0, this.mouse.x) < 0)) &&
          !this.keyPressed("down arrow")
      ) {
        this.stage.vars.controls.splice(0, 1, 1);
      } else {
        this.stage.vars.controls.splice(0, 1, 0);
      }
      if (
        this.keyPressed("down arrow") ||
        (this.mouse.down && this.compare(this.mouse.x, 0) < 0)
      ) {
        this.stage.vars.controls.splice(1, 1, 1);
      } else {
        this.stage.vars.controls.splice(1, 1, 0);
      }
      yield;
    }
  }

  *whenGreenFlagClicked6() {
    while (true) {
      if (
        this.compare(this.stage.vars.score, this.stage.vars.myBestScore) > 0
      ) {
        this.stage.vars.myBestScore = this.stage.vars.score;
      }
      if (
        this.compare(this.stage.vars.score, this.stage.vars.GlobalScore) > 0
      ) {
        this.stage.vars.GlobalScore = this.stage.vars.score;
      }
      yield;
    }
  }
}
