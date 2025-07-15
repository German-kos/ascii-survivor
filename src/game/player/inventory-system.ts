import {
  DEFAULT_INVENTORY,
  DEFAULT_INVENTORY_SIZE,
  Item,
  StackItemPayload,
} from "../../index";

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

  getIteAtIndex(index: number): Item {
    if (index < 0 || index >= this.inventorySize) {
      throw new Error("Index out of bounds");
    }
    return this.inventory[index];
  }

  addItem(item: Item): boolean {
    const itemExists = this.isInInventory(item);
    if (itemExists) {
      const itemIndex = this.findItemIndex(item);
      const existingItem = this.inventory[itemIndex];
    }
    const;
    const inventoryIsFull = this.isInventoryFull();
    if (inventoryIsFull) {
      return false;
    }
  }

  private isInventoryFull(): boolean {
    return this.inventory.length >= this.inventorySize;
  }

  private isInInventory(item: Item): boolean {
    return this.inventory.some(
      (invItem) => invItem.name === item.name && invItem.type === item.type
    );
  }

  private findItemIndex(item: Item): number {
    return this.inventory.findIndex(
      (invItem) => invItem.name === item.name && invItem.type === item.type
    );
  }

  private isItemStackable(item: Item): boolean {
    return item.maxQuantity > 1 && item.quantity < item.maxQuantity;
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
}
