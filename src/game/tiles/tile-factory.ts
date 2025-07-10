import { TileConfig } from "../../types/interfaces.js";
import { TileType } from "../../types/types.js";
import { TILE_CONFIG} from "./index.js";

export function createTile(tileType: TileType): TileConfig {
  const config = TILE_CONFIG[tileType];

  return { ...config };
}
