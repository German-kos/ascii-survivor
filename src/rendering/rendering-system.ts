import { CANVAS_SIZE, CELL_SIZE, FONT } from "../constants/index.js";
import {
  CursorRenderingParams,
  PlayerRenderingParams,
  Position,
  TileConfig,
} from "../types/index.js";

export class RenderingSystem {
  private canvas: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.querySelector("canvas")!.getContext("2d")!;

    this.canvas.canvas.width = CANVAS_SIZE.WIDTH;
    this.canvas.canvas.height = CANVAS_SIZE.HEIGHT;
  }

  render(
    chunk: TileConfig[][],
    playerRenderingParams: PlayerRenderingParams,
    cursorRenderingParams: CursorRenderingParams
  ): void {
    this.clearCanvas();
    this.renderBackground(chunk);
    this.renderChunk(chunk, playerRenderingParams.position);
    this.renderPlayer(playerRenderingParams);
    this.renderInteractiveCursor(cursorRenderingParams);
  }

  private renderChunk(chunk: TileConfig[][], playerPosition?: Position): void {
    chunk.forEach((row, y) => {
      row.forEach((cell, x) => {
        const position: Position = { x, y };
        if (x === playerPosition?.x && y === playerPosition?.y) {
          //skip rendering the block under the player
          return;
        }
        if (cell.type === "wall" || cell.type === "dirt") {
          this.drawFullTile(cell, position);
          return;
        }
        if (cell.type === "grass") {
          this.drawGrassTile(cell, position);
          return;
        }
        this.drawTile(cell, position);
      });
    });
  }

  private renderBackground(chunk: TileConfig[][]) {
    chunk.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.canvas.font = FONT;
        this.canvas.textAlign = "center";
        this.canvas.textBaseline = "middle";
        this.canvas.fillStyle = cell.background;
        this.canvas.fillRect(
          x * CELL_SIZE.WIDTH,
          y * CELL_SIZE.HEIGHT,
          CELL_SIZE.WIDTH,
          CELL_SIZE.HEIGHT
        );
      });
    });
  }

  private clearCanvas(): void {
    this.canvas.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  }

  private renderPlayer(params: PlayerRenderingParams): void {
    const { x, y } = params.position;
    this.canvas.font = FONT;
    this.canvas.fillStyle = params.color;
    this.canvas.textAlign = "center";
    this.canvas.textBaseline = "middle";
    this.canvas.fillText(
      params.sprite,
      x * CELL_SIZE.WIDTH + CELL_SIZE.WIDTH * 0.5,
      y * CELL_SIZE.HEIGHT + CELL_SIZE.HEIGHT * 0.5
    );
  }

  private renderInteractiveCursor(params: CursorRenderingParams): void {
    const { x, y } = params.position;
    this.canvas.strokeStyle = params.color;
    this.canvas.lineWidth = 2;
    this.canvas.globalAlpha = 0.5; //
    this.canvas.strokeRect(
      x * CELL_SIZE.WIDTH,
      y * CELL_SIZE.HEIGHT,
      CELL_SIZE.WIDTH,
      CELL_SIZE.HEIGHT
    );
    // Reset alpha to avoid affecting other renders
    this.canvas.globalAlpha = 1.0;
  }

  private drawFullTile(cell: TileConfig, position: Position): void {
    const { x, y } = position;
    this.canvas.fillStyle = cell.color;
    this.canvas.fillRect(
      x * CELL_SIZE.WIDTH,
      y * CELL_SIZE.HEIGHT,
      CELL_SIZE.WIDTH,
      CELL_SIZE.HEIGHT
    );
  }

  private drawGrassTile(tile: TileConfig, position: Position): void {
    const { x, y } = position;
    const cellX = x * CELL_SIZE.WIDTH;
    const cellY = y * CELL_SIZE.HEIGHT;

    this.canvas.save();

    const scaleX = CELL_SIZE.WIDTH / 9.5; // Adjust based on character width
    const scaleY = CELL_SIZE.HEIGHT / 18; // Adjust based on character height

    this.canvas.scale(scaleX, scaleY);

    this.canvas.fillStyle = tile.color;
    this.canvas.font = "16px 'Courier New', monospace";
    this.canvas.textAlign = "left";
    this.canvas.textBaseline = "top";

    this.canvas.fillText(tile.sprite, cellX / scaleX, cellY / scaleY);

    this.canvas.restore();
  }

  private drawTile(cell: TileConfig, position: Position): void {
    const { x, y } = position;
    this.canvas.font = FONT;
    this.canvas.textAlign = "center";
    this.canvas.textBaseline = "middle";
    this.canvas.fillStyle = cell.color;
    this.canvas.fillText(
      cell.sprite,
      x * CELL_SIZE.WIDTH + CELL_SIZE.WIDTH * 0.5,
      y * CELL_SIZE.HEIGHT + CELL_SIZE.HEIGHT * 0.5
    );
  }
}
