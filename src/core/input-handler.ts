import { Game } from "../game/game.js";
import { InteractiveCursor } from "../game/player/interactive-cursor.js";
import { Player } from "../game/player/player.js";
import { TileConfig } from "../types/interfaces.js";

export class InputHandler {
  player: Player;
  cursor: InteractiveCursor;
  currentChunk: TileConfig[][];
  ctx: CanvasRenderingContext2D;
  game: Game;

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
    this.game = new Game();

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    addEventListener("keydown", (event) => {
      this.handleInput(event);
    });
  }

  private handleInput(event: KeyboardEvent, game: Game): void {
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
