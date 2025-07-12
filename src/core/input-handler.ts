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
      case "ArrowLeft":
      case "ArrowDown":
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
      case "ArrowUp":
        return "up";
      case "KeyA":
      case "ArrowLeft":
        return "left";
      case "KeyS":
      case "ArrowDown":
        return "down";
      case "KeyD":
      case "ArrowRight":
        return "right";
      default:
        throw new Error("Invalid direction key");
    }
  }
}
