import { TileConfig } from "../../types/interfaces.js";
import { createTile } from "../tiles/index.js";
import { InteractiveCursor } from "./interactive-cursor.js";
import { Player } from "./player.js";

export function handleInteraction(
  currentChunk: TileConfig[][],
  player: Player,
  cursor: InteractiveCursor
) {
  const tile = currentChunk[cursor.targetY][cursor.targetX];

  if (!canTileBeHarvested(tile)) {
    console.log("Nothing I can do with this tile.");
    return;
  }

  if (noToolRequired(tile)) {
    harvestWithoutTool(tile, player, currentChunk, cursor);
  } else if (hasRequiredTool(tile, player)) {
    harvestWithTool(tile, player, currentChunk, cursor);
  } else {
    console.log(`I need a ${tile.toolRequired} to harvest this ${tile.name}.`);
  }
}

function canTileBeHarvested(highlightedTile: TileConfig): boolean {
  return highlightedTile.canBeHarvested;
}

function canTileBeDestroyed(highlightedTile: TileConfig): boolean {
  return highlightedTile.canBeDestroyed;
}

function hasRequiredTool(highlightedTile: TileConfig, player: Player): boolean {
  return player.inventory.includes(highlightedTile.toolRequired);
}

function noToolRequired(highlightedTile: TileConfig): boolean {
  return highlightedTile.toolRequired === "none";
}

function addToInventory(player: Player, highlightedTile: TileConfig): void {
  player.inventory.push(highlightedTile.type + " resource");
  console.log(player.inventory);
}

function createTileFromConfig(
  currentChunk: TileConfig[][],
  cursor: InteractiveCursor,
  destroyedTile: TileConfig
): void {
  currentChunk[cursor.targetY][cursor.targetX] = createTile(
    destroyedTile.leavesBehind
  );
}

function isTileDestroyed(highlightedTile: TileConfig): boolean {
  return highlightedTile.health <= 0;
}

function harvestWithoutTool(
  tile: TileConfig,
  player: Player,
  currentChunk: TileConfig[][],
  cursor: InteractiveCursor
) {
  console.log(`Harvesting ${tile.name} without a tool.`);
  addToInventory(player, tile);
  if (canTileBeDestroyed(tile) && isTileDestroyed(tile)) {
    createTileFromConfig(currentChunk, cursor, tile);
  }
}

function harvestWithTool(
  tile: TileConfig,
  player: Player,
  currentChunk: TileConfig[][],
  cursor: InteractiveCursor
) {
  console.log(`Harvesting ${tile.name} with ${tile.toolRequired}`);
  addToInventory(player, tile);
  if (!isTileDestroyed(tile)) {
    tile.health -= 10;
    console.log(`${tile.name} HP: ${tile.health}`);
  }
  if (canTileBeDestroyed(tile) && isTileDestroyed(tile)) {
    createTileFromConfig(currentChunk, cursor, tile);
  }
}
