import { TileConfig } from "./index";

export const TILE_CONFIG: Record<string, TileConfig> = {
  empty: {
    name: "Empty",
    type: "empty",
    sprite: ".",
    color: "#000000", // Black
    background: "#000000", // Black
    description: "There's a hole in the ground.",
    canBeDestroyed: false,
    canBeHarvested: false,
    harvestAmount: 0,
    walkable: false,
    health: 0,
    damage: 0,
    toolRequired: "none",
    toolLevelRequired: "none",
  },
  wall: {
    name: "Brick Wall",
    type: "wall",
    sprite: "█",
    color: "#8b4513", // Brown
    background: "#2d1b0e", // Dark brown
    description: "A sturdy brick wall.",
    canBeDestroyed: true,
    canBeHarvested: true,
    harvestAmount: 1,
    walkable: false,
    health: 25,
    damage: 0,
    toolRequired: "pickaxe",
    toolLevelRequired: "basic",
  },
  tree: {
    name: "Tree",
    type: "tree",
    sprite: "♠",
    color: "#00ff00", // Green
    background: "#0d4d0d", // Dark green
    description: "A tall tree with lush leaves.",
    canBeDestroyed: true,
    canBeHarvested: true,
    harvestAmount: 4,
    walkable: false,
    health: 25,
    damage: 0,
    toolRequired: "axe",
    toolLevelRequired: "basic",
  },
  water: {
    name: "Water",
    type: "water",
    sprite: "≈",
    color: "#0066ff", // Blue
    background: "#001a33", // Dark blue
    description: "A deep body of water.",
    canBeDestroyed: false,
    canBeHarvested: true,
    harvestAmount: 1,
    walkable: false,
    health: 0,
    damage: 0,
    toolRequired: "bucket",
    toolLevelRequired: "basic",
  },
  rock: {
    name: "Rock",
    type: "rock",
    sprite: "●",
    color: "#808080", // Gray
    background: "#2d2d2d", // Darker gray
    description: "A solid rock formation.",
    canBeDestroyed: true,
    canBeHarvested: true,
    harvestAmount: 2,
    walkable: false,
    health: 20,
    damage: 0,
    toolRequired: "pickaxe",
    toolLevelRequired: "basic",
  },
  grass: {
    name: "Grass",
    type: "grass",
    sprite: "▓",
    color: "#228B22", // Forest Green
    background: "#1a4d1a", // Dark forest green
    description: "A patch of grass.",
    canBeDestroyed: false,
    canBeHarvested: true,
    harvestAmount: 1,
    walkable: true,
    health: 0,
    damage: 0,
    toolRequired: "none",
    toolLevelRequired: "none",
  },
  flower: {
    name: "Flower",
    type: "flower",
    sprite: "*",
    color: "#ff69b4", // Hot Pink
    background: "#2d1a2d", // Dark magenta
    description: "A beautiful flower.",
    canBeDestroyed: false,
    canBeHarvested: true,
    harvestAmount: 1,
    walkable: true,
    health: 0,
    damage: 0,
    toolRequired: "sickle",
    toolLevelRequired: "basic",
  },
};
