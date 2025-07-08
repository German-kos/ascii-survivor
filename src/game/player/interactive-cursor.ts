import {
  renderWorld,
} from "../../rendering/renderer.js";
import { TileConfig } from "../tiles/index.js";
import { Player } from "./player.js";

export class InteractiveCursor {
  playerRef: Player;
  targetX: number;
  targetY: number;
  color: string;

  constructor(playerRef: Player) {
    this.playerRef = playerRef;
    this.targetX = playerRef.x;
    this.targetY = playerRef.y;
    this.color = "#ffff00";
  }

  moveCursor(
    event: KeyboardEvent,
    playerRef: Player,
    ctx: CanvasRenderingContext2D,
    currentChunk: TileConfig[][]
  ) {
    switch (event.key) {
      case "ArrowUp":
        if (this.canMoveCursorUp(playerRef)) {
          this.targetY -= 1;
        }
        break;
      case "ArrowDown":
        if (this.canMoveCursorDown(playerRef)) {
          this.targetY += 1;
        }
        break;
      case "ArrowLeft":
        if (this.canMoveCursorLeft(playerRef)) {
          this.targetX -= 1;
        }
        break;
      case "ArrowRight":
        if (this.canMoveCursorRight(playerRef)) {
          this.targetX += 1;
        }
        break;
      // when Spacebar is pressed
      default:
    }
    renderWorld(ctx, currentChunk, playerRef, this);
  }

  //   private isWithinAllowedRange(): boolean {
  //     return (
  //       // cursor x is  smaller than player.x +1 and bigger than player.x -1
  //       // cursor y is smaller than player.y +1 and bigger than player.y -1
  //       this.targetX <= this.playerRef.x + 1 &&
  //       this.targetX >= this.playerRef.x - 1 &&
  //       this.targetY <= this.playerRef.y + 1 &&
  //       this.targetY >= this.playerRef.y - 1
  //     );
  //   }

  private canMoveCursorUp(playerRef: Player): boolean {
    if (this.targetY > playerRef.y - 1) {
      return true;
    } else {
      console.log("Cannot move cursor up, out of bounds");
      return false;
    }
  }
  private canMoveCursorDown(playerRef: Player): boolean {
    if (this.targetY < playerRef.y + 1) {
      return true;
    } else {
      console.log("Cannot move cursor down, out of bounds");
      return false;
    }
  }
  private canMoveCursorLeft(playerRef: Player): boolean {
    if (this.targetX > playerRef.x - 1) {
      return true;
    } else {
      console.log("Cannot move cursor left, out of bounds");
      return false;
    }
  }
  private canMoveCursorRight(playerRef: Player): boolean {
    if (this.targetX < playerRef.x + 1) {
      return true;
    } else {
      console.log("Cannot move cursor right, out of bounds");
      return false;
    }
  }

  moveUpWithPlayer(playerRef: Player) {
    this.targetY -= 1;
  }
  moveDownWithPlayer(playerRef: Player) {
    this.targetY += 1;
  }
  moveRightWithPlayer(playerRef: Player) {
    this.targetX += 1;
  }
  moveLeftWithPlayer(playerRef: Player) {
    this.targetX -= 1;
  }

  interactWithTarget(currentChunk: TileConfig[][], player: Player) {
    console.log(
      `I am trying to interact with ${
        currentChunk[this.targetY][this.targetX].type
      }`
    );
  }
}
