import { Item } from "../item.interface";

export interface List {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
