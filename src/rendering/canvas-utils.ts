import { CANVAS_SIZE } from "../constants/constants.js";

export function configureCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE.WIDTH;
  canvas.height = CANVAS_SIZE.HEIGHT;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
    // ctx.imageSmoothingEnabled = true; // Remove if looks bad (supposed to smooth pixels);
  }
}
