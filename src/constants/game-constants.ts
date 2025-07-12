export const PLAYER_DEFAULTS = {
  SPRITE: "☺",
  COLOR: "#ffff00",
  MAX_HEALTH: 100,
  STARTING_LEVEL: 1,
} as const;

export const TOOL_DAMAGE = {
  DEFAULT: 10,
  // Later: AXE: 15, PICKAXE: 12, etc.
} as const;

export const CURSOR_DEFAULTS = {
  RANGE: 1,
  LOCKED: true,
} as const;

export const MOVEMENT_DELTAS = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
  } as const;
