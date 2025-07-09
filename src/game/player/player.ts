import { renderWorld } from "../../rendering/renderer.js";
import { TileConfig } from "../tiles/index.js";
import { InteractiveCursor } from "./interactive-cursor.js";

type Direction = "up" | "down" | "left" | "right";
export class Player {
  sprite: string;
  color: string;
  x: number;
  y: number;
  facing: Direction;
  maxHealth: number;
  health: number;
  inventory: string[];
  level: number;

  constructor() {
    this.sprite = "☺";
    this.color = "#ffff00";
    this.x = 0;
    this.y = 0;
    this.facing = "left";
    this.maxHealth = 100;
    this.health = 100;
    this.inventory = ["axe", "sickle", "pickaxe"];
    this.level = 1;
  }

  // For later implementation
  loadFromSave(saveData: any) {
    this.sprite = saveData.sprite || this.sprite;
    this.x = saveData.x || this.x;
    this.y = saveData.y || this.y;
    this.facing = saveData.facing || this.facing;
    //  Later implementation
    // this.chunk = saveData.chunk || this.chunk;
    this.maxHealth = saveData.maxHealth || this.maxHealth;
    this.health = saveData.health || this.health;
    this.inventory = saveData.inventory || this.inventory;
    this.level = saveData.level || this.level;
  }

  move(direction: Direction) {}

  movePlayer(
    event: KeyboardEvent,
    currentChunk: TileConfig[][],
    ctx: CanvasRenderingContext2D,
    cursor: InteractiveCursor
  ) {
    if (!this.checkForWorldBorder(event.key, currentChunk)) {
      return;
    }
    // TODO: Change to 4 if statements (?)
    switch (event.code) {
      case "KeyW":
        this.facing = "up";
        if (!this.isTileWalkable(currentChunk[this.y - 1][this.x])) {
          console.log(
            "I cannot walk, there's a " + currentChunk[this.y - 1][this.x].type
          );
          cursor.cursorLocked && cursor.moveToFacingDirection(this);
          return;
        }
        this.y -= 1;
        if (cursor.cursorLocked) {
          cursor.moveToFacingDirection(this);
        } else {
          cursor.moveUpWithPlayer(this);
        }
        break;
      case "KeyS":
        this.facing = "down";
        if (!this.isTileWalkable(currentChunk[this.y + 1][this.x])) {
          console.log(
            "I cannot walk, there's a " + currentChunk[this.y + 1][this.x].type
          );
          cursor.cursorLocked && cursor.moveToFacingDirection(this);
          return;
        }
        this.y += 1;
        if (cursor.cursorLocked) {
          cursor.moveToFacingDirection(this);
        } else {
          cursor.moveDownWithPlayer(this);
        }
        break;
      case "KeyA":
        this.facing = "left";

        if (!this.isTileWalkable(currentChunk[this.y][this.x - 1])) {
          console.log(
            "I cannot walk, there's a " + currentChunk[this.y][this.x - 1].type
          );
          cursor.cursorLocked && cursor.moveToFacingDirection(this);

          return;
        }
        this.x -= 1;
        if (cursor.cursorLocked) {
          cursor.moveToFacingDirection(this);
        } else {
          cursor.moveLeftWithPlayer(this);
        }
        break;
      case "KeyD":
        this.facing = "right";

        if (!this.isTileWalkable(currentChunk[this.y][this.x + 1])) {
          console.log(
            "I cannot walk, there's a " + currentChunk[this.y][this.x + 1].type
          );
          cursor.cursorLocked && cursor.moveToFacingDirection(this);

          return;
        }

        this.x += 1;
        if (cursor.cursorLocked) {
          cursor.moveToFacingDirection(this);
        } else {
          cursor.moveRightWithPlayer(this);
        }
        break;

      default:
    }
    renderWorld(ctx, currentChunk, this, cursor);
  }

  private checkForWorldBorder(
    key: KeyboardEvent["key"],
    currentChunk: TileConfig[][]
  ): boolean {
    if (
      (this.y <= 0 && key.toLowerCase() === "w") ||
      (this.y >= currentChunk.length - 1 && key.toLowerCase() === "s") ||
      (this.x <= 0 && key.toLowerCase() === "a") ||
      (this.x >= currentChunk[0].length - 1 && key.toLowerCase() === "d")
    ) {
      console.log("I cannot move that way!");
      return false;
    }
    return true;
  }

  private isTileWalkable(tile: TileConfig): boolean {
    return tile.walkable;
  }
}
