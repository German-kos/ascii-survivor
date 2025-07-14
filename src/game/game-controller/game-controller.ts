import { Direction, Item, Position, TileConfig } from "../../types/index.js";
import { InteractiveCursor, Player, WorldSystem } from "../index.js";
import { RenderingSystem } from "../../rendering/index.js";
import { getNextPosition } from "../../utils/index.js";

export class GameController {
  private player: Player;
  private cursor: InteractiveCursor;
  private worldSystem: WorldSystem;
  private renderingSystem: RenderingSystem;
  private currentChunk: TileConfig[][];
  private moved: boolean;

  constructor() {
    this.player = new Player();
    this.cursor = new InteractiveCursor(this.player.getPosition());
    this.worldSystem = new WorldSystem();
    this.renderingSystem = new RenderingSystem();
    this.currentChunk = this.worldSystem.getCurrentChunk();
    this.moved = false;
  }

  executeInitialRender(): void {
    this.renderingSystem.render(
      this.currentChunk,
      this.player.getRenderingParams(),
      this.cursor.getRenderingParams()
    );
  }

  movePlayer(direction: Direction): void {
    this.tryMovePlayer(direction);

    if (this.moved) {
      this.executeRender();
    }
  }

  moveCursor(direction: Direction): void {
    const currentPosition: Position = this.cursor.getPosition();
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    const equippedItem: Item | null = this.player.getEquippedItem();
    const canMoveCursor: boolean = this.canMoveCursorToPosition(
      nextPosition,
      equippedItem
    );

    if (canMoveCursor) {
      this.executeMoveCursor(nextPosition, direction);
    }
    if (this.moved) {
      this.executeRender();
    }
  }

  toggleCursorLock(): void {
    this.cursor.toggleLockState();
    this.executeRender();
  }

  interact(): void {
    const position: Position = this.cursor.getPosition();
    const tile: TileConfig = this.worldSystem.getTile(position);
    const toolIsRequired: boolean = this.toolIsRequired(tile);
    const tileIsDestructible: boolean = this.tileIsDestructible(tile);

    if (!toolIsRequired && tileIsDestructible) {
      this.tryDestroyTile(position);
      return;
    }

    const equippedItem: Item | null = this.player.getEquippedItem();
    const meetsToolRequirements: boolean = this.meetsToolRequirements(
      equippedItem,
      tile
    );
    if (meetsToolRequirements && tileIsDestructible) {
      this.tryDestroyTile(position, equippedItem?.toolDamage);
    }
  }

  private tryMovePlayer(direction: Direction): void {
    const currentPosition: Position = this.player.getPosition();
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    let playerMoved = false;

    if (this.worldSystem.isWalkable(nextPosition)) {
      this.player.setPosition(nextPosition);
      playerMoved = true;
    }

    const cursorLocked: boolean = this.cursor.getCursorLockState();
    if (cursorLocked) {
      this.updateLockedCursor(direction);
      this.moved = true;
    } else if (playerMoved) {
      const currentCursorPosition: Position = this.cursor.getPosition();
      this.updateUnlockedCursor(direction, currentCursorPosition);
      this.moved = true;
    }
  }

  private executeMoveCursor(
    nextPosition: Position,
    direction: Direction
  ): void {
    this.cursor.setPosition(nextPosition);
    this.moved = true;
  }

  private updateLockedCursor(direction: Direction): void {
    const playerPosition: Position = this.player.getPosition();
    const nextPosition: Position = this.cursor.getNextPositionLocked(
      direction,
      playerPosition
    );
    const canMoveCursor: boolean = this.worldSystem.isInBounds(nextPosition);

    if (canMoveCursor) {
      this.cursor.setPosition(nextPosition);
    } else {
      this.cursor.setPosition(playerPosition);
    }
  }

  private updateUnlockedCursor(
    direction: Direction,
    currentPosition: Position
  ): void {
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    const canMoveCursor: boolean = this.worldSystem.isInBounds(nextPosition);
    if (canMoveCursor) {
      this.cursor.setPosition(nextPosition);
    }
  }

  private canMoveCursorToPosition(
    nextPosition: Position,
    equippedItem?: Item | null
  ): boolean {
    const range: number = equippedItem?.range || 1;
    const isInBounds: boolean = this.worldSystem.isInBounds(nextPosition);
    const isWithinRange: boolean =
      Math.abs(nextPosition.x - this.player.getPosition().x) <= range &&
      Math.abs(nextPosition.y - this.player.getPosition().y) <= range;

    return isInBounds && isWithinRange;
  }

  private executeRender(): void {
    this.moved = false;
    this.renderingSystem.render(
      this.currentChunk,
      this.player.getRenderingParams(),
      this.cursor.getRenderingParams()
    );
  }

  private toolIsRequired(tile: TileConfig): boolean {
    return tile.toolRequired !== "none";
  }

  private tileIsDestructible(tile: TileConfig): boolean {
    return tile.destructible;
  }

  private tryDestroyTile(position: Position, damage?: number): void {
    if (!damage) damage = 0;
    const tileDestroyed = this.worldSystem.destroyTile(position, damage);
    if (tileDestroyed) {
      this.executeRender();
    }
  }

  private meetsToolRequirements(
    equippedItem: Item | null,
    tile: TileConfig
  ): boolean {
    if (!equippedItem) {
      console.log(`No tool equipped, but ${tile.toolRequired} required`);
      return false;
    }

    if (equippedItem.toolType !== tile.toolRequired) {
      console.log(
        `Tool required: ${tile.toolRequired}, but equipped: ${equippedItem.toolType}`
      );
      return false;
    }

    if (equippedItem.level < tile.toolLevelRequired) {
      console.log(
        `Tool level required: ${tile.toolLevelRequired}, but equipped level: ${equippedItem.level}`
      );
      return false;
    }

    return true;
  }
}
