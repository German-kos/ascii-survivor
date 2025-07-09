import { renderWorld } from "../../rendering/renderer.js";
import { TileConfig } from "../tiles/index.js";
import { handleInteraction } from "./interaction-handler.js";
import { Player } from "./player.js";

// TODO: implement free cursor toggle

type CursorColor = "#ffff00" | "#ff0000";

export class InteractiveCursor {
  playerRef: Player;
  targetX: number;
  targetY: number;
  cursorLocked: boolean;
  color: CursorColor; // Yellow when locked, red when unlocked

  constructor(playerRef: Player) {
    this.playerRef = playerRef;
    this.targetX = playerRef.x;
    this.targetY = playerRef.y;
    this.cursorLocked = true;
    this.color = this.cursorLocked ? "#ff0000" : "#ffff00";
  }

  cursorControls(
    event: KeyboardEvent,
    player: Player,
    ctx: CanvasRenderingContext2D,
    currentChunk: TileConfig[][]
  ) {
    switch (event.code) {
      case "ArrowUp":
        if (this.canMoveCursorUp(player)) {
          // if (this.cursorLocked) {
          //   this.moveToFacingDirection(player);
          //   console.log(player.facing);
          // } else {
          this.targetY -= 1;
          // }
        }
        break;
      case "ArrowDown":
        if (this.canMoveCursorDown(player)) {
          // if (this.cursorLocked) {
          //   this.moveToFacingDirection(player);
          //   console.log(player.facing);
          // } else {
          this.targetY += 1;
          // }
        }
        break;
      case "ArrowLeft":
        if (this.canMoveCursorLeft(player)) {
          // if (this.cursorLocked) {
          // this.moveToFacingDirection(player);
          // console.log(player.facing);
          // } else {
          this.targetX -= 1;
          // }
        }
        break;
      case "ArrowRight":
        if (this.canMoveCursorRight(player)) {
          // if (this.cursorLocked) {
          // this.moveToFacingDirection(player);
          // console.log(player.facing);
          // } else {
          this.targetX += 1;
          // }
        }
        break;
      case "ControlLeft":
      case "ControlRight":
        this.cursorLocked = !this.cursorLocked;
        if (this.cursorLocked) {
          this.color = "#ff0000"; // Red when locked
        } else {
          this.color = "#ffff00"; // Yellow when unlocked
        }
        console.log(`Cursor locked: ${this.cursorLocked}`);
        break;
      case "Space":
        handleInteraction(currentChunk, player, this, ctx);
        break;
      default:
    }
    renderWorld(ctx, currentChunk, player, this);
  }

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

  interactWithTarget(currentChunk: TileConfig[][], player: Player) {
    console.log(
      `I am trying to interact with ${
        currentChunk[this.targetY][this.targetX].type
      }`
    );
  }
}
