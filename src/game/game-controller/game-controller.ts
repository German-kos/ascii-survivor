import { RenderingSystem } from "../../rendering/index.js";
import { Direction, Position, TileConfig } from "../../types/index.js";
import { getNextPosition } from "../../utils/index.js";
import { InteractiveCursor, Player } from "../player/index.js";
import { WorldSystem } from "../world/index.js";

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
    const canMoveCursor: boolean = this.worldSystem.isInBounds(nextPosition);

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

  private executeRender(): void {
    this.moved = false;
    this.renderingSystem.render(
      this.currentChunk,
      this.player.getRenderingParams(),
      this.cursor.getRenderingParams()
    );
  }
}
