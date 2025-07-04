import {
  CELL_HEIGHT,
  CELL_WIDTH,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "./constants/world-constants.js";
import { Player } from "./game/player.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const player = new Player();

if (ctx) {
  ctx.fillStyle = "white";
}

// Chunk grid, initialized with empty arrays:
const currentChunk: string[][] = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
  if (y === 5) {
    currentChunk[y] = new Array(GRID_WIDTH).fill("O"); // Fill row 5 with "O" for testing "player.standingOn"
  } else {
    currentChunk[y] = new Array(GRID_WIDTH).fill("X");
  }
}

// Make sure the canvas isn't null
if (ctx) {
  ctx.font = "16px monospace";
  ctx.fillText("Welcome to ASCII Survivor!", 10, 30);

  currentChunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Draw each cell in the grid
      ctx.fillText(cell, x * CELL_WIDTH, y * CELL_HEIGHT + 50);
    });
  });

  addEventListener("keydown", (event) => {
    player.handleMove(event, currentChunk, ctx, canvas);
  });
}
