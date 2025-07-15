import {
  CursorSystem,
  Direction,
  getNextPosition,
  InventorySystem,
  Item,
  PlayerSystem,
  Position,
  RenderingSystem,
  TileConfig,
  WorldSystem,
} from "../../index.js";

export class GameController {
  private playerSystem: PlayerSystem;
  private inventorySystem: InventorySystem;
  private cursorSystem: CursorSystem;
  private worldSystem: WorldSystem;
  private renderingSystem: RenderingSystem;
  private currentChunk: TileConfig[][];
  private moved: boolean;

  constructor() {
    this.playerSystem = new PlayerSystem();
    this.inventorySystem = new InventorySystem(); // Initialize with default inventory for now
    this.cursorSystem = new CursorSystem(this.playerSystem.getPosition());
    this.worldSystem = new WorldSystem();
    this.renderingSystem = new RenderingSystem();
    this.currentChunk = this.worldSystem.getCurrentChunk();
    this.moved = false;
  }

  executeInitialRender(): void {
    this.renderingSystem.render(
      this.currentChunk,
      this.playerSystem.getRenderingParams(),
      this.cursorSystem.getRenderingParams()
    );
  }

  movePlayer(direction: Direction): void {
    this.tryMovePlayer(direction);

    if (this.moved) {
      this.executeRender();
    }
  }

  moveCursor(direction: Direction): void {
    const currentPosition: Position = this.cursorSystem.getPosition();
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    const equippedItem: Item | null = this.playerSystem.getEquippedItem();
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
    this.cursorSystem.toggleLockState();
    this.executeRender();
  }

  interact(): void {
    const position: Position = this.cursorSystem.getPosition();
    const tile: TileConfig = this.worldSystem.getTile(position);
    const toolIsRequired: boolean = this.isToolRequired(tile);
    const tileIsDestructible: boolean = this.tileIsDestructible(tile);

    if (!toolIsRequired && tileIsDestructible) {
      this.tryDestroyTile(position);
      return;
    }

    const equippedItem: Item | null = this.playerSystem.getEquippedItem();
    const meetsToolRequirements: boolean = this.meetsToolRequirements(
      equippedItem,
      tile
    );
    if (meetsToolRequirements && tileIsDestructible) {
      this.tryDestroyTile(position, equippedItem?.toolDamage);
    }
  }

  private tryMovePlayer(direction: Direction): void {
    const currentPosition: Position = this.playerSystem.getPosition();
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    let playerMoved = false;

    if (this.worldSystem.isWalkable(nextPosition)) {
      this.playerSystem.setPosition(nextPosition);
      playerMoved = true;
    }

    const cursorLocked: boolean = this.cursorSystem.getCursorLockState();
    if (cursorLocked) {
      this.updateLockedCursor(direction);
      this.moved = true;
    } else if (playerMoved) {
      const currentCursorPosition: Position = this.cursorSystem.getPosition();
      this.updateUnlockedCursor(direction, currentCursorPosition);
      this.moved = true;
    }
  }

  private executeMoveCursor(
    nextPosition: Position,
    direction: Direction
  ): void {
    this.cursorSystem.setPosition(nextPosition);
    this.moved = true;
  }

  private updateLockedCursor(direction: Direction): void {
    const playerPosition: Position = this.playerSystem.getPosition();
    const nextPosition: Position = this.cursorSystem.getNextPositionLocked(
      direction,
      playerPosition
    );
    const canMoveCursor: boolean = this.worldSystem.isInBounds(nextPosition);

    if (canMoveCursor) {
      this.cursorSystem.setPosition(nextPosition);
    } else {
      this.cursorSystem.setPosition(playerPosition);
    }
  }

  private updateUnlockedCursor(
    direction: Direction,
    currentPosition: Position
  ): void {
    const nextPosition: Position = getNextPosition(currentPosition, direction);
    const canMoveCursor: boolean = this.worldSystem.isInBounds(nextPosition);
    if (canMoveCursor) {
      this.cursorSystem.setPosition(nextPosition);
    }
  }

  private canMoveCursorToPosition(
    nextPosition: Position,
    equippedItem?: Item | null
  ): boolean {
    const range: number = equippedItem?.range || 1;
    const isInBounds: boolean = this.worldSystem.isInBounds(nextPosition);
    const isWithinRange: boolean =
      Math.abs(nextPosition.x - this.playerSystem.getPosition().x) <= range &&
      Math.abs(nextPosition.y - this.playerSystem.getPosition().y) <= range;

    return isInBounds && isWithinRange;
  }

  private executeRender(): void {
    this.moved = false;
    this.renderingSystem.render(
      this.currentChunk,
      this.playerSystem.getRenderingParams(),
      this.cursorSystem.getRenderingParams()
    );
  }

  private isToolRequired(tile: TileConfig): boolean {
    return tile.toolRequired !== "none";
  }

  private tileIsDestructible(tile: TileConfig): boolean {
    return tile.destructible;
  }

  private tryDestroyTile(position: Position, damage?: number): void {
    if (!damage) damage = 0;
    const tile: TileConfig = this.worldSystem.getTile(position);
    const tileDestroyed = this.worldSystem.destroyTile(position, damage);
    if (tileDestroyed) {
      this.addItemToInventory(tile.harvestItem);
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

  private addItemToInventory(item: Item): void {
    if (item !== undefined && item.quantity > 0) {
      this.inventorySystem.addItem(item);
    }
  }
}
