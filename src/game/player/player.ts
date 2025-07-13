import {
  Direction,
  Item,
  PlayerRenderingParams,
  Position,
} from "../../types/index.js";
import { bronzeAxe } from "../items/index.js";

export class Player {
  private sprite: string;
  private color: string;
  private x: number;
  private y: number;
  private facing: Direction;
  private maxHealth: number;
  private health: number;
  private inventory: Item[];
  private level: number;
  private equippedItem: Item | null;

  constructor() {
    this.sprite = "☺";
    this.color = "#ffff00";
    this.x = 0;
    this.y = 0;
    this.facing = "left";
    this.maxHealth = 100;
    this.health = 100;
    this.inventory = [bronzeAxe];
    this.level = 1;
    this.equippedItem = bronzeAxe;
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

  getEquippedItem(): Item | null {
    return this.equippedItem;
  }
}
