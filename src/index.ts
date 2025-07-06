import {
  CANVAS_SIZE,
  GRID_HEIGHT,
  GRID_WIDTH,
  TILE_CHARS,
} from "./constants/world-constants.js";
import { initializePlayerGrid } from "./game/grid-initializers.js";
import { Player } from "./game/player.js";
import { renderChunk, renderPlayer } from "./rendering/renderer.js";
// end of imports!

// TODO: Try to integrate colors for different types of blocks.

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();

// Player grid for demo
const playerGrid: string[][] = initializePlayerGrid(
  new Array(GRID_HEIGHT).fill([])
);

const currentChunk: string[][] = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
  if (y === 5) {
    currentChunk[y] = new Array(GRID_WIDTH).fill(TILE_CHARS.GRASS);
  } else {
    currentChunk[y] = new Array(GRID_WIDTH).fill(TILE_CHARS.ROCK);
  }
}

if (ctx) {
  canvas.width = CANVAS_SIZE.WIDTH;
  canvas.height = CANVAS_SIZE.HEIGHT;

  console.log("Finished setting up canvas");

  renderChunk(ctx, currentChunk);
  renderPlayer(ctx, playerGrid, player);

  console.log("Finished drawing grid");

  addEventListener("keydown", (event) => {
    player.movePlayer(event, currentChunk, ctx, canvas);
    console.log("Player moved");
  });
}
