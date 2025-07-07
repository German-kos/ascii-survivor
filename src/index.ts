import {
  generateDemoChunk,
  initializeDemoChunk,
} from "./game/grid-initializers.js";
import { Player } from "./game/player.js";
import { TILE_CONFIG } from "./game/tiles/tile-config.js";
import { TileConfig } from "./game/tiles/tile-types.js";
import { configureCanvas } from "./rendering/canvas-utils.js";
import { renderWorld } from "./rendering/renderer.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();
// const currentChunk: string[][] = initializeDemoChunk();
const currentChunk: TileConfig[][] = generateDemoChunk();
// const tileKeys = Object.keys(TILE_CONFIG);
// console.log("Tile keys:", tileKeys);
// const keysByIndex = tileKeys[3];
// console.log("Tile key at index 3:", TILE_CONFIG[keysByIndex]);

if (ctx) {
  configureCanvas(canvas);
  renderWorld(ctx, currentChunk, player);
  addEventListener("keydown", (event) => {
    player.movePlayer(event, currentChunk, ctx, canvas);
  });
}
