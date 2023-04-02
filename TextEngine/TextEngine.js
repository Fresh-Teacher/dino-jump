/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TextEngine extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./TextEngine/costumes/1.svg", {
        x: 9.914449999999988,
        y: 39.27887499999997
      }),
      new Costume("2", "./TextEngine/costumes/2.svg", {
        x: 17.1850575,
        y: 38.60028299999999
      }),
      new Costume("3", "./TextEngine/costumes/3.svg", {
        x: 14.76152375000001,
        y: 36.941192090909055
      }),
      new Costume("4", "./TextEngine/costumes/4.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("5", "./TextEngine/costumes/5.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("6", "./TextEngine/costumes/6.svg", {
        x: 17.1850575,
        y: 38.60028299999999
      }),
      new Costume("7", "./TextEngine/costumes/7.svg", {
        x: 17.1850575,
        y: 38.60028299999999
      }),
      new Costume("8", "./TextEngine/costumes/8.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("9", "./TextEngine/costumes/9.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("0", "./TextEngine/costumes/0.svg", {
        x: 17.1850575,
        y: 38.60028299999999
      }),
      new Costume("T", "./TextEngine/costumes/T.svg", {
        x: 17.1850575,
        y: 38.60028299999999
      }),
      new Costume("O", "./TextEngine/costumes/O.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("P", "./TextEngine/costumes/P.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("H", "./TextEngine/costumes/H.svg", {
        x: 17.185057500000028,
        y: 38.60028299999999
      }),
      new Costume("I", "./TextEngine/costumes/I.svg", {
        x: 7.490922500000011,
        y: 38.60028299999999
      }),
      new Costume(" ", "./TextEngine/costumes/ .svg", {
        x: -0.00003249999997478881,
        y: -0.000017000000013922545
      })
    ];

    this.sounds = [new Sound("pop", "./TextEngine/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.vars.i = 0;
  }

  *showAtXY(text, x, y) {
    this.goto(this.toNumber(x), this.toNumber(y));
    this.vars.i = this.toString(text).length;
    for (let i = 0; i < this.toString(text).length; i++) {
      this.costume = this.letterOf(text, this.vars.i - 1);
      this.stamp();
      this.x -= 15;
      this.vars.i--;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (
        this.toNumber(this.stage.vars.score) % 100 === 0 &&
        this.compare(this.stage.vars.score, 50) > 0
      ) {
        yield* this.broadcastAndWait("+100");
        yield* this.wait(1);
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.visible = false;
    this.size = 50;
    while (true) {
      this.effects.brightness = this.toNumber(this.stage.vars.brightness) / 1.5;
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      this.clearPen();
      if (this.toString(this.stage.vars.score).length === 1) {
        yield* this.showAtXY(
          "0000" + this.toString(this.stage.vars.score),
          220,
          150
        );
      } else {
        if (this.toString(this.stage.vars.score).length === 2) {
          yield* this.showAtXY(
            "000" + this.toString(this.stage.vars.score),
            220,
            150
          );
        } else {
          if (this.toString(this.stage.vars.score).length === 3) {
            yield* this.showAtXY(
              "00" + this.toString(this.stage.vars.score),
              220,
              150
            );
          } else {
            if (this.toString(this.stage.vars.score).length === 4) {
              yield* this.showAtXY(
                "0" + this.toString(this.stage.vars.score),
                220,
                150
              );
            } else {
              yield* this.showAtXY(this.stage.vars.score, 220, 150);
            }
          }
        }
      }
      if (this.toNumber(this.stage.vars.dead) === 1) {
        if (this.toString(this.stage.vars.myBestScore).length === 1) {
          yield* this.showAtXY(
            "HI " + ("0000" + this.toString(this.stage.vars.myBestScore)),
            110,
            150
          );
        } else {
          if (this.toString(this.stage.vars.myBestScore).length === 2) {
            yield* this.showAtXY(
              "HI " + ("000" + this.toString(this.stage.vars.myBestScore)),
              110,
              150
            );
          } else {
            if (this.toString(this.stage.vars.myBestScore).length === 3) {
              yield* this.showAtXY(
                "HI " + ("00" + this.toString(this.stage.vars.myBestScore)),
                110,
                150
              );
            } else {
              if (this.toString(this.stage.vars.myBestScore).length === 4) {
                yield* this.showAtXY(
                  "HI " + ("0" + this.toString(this.stage.vars.myBestScore)),
                  110,
                  150
                );
              } else {
                yield* this.showAtXY(
                  "HI " + this.toString(this.stage.vars.myBestScore),
                  110,
                  150
                );
              }
            }
          }
        }
        if (this.toString(this.stage.vars.GlobalScore).length === 1) {
          yield* this.showAtXY(
            "TOP " + ("0000" + this.toString(this.stage.vars.GlobalScore)),
            -100,
            150
          );
        } else {
          if (this.toString(this.stage.vars.GlobalScore).length === 2) {
            yield* this.showAtXY(
              "TOP " + ("000" + this.toString(this.stage.vars.GlobalScore)),
              -100,
              150
            );
          } else {
            if (this.toString(this.stage.vars.GlobalScore).length === 3) {
              yield* this.showAtXY(
                "TOP " + ("00" + this.toString(this.stage.vars.GlobalScore)),
                -100,
                150
              );
            } else {
              if (this.toString(this.stage.vars.GlobalScore).length === 4) {
                yield* this.showAtXY(
                  "TOP " + ("0" + this.toString(this.stage.vars.GlobalScore)),
                  -100,
                  150
                );
              } else {
                yield* this.showAtXY(
                  "TOP " + this.toString(this.stage.vars.GlobalScore),
                  -100,
                  150
                );
              }
            }
          }
        }
      }
      yield;
    }
  }
}
