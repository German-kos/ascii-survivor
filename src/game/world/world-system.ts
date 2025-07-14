import { Position, TileConfig, ToolConfig } from "../../types/interfaces.js";
import { TileType, ToolType } from "../../types/types.js";
import { generateDemoChunk } from "../tiles/grid-initializers.js";
import { TILE_CONFIG } from "../tiles/tile-config.js";

export class WorldSystem {
  private currentChunk: TileConfig[][];

  constructor() {
    this.currentChunk = generateDemoChunk();
  }

  getCurrentChunk(): TileConfig[][] {
    return this.currentChunk;
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

  destroyTile(position: Position, damage?: number): boolean {
    if (!damage) {
      damage = 0;
    }

    const tile: TileConfig = this.getTile(position);
    if (!tile.destructible) {
      return false;
    }

    if (tile.health <= 0) {
      this.setTile(position);
      return true;
    }
    
    this.hitTile(tile, damage);
    if (tile.health <= 0) {
      this.setTile(position);
      return true;
    }

    return false;
  }

  isInBounds(position: Position): boolean {
    const { x, y }: Position = position;
    const chunkHeight: number = this.currentChunk.length;
    const chunkWidth: number = this.currentChunk[0].length;
    return y >= 0 && x >= 0 && y < chunkHeight && x < chunkWidth;
  }

  private hitTile(tile: TileConfig, damage: number): void {
    tile.health = tile.health - damage;
    console.log(tile.health);
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
