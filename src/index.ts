import { InputHandler } from "./core/input-handler.js";
import { generateDemoChunk } from "./game/grid-initializers.js";
import { InteractiveCursor } from "./game/player/interactive-cursor.js";
import { Player } from "./game/player/player.js";
import { configureCanvas } from "./rendering/canvas-utils.js";
import { renderWorld } from "./rendering/renderer.js";
import { TileConfig } from "./types/interfaces.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();
const cursor = new InteractiveCursor(player);
const currentChunk: TileConfig[][] = generateDemoChunk();
const inputHandler = new InputHandler(player, cursor, currentChunk, ctx!);

if (ctx) {
  configureCanvas(canvas);
  renderWorld(ctx, currentChunk, player, cursor);
}
