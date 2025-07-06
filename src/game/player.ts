import { renderWorld } from "../rendering/renderer.js";

type Direction = "up" | "down" | "left" | "right";
export class Player {
  sprite: string;
  x: number;
  y: number;
  facing: Direction;
  maxHealth: number;
  health: number;
  inventory: string[];
  level: number;

  constructor() {
    this.sprite = "@";
    this.x = 0;
    this.y = 0;
    this.facing = "left";
    this.maxHealth = 100;
    this.health = 100;
    this.inventory = [];
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
    currentChunk: string[][],
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    if (!this.canPlayerMove(event.key, currentChunk)) {
      return;
    }
    // TODO: Change to 4 if statements (?)
    switch (event.key) {
      case "ArrowUp":
        this.y -= 1;
        this.facing = "up";
        break;
      case "ArrowDown":
        this.y += 1;
        this.facing = "down";
        break;
      case "ArrowLeft":
        this.x -= 1;
        this.facing = "left";
        break;
      case "ArrowRight":
        this.x += 1;
        this.facing = "right";
        break;
      default:
        console.log(`Key pressed: ${event.key}`);
    }
    renderWorld(ctx, currentChunk, this);
  }

  private canPlayerMove(
    key: KeyboardEvent["key"],
    currentChunk: string[][]
  ): boolean {
    if (
      (this.y <= 0 && key === "ArrowUp") ||
      (this.y >= currentChunk.length - 1 && key === "ArrowDown") ||
      (this.x <= 0 && key === "ArrowLeft") ||
      (this.x >= currentChunk[0].length - 1 && key === "ArrowRight")
    ) {
      console.log("I cannot move that way!");
      return false;
    }
    return true;
  }
}
