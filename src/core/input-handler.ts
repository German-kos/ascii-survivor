import { InteractiveCursor } from "../game/player/interactive-cursor";
import { Player } from "../game/player/player";
import { TileConfig } from "../types/interfaces";

export class InputHandler {
  player: Player;
  cursor: InteractiveCursor;
  currentChunk: TileConfig[][];
  ctx: CanvasRenderingContext2D;

  constructor(
    player: Player,
    cursor: InteractiveCursor,
    currentChunk: TileConfig[][],
    ctx: CanvasRenderingContext2D
  ) {
    this.player = player;
    this.cursor = cursor;
    this.currentChunk = currentChunk;
    this.ctx = ctx;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    addEventListener("keydown", (event) => {
      this.handleInput(event);
    });
  }

  private handleInput(event: KeyboardEvent): void {
    switch (event.code) {
      case "KeyW":
      case "KeyA":
      case "KeyS":
      case "KeyD":
        this.player.movePlayer(event, this.currentChunk, this.ctx, this.cursor);
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "ControlLeft":
      case "ControlRight":
      case "Space":
        this.cursor.handleInput(
          event,
          this.player,
          this.ctx,
          this.currentChunk
        );
        break;
      default:
        break;
    }
  }
}
