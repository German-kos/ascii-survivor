import {
  Direction,
  ItemType,
  TileSprite,
  TileType,
  ItemLevel,
  ToolType,
  ToolAction,
} from "./index.js";

export interface TileConfig {
  name: string;
  type: TileType;
  sprite: TileSprite;
  color: string;
  background: string;
  description: string;
  destructible: boolean;
  canBeHarvested: boolean;
  harvestItem: Item;
  harvestAmount: number;
  walkable: boolean;
  health: number;
  damage: number;
  toolRequired: ToolType;
  toolLevelRequired: ItemLevel;
  leavesBehind: TileType;
  canBuildOn: boolean;
}

export interface ToolConfig {
  name: string;
  itemType: ItemType;
  type: ToolType;
  toolLevel: ItemLevel;
  // sprite // later implementation with images
  attackDamage: number;
  attackSpeed: number;
  tileDamage: number;
  useSpeed: number;
  level: ItemLevel;
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

export interface PlayerRenderingParams {
  position: Position;
  sprite: string;
  color: string;
}

export interface CursorRenderingParams {
  position: Position;
  color: string;
}

export interface Item {
  name: string;
  type: ItemType;
  tileType?: TileType;
  attackDamage?: number;
  toolDamage?: number;
  // sprite: string; // later implementation
  description: string;
  level: ItemLevel;
  toolType?: ToolType;
  filledWith?:string; // this is for buckets or containers
  action?: ToolAction;
  quantity: number;
  maxQuantity: number;
  isEquipped: boolean;
  consumeOnUse: boolean;
  isMaterial: boolean;
  canBeCrafted: boolean;
  canBeUsed: boolean;
  sellValue: number;
  buyValue: number;
  range: number;
}

export interface StackItemPayload {
  modifiedItem: Item;
  quantityLeftover: number;
}