export const FONT = "bold 16px 'Courier New', monospace";
export const GRID_WIDTH = 60;
export const GRID_HEIGHT = 25;
export const CELL_WIDTH = 10;
export const CELL_HEIGHT = 16;
export const CHUNK_WIDTH = GRID_WIDTH * CELL_WIDTH;
export const CHUNK_HEIGHT = GRID_HEIGHT * CELL_HEIGHT;
export const CANVAS_SIZE = {
  WIDTH: CHUNK_WIDTH + CELL_WIDTH * 2,
  HEIGHT: CHUNK_HEIGHT + CELL_HEIGHT * 2,
};

export const TILE_CHARS = {
  EMPTY: ".",
  WALL: "█",
  TREE: "♠",
  WATER: "≈",
  PLAYER: "@",
  ROCK: "●",
  GRASS: "▓",
  FLOWER: "*",
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
