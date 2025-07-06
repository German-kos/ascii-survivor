import { GRID_HEIGHT, GRID_WIDTH } from "../constants/world-constants.js";

export function initializePlayerGrid(playerGrid: string[][]): string[][] {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    playerGrid[y] = new Array(GRID_WIDTH).fill("");
  }
  return playerGrid;
}
