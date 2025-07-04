import { CELL_WIDTH, CELL_HEIGHT } from "../constants/world-constants.js";

export function renderChunk(ctx: CanvasRenderingContext2D, chunk: string[][]) {
  chunk.forEach((row, y) => {
    row.forEach((cell, x) => {
      // Draw each cell in the grid
      ctx.fillText(cell, x * CELL_WIDTH, y * CELL_HEIGHT + 50);
    });
  });
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
