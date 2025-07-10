import { CELL_WIDTH, CELL_HEIGHT, FONT } from "../constants/rendering-constants.js";
import { InteractiveCursor } from "../game/player/interactive-cursor.js";
import { Player } from "../game/player/player.js";
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
      if (cell.type === "wall") {
        drawFullTile(ctx, cell, x, y);
        return;
      }
      if (cell.type === "dirt") {
        drawFullTile(ctx, cell, x, y);
        return;
      }
      if (cell.type === "grass") {
        drawGrassTile(ctx, cell, x, y);
        return;
      }
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = cell.color;
      ctx.fillText(
        cell.sprite,
        x * CELL_WIDTH + CELL_WIDTH * 0.5,
        y * CELL_HEIGHT + CELL_HEIGHT * 0.5
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
      ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
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
    player.x * CELL_WIDTH + CELL_WIDTH * 0.5,
    player.y * CELL_HEIGHT + CELL_HEIGHT * 0.5
  );
}

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  chunk: TileConfig[][],
  player: Player,
  cursor: InteractiveCursor
) {
  clearCanvas(ctx, ctx.canvas);
  renderBackground(ctx, chunk);
  renderChunk(ctx, chunk, {
    playerX: player.x,
    playerY: player.y,
  });
  renderPlayer(ctx, player);
  renderInteractiveCursor(ctx, cursor);
}

function drawGrassTile(
  ctx: CanvasRenderingContext2D,
  tile: TileConfig,
  x: number,
  y: number
) {
  const cellX = x * CELL_WIDTH;
  const cellY = y * CELL_HEIGHT;

  ctx.save();

  const scaleX = CELL_WIDTH / 9.5; // Adjust based on character width
  const scaleY = CELL_HEIGHT / 18; // Adjust based on character height

  ctx.scale(scaleX, scaleY);

  ctx.fillStyle = tile.color;
  ctx.font = "16px 'Courier New', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.fillText(tile.sprite, cellX / scaleX, cellY / scaleY);

  ctx.restore();
}

function drawFullTile(
  ctx: CanvasRenderingContext2D,
  cell: TileConfig,
  x: number,
  y: number
) {
  ctx.fillStyle = cell.color;
  ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

export function renderInteractiveCursor(
  ctx: CanvasRenderingContext2D,
  cursor: InteractiveCursor
) {
  ctx.strokeStyle = cursor.color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.5; //

  ctx.strokeRect(
    cursor.targetX * CELL_WIDTH,
    cursor.targetY * CELL_HEIGHT,
    CELL_WIDTH,
    CELL_HEIGHT
  );

  // Reset alpha to avoid affecting other renders
  ctx.globalAlpha = 1.0;
}
