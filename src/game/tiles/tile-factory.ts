import { TILE_CONFIG, TileType } from "./index.js";

export function createTile(tileType: TileType) {
  const config = TILE_CONFIG[tileType];

  return { ...config };
}
