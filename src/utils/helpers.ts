import { MOVEMENT_DELTAS } from "../constants/game-constants.js";
import { Direction, Position } from "../types/index.js";

export function getNextPosition(
  position: Position,
  direction: Direction
): Position {
  const { x, y } = position;
  const { dx, dy } = MOVEMENT_DELTAS[direction];
  return { x: x + dx, y: y + dy };
}
