import { TileConfig } from "../../types/interfaces.js";
import { TILE_CONFIG, TileType } from "./index.js";

export function createTile(tileType: TileType): TileConfig {
  const config = TILE_CONFIG[tileType];

  return { ...config };
}
