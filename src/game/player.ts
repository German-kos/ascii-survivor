import { clearCanvas, renderChunk } from "../rendering/renderer.js";

type Direction = "up" | "down" | "left" | "right";
export class Player {
  sprite: string;
  x: number;
  y: number;

  standingOn: string; // What block the player is standing on
  facing: Direction;
  maxHealth: number;
  health: number;
  inventory: string[]; // Inventory of the player
  level: number;

  constructor() {
    this.sprite = "@";
    this.x = 0;
    this.y = 0;
    this.standingOn = "x"; // Default standing type
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
    this.standingOn = saveData.standingOn || this.standingOn;
    this.facing = saveData.facing || this.facing;
    // this.chunk = saveData.chunk || this.chunk; // Layer implementation
    this.maxHealth = saveData.maxHealth || this.maxHealth;
    this.health = saveData.health || this.health;
    this.inventory = saveData.inventory || this.inventory;
    this.level = saveData.level || this.level;
  }

  move(direction: Direction) {}

  // Player movement:
  handleMove(
    event: KeyboardEvent,
    currentChunk: string[][],
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    // Prevent going out of bounds
    if (
      (this.x <= 0 && event.key === "ArrowUp") ||
      (this.x >= currentChunk.length - 1 && event.key === "ArrowDown") ||
      (this.y <= 0 && event.key === "ArrowLeft") ||
      (this.y >= currentChunk[0].length - 1 && event.key === "ArrowRight")
    ) {
      console.log("I cannot move that way!");
      return;
    }

    // Handle movement
    switch (event.key) {
      case "ArrowUp":
        currentChunk[this.x][this.y] = this.standingOn; // Clear previous position
        this.x -= 1;
        this.standingOn = currentChunk[this.x][this.y]; // Update standing type
        this.facing = "up"; // Update facing direction
        currentChunk[this.x][this.y] = this.sprite; // Clear previous position
        break;
      case "ArrowDown":
        currentChunk[this.x][this.y] = this.standingOn; // Clear previous position
        this.x += 1;
        this.standingOn = currentChunk[this.x][this.y]; // Update standing
        this.facing = "down"; // Update facing direction
        currentChunk[this.x][this.y] = this.sprite; // Clear previous position
        break;
      case "ArrowLeft":
        currentChunk[this.x][this.y] = this.standingOn; // Clear previous position
        this.y -= 1;
        this.standingOn = currentChunk[this.x][this.y]; // Update standing type
        this.facing = "left"; // Update facing direction
        currentChunk[this.x][this.y] = this.sprite; // Clear previous position
        break;
      case "ArrowRight":
        currentChunk[this.x][this.y] = this.standingOn; // Clear previous position
        this.y += 1;
        this.standingOn = currentChunk[this.x][this.y]; // Update standing type
        this.facing = "right"; // Update facing direction
        currentChunk[this.x][this.y] = this.sprite; // Clear previous position
        break;
      default:
        console.log(`Key pressed: ${event.key}`);
    }
    clearCanvas(ctx, canvas);
    renderChunk(ctx, currentChunk);
  }
}
