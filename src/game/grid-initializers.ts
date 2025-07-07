import {
  GRID_HEIGHT,
  GRID_WIDTH,
  TILE_CHARS,
} from "../constants/world-constants.js";
import {
  createTile,
  TILE_CONFIG,
  TileConfig,
  TileType,
} from "./tiles/index.js";

export function initializeDemoChunk(): string[][] {
  const chunk: string[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    chunk[y] = new Array(GRID_WIDTH).fill("●"); // Default to rock
  }

  // modify specific areas
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      console.log("x:", x, "y:", y);
      if (y === 5) {
        chunk[y][x] = TILE_CHARS.GRASS;
      } else if (x === 10) {
        chunk[y][x] = TILE_CHARS.FLOWER;
      }
    }
  }

  return chunk;
}

export function generateDemoChunk(): TileConfig[][] {
  const chunk: TileConfig[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    chunk[y] = new Array(GRID_WIDTH).fill("●"); // Default to rock
  }

  const keys = Object.keys(TILE_CONFIG).filter(
    (key): key is TileType =>
      typeof TILE_CONFIG[key as TileType] !== "undefined"
  );

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (y <= 5 && x <= 5) {
        chunk[y][x] = createTile("grass");
        // console.log("Random key:", key);
        // console.log("TILE_CHARS[key]:", TILE_CHARS[key]);
        // console.log("TILE_CHARS[key]:", TILE_CHARS[key]);
        // chunk[y][x] = createTile(key) || TILE_CONFIG.EMPTY;
      } else {
        const key = keys[Math.floor(Math.random() * keys.length)] as TileType;
        chunk[y][x] = createTile(key) || TILE_CONFIG.EMPTY;
      }
    }
  }

  return chunk;
}
