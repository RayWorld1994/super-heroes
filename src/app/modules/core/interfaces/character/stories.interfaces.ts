import { Item } from "./item.interface";

export interface Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
