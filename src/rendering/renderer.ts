import {
  CELL_WIDTH,
  CELL_HEIGHT,
  TILE_CHARS,
  TILE_COLORS,
  FONT,
} from "../constants/world-constants.js";
import { Player } from "../game/player.js";

export function renderChunk(
  ctx: CanvasRenderingContext2D,
  chunk: string[][],
  playerPosition?: { playerX: number; playerY: number }
) {
  chunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (x === playerPosition?.playerX && y === playerPosition?.playerY) {
        //skip rendering the block under the player
        return;
      }
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = getTileColor(cell);
      ctx.fillText(
        cell,
        x * CELL_WIDTH + CELL_WIDTH,
        y * CELL_HEIGHT + CELL_HEIGHT * 1.9
      );
    });
  });
}

export function renderPlayer(
  ctx: CanvasRenderingContext2D,
  playerGrid: string[][],
  player: Player
) {
  console.log("I am here");
  playerGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (x === player.x && y === player.y) {
        cell = TILE_CHARS.PLAYER; // Use the player's character
      }
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = getTileColor(cell);
      ctx.fillText(
        cell,
        x * CELL_WIDTH + CELL_WIDTH,
        y * CELL_HEIGHT + CELL_HEIGHT * 1.9
      );
    });
  });
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getTileColor(tile: string): string {
  const tileKey = Object.keys(TILE_CHARS).find(
    (key) => TILE_CHARS[key as keyof typeof TILE_CHARS] === tile
  ) as keyof typeof TILE_COLORS | undefined;
  return tileKey ? TILE_COLORS[tileKey] : "white"; // Default to white if no color is found
}
