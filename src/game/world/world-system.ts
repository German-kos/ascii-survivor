import { ToolLevel } from "./../../types/types";
import { Position, TileConfig, ToolConfig } from "../../types/interfaces.js";
import { TileType, ToolType } from "../../types/types.js";
import { generateDemoChunk } from "../grid-initializers.js";
import { TILE_CONFIG } from "../tiles/tile-config.js";

// TODO: destroyTile(position: Position, tool: ToolType)...

export class WorldSystem {
  currentChunk: TileConfig[][];

  constructor() {
    this.currentChunk = generateDemoChunk();
  }

  isWalkable(position: Position): boolean {
    if (!this.isInBounds(position)) {
      return false;
    }
    return this.currentChunk[position.y][position.x].walkable;
  }

  getTile(position: Position): TileConfig {
    const { x, y } = position;
    return this.currentChunk[y][x];
  }

  setTile(position: Position, tileInHand?: TileConfig): void {
    const { x, y } = position;
    if (tileInHand && this.canBuildOn(position)) {
      this.buildTile(position, tileInHand);
      return;
    }
    const tile = this.getTile(position);
    this.currentChunk[y][x] = this.createTile(tile.leavesBehind);
  }

  destroyTile(position: Position, tool: ToolConfig) {
    const tile = this.getTile(position);
    if (tile.canBeDestroyed && this.toolMatches(tile, tool)) {
      // TODO: This
    }
  }

  private isInBounds(position: Position): boolean {
    const { x, y } = position;
    const chunkHeight = this.currentChunk.length;
    const chunkWidth = this.currentChunk[0].length;
    return y >= 0 && x >= 0 && y < chunkHeight && x < chunkWidth;
  }

  private canBuildOn(position: Position): boolean {
    const tile = this.getTile(position);
    return tile.canBuildOn;
  }

  private buildTile(position: Position, tile: TileConfig): void {
    const { x, y } = position;
    this.currentChunk[y][x] = tile;
  }

  private createTile(tileType: TileType): TileConfig {
    const config = TILE_CONFIG[tileType];
    return { ...config };
  }

  private toolMatches(tile: TileConfig, tool: ToolConfig): boolean {
    return (
      tile.toolRequired === "none" ||
      (tile.toolRequired === tool.type &&
        tile.toolLevelRequired === tool.toolLevel)
    );
  }
}
