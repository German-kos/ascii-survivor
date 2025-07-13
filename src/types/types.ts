export type CursorColor = "#ffff00" | "#ff0000";
export type Direction = "up" | "down" | "left" | "right";

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

export type ToolType =
  | "none"
  | "axe"
  | "pickaxe"
  | "shovel"
  | "hoe"
  | "sickle"
  | "bucket"
  | "rake";

export type ToolAction =
  | "destroy"
  | "build"
  | "harvest"
  | "plant"
  | "water"
  | "use"
  | "none"
  | "equip";

export type ItemType =
  | "weapon"
  | "tool"
  | "seed"
  | "food"
  | "consumable"
  | "material"
  | "misc";

export type ItemLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type TileSprite = "." | "█" | "♠" | "≈" | "●" | "▓" | "*" | "∴";
