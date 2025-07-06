import {
  GRID_HEIGHT,
  GRID_WIDTH,
  TILE_CHARS,
} from "../constants/world-constants.js";

export function initializeDemoChunk(): string[][] {
  const chunk: string[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    chunk[y] = new Array(GRID_WIDTH).fill("●"); // Default to rock
  }

  // modify specific areas
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (y === 5) {
        chunk[y][x] = TILE_CHARS.GRASS;
      } else if (x === 10) {
        chunk[y][x] = TILE_CHARS.FLOWER;
      }
    }
  }

  return chunk;
}
