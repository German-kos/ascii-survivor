import { initializeDemoChunk } from "./game/grid-initializers.js";
import { Player } from "./game/player.js";
import { configureCanvas } from "./rendering/canvas-utils.js";
import { rerenderWorld } from "./rendering/renderer.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();
const currentChunk: string[][] = initializeDemoChunk();

if (ctx) {
  configureCanvas(canvas);
  rerenderWorld(ctx, currentChunk, player);
  addEventListener("keydown", (event) => {
    player.movePlayer(event, currentChunk, ctx, canvas);
    console.log("Player moved");
  });
}
