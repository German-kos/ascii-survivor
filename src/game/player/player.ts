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
}
