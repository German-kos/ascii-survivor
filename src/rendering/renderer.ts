import {
  CELL_WIDTH,
  CELL_HEIGHT,
  TILE_CHARS,
  TILE_COLORS,
  FONT,
  TILE_BACKGROUNDS,
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
        y * CELL_HEIGHT + CELL_HEIGHT
      );
    });
  });
}

export function renderBackground(
  ctx: CanvasRenderingContext2D,
  chunk: string[][]
) {
  chunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = getTileBackground(cell);
      ctx.fillRect(
        x * CELL_WIDTH + CELL_WIDTH * 0.5,
        y * CELL_HEIGHT + CELL_HEIGHT * 0.5,
        CELL_WIDTH,
        CELL_HEIGHT
      );
    });
  });
}
export function renderPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  ctx.font = FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = getTileColor(TILE_CHARS.PLAYER);
  ctx.fillText(
    TILE_CHARS.PLAYER,
    player.x * CELL_WIDTH + CELL_WIDTH,
    player.y * CELL_HEIGHT + CELL_HEIGHT
  );
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

function getTileBackground(tile: string): string {
  const tileKey = Object.keys(TILE_CHARS).find(
    (key) => TILE_CHARS[key as keyof typeof TILE_CHARS] === tile
  ) as keyof typeof TILE_BACKGROUNDS | undefined;
  return tileKey ? TILE_BACKGROUNDS[tileKey] : "white";
}

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  chunk: string[][],
  player: Player
) {
  clearCanvas(ctx, ctx.canvas);
  // TODO: Add render background here when implemented
  renderBackground(ctx, chunk);
  renderChunk(ctx, chunk, {
    playerX: player.x,
    playerY: player.y,
  });
  renderPlayer(ctx, player);
}
