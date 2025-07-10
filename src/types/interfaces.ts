import { Direction, TileSprite, TileType, ToolLevel, ToolType } from "./types.js";

export interface TileConfig {
  name: string;
  type: TileType;
  sprite: TileSprite;
  color: string;
  background: string;
  description: string;
  canBeDestroyed: boolean;
  canBeHarvested: boolean;
  harvestAmount: number;
  walkable: boolean;
  health: number;
  damage: number;
  toolRequired: ToolType;
  toolLevelRequired: ToolLevel;
  leavesBehind: TileType;
}

export interface SaveData {
  sprite: string;
  x: number;
  y: number;
  facing: Direction;
  maxHealth: number;
  health: number;
  inventory: string[]; // Later: Item[]
  level: number;
}

export interface Position {
  x: number;
  y: number;
}