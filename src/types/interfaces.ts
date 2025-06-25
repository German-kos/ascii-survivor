import {
  Direction,
  ItemType,
  TileSprite,
  TileType,
  ToolLevel,
  ToolType,
} from "./types.js";

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
  canBuildOn: boolean;
}

export interface ToolConfig {
  name: string;
  itemType: ItemType;
  type: ToolType;
  toolLevel: ToolLevel;
  // sprite // later implementation with images
  attackDamage: number;
  attackSpeed: number;
  tileDamage: number;
  useSpeed: number;
  level: ToolLevel;
  description: string;
  canDestroy: boolean;
  canBuild: boolean;
  canHarvest: boolean;
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
