import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cloud from "./Cloud/Cloud.js";
import Cactus from "./Cactus/Cactus.js";
import Reset from "./Reset/Reset.js";
import Splash from "./Splash/Splash.js";
import Birds from "./Birds/Birds.js";
import TurboM from "./TurboM/TurboM.js";
import GameOver from "./GameOver/GameOver.js";
import Dino from "./Dino/Dino.js";
import Ground from "./Ground/Ground.js";
import Progressbar from "./Progressbar/Progressbar.js";
import TextEngine from "./TextEngine/TextEngine.js";
import Borders from "./Borders/Borders.js";
import ControlsHelp from "./ControlsHelp/ControlsHelp.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cloud: new Cloud({
    x: 214,
    y: 104,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Cactus: new Cactus({
    x: -105,
    y: -9,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Reset: new Reset({
    x: 0,
    y: -50,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Splash: new Splash({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 13
  }),
  Birds: new Birds({
    x: 0,
    y: 46,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  TurboM: new TurboM({
    x: -103,
    y: -130,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11
  }),
  GameOver: new GameOver({
    x: 0,
    y: 56,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  Dino: new Dino({
    x: -187,
    y: -20,
    direction: 90,
    costumeNumber: 4,
    size: 100,
    visible: true,
    layerOrder: 9
  }),
  Ground: new Ground({
    x: 263,
    y: -13,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Progressbar: new Progressbar({
    x: 246,
    y: -174,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 7
  }),
  TextEngine: new TextEngine({
    x: -235,
    y: 150,
    direction: 90,
    costumeNumber: 11,
    size: 50,
    visible: false,
    layerOrder: 8
  }),
  Borders: new Borders({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 101,
    visible: true,
    layerOrder: 12
  }),
  ControlsHelp: new ControlsHelp({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 5,
    size: 100,
    visible: false,
    layerOrder: 10
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
