import { generateDemoChunk } from "./game/grid-initializers.js";
import { InteractiveCursor } from "./game/player/interactive-cursor.js";
import { Player } from "./game/player/player.js";
import { TileConfig } from "./game/tiles/tile-types.js";
import { configureCanvas } from "./rendering/canvas-utils.js";
import { renderWorld } from "./rendering/renderer.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();
const cursor = new InteractiveCursor(player);
const currentChunk: TileConfig[][] = generateDemoChunk();

if (ctx) {
  configureCanvas(canvas);
  renderWorld(ctx, currentChunk, player, cursor);
  addEventListener("keydown", (event) => {
    player.movePlayer(event, currentChunk, ctx, cursor);
    cursor.handleInput(event, player, ctx, currentChunk);
  });
}
