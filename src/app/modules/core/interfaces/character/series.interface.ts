import { Item } from "./item.interface";

export interface Series {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
