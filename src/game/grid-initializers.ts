import { GRID_HEIGHT, GRID_WIDTH } from "../constants/rendering-constants.js";
import { TileConfig } from "../types/interfaces.js";
import {
  createTile,
  TILE_CONFIG,
  TileType,
} from "./tiles/index.js";

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
      } else {
        const key = keys[Math.floor(Math.random() * keys.length)] as TileType;
        chunk[y][x] = createTile(key) || TILE_CONFIG.EMPTY;
      }
    }
  }

  return chunk;
}
