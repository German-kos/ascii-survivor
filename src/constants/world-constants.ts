import { GRID_HEIGHT, GRID_WIDTH } from "./rendering-constants.js";

export const CELL_WIDTH = 24;
export const CELL_HEIGHT = 24;
export const CHUNK_WIDTH = GRID_WIDTH * CELL_WIDTH;
export const CHUNK_HEIGHT = GRID_HEIGHT * CELL_HEIGHT;
export const CANVAS_SIZE = {
  WIDTH: CHUNK_WIDTH,
  HEIGHT: CHUNK_HEIGHT,
};

export const TILE_CHARS = {
  EMPTY: ".",
  WALL: "█",
  TREE: "♠",
  WATER: "≈",
  PLAYER: "☺",
  ROCK: "●",
  GRASS: "▓",
  FLOWER: "*",
};
