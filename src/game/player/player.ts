import {
  Direction,
  PlayerRenderingParams,
  Position,
} from "../../types/index.js";

export class Player {
  private sprite: string;
  private color: string;
  private x: number;
  private y: number;
  private facing: Direction;
  private maxHealth: number;
  private health: number;
  private inventory: string[];
  private level: number;

  constructor() {
    this.sprite = "☺";
    this.color = "#ffff00";
    this.x = 0;
    this.y = 0;
    this.facing = "left";
    this.maxHealth = 100;
    this.health = 100;
    this.inventory = ["axe", "sickle", "pickaxe", "shovel", "rake"];
    this.level = 1;
  }

  // For later implementation
  loadFromSave(saveData: any) {
    this.sprite = saveData.sprite || this.sprite;
    this.x = saveData.x || this.x;
    this.y = saveData.y || this.y;
    this.facing = saveData.facing || this.facing;
    this.maxHealth = saveData.maxHealth || this.maxHealth;
    this.health = saveData.health || this.health;
    this.inventory = saveData.inventory || this.inventory;
    this.level = saveData.level || this.level;
  }

  getRenderingParams(): PlayerRenderingParams {
    const position = this.getPosition();
    return {
      position,
      sprite: this.sprite,
      color: this.color,
    };
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
  setPosition(position: Position): void {
    if (position.x < 0 || position.y < 0) {
      throw new Error("Position cannot be negative");
    }
    const { x, y } = position;
    this.x = x;
    this.y = y;
  }

  // ***OLD  METHODS***

  // movePlayer(
  //   event: KeyboardEvent,
  //   currentChunk: TileConfig[][],
  //   ctx: CanvasRenderingContext2D,
  //   cursor: InteractiveCursor
  // ) {
  //   if (!this.checkForWorldBorder(event, currentChunk)) {
  //     return;
  //   }
  //
  //   let direction: Direction;
  //
  //   switch (event.code) {
  //     case "KeyW":
  //       this.facing = "up";
  //       direction = "up";
  //       break;
  //     case "KeyS":
  //       this.facing = "down";
  //       direction = "down";
  //       break;
  //     case "KeyA":
  //       this.facing = "left";
  //       direction = "left";
  //       break;
  //     case "KeyD":
  //       this.facing = "right";
  //       direction = "right";
  //       break;
  //     default:
  //       return;
  //   }
  //
  //   const { dx, dy } = this.getMovementDelta(direction);
  //   const newX = this.x + dx;
  //   const newY = this.y + dy;
  //
  //   if (!this.isTileWalkable(currentChunk[newY][newX])) {
  //     console.log(
  //       `Tile at (${newX}, ${newY}) is not walkable, there's a ${currentChunk[newY][newX].name}`
  //     );
  //     cursor.locked && cursor.moveToFacingDirection(this);
  //     return;
  //   }
  //   this.x = newX;
  //   this.y = newY;
  //   this.updateCursor(cursor, direction);
  //   renderWorld(ctx, currentChunk, this, cursor);
  // }

  // private checkForWorldBorder(
  //   event: KeyboardEvent,
  //   currentChunk: TileConfig[][]
  // ): boolean {
  //   if (
  //     (this.y <= 0 && event.code === "KeyW") ||
  //     (this.y >= currentChunk.length - 1 && event.code === "KeyS") ||
  //     (this.x <= 0 && event.code === "KeyA") ||
  //     (this.x >= currentChunk[0].length - 1 && event.code === "KeyD")
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  // private isTileWalkable(tile: TileConfig): boolean {
  //   return tile.walkable;
  // }

  // private updateCursor(cursor: InteractiveCursor, direction: Direction) {
  //   if (cursor.locked) {
  //     cursor.moveToFacingDirection(this);
  //   } else {
  //     cursor.moveWithPlayer(direction);
  //   }
  // }

  // private getMovementDelta(direction: Direction) {
  //   return Player.MOVEMENT_DELTAS[direction];
  // }
}
