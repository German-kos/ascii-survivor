type Direction = "up" | "down" | "left" | "right";
class Player {
  sprite: string;
  row: number;
  column: number;
  standingOn: string; // What block the player is standing on
  facing: Direction;
  //   chunk: string[][]; // Layer implementation
  maxHealth: number;
  health: number;
  inventory: string[]; // Inventory of the player
  level: number;

  constructor(row: number) {
    this.sprite = "@";
    this.row = 0;
    this.column = 0;
    this.standingOn = "x"; // Default standing type
    this.facing = "left";
    this.maxHealth = 100;
    this.health = 100;
    this.inventory = [];
    this.level = 1;
  }
}
