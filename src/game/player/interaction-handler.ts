import { createTile, TileConfig } from "../tiles/index.js";
import { InteractiveCursor } from "./interactive-cursor.js";
import { Player } from "./player.js";

// TODO: clean up this function with separate functions for better self documentations
// TODO: Add something like "leavesBehind" to the Tile Config, so that it would be a bit
// more automated for what happens when a tile is destroyed or harvested
export function handleInteraction(
  currentChunk: TileConfig[][],
  player: Player,
  cursor: InteractiveCursor,
  ctx: CanvasRenderingContext2D
) {
  const highlightedTile = currentChunk[cursor.targetY][cursor.targetX];
  if (!highlightedTile.canBeDestroyed && !highlightedTile.canBeHarvested) {
    console.log("Nothing I can do with this tile.");
    return;
  }
  if (highlightedTile.toolRequired === "none") {
    console.log("Harvesting " + highlightedTile.name + " without a tool.");
    player.inventory.push(highlightedTile.type + " resource");
    console.log(player.inventory);
    currentChunk[cursor.targetY][cursor.targetX] = createTile("grass");
  } else if (player.inventory.includes(highlightedTile.toolRequired)) {
    console.log(
      "Using " + highlightedTile.toolRequired + " on " + highlightedTile.name
    );
    if (highlightedTile.health > 0) {
      highlightedTile.health -= 10;
      console.log(
        highlightedTile.name + " health is now " + highlightedTile.health
      );
      if (highlightedTile.health <= 0) {
        console.log(highlightedTile.name + " has been destroyed.");
        player.inventory.push(highlightedTile.type + " resource");
        console.log(player.inventory);
        currentChunk[cursor.targetY][cursor.targetX] = createTile("grass");
      }
    } else if (highlightedTile.health <= 0) {
      console.log(highlightedTile.name + " has been destroyed.");
      player.inventory.push(highlightedTile.type + " resource");
      console.log(player.inventory);
      currentChunk[cursor.targetY][cursor.targetX] = createTile("grass");
    }
  }
  // player.inventory.push(highlightedTile.type + " resource");
}
