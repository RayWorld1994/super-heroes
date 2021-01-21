import { Item } from "./item.interface";

export interface Events {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
