import {
  CELL_HEIGHT,
  CELL_WIDTH,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "./rendering-constants.js";

export const CHUNK_WIDTH = GRID_WIDTH * CELL_WIDTH;
export const CHUNK_HEIGHT = GRID_HEIGHT * CELL_HEIGHT;
export const SCREEN_WIDTH = 1600;
export const SCREEN_HEIGHT = 900;
export const CANVAS_SIZE = {
  WIDTH: SCREEN_WIDTH,
  HEIGHT: SCREEN_HEIGHT,
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
