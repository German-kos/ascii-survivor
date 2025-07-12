export const FONT = "bold 24px 'Courier New', monospace";
export const CELL_WIDTH = 24;
export const CELL_HEIGHT = 24;
export const GRID_WIDTH = 40;
export const GRID_HEIGHT = 25;
export const CELL_SIZE = {
  WIDTH: CELL_WIDTH,
  HEIGHT: CELL_HEIGHT,
};
export const GRID_SIZE = {
  WIDTH: GRID_WIDTH,
  HEIGHT: GRID_HEIGHT,
};

export const CURSOR_COLORS = {
  UNLOCKED: "#ffff00", // Yellow
  LOCKED: "#ff0000", // Red
};

export const TILE_COLORS = {
  EMPTY: "#000000", // Black
  WALL: "#8b4513", // Brown
  TREE: "#00ff00", // Green
  WATER: "#0066ff", // Blue
  PLAYER: "#ffff00", // Yellow
  ROCK: "#808080", // Gray
  GRASS: "#228B22", // Forest Green
  FLOWER: "#ff69b4", // Hot Pink
};

export const TILE_BACKGROUNDS = {
  EMPTY: "#1a1a1a", // Dark gray - subtle contrast from black
  WALL: "#2d1b0e", // Dark brown - complements brown wall
  TREE: "#0d4d0d", // Dark green - forest floor feel
  WATER: "#001a33", // Dark blue - deep water feel
  PLAYER: "transparent", // Transparent - shows underlying terrain
  ROCK: "#2d2d2d", // Darker gray - rocky ground
  GRASS: "#1a4d1a", // Dark forest green - rich soil
  FLOWER: "#2d1a2d", // Dark magenta - rich earth for flowers
};
