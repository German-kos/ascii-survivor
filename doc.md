inventory system

getInventory(accepts nothing): Item[] => return this.inventory
getInventorySize(accepts nothing): number => return this.inventorySize

setInventory(inventory: Item[], inventorySize?: number): void{
const inventorySize: number = inventorySize | DEFAULT_INVENTORY_SIZE
}