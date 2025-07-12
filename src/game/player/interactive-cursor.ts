import { CursorColor, Direction } from "../../types/types.js";
import { CursorRenderingParams, Position } from "../../types/index.js";
import { CURSOR_COLORS } from "../../constants/index.js";

export class InteractiveCursor {
  private targetX: number;
  private targetY: number;
  private locked: boolean;
  private color: CursorColor;
  private range: number;

  constructor(initialPosition: Position) {
    this.targetX = initialPosition.x;
    this.targetY = initialPosition.y;
    this.locked = true;
    this.color = this.locked
      ? (CURSOR_COLORS.LOCKED as CursorColor)
      : (CURSOR_COLORS.UNLOCKED as CursorColor);
    this.range = 1;
  }

  // new
  getPosition(): Position {
    return { x: this.targetX, y: this.targetY };
  }
  //new
  getRenderingParams(): CursorRenderingParams {
    return {
      position: this.getPosition(),
      color: this.color,
    };
  }
  getNextPositionLocked(
    faceDirection: Direction,
    playerPosition: Position
  ): Position {
    switch (faceDirection) {
      case "up":
        return { x: playerPosition.x, y: playerPosition.y - 1 };
      case "down":
        return { x: playerPosition.x, y: playerPosition.y + 1 };
      case "left":
        return { x: playerPosition.x - 1, y: playerPosition.y };
      case "right":
        return { x: playerPosition.x + 1, y: playerPosition.y };
      default:
        throw new Error("Unknown facing direction");
    }
  }

  // new
  setPosition(position: Position): void {
    if (position.x < 0 || position.y < 0) {
      throw new Error("Position cannot be negative");
    }
    const { x, y } = position;
    this.targetX = x;
    this.targetY = y;
  }

  //new

  // new
  getCursorLockState(): boolean {
    return this.locked;
  }

  private updateColor() {
    this.color = this.locked
      ? (CURSOR_COLORS.LOCKED as CursorColor)
      : (CURSOR_COLORS.UNLOCKED as CursorColor);
  }

  // ***OLD METHODS***
  //
  // handleInput(
  //   event: KeyboardEvent,
  //   player: Player,
  //   ctx: CanvasRenderingContext2D,
  //   currentChunk: TileConfig[][]
  // ) {
  //   switch (event.code) {
  //     case "ArrowUp":
  //       if (this.canMoveCursorUp(player)) {
  //         this.targetY -= 1;
  //       }
  //       break;
  //     case "ArrowDown":
  //       if (this.canMoveCursorDown(player)) {
  //         this.targetY += 1;
  //       }
  //       break;
  //     case "ArrowLeft":
  //       if (this.canMoveCursorLeft(player)) {
  //         this.targetX -= 1;
  //       }
  //       break;
  //     case "ArrowRight":
  //       if (this.canMoveCursorRight(player)) {
  //         this.targetX += 1;
  //       }
  //       break;
  //     case "ControlLeft":
  //     case "ControlRight":
  //       this.locked = !this.locked;
  //       this.updateColor();
  //       console.log(`Cursor locked: ${this.locked}`);
  //       break;
  //     case "Space":
  //       handleInteraction(currentChunk, player, this);
  //       break;
  //     default:
  //   }
  //   renderWorld(ctx, currentChunk, player, this);
  // }

  // private canMoveCursorUp(player: Player): boolean {
  //   return this.targetY > player.y - this.range;
  // }
  // private canMoveCursorDown(player: Player): boolean {
  //   return this.targetY < player.y + this.range;
  // }
  // private canMoveCursorLeft(player: Player): boolean {
  //   return this.targetX > player.x - this.range;
  // }
  // private canMoveCursorRight(player: Player): boolean {
  //   return this.targetX < player.x + this.range;
  // }

  // moveWithPlayer(direction: Direction) {
  //   switch (direction) {
  //     case "up":
  //       this.targetY -= 1;
  //       break;
  //     case "down":
  //       this.targetY += 1;
  //       break;
  //     case "left":
  //       this.targetX -= 1;
  //       break;
  //     case "right":
  //       this.targetX += 1;
  //       break;
  //     default:
  //       console.log("Unknown direction");
  //   }
  // }

  // moveToFacingDirection(player: Player) {
  //   switch (player.facing) {
  //     case "up":
  //       this.targetY = player.y - 1;
  //       this.targetX = player.x;
  //       break;
  //     case "down":
  //       this.targetY = player.y + 1;
  //       this.targetX = player.x;
  //       break;
  //     case "left":
  //       this.targetX = player.x - 1;
  //       this.targetY = player.y;
  //       break;
  //     case "right":
  //       this.targetX = player.x + 1;
  //       this.targetY = player.y;
  //       break;
  //     default:
  //       console.log("Unknown facing direction");
  //   }
  // }
}
