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

  getPosition(): Position {
    return { x: this.targetX, y: this.targetY };
  }

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

  setPosition(position: Position): void {
    if (position.x < 0 || position.y < 0) {
      throw new Error("Position cannot be negative");
    }
    const { x, y } = position;
    this.targetX = x;
    this.targetY = y;
  }

  getCursorLockState(): boolean {
    return this.locked;
  }

  toggleLockState(): void {
    this.locked = !this.locked;
    this.updateColor();
  }

  private updateColor() {
    this.color = this.locked
      ? (CURSOR_COLORS.LOCKED as CursorColor)
      : (CURSOR_COLORS.UNLOCKED as CursorColor);
  }
}
