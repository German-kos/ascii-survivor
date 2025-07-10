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
