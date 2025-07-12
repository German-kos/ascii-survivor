import { GameController } from "../game/game-controller/index.js";
import { Direction } from "../types/index.js";

export class InputHandler {
  game: GameController;

  constructor() {
    this.game = new GameController();

    this.initializeEventListeners();
    this.initialRender();
  }

  private initialRender(): void {
    this.game.executeInitialRender();
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
        this.game.movePlayer(this.getDirectionFromKey(event));
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        this.game.moveCursor(this.getDirectionFromKey(event));
        break;
      case "ControlLeft":
      case "ControlRight":
      case "Space":
        // TODO: implement interaction logic
        // this.cursor.handleInput(
        //   event,
        //   this.player,
        //   this.ctx,
        //   this.currentChunk
        // );
        break;
      default:
        break;
    }
  }

  private getDirectionFromKey(event: KeyboardEvent): Direction {
    switch (event.code) {
      case "KeyW":
        return "up";
      case "KeyA":
        return "left";
      case "KeyS":
        return "down";
      case "KeyD":
        return "right";
      default:
        throw new Error("Invalid direction key");
    }
  }
}
