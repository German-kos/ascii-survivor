import { Item } from "../../types/index.js";

export function itemsFactory(itemConfig: Item): Item {
  return { ...itemConfig };
}
