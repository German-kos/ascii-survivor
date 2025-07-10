import { CursorColor, Direction } from "../../types/types.js";
import { renderWorld } from "../../rendering/renderer.js";
import { TileConfig } from "../tiles/index.js";
import { handleInteraction } from "./interaction-handler.js";
import { Player } from "./player.js";
import { CURSOR_COLORS } from "../../constants/constants.js";

export class InteractiveCursor {
  targetX: number;
  targetY: number;
  locked: boolean;
  color: CursorColor;
  range: number;

  constructor(player: Player) {
    this.targetX = player.x;
    this.targetY = player.y;
    this.locked = true;
    this.color = this.locked
      ? (CURSOR_COLORS.LOCKED as CursorColor)
      : (CURSOR_COLORS.UNLOCKED as CursorColor);
    this.range = 1;
  }

  handleInput(
    event: KeyboardEvent,
    player: Player,
    ctx: CanvasRenderingContext2D,
    currentChunk: TileConfig[][]
  ) {
    switch (event.code) {
      case "ArrowUp":
        if (this.canMoveCursorUp(player)) {
          this.targetY -= 1;
        }
        break;
      case "ArrowDown":
        if (this.canMoveCursorDown(player)) {
          this.targetY += 1;
        }
        break;
      case "ArrowLeft":
        if (this.canMoveCursorLeft(player)) {
          this.targetX -= 1;
        }
        break;
      case "ArrowRight":
        if (this.canMoveCursorRight(player)) {
          this.targetX += 1;
        }
        break;
      case "ControlLeft":
      case "ControlRight":
        this.locked = !this.locked;
        this.updateColor();
        console.log(`Cursor locked: ${this.locked}`);
        break;
      case "Space":
        handleInteraction(currentChunk, player, this);
        break;
      default:
    }
    renderWorld(ctx, currentChunk, player, this);
  }

  private canMoveCursorUp(player: Player): boolean {
    return this.targetY > player.y - this.range;
  }
  private canMoveCursorDown(player: Player): boolean {
    return this.targetY < player.y + this.range;
  }
  private canMoveCursorLeft(player: Player): boolean {
    return this.targetX > player.x - this.range;
  }
  private canMoveCursorRight(player: Player): boolean {
    return this.targetX < player.x + this.range;
  }

  moveWithPlayer(direction: Direction) {
    switch (direction) {
      case "up":
        this.targetY -= 1;
        break;
      case "down":
        this.targetY += 1;
        break;
      case "left":
        this.targetX -= 1;
        break;
      case "right":
        this.targetX += 1;
        break;
      default:
        console.log("Unknown direction");
    }
  }

  moveToFacingDirection(player: Player) {
    switch (player.facing) {
      case "up":
        this.targetY = player.y - 1;
        this.targetX = player.x;
        break;
      case "down":
        this.targetY = player.y + 1;
        this.targetX = player.x;
        break;
      case "left":
        this.targetX = player.x - 1;
        this.targetY = player.y;
        break;
      case "right":
        this.targetX = player.x + 1;
        this.targetY = player.y;
        break;
      default:
        console.log("Unknown facing direction");
    }
  }

  private updateColor() {
    this.color = this.locked
      ? (CURSOR_COLORS.LOCKED as CursorColor)
      : (CURSOR_COLORS.UNLOCKED as CursorColor);
  }
}
