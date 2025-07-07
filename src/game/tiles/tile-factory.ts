import { TILE_CONFIG, TileConfig, TileType } from "./index.js";

export function createTile(tileType: TileType): TileConfig {
  const config = TILE_CONFIG[tileType];

  return { ...config };
}
