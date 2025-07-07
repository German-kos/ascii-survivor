import { CELL_WIDTH, CELL_HEIGHT, FONT } from "../constants/world-constants.js";
import { Player } from "../game/player.js";
import { TileConfig } from "../game/tiles/index.js";

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderChunk(
  ctx: CanvasRenderingContext2D,
  chunk: TileConfig[][],
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
      ctx.fillStyle = cell.color;
      ctx.fillText(
        cell.sprite,
        x * CELL_WIDTH + CELL_WIDTH,
        y * CELL_HEIGHT + CELL_HEIGHT
      );
    });
  });
}

function renderBackground(
  ctx: CanvasRenderingContext2D,
  chunk: TileConfig[][]
) {
  chunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = cell.background;
      ctx.fillRect(
        x * CELL_WIDTH + CELL_WIDTH * 0.5,
        y * CELL_HEIGHT + CELL_HEIGHT * 0.5,
        CELL_WIDTH,
        CELL_HEIGHT
      );
    });
  });
}

function renderPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  ctx.font = FONT;
  ctx.fillStyle = player.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    player.sprite,
    player.x * CELL_WIDTH + CELL_WIDTH,
    player.y * CELL_HEIGHT + CELL_HEIGHT
  );
}

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  chunk: TileConfig[][],
  player: Player
) {
  clearCanvas(ctx, ctx.canvas);
  renderBackground(ctx, chunk);
  renderChunk(ctx, chunk, {
    playerX: player.x,
    playerY: player.y,
  });
  renderPlayer(ctx, player);
}
