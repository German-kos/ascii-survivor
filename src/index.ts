import { CANVAS_SIZE } from "./constants/world-constants.js";
import { initializeDemoChunk } from "./game/grid-initializers.js";
import { Player } from "./game/player.js";
import {
  renderBackground,
  renderChunk,
  renderPlayer,
  rerenderWorld,
} from "./rendering/renderer.js";
// end of imports!

// TODO: Try to integrate colors for different types of blocks.
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();
const currentChunk: string[][] = initializeDemoChunk();

if (ctx) {
  canvas.width = CANVAS_SIZE.WIDTH;
  canvas.height = CANVAS_SIZE.HEIGHT;

  console.log("Finished setting up canvas");

  rerenderWorld(ctx, currentChunk, player);

  console.log("Finished drawing grid");

  addEventListener("keydown", (event) => {
    player.movePlayer(event, currentChunk, ctx, canvas);
    console.log("Player moved");
  });
}
