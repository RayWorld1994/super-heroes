import { Item } from "./item.interface";

export interface Comics {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
