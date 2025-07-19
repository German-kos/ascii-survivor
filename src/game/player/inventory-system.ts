import {
  DEFAULT_INVENTORY,
  DEFAULT_INVENTORY_SIZE,
  emptyItem,
  Item,
  StackItemPayload,
} from "../../index.js";

export class InventorySystem {
  private inventory: Item[];
  private inventorySize: number;

  constructor(
    inventory: Item[] = DEFAULT_INVENTORY,
    inventorySize: number = DEFAULT_INVENTORY_SIZE
  ) {
    this.inventory = inventory;
    this.inventorySize = inventorySize;
  }

  getInventory(): Item[] {
    return this.inventory;
  }

  getItemAtIndex(index: number): Item {
    if (index < 0 || index >= this.inventory.length) {
      return emptyItem;
    }
    return this.inventory[index];
  }

  addItem(item: Item): boolean | Item {
    const itemExists: boolean = this.isInInventory(item);
    if (itemExists) {
      return this.handleExistingItem(item);
    } else {
      return this.handleNewItem(item);
    }
  }

  private isInInventory(item: Item): boolean {
    return this.inventory.some(
      (invItem) => invItem.name === item.name && invItem.type === item.type
    );
  }

  private handleExistingItem(item: Item): boolean | Item {
    const itemIndex: number = this.findItemIndex(item);
    const existingItem: Item = this.inventory[itemIndex];
    const stackResult: StackItemPayload | null = this.stackItem(
      existingItem,
      item.quantity
    );
    if (stackResult === null) {
      return this.handleNewItem(item);
    }

    this.inventory[itemIndex] = stackResult.modifiedItem;

    if (stackResult.quantityLeftover > 0) {
      return this.handleNewItem({
        ...item,
        quantity: stackResult.quantityLeftover,
      } as Item);
    }

    return true;
  }

  private handleNewItem(item: Item): boolean | Item {
    const inventoryIsFull: boolean = this.isInventoryFull();
    if (inventoryIsFull) {
      return item;
    }

    this.addItemToInventory(item);
    return true;
  }

  private findItemIndex(item: Item): number {
    return this.inventory.findIndex(
      (invItem) => invItem.name === item.name && invItem.type === item.type
    );
  }

  private stackItem(
    existingItem: Item,
    amountToAdd: number
  ): StackItemPayload | null {
    const maxQuantity: number = existingItem.maxQuantity;

    if (maxQuantity <= 1) return null;

    const newQuantity: number = existingItem.quantity + amountToAdd;
    const quantityLeftover: number = newQuantity - maxQuantity;

    if (quantityLeftover > 0) {
      return {
        modifiedItem: {
          ...existingItem,
          quantity: maxQuantity,
        },
        quantityLeftover: quantityLeftover,
      };
    }

    return {
      modifiedItem: { ...existingItem, quantity: newQuantity },
      quantityLeftover: 0,
    };
  }

  private addItemToInventory(item: Item): void {
    this.inventory.push(item);
  }

  private isInventoryFull(): boolean {
    return this.inventory.length >= this.inventorySize;
  }
}
