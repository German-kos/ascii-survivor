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