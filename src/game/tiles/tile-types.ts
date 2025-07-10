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

export type TileType =
  | "empty"
  | "wall"
  | "tree"
  | "water"
  | "rock"
  | "grass"
  | "flower"
  | "gravel"
  | "dirt";

type TileSprite = "." | "█" | "♠" | "≈" | "●" | "▓" | "*" | "∴";

type ToolLevel = "none" | "basic" | "advanced" | "expert" | "master";

type ToolType =
  | "none"
  | "axe"
  | "pickaxe"
  | "shovel"
  | "hoe"
  | "sickle"
  | "bucket"
  | "rake"
