import { Direction, Position, TileConfig } from "../../types/index.js";
import { generateDemoChunk } from "../tiles/index.js";

export class World {
  currentChunk: TileConfig[][];

  constructor() {
    this.currentChunk = generateDemoChunk();
  }

  isWalkable(position: Position): boolean {
    if (!this.checkForWorldBorder(position)) {
      console.log("Out of bounds");
      return false;
    }
    return this.currentChunk[position.y][position.x].walkable;
  }

  getTile(position: Position): TileConfig {
    if (!this.checkForWorldBorder(position)) {
      throw new Error("Position is out of bounds");
    }
    return this.currentChunk[position.y][position.x];
  }

  checkForWorldBorder(position: Position): boolean {
    const { x, y } = position;
    const chunkHeight = this.currentChunk.length;
    const chunkWidth = this.currentChunk[0].length;

    if (x < 0 || x >= chunkWidth || y < 0 || y >= chunkHeight) {
      return false; // Out of bounds
    }

    return true; // Within bounds
  }
}
